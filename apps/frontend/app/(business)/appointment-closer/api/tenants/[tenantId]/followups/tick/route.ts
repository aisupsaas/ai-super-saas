import { NextResponse } from "next/server";
import { acPrisma } from "@/app/(business)/appointment-closer/_db/acPrisma";

type Context = { params: Promise<{ tenantId: string }> };

export async function POST(req: Request, context: Context) {
  try {
    const { tenantId } = await context.params;
    if (!tenantId) return NextResponse.json({ ok: false, error: "Missing tenantId" }, { status: 400 });

    // basic shared-secret gate (dev only)
    const secret = req.headers.get("x-ac-dev-secret") || "";
    const expected = process.env.AC_DEV_CRON_SECRET || "";
    if (!expected || secret !== expected) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    // Run for this tenant: find due leads count quickly, then call followups/run internally
    // (We re-run logic here instead of internal fetch to avoid baseUrl issues.)
    const now = new Date();
    const dueCount = await acPrisma.acLead.count({
      where: { tenantId, nextFollowUpAt: { lte: now } },
    });

    if (dueCount === 0) {
      return NextResponse.json({ ok: true, tenantId, now: now.getTime(), ran: false, reason: "no_due_leads" });
    }

    // Reuse your existing runner logic by calling the route via relative fetch (works server-side)
    const baseUrl = new URL(req.url).origin;
    const res = await fetch(`${baseUrl}/appointment-closer/api/tenants/${tenantId}/followups/run`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dryRun: false, now: now.getTime(), limit: 50 }),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok || data?.ok === false) {
      return NextResponse.json({ ok: false, error: data?.error || "Followups run failed" }, { status: 500 });
    }

    return NextResponse.json({ ok: true, tenantId, now: now.getTime(), ran: true, result: data });
  } catch (e) {
    console.error("followups/tick error:", e);
    return NextResponse.json({ ok: false, error: "Failed to tick followups" }, { status: 500 });
  }
}
