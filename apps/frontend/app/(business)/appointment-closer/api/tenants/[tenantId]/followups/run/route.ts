import { NextResponse } from "next/server";
import { acPrisma } from "@/app/(business)/appointment-closer/_db/acPrisma";

type Context = { params: Promise<{ tenantId: string }> };
type Tx = Parameters<typeof acPrisma.$transaction>[0] extends (arg: infer A) => any ? A : never;

type RunFollowupsBody = {
  limit?: number; // default 25
  now?: number; // epoch ms override
  dryRun?: boolean; // default false
};

type Step = {
  stepKey: string;
  afterHours: number;
  message: string;
  sortOrder: number;
  enabled: boolean;
};

type RunItem = {
  leadId: string;
  leadName: string;
  conversationId: string | null;
  action: "sent" | "skipped_no_conversation" | "skipped_no_steps";
  stepKey: string | null;
  nextFollowUpAt: number | null;
  messagePreview: string;
};

type RunFollowupsResponse =
  | {
      ok: true;
      tenantId: string;
      now: number;
      dryRun: boolean;
      dueLeads: number;
      processed: number;
      sent: number;
      skipped: number;
      items: RunItem[];
    }
  | { ok: false; error: string };

function preview(s: string, max = 120) {
  const clean = s.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return clean.slice(0, max - 1) + "…";
}

function renderTemplate(template: string, vars: Record<string, string>) {
  // supports: {{name}} and {{businessName}}
  return template.replace(/\{\{(\w+)\}\}/g, (_, k) => vars[k] ?? "");
}

export async function POST(req: Request, context: Context) {
  try {
    const { tenantId } = await context.params;
    if (!tenantId) {
      return NextResponse.json({ ok: false, error: "Missing tenantId" } satisfies RunFollowupsResponse, {
        status: 400,
      });
    }

    const body = (await req.json().catch(() => ({}))) as Partial<RunFollowupsBody>;
    const limit = Math.min(Math.max(body.limit ?? 25, 1), 200);
    const dryRun = Boolean(body.dryRun);
    const now = typeof body.now === "number" ? new Date(body.now) : new Date();

    if (Number.isNaN(now.getTime())) {
      return NextResponse.json({ ok: false, error: "Invalid now timestamp" } satisfies RunFollowupsResponse, {
        status: 400,
      });
    }

    // 1) Load enabled follow-up steps (ordered)
    const steps: Step[] = await acPrisma.acFollowupStep.findMany({
      where: { tenantId, enabled: true },
      orderBy: [{ sortOrder: "asc" }],
      select: {
        stepKey: true,
        afterHours: true,
        message: true,
        sortOrder: true,
        enabled: true,
      },
    });

    if (steps.length === 0) {
      return NextResponse.json({
        ok: true,
        tenantId,
        now: now.getTime(),
        dryRun,
        dueLeads: 0,
        processed: 0,
        sent: 0,
        skipped: 0,
        items: [],
      } satisfies RunFollowupsResponse);
    }

    // 2) Load due leads
    const leads = await acPrisma.acLead.findMany({
      where: {
        tenantId,
        nextFollowUpAt: { lte: now },
      },
      orderBy: [{ nextFollowUpAt: "asc" }],
      take: limit,
      select: {
        id: true,
        name: true,
        nextFollowUpAt: true,
        ai: true,
      },
    });

    const business = await acPrisma.acSettings.findFirst({
      where: { tenantId },
      select: { businessName: true },
    });

    const items: RunItem[] = [];
    let sent = 0;
    let skipped = 0;

    for (const lead of leads) {
      // Find latest conversation for this lead
      const conv = await acPrisma.acConversation.findFirst({
        where: { tenantId, leadId: lead.id },
        orderBy: [{ lastAt: "desc" }],
        select: { id: true },
      });

      if (!conv) {
        skipped++;
        items.push({
          leadId: lead.id,
          leadName: lead.name,
          conversationId: null,
          action: "skipped_no_conversation",
          stepKey: null,
          nextFollowUpAt: lead.nextFollowUpAt ? lead.nextFollowUpAt.getTime() : null,
          messagePreview: "",
        });
        continue;
      }

      // Track which steps already sent: lead.ai.followups.sentStepKeys
      const aiObj = (lead.ai ?? {}) as any;
            // ✅ Human takeover: do not send followups
      if (aiObj?.handoffEnabled) {
        skipped++;
        items.push({
          leadId: lead.id,
          leadName: lead.name,
          conversationId: conv.id,
          action: "skipped_no_steps", // (or create a new action type if you want)
          stepKey: null,
          nextFollowUpAt: lead.nextFollowUpAt ? lead.nextFollowUpAt.getTime() : null,
          messagePreview: "Skipped (human takeover)",
        });
        continue;
      }

      const followups = (aiObj.followups ?? {}) as any;
      const sentStepKeys: string[] = Array.isArray(followups.sentStepKeys) ? followups.sentStepKeys : [];

      const nextStep = steps.find((s) => !sentStepKeys.includes(s.stepKey));

      if (!nextStep) {
        // No steps left -> clear schedule
        if (!dryRun) {
          await acPrisma.acLead.update({
            where: { id: lead.id },
            data: {
              nextFollowUpAt: null,
              ai: {
                ...aiObj,
                followups: {
                  ...followups,
                  done: true,
                  doneAt: now.getTime(),
                  sentStepKeys,
                },
              },
            },
          });
        }

        skipped++;
        items.push({
          leadId: lead.id,
          leadName: lead.name,
          conversationId: conv.id,
          action: "skipped_no_steps",
          stepKey: null,
          nextFollowUpAt: null,
          messagePreview: "",
        });
        continue;
      }

      // ✅ from here, nextStep is guaranteed defined
      const msgText = renderTemplate(nextStep.message, {
        name: lead.name,
        businessName: business?.businessName ?? "Your Business",
      });

      const thisIndex = steps.findIndex((s) => s.stepKey === nextStep.stepKey);
      const nextAfterThis = thisIndex >= 0 ? steps[thisIndex + 1] : undefined;

      const nextFollowUpAtDate = nextAfterThis
        ? new Date(now.getTime() + nextAfterThis.afterHours * 60 * 60 * 1000)
        : null;

      if (!dryRun) {
        await acPrisma.$transaction(async (tx: Tx) => {
          await tx.acMessage.create({
            data: {
              tenantId,
              conversationId: conv.id,
              at: now,
              from: "ai",
              text: msgText,
            },
          });

          // NOTE: followup AI should bump unread by 1 (operator should see it)
          await tx.acConversation.update({
            where: { tenantId_id: { tenantId, id: conv.id } },
            data: {
              lastAt: now,
              unreadCount: { increment: 1 },
            },
          });

          const newSent = Array.from(new Set([...sentStepKeys, nextStep.stepKey]));

          await tx.acLead.update({
            where: { id: lead.id },
            data: {
              nextFollowUpAt: nextFollowUpAtDate,
              ai: {
                ...aiObj,
                followups: {
                  ...followups,
                  lastSentAt: now.getTime(),
                  lastStepKey: nextStep.stepKey,
                  sentStepKeys: newSent,
                },
              },
            },
          });
        });
      }

      sent++;
      items.push({
        leadId: lead.id,
        leadName: lead.name,
        conversationId: conv.id,
        action: "sent",
        stepKey: nextStep.stepKey,
        nextFollowUpAt: nextFollowUpAtDate ? nextFollowUpAtDate.getTime() : null,
        messagePreview: preview(msgText),
      });
    }

    return NextResponse.json({
      ok: true,
      tenantId,
      now: now.getTime(),
      dryRun,
      dueLeads: leads.length,
      processed: leads.length,
      sent,
      skipped,
      items,
    } satisfies RunFollowupsResponse);
  } catch (error) {
    console.error("POST followups/run error:", error);
    return NextResponse.json({ ok: false, error: "Failed to run followups" } satisfies RunFollowupsResponse, {
      status: 500,
    });
  }
}
