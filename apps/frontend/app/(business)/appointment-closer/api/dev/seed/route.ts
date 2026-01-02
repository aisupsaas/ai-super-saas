// apps/frontend/app/(business)/appointment-closer/api/dev/seed/route.ts

import { NextResponse } from "next/server";
import { acPrisma } from "@/app/(business)/appointment-closer/_db/acPrisma";

const TENANT_ID = "t_demo";

export async function POST() {
  try {
    const now = Date.now();

    // --- Demo content for settings JSON blobs ---
    const servicesJson = [
      { id: "svc_consult", name: "Consultation", enabled: true, durationMin: 30, price: 50 },
      { id: "svc_hair", name: "Hair", enabled: true, durationMin: 60, price: 120 },
      { id: "svc_facial", name: "Facial", enabled: true, durationMin: 45, price: 95 },
      { id: "svc_fitness", name: "Fitness Session", enabled: true, durationMin: 60, price: 80 },
    ];

    const faqsJson = [
      { q: "Where are you located?", a: "We’re located in Midtown Manhattan. Exact address is shared after booking." },
      { q: "Do you take same-day appointments?", a: "Sometimes — depends on availability. Tell me your preferred time." },
      { q: "What is your cancellation policy?", a: "Please cancel or reschedule at least 12 hours before your slot." },
    ];

    const qualQsJson = [
      { key: "service", question: "Which service do you need?", required: true },
      { key: "date", question: "What day works best for you?", required: true },
      { key: "time", question: "What time window do you prefer?", required: true },
      { key: "notes", question: "Anything we should know before the appointment?", required: false },
    ];

      // 1) Upsert settings and ensure json blobs exist
      const settings = await acPrisma.acSettings.upsert({
        where: { tenantId: TENANT_ID },
        update: {
          businessName: "Demo Business",
          timezone: "America/New_York",
          servicesJson,
          faqsJson,
          qualQsJson,
        },
        create: {
          tenantId: TENANT_ID,
          businessName: "Demo Business",
          timezone: "America/New_York",
          servicesJson,
          faqsJson,
          qualQsJson,
        },
        select: { id: true, tenantId: true },
      });

    // Seed follow-up steps (idempotent)
    await acPrisma.acFollowupStep.upsert({
      where: { tenantId_settingsId_stepKey: { tenantId: TENANT_ID, settingsId: settings.id, stepKey: "f1" } },
      update: {
        afterHours: 2,
        sortOrder: 1,
        enabled: true,
        message: "Hi {{name}} 👋 Just checking in — did you want to book a {{businessName}} appointment?",
      },
      create: {
        tenantId: TENANT_ID,
        settingsId: settings.id,
        stepKey: "f1",
        afterHours: 2,
        sortOrder: 1,
        enabled: true,
        message: "Hi {{name}} 👋 Just checking in — did you want to book a {{businessName}} appointment?",
      },
    });

    await acPrisma.acFollowupStep.upsert({
      where: { tenantId_settingsId_stepKey: { tenantId: TENANT_ID, settingsId: settings.id, stepKey: "f2" } },
      update: {
        afterHours: 24,
        sortOrder: 2,
        enabled: true,
        message: "Quick follow-up, {{name}} — what service do you need and what time works best?",
      },
      create: {
        tenantId: TENANT_ID,
        settingsId: settings.id,
        stepKey: "f2",
        afterHours: 24,
        sortOrder: 2,
        enabled: true,
        message: "Quick follow-up, {{name}} — what service do you need and what time works best?",
      },
    });

    await acPrisma.acFollowupStep.upsert({
      where: { tenantId_settingsId_stepKey: { tenantId: TENANT_ID, settingsId: settings.id, stepKey: "f3" } },
      update: {
        afterHours: 72,
        sortOrder: 3,
        enabled: true,
        message:
          "Last note from {{businessName}} — if you still want an appointment, reply with a day/time and I’ll lock it in.",
      },
      create: {
        tenantId: TENANT_ID,
        settingsId: settings.id,
        stepKey: "f3",
        afterHours: 72,
        sortOrder: 3,
        enabled: true,
        message:
          "Last note from {{businessName}} — if you still want an appointment, reply with a day/time and I’ll lock it in.",
      },
    });

    // Helper to upsert a lead (now supports forcing nextFollowUpAt for tests)
    async function upsertLead(
      id: string,
      name: string,
      stage: "New" | "Qualified" | "Booked",
      opts?: { nextFollowUpAtMs?: number | null }
    ) {
      const nextFollowUpAt =
        typeof opts?.nextFollowUpAtMs === "number"
          ? new Date(opts.nextFollowUpAtMs)
          : opts?.nextFollowUpAtMs === null
            ? null
            : undefined;

      return acPrisma.acLead.upsert({
        where: { tenantId_id: { tenantId: TENANT_ID, id } },
        update: {
          name,
          stage,
          ...(nextFollowUpAt !== undefined ? { nextFollowUpAt } : {}),
        },
        create: {
          id,
          tenantId: TENANT_ID,
          name,
          stage,
          ...(nextFollowUpAt !== undefined ? { nextFollowUpAt } : {}),
        },
        select: { id: true },
      });
    }

    // Helper to upsert a conversation
    async function upsertConversation(params: {
      id: string;
      leadId: string;
      channel: string;
      unreadCount: number;
      lastAtMs: number;
    }) {
      return acPrisma.acConversation.upsert({
        where: { tenantId_id: { tenantId: TENANT_ID, id: params.id } },
        update: {
          channel: params.channel,
          unreadCount: params.unreadCount,
          lastAt: new Date(params.lastAtMs),
        },
        create: {
          id: params.id,
          tenantId: TENANT_ID,
          leadId: params.leadId,
          channel: params.channel,
          unreadCount: params.unreadCount,
          lastAt: new Date(params.lastAtMs),
        },
        select: { id: true },
      });
    }

    // Helper to upsert a message (idempotent by (tenantId,id))
    async function upsertMessage(params: {
      id: string;
      conversationId: string;
      atMs: number;
      from: "lead" | "ai" | "human";
      text: string;
    }) {
      return acPrisma.acMessage.upsert({
        where: { tenantId_id: { tenantId: TENANT_ID, id: params.id } },
        update: {
          at: new Date(params.atMs),
          from: params.from,
          text: params.text,
        },
        create: {
          id: params.id,
          tenantId: TENANT_ID,
          conversationId: params.conversationId,
          at: new Date(params.atMs),
          from: params.from,
          text: params.text,
        },
        select: { id: true },
      });
    }

    // 2) Seed demo leads
    // ✅ Sarah is forced "due" (1 minute ago) so followups/run has something to process
    const leadSarah = await upsertLead("lead_sarah", "Sarah Lee", "New", { nextFollowUpAtMs: now - 60_000 });
    const leadNadia = await upsertLead("lead_nadia", "Nadia R.", "Qualified");
    const leadChris = await upsertLead("lead_chris", "Chris K.", "Booked");

    // 3) Seed conversations
    const t1 = now - 60 * 60 * 1000; // 1h ago
    const t2 = now - 2 * 60 * 60 * 1000; // 2h ago
    const t3 = now - 3 * 60 * 60 * 1000; // 3h ago

    await upsertConversation({ id: "conv_sarah", leadId: leadSarah.id, channel: "IG", unreadCount: 1, lastAtMs: t1 });
    await upsertConversation({
      id: "conv_nadia",
      leadId: leadNadia.id,
      channel: "WhatsApp",
      unreadCount: 2,
      lastAtMs: t2,
    });
    await upsertConversation({
      id: "conv_chris",
      leadId: leadChris.id,
      channel: "Website",
      unreadCount: 0,
      lastAtMs: t3,
    });

    // 4) Seed messages (one each)
    await upsertMessage({
      id: "m_sarah_1",
      conversationId: "conv_sarah",
      atMs: t1 - 7 * 60 * 1000,
      from: "lead",
      text: "Hi! Are you taking new clients this week?",
    });

    await upsertMessage({
      id: "m_nadia_1",
      conversationId: "conv_nadia",
      atMs: t2,
      from: "lead",
      text: "Any openings tomorrow?",
    });

    await upsertMessage({
      id: "m_chris_1",
      conversationId: "conv_chris",
      atMs: t3,
      from: "lead",
      text: "Can I reschedule my appointment?",
    });

    return NextResponse.json({
      ok: true,
      tenantId: TENANT_ID,
      settingsId: settings.id,
      seeded: true,
      settingsUpdated: true,
    });
  } catch (error: any) {
  console.error("SEED ERROR:", error);

  return NextResponse.json(
    {
      ok: false,
      error: "Seed failed",
      debug: {
        name: error?.name,
        code: error?.code,
        message: error?.message,
        meta: error?.meta,
        stack: String(error?.stack ?? "").split("\n").slice(0, 12),
      },
    },
    { status: 500 }
  );
  }
}
