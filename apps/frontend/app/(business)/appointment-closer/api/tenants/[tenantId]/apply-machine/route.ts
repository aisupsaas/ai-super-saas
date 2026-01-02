import { NextResponse } from "next/server";
import { acPrisma } from "@/app/(business)/appointment-closer/_db/acPrisma";
import { runAcStateMachine } from "@/app/(business)/appointment-closer/_logic/acStateMachine";

type Context = { params: Promise<{ tenantId: string }> };

type ApplyMachineBody = {
  conversationId: string;
  messageLimit?: number;
  persistAiDraft?: boolean;
  markRead?: boolean;
  now?: number;
};

type ApplyMachineResponse =
  | {
      ok: true;
      tenantId: string;

      applied: {
        leadStageChanged: boolean;
        aiMetaUpdated: boolean;
        appointmentCreated: boolean;
        followupScheduled: boolean;
        aiDraftPersisted: boolean;
        markedRead: boolean;
      };

      machine: {
        draftReply: string | null;
        nextLeadStage: string | null;
        nextAi: any;
        shouldCreateAppointment: null | {
          service: string;
          startAt: number;
          durationMin: number;
        };
        shouldScheduleFollowupAt: number | null;
      };

      conversation: {
        id: string;
        leadId: string;
        channel: string;
        unreadCount: number;
        lastAt: number;
        updatedAt: number;
      };

      lead: {
        id: string;
        name: string;
        phone: string | null;
        email: string | null;
        stage: string;
        nextFollowUpAt: number | null;
        ai: any;
      };
    }
  | {
      ok: false;
      error: string;
      debug?: {
        name?: string;
        code?: string;
        message?: string;
        stack?: string[];
      };
    };

export async function POST(req: Request, context: Context) {
  try {
    const { tenantId } = await context.params;
    if (!tenantId) {
      return NextResponse.json({ ok: false, error: "Missing tenantId" } satisfies ApplyMachineResponse, {
        status: 400,
      });
    }

    const body = (await req.json()) as Partial<ApplyMachineBody>;
    const conversationId = body.conversationId?.trim();
    if (!conversationId) {
      return NextResponse.json({ ok: false, error: "Missing conversationId" } satisfies ApplyMachineResponse, {
        status: 400,
      });
    }

    const messageLimit = Math.min(Math.max(body.messageLimit ?? 30, 1), 200);
    const now = typeof body.now === "number" ? new Date(body.now) : new Date();
    if (Number.isNaN(now.getTime())) {
      return NextResponse.json({ ok: false, error: "Invalid now timestamp" } satisfies ApplyMachineResponse, {
        status: 400,
      });
    }

    const persistAiDraft = Boolean(body.persistAiDraft);
    const markRead = Boolean(body.markRead);

    // 1) Load conversation + lead
    const conv = await acPrisma.acConversation.findFirst({
      where: { tenantId, id: conversationId },
      select: {
        id: true,
        leadId: true,
        channel: true,
        unreadCount: true,
        lastAt: true,
        updatedAt: true,
        lead: {
          select: {
            id: true,
            name: true,
            phone: true,
            email: true,
            stage: true,
            nextFollowUpAt: true,
            ai: true,
          },
        },
      },
    });

    if (!conv) {
      return NextResponse.json({ ok: false, error: "Conversation not found" } satisfies ApplyMachineResponse, {
        status: 404,
      });
    }

    // 2) Load DB settings (raw JSON fields)
    const dbSettings = await acPrisma.acSettings.findFirst({
      where: { tenantId },
      select: {
        tenantId: true,
        timezone: true,
        businessName: true,
        hoursJson: true,
        servicesJson: true,
        faqsJson: true,
        qualQsJson: true,
        bookingJson: true,
        followupsJson: true,
      },
    });

    // 3) Normalize DB settings -> machine shape
    // Your machine reads settings.services, so map servicesJson -> services, etc.
    const machineSettings = dbSettings
      ? {
          tenantId: dbSettings.tenantId,
          timezone: dbSettings.timezone,
          businessName: dbSettings.businessName,
          hours: dbSettings.hoursJson ?? null,
          services: (dbSettings.servicesJson as any) ?? [],
          faqs: (dbSettings.faqsJson as any) ?? [],
          qualQs: (dbSettings.qualQsJson as any) ?? [],
          booking: dbSettings.bookingJson ?? null,
          followups: dbSettings.followupsJson ?? null,
        }
      : {
          tenantId,
          timezone: "America/New_York",
          businessName: "Your Business",
          hours: null,
          services: [],
          faqs: [],
          qualQs: [],
          booking: null,
          followups: null,
        };

    // 4) Load messages chronological
    const messages = await acPrisma.acMessage.findMany({
      where: { tenantId, conversationId: conv.id },
      orderBy: [{ at: "asc" }],
      take: messageLimit,
      select: {
        id: true,
        at: true,
        from: true,
        text: true,
      },
    });

    // ✅ IMPORTANT: put settings into state.settings (this is what your machine expects)
    const machineInput: any = {
      state: {
        settings: machineSettings, // <— FIX
      },
      lead: {
        id: conv.lead.id,
        tenantId,
        name: conv.lead.name,
        phone: conv.lead.phone,
        email: conv.lead.email,
        stage: String(conv.lead.stage),
        ai: conv.lead.ai ?? null,
        nextFollowUpAt: conv.lead.nextFollowUpAt ? conv.lead.nextFollowUpAt.getTime() : null,
      },
      conv: {
        id: conv.id,
        tenantId,
        leadId: conv.leadId,
        channel: conv.channel,
        unreadCount: conv.unreadCount,
        lastAt: conv.lastAt.getTime(),
        messages: messages.map((m) => ({
          id: m.id,
          at: m.at.getTime(),
          from: String(m.from), // lead | ai | human
          text: m.text,
        })),
      },

      // Optional: keep this too (harmless). Some versions of your machine might read it.
      settings: machineSettings,

      now: now.getTime(),
    };

    // Run machine
    const machineOut: any = await (runAcStateMachine as any)(machineInput);

    const draftReply: string | null = machineOut?.draftReply ?? null;
    const nextLeadStage: string | null = machineOut?.nextLeadStage ?? null;
    const nextAi: any = machineOut?.nextAi ?? null;

    const shouldCreateAppointment = machineOut?.shouldCreateAppointment ?? null;
    const shouldScheduleFollowupAt: number | null = machineOut?.shouldScheduleFollowupAt ?? null;

    // Persist changes in a transaction
    const result = await acPrisma.$transaction(async (tx) => {
      let leadStageChanged = false;
      let aiMetaUpdated = false;
      let appointmentCreated = false;
      let followupScheduled = false;
      let aiDraftPersisted = false;
      let markedRead = false;

      const leadUpdateData: any = {};

      if (nextLeadStage && nextLeadStage !== String(conv.lead.stage)) {
        leadUpdateData.stage = nextLeadStage;
        leadStageChanged = true;
      }

      if (nextAi && Object.keys(nextAi).length > 0) {
        leadUpdateData.ai = {
          ...(conv.lead.ai as any),
          ...nextAi,
        };
        aiMetaUpdated = true;
      }

      if (typeof shouldScheduleFollowupAt === "number") {
        leadUpdateData.nextFollowUpAt = new Date(shouldScheduleFollowupAt);
        followupScheduled = true;
      }

      const updatedLead =
        Object.keys(leadUpdateData).length > 0
          ? await tx.acLead.update({
              where: { id: conv.lead.id },
              data: leadUpdateData,
              select: {
                id: true,
                name: true,
                phone: true,
                email: true,
                stage: true,
                nextFollowUpAt: true,
                ai: true,
              },
            })
          : await tx.acLead.findFirstOrThrow({
              where: { tenantId, id: conv.lead.id },
              select: {
                id: true,
                name: true,
                phone: true,
                email: true,
                stage: true,
                nextFollowUpAt: true,
                ai: true,
              },
            });

      if (shouldCreateAppointment?.service && shouldCreateAppointment?.startAt && shouldCreateAppointment?.durationMin) {
        await tx.acAppointment.create({
          data: {
            tenantId,
            leadId: conv.lead.id,
            service: shouldCreateAppointment.service,
            startAt: new Date(shouldCreateAppointment.startAt),
            durationMin: shouldCreateAppointment.durationMin,
            status: "Booked",
          },
        });
        appointmentCreated = true;
    }
        await tx.acConversation.update({
        where: { tenantId_id: { tenantId, id: conv.id } },
        data: { lastAt: now }, // ✅ no unread increment for normal AI reply
    });

      const updatedConv = await tx.acConversation.update({
        where: { id: conv.id },
        data: markRead ? { unreadCount: 0 } : {},
        select: {
          id: true,
          leadId: true,
          channel: true,
          unreadCount: true,
          lastAt: true,
          updatedAt: true,
        },
      });

      if (markRead) markedRead = true;

      return {
        updatedLead,
        updatedConv,
        applied: {
          leadStageChanged,
          aiMetaUpdated,
          appointmentCreated,
          followupScheduled,
          aiDraftPersisted,
          markedRead,
        },
      };
    });

    const resBody: ApplyMachineResponse = {
      ok: true,
      tenantId,
      applied: result.applied,
      machine: {
        draftReply,
        nextLeadStage,
        nextAi,
        shouldCreateAppointment,
        shouldScheduleFollowupAt,
      },
      conversation: {
        id: result.updatedConv.id,
        leadId: result.updatedConv.leadId,
        channel: result.updatedConv.channel,
        unreadCount: result.updatedConv.unreadCount,
        lastAt: new Date(result.updatedConv.lastAt).getTime(),
        updatedAt: new Date(result.updatedConv.updatedAt).getTime(),
      },
      lead: {
        id: result.updatedLead.id,
        name: result.updatedLead.name,
        phone: result.updatedLead.phone,
        email: result.updatedLead.email,
        stage: String(result.updatedLead.stage),
        nextFollowUpAt: result.updatedLead.nextFollowUpAt ? result.updatedLead.nextFollowUpAt.getTime() : null,
        ai: result.updatedLead.ai ?? null,
      },
    };

    return NextResponse.json(resBody);
  } catch (error: any) {
    console.error("POST apply-machine error:", error);

    // Keep debug while validating; remove later for production.
    return NextResponse.json(
      {
        ok: false,
        error: "Failed to apply machine",
        debug: {
          name: error?.name,
          code: error?.code,
          message: error?.message,
          stack: String(error?.stack ?? "").split("\n").slice(0, 8),
        },
      },
      { status: 500 }
    );
  }
}
