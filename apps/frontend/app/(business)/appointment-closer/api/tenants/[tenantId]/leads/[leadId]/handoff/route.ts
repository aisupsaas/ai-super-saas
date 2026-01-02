import { NextResponse } from "next/server";
import { acPrisma } from "@/app/(business)/appointment-closer/_db/acPrisma";

type Context = { params: Promise<{ tenantId: string; leadId: string }> };

type Body = {
  enabled: boolean;
  reason?: string;
};

type Resp =
  | { ok: true; tenantId: string; leadId: string; enabled: boolean }
  | { ok: false; error: string };

function mergeAi(ai: unknown, patch: Record<string, unknown>): any {
  const base = ai && typeof ai === "object" ? (ai as Record<string, unknown>) : {};
  return { ...base, ...patch };
}

export async function POST(req: Request, context: Context) {
  try {
    const { tenantId, leadId } = await context.params;
    if (!tenantId) return NextResponse.json({ ok: false, error: "Missing tenantId" } satisfies Resp, { status: 400 });
    if (!leadId) return NextResponse.json({ ok: false, error: "Missing leadId" } satisfies Resp, { status: 400 });

    const body = (await req.json().catch(() => ({}))) as Partial<Body>;
    const enabled = Boolean(body.enabled);
    const reason = (body.reason ?? "").trim();

    const lead = await acPrisma.acLead.findFirst({
      where: { tenantId, id: leadId },
      select: { id: true, ai: true },
    });

    if (!lead) {
      return NextResponse.json({ ok: false, error: "Lead not found" } satisfies Resp, { status: 404 });
    }

    const now = Date.now();

    await acPrisma.acLead.update({
      where: { tenantId_id: { tenantId, id: leadId } },
      data: {
        nextFollowUpAt: enabled ? null : undefined, // stop followups while handoff enabled
        ai: enabled
          ? mergeAi(lead.ai, {
              state: "handoff_human",
              handoffEnabled: true,
              handoffReason: reason || "Operator enabled human takeover",
              handoffAt: now,
            })
          : mergeAi(lead.ai, {
              handoffEnabled: false,
              handoffReason: null,
              handoffAt: null,
              // state returns to inbox_new unless you want something else
              state: "inbox_new",
              updatedAt: now,
            }),
      },
    });

    return NextResponse.json({ ok: true, tenantId, leadId, enabled } satisfies Resp);
  } catch (e) {
    console.error("POST handoff error:", e);
    return NextResponse.json({ ok: false, error: "Failed to toggle handoff" } satisfies Resp, { status: 500 });
  }
}
