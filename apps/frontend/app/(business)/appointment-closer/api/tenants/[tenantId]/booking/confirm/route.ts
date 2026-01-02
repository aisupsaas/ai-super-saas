import { NextResponse } from "next/server";
import { acPrisma } from "@/app/(business)/appointment-closer/_db/acPrisma";

type Context = { params: Promise<{ tenantId: string }> };

type Body = {
  leadId: string;
  service?: string;
  durationMin?: number;
};

export async function POST(req: Request, context: Context) {
  try {
    const { tenantId } = await context.params;
    const body = (await req.json()) as Partial<Body>;

    const leadId = body.leadId?.trim();
    if (!tenantId || !leadId) {
      return NextResponse.json({ ok: false, error: "Missing tenantId or leadId" }, { status: 400 });
    }

    const lead = await acPrisma.acLead.findFirst({
      where: { tenantId, id: leadId },
      select: { id: true, name: true, stage: true, ai: true },
    });

    if (!lead) {
      return NextResponse.json({ ok: false, error: "Lead not found" }, { status: 404 });
    }

    const aiObj = (lead.ai ?? {}) as any;
    const proposal = aiObj.bookingProposal;
    const startAtMs = typeof proposal?.startAt === "number" ? proposal.startAt : null;

    if (!startAtMs) {
      return NextResponse.json({ ok: false, error: "No booking proposal found for this lead" }, { status: 400 });
    }

    const service = body.service ?? aiObj.serviceInterest ?? "Consultation";
    const durationMin = typeof body.durationMin === "number" ? body.durationMin : 30;

    const appt = await acPrisma.$transaction(async (tx) => {
      const created = await tx.acAppointment.create({
        data: {
          tenantId,
          leadId: lead.id,
          service,
          startAt: new Date(startAtMs),
          durationMin,
          status: "Booked",
        },
        select: { id: true, service: true, startAt: true, durationMin: true, status: true },
      });

      // move lead to Booked + clear proposal
      await tx.acLead.update({
        where: { tenantId_id: { tenantId, id: lead.id } },
        data: {
          stage: "Booked",
          ai: {
            ...aiObj,
            bookingProposal: null,
            state: "booked",
          },
        },
      });

      return created;
    });

    return NextResponse.json({
      ok: true,
      tenantId,
      appointment: {
        id: appt.id,
        service: appt.service,
        startAt: appt.startAt.getTime(),
        durationMin: appt.durationMin,
        status: appt.status,
      },
    });
  } catch (e) {
    console.error("booking/confirm error:", e);
    return NextResponse.json({ ok: false, error: "Failed to confirm booking" }, { status: 500 });
  }
}
