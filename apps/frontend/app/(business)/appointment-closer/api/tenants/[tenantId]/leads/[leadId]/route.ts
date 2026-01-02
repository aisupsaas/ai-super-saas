import { NextResponse } from "next/server";
import { acPrisma } from "@/app/(business)/appointment-closer/_db/acPrisma";

type Context = { params: Promise<{ tenantId: string; leadId: string }> };

export type LeadDetailResponse =
  | { ok: true;
      tenantId: string;
      lead: {
          id: string;
          name: string;
          phone: string | null;
          email: string | null;
          stage: string;
          notes: string | null;
          updatedAt: number;
          ai: unknown | null;

        // ✅ ADDED: include ai JSON so CRM can read mode/modeReason
      };
      appointments: Array<{
        id: string;
        service: string;
        startAt: number;
        durationMin: number;
        status: string;
      }>;
      conversations: Array<{
        id: string;
        channel: string;
        unreadCount: number;
        lastAt: number;
        updatedAt: number;
      }>;
    }
  | { ok: false; error: string };

type LeadPatchBody = Partial<{
  stage: string;
  notes: string | null;
  // We accept "ai" as a JSON patch object; primarily used here for handoffEnabled toggle.
  ai: Record<string, unknown> | null;
}>;

export async function GET(_req: Request, context: Context) {
  try {
    const { tenantId, leadId } = await context.params;

    if (!tenantId) {
      return NextResponse.json(
        { ok: false, error: "Missing tenantId" } satisfies LeadDetailResponse,
        { status: 400 }
      );
    }
    if (!leadId) {
      return NextResponse.json(
        { ok: false, error: "Missing leadId" } satisfies LeadDetailResponse,
        { status: 400 }
      );
    }

    // ✅ Single query: lead + appointments + conversations
    const lead = await acPrisma.acLead.findFirst({
      where: { tenantId, id: leadId },
      select: {
        id: true,
        name: true,
        phone: true,
        email: true,
        stage: true,
        notes: true,
        updatedAt: true,
        ai: true,

        // ✅ ADDED: include ai JSON
      

        appointments: {
          orderBy: { startAt: "desc" },
          take: 25,
          select: {
            id: true,
            service: true,
            startAt: true,
            durationMin: true,
            status: true,
          },
        },

        conversations: {
          orderBy: { lastAt: "desc" },
          take: 10,
          select: {
            id: true,
            channel: true,
            unreadCount: true,
            lastAt: true,
            updatedAt: true,
          },
        },
      },
    });

    if (!lead) {
      return NextResponse.json(
        { ok: false, error: "Lead not found" } satisfies LeadDetailResponse,
        { status: 404 }
      );
    }

    return NextResponse.json({
      ok: true,
      tenantId,
      lead: {
        id: lead.id,
        name: lead.name,
        phone: lead.phone,
        email: lead.email,
        stage: String(lead.stage),
        notes: lead.notes ?? null,
        updatedAt: lead.updatedAt.getTime(),
        ai: lead.ai ?? null,
      
      },

      // ✅ matches LeadDetailResponse exactly (no extra fields)
      appointments: (lead.appointments ?? []).map((a) => ({
        id: a.id,
        service: a.service,
        startAt: a.startAt.getTime(),
        durationMin: a.durationMin,
        status: String(a.status),
      })),

      conversations: (lead.conversations ?? []).map((c) => ({
        id: c.id,
        channel: c.channel,
        unreadCount: c.unreadCount,
        lastAt: c.lastAt.getTime(),
        updatedAt: c.updatedAt.getTime(),
      })),
    } satisfies LeadDetailResponse);
  } catch (e) {
    console.error("GET lead detail error:", e);
    return NextResponse.json(
      { ok: false, error: "Failed to load lead" } satisfies LeadDetailResponse,
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request, context: Context) {
  try {
    const { tenantId, leadId } = await context.params;

    if (!tenantId) {
      return NextResponse.json({ ok: false, error: "Missing tenantId" }, { status: 400 });
    }
    if (!leadId) {
      return NextResponse.json({ ok: false, error: "Missing leadId" }, { status: 400 });
    }

    const body = (await req.json().catch(() => null)) as LeadPatchBody | null;
    if (!body) {
      return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
    }

    // Load current lead.ai so we can merge patches safely
    const existing = await acPrisma.acLead.findFirst({
      where: { tenantId, id: leadId },
      select: { id: true, ai: true },
    });

    if (!existing) {
      return NextResponse.json({ ok: false, error: "Lead not found" }, { status: 404 });
    }

    const nextAi =
      body.ai === undefined
        ? undefined
        : body.ai === null
        ? null
        : { ...(existing.ai as any), ...(body.ai as any) };

    const updated = await acPrisma.acLead.update({
      where: { id: existing.id },
      data: {
        ...(body.stage !== undefined ? { stage: body.stage as any } : {}),
        ...(body.notes !== undefined ? { notes: body.notes } : {}),
        ...(nextAi !== undefined ? { ai: nextAi as any } : {}),
      },
      select: {
        id: true,
        name: true,
        phone: true,
        email: true,
        stage: true,
        notes: true,
        updatedAt: true,
        ai: true,
      },
    });

    return NextResponse.json({
  ok: true,
  tenantId,
  lead: {
    id: updated.id,
    name: updated.name,
    phone: updated.phone,
    email: updated.email,
    stage: String(updated.stage),
    notes: updated.notes ?? null,
    updatedAt: updated.updatedAt.getTime(),
    ai: updated.ai ?? null, // ✅ include ai so CRM list can update
  },
  // PATCH returns just lead; callers that need appointments/convos can re-GET
});

  } catch (e) {
    console.error("PATCH lead error:", e);
    return NextResponse.json({ ok: false, error: "Failed to update lead" }, { status: 500 });
  }
}
