import { NextResponse } from "next/server";
import { acPrisma } from "@/app/(business)/appointment-closer/_db/acPrisma";

type Context = { params: Promise<{ tenantId: string; leadId: string }> };

type AiMode = "auto" | "review" | "takeover";

function isAiMode(x: any): x is AiMode {
  return x === "auto" || x === "review" || x === "takeover";
}

function asObjectJson(x: unknown): Record<string, any> {
  return x && typeof x === "object" && !Array.isArray(x) ? (x as any) : {};
}

export async function PATCH(req: Request, context: Context) {
  try {
    // ✅ FIX: params is a Promise in Next 16, must await
    const { tenantId, leadId } = await context.params;

    if (!tenantId) {
      return NextResponse.json({ ok: false, error: "Missing tenantId" }, { status: 400 });
    }
    if (!leadId) {
      return NextResponse.json({ ok: false, error: "Missing leadId" }, { status: 400 });
    }

    const body = await req.json().catch(() => ({}));
    const mode = body?.mode;

    const reason =
      typeof body?.reason === "string" && body.reason.trim() ? body.reason.trim() : undefined;

    if (!isAiMode(mode)) {
      return NextResponse.json(
        { ok: false, error: `Invalid mode. Expected "auto" | "review" | "takeover".` },
        { status: 400 }
      );
    }

    // 1) Load lead.ai to merge safely
    const lead = await acPrisma.acLead.findFirst({
      where: { tenantId, id: leadId },
      select: { id: true, tenantId: true, ai: true },
    });

    if (!lead) {
      return NextResponse.json({ ok: false, error: "Lead not found for this tenant." }, { status: 404 });
    }

    const existingAi = asObjectJson(lead.ai);

    // 2) Merge patch into ai JSON
    const nextAi = {
      ...existingAi,
      mode,
      modeReason: mode === "auto" ? undefined : reason ?? existingAi.modeReason ?? "Set manually",
      updatedAt: Date.now(),
    };

    // 3) Persist (safe: we already tenant-checked above)
    await acPrisma.acLead.update({
      where: { id: lead.id },
      data: { ai: nextAi as any },
    });

    return NextResponse.json({
      ok: true,
      lead: { id: lead.id, tenantId, ai: nextAi },
    });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? "Failed to update AI mode" }, { status: 500 });
  }
}
