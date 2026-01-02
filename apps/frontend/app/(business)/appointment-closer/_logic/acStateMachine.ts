// apps/frontend/app/(business)/appointment-closer/_logic/acStateMachine.ts

import type {
  AcState,
  Lead,
  Conversation,
  Settings,
  AiMeta,
  AiMode,
  LeadStage,
  Service,
  FAQ,
  QualQ,
} from "../_store/acStore";

export type MachineInput = {
  state: AcState;
  lead: Lead;
  conv: Conversation;
};

export type MachineOutput = {
  nextAi: Partial<AiMeta>;
  draftReply?: string;
  nextLeadStage?: LeadStage;
  shouldCreateAppointment?: {
    service: string;
    startAt: number;
    durationMin: number;
  };
  shouldRescheduleLatestAppointment?: { leadId: string; newStartAt: number };
  shouldCancelLatestAppointment?: { leadId: string };
  shouldScheduleFollowupAt?: number;
};

/** -------------------------
 * Helpers (small + predictable)
 * -------------------------- */

function lastMessage(conv: Conversation) {
  return conv.messages[conv.messages.length - 1] ?? null;
}

function lastLeadMessage(conv: Conversation) {
  for (let i = conv.messages.length - 1; i >= 0; i--) {
    if (conv.messages[i]?.from === "lead") return conv.messages[i]!;
  }
  return null;
}

function normalize(s: string) {
  return (s ?? "").trim().toLowerCase();
}

function includesAny(text: string, needles: string[]) {
  const t = normalize(text);
  return needles.some((n) => t.includes(n));
}

/** -------------------------
 * Policy: mode switching brain
 * -------------------------- */

function channelRiskMultiplier(channel: Conversation["channel"]) {
  switch (channel) {
    case "WhatsApp":
      return 1.25;
    case "Facebook":
      return 1.1;
    case "IG":
      return 1.05;
    case "Website":
    default:
      return 1.0;
  }
}

type ModeDecision = {
  mode: AiMode;
  reason?: string;
  confidence?: number; // 0..1
};

/**
 * Decide mode from last lead message + channel + prior mode.
 *
 * Rules:
 * - takeover: hard stop (no auto resume unless explicit de-escalation)
 * - review: draft-only (auto can resume later if safe)
 * - auto: normal
 */
function decideMode(params: {
  channel: Conversation["channel"];
  lastLeadText: string;
  prevMode: AiMode;
  nowMs: number;
  lastHumanAt?: number;
}): ModeDecision {
  const { channel, lastLeadText, prevMode, nowMs, lastHumanAt } = params;
  const t = normalize(lastLeadText);
  const mult = channelRiskMultiplier(channel);

  // Hard risk -> takeover
  const takeoverTriggers = [
    "lawsuit",
    "sue",
    "attorney",
    "lawyer",
    "legal action",
    "police",
    "fraud",
    "scam",
    "chargeback",
    "unauthorized",
    "stolen",
    "threat",
    "kill",
    "die",
    "hurt you",
  ];

  // Soft risk -> review
  const reviewTriggers = [
    "refund",
    "charge",
    "invoice",
    "complaint",
    "not happy",
    "bad service",
    "what do you mean",
    "doesn't make sense",
    "confused",
    "too expensive",
    "angry",
  ];

  // Explicit de-escalation phrases (resume gate from takeover -> review)
  const deEscalate = [
    "sorry",
    "my bad",
    "ok let's book",
    "ok lets book",
    "just want to book",
    "just want to schedule",
    "no need for agent",
    "no need for an agent",
    "let’s schedule",
    "lets schedule",
  ];

  // If already takeover: never auto-resume unless explicit de-escalation
  if (prevMode === "takeover") {
    if (includesAny(t, deEscalate)) {
      return {
        mode: "review",
        reason: "De-escalation detected; moving to human review",
        confidence: Math.min(1, 0.7 * mult),
      };
    }
    return { mode: "takeover", reason: "Takeover locked (high risk)", confidence: 1.0 };
  }

  // If a human replied recently, prefer review (avoid AI stepping on operator)
  if (lastHumanAt && nowMs - lastHumanAt < 10 * 60_000) {
    return { mode: "review", reason: "Recent human reply; draft-only", confidence: Math.min(1, 0.8 * mult) };
  }

  // Hard risk
  if (includesAny(t, takeoverTriggers)) {
    return {
      mode: "takeover",
      reason: "High-risk content detected (legal/threat/payment escalation)",
      confidence: Math.min(1, 0.9 * mult),
    };
  }

  // Soft risk
  if (includesAny(t, reviewTriggers)) {
    return {
      mode: "review",
      reason: "Soft-risk content detected; human review recommended",
      confidence: Math.min(1, 0.75 * mult),
    };
  }

  return { mode: "auto", reason: undefined, confidence: Math.min(1, 0.85 * mult) };
}

function pickEnabledService(settings: Settings): Service | null {
  const enabled = settings.services.filter((s) => s.enabled);
  return enabled[0] ?? settings.services[0] ?? null;
}

function pickFaqMatch(settings: Settings, text: string): FAQ | null {
  const t = normalize(text);
  const enabled = settings.faqs.filter((f) => f.enabled);
  for (const faq of enabled) {
    const words = normalize(faq.q)
      .split(/\s+/)
      .map((w) => w.replace(/[^\w]/g, ""))
      .filter((w) => w.length >= 4);
    if (words.some((w) => t.includes(w))) return faq;
  }
  return null;
}

function extractTimeOfDay(text: string): AiMeta["preferredTimeOfDay"] | undefined {
  const t = normalize(text);
  if (includesAny(t, ["morning", "am"])) return "morning";
  if (includesAny(t, ["afternoon"])) return "afternoon";
  if (includesAny(t, ["evening", "pm", "tonight"])) return "evening";
  return undefined;
}

function extractPreferredDay(text: string): string | undefined {
  const t = normalize(text);
  const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  for (const d of days) if (t.includes(d)) return d.slice(0, 3);
  const short = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
  for (const s of short) if (t.includes(s)) return s;
  return undefined;
}

function extractServiceInterest(settings: Settings, text: string): string | undefined {
  const t = normalize(text);
  const services = settings.services.filter((s) => s.enabled);
  for (const s of services) {
    const name = normalize(s.name);
    if (t.includes(name)) return s.name;
    const words = name.split(/\s+/).filter((w) => w.length >= 4);
    if (words.some((w) => t.includes(w))) return s.name;
  }
  if (includesAny(t, ["consult", "consultation"])) return "Consultation";
  return undefined;
}

function detectIntent(text: string) {
  const t = normalize(text);
  return {
    wantsPricing: includesAny(t, ["price", "pricing", "cost", "how much", "$", "rate"]),
    wantsAvailability: includesAny(t, ["availability", "openings", "available", "tomorrow", "today", "this week", "schedule"]),
    wantsBook: includesAny(t, ["book", "reserve", "appointment", "slot", "set up", "schedule me"]),
    wantsReschedule: includesAny(t, ["reschedule", "move my appointment", "change time", "change my appointment"]),
    wantsCancel: includesAny(t, ["cancel", "cancellation", "call off"]),
    gaveConfirmation: includesAny(t, ["yes", "confirm", "sounds good", "that works", "perfect", "ok", "okay"]),
    gaveNo: includesAny(t, ["no", "not", "can't", "cannot", "won't", "doesn't work"]),
  };
}

function proposeNextSlot(settings: Settings, nowMs: number, pref?: AiMeta["preferredTimeOfDay"]) {
  const hours = settings.hours;
  const order = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as const;

  const prefTimes: Record<NonNullable<AiMeta["preferredTimeOfDay"]>, string[]> = {
    morning: ["10:00", "11:00"],
    afternoon: ["14:00", "15:00"],
    evening: ["17:00"],
  };

  const fallbackTimes = ["10:00", "14:00", "15:00"];

  function parseHHMM(hhmm: string) {
    const [hh, mm] = hhmm.split(":").map((x) => Number(x));
    return { hh, mm };
  }

  const base = new Date(nowMs);
  base.setDate(base.getDate() + 1);
  base.setHours(0, 0, 0, 0);

  for (let i = 0; i < Math.max(1, settings.booking.maxDaysAhead); i++) {
    const d = new Date(base);
    d.setDate(base.getDate() + i);

    const dow = d.getDay();
    const key = order[(dow + 6) % 7];
    const dayHours = hours[key];
    if (!dayHours?.enabled) continue;

    const choices = pref ? prefTimes[pref] : fallbackTimes;

    for (const hhmm of choices) {
      const { hh, mm } = parseHHMM(hhmm);
      const slot = new Date(d);
      slot.setHours(hh, mm, 0, 0);

      const open = dayHours.open;
      const close = dayHours.close;

      if (hhmm < open) continue;
      if (hhmm >= close) continue;

      return slot.getTime();
    }
  }

  return null;
}

function buildPricingReply(settings: Settings) {
  const services = settings.services.filter((s) => s.enabled);
  if (!services.length) return `Sure — what service are you looking for, and what day/time works best?`;

  const lines = services.map((s) => `• ${s.name}: from $${s.priceFrom} (${s.durationMin} min)`);
  return `Sure — here’s pricing to get started:\n${lines.join("\n")}\n\nWhat service do you want, and what day/time works best?`;
}

function buildQualifyingReply(settings: Settings) {
  const qs: QualQ[] = (settings.qualQs ?? []).filter((q) => q.enabled);
  if (!qs.length) {
    return `Quick questions so I can book you correctly:\n1) What service do you need?\n2) What day/time works best?\n3) Any special notes or budget range?`;
  }
  const list = qs.map((q, idx) => `${idx + 1}) ${q.question}${q.required ? "" : " (optional)"}`);
  return `Quick questions so I can book you correctly:\n${list.join("\n")}`;
}

function buildProposeTimesReply(service: string, startAt: number, durationMin: number) {
  const when = new Date(startAt).toLocaleString([], {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return `I can book you for **${service}** (${durationMin} min).\n\nHow does **${when}** look? Reply “yes” to confirm or tell me a better day/time.`;
}

/** -------------------------
 * State Machine (v1 + policy)
 * -------------------------- */
export function runAcStateMachine(input: MachineInput, nowMs: number = Date.now()): MachineOutput {
  const { lead, conv } = input;
  const settings = input.state.settings;

  const leadMsg = lastLeadMessage(conv);
  const last = lastMessage(conv);
  const leadText = leadMsg?.text ?? "";

  // --- policy decision (mode) ---
  const prevMode: AiMode = lead.ai?.mode ?? "auto";

  const policy = leadMsg
    ? decideMode({
        channel: conv.channel,
        lastLeadText: leadText,
        prevMode,
        nowMs,
        lastHumanAt: lead.ai?.lastHumanAt,
      })
    : { mode: prevMode, reason: lead.ai?.modeReason, confidence: lead.ai?.confidence };

  const policyPatch: Partial<AiMeta> = {
    mode: policy.mode,
    modeReason: policy.reason,
    confidence: policy.confidence,
  };

  // Takeover = hard stop (no drafts)
  if (policy.mode === "takeover") {
    return {
      nextAi: { ...policyPatch, mode: "takeover", state: "handoff_human", updatedAt: nowMs },
    };
  }

  // If there is no last message, keep minimal defaults
  if (!last) {
    return {
      nextAi: { ...policyPatch, state: lead.ai?.state ?? "inbox_new", updatedAt: nowMs },
    };
  }

  const intent = detectIntent(leadText);
  const currentAiState = lead.ai?.state ?? "inbox_new";

  const serviceInterest = extractServiceInterest(settings, leadText) ?? lead.ai?.serviceInterest;
  const preferredDay = extractPreferredDay(leadText) ?? lead.ai?.preferredDay;
  const preferredTimeOfDay = extractTimeOfDay(leadText) ?? lead.ai?.preferredTimeOfDay;

  const faq = leadMsg ? pickFaqMatch(settings, leadText) : null;

  // -------------------------
  // Cancel flow
  // -------------------------
  if (currentAiState === "cancel" && leadMsg) {
    if (intent.gaveConfirmation) {
      return {
        nextAi: {
          ...policyPatch,
          state: "inbox_new",
          updatedAt: nowMs,
          serviceInterest,
          preferredDay,
          preferredTimeOfDay,
          proposed: null,
        } as any,
        nextLeadStage: "Qualified",
        shouldCancelLatestAppointment: { leadId: lead.id },
        draftReply: `Done — I’ve canceled it ✅\n\nIf you want, I can help you book a new time.`,
      };
    }

    if (intent.wantsReschedule) {
      const startAt = proposeNextSlot(settings, nowMs, preferredTimeOfDay);
      if (startAt) {
        const service = serviceInterest ?? pickEnabledService(settings)?.name ?? "Consultation";
        const durationMin = pickEnabledService(settings)?.durationMin ?? 30;

        return {
          nextAi: {
            ...policyPatch,
            state: "reschedule",
            updatedAt: nowMs,
            serviceInterest: service,
            preferredDay,
            preferredTimeOfDay,
            lastSuggestedAt: startAt,
            proposed: { service, startAt, durationMin },
          } as any,
          draftReply: buildProposeTimesReply(service, startAt, durationMin),
        };
      }

      return {
        nextAi: { ...policyPatch, state: "reschedule", updatedAt: nowMs, serviceInterest, preferredDay, preferredTimeOfDay } as any,
        draftReply: `Sure — what day works best, and do you prefer morning or afternoon?`,
      };
    }

    return {
      nextAi: { ...policyPatch, state: "cancel", updatedAt: nowMs, serviceInterest, preferredDay, preferredTimeOfDay } as any,
      draftReply: `To confirm: reply “yes” to cancel your appointment, or say “reschedule” to move it.`,
    };
  }

  if (intent.wantsCancel) {
    return {
      nextAi: { ...policyPatch, state: "cancel", updatedAt: nowMs, serviceInterest, preferredDay, preferredTimeOfDay } as any,
      draftReply: `No problem — reply “yes” to confirm cancellation, or say “reschedule” to move it to another time.`,
    };
  }

  // -------------------------
  // Reschedule flow
  // -------------------------
  if (currentAiState === "reschedule" && leadMsg) {
    const proposed = (lead.ai as any)?.proposed as { service: string; startAt: number; durationMin: number } | undefined;
    const suggested = proposed?.startAt ?? lead.ai?.lastSuggestedAt;

    if (intent.gaveConfirmation && suggested) {
      return {
        nextAi: {
          ...policyPatch,
          state: "booked",
          updatedAt: nowMs,
          serviceInterest,
          preferredDay,
          preferredTimeOfDay,
          lastSuggestedAt: suggested,
          proposed: null,
        } as any,
        nextLeadStage: "Booked",
        shouldRescheduleLatestAppointment: { leadId: lead.id, newStartAt: suggested },
        draftReply: `Perfect — I’ve moved it ✅\n\nAnything else you’d like to adjust?`,
      };
    }

    const startAt = proposeNextSlot(settings, nowMs, preferredTimeOfDay);
    if (startAt) {
      const service = serviceInterest ?? pickEnabledService(settings)?.name ?? "Consultation";
      const durationMin = pickEnabledService(settings)?.durationMin ?? 30;

      return {
        nextAi: {
          ...policyPatch,
          state: "reschedule",
          updatedAt: nowMs,
          serviceInterest: service,
          preferredDay,
          preferredTimeOfDay,
          lastSuggestedAt: startAt,
          proposed: { service, startAt, durationMin },
        } as any,
        draftReply: buildProposeTimesReply(service, startAt, durationMin),
      };
    }

    return {
      nextAi: { ...policyPatch, state: "reschedule", updatedAt: nowMs, serviceInterest, preferredDay, preferredTimeOfDay } as any,
      draftReply: `Sure — what day works best, and do you prefer morning, afternoon, or evening?`,
    };
  }

  if (intent.wantsReschedule) {
    const startAt = proposeNextSlot(settings, nowMs, preferredTimeOfDay);
    if (startAt) {
      const service = serviceInterest ?? pickEnabledService(settings)?.name ?? "Consultation";
      const durationMin = pickEnabledService(settings)?.durationMin ?? 30;

      return {
        nextAi: {
          ...policyPatch,
          state: "reschedule",
          updatedAt: nowMs,
          serviceInterest: service,
          preferredDay,
          preferredTimeOfDay,
          lastSuggestedAt: startAt,
          proposed: { service, startAt, durationMin },
        } as any,
        draftReply: buildProposeTimesReply(service, startAt, durationMin),
      };
    }

    return {
      nextAi: { ...policyPatch, state: "reschedule", updatedAt: nowMs, serviceInterest, preferredDay, preferredTimeOfDay } as any,
      draftReply: `Sure — what day works best, and do you prefer morning or afternoon?`,
    };
  }

  // -------------------------
  // FAQ / Pricing
  // -------------------------
  if (faq) {
    return {
      nextAi: { ...policyPatch, state: "faq_or_pricing", updatedAt: nowMs, serviceInterest, preferredDay, preferredTimeOfDay } as any,
      nextLeadStage: lead.stage === "New" ? "Qualified" : undefined,
      draftReply: `${faq.a}\n\nTo get you booked: what service do you need, and what day/time works best?`,
    };
  }

  if (intent.wantsPricing) {
    return {
      nextAi: { ...policyPatch, state: "faq_or_pricing", updatedAt: nowMs, serviceInterest, preferredDay, preferredTimeOfDay } as any,
      nextLeadStage: lead.stage === "New" ? "Qualified" : undefined,
      draftReply: buildPricingReply(settings),
    };
  }

  // -------------------------
  // Availability / Booking -> PROPOSE -> AWAIT CONFIRM
  // -------------------------
  if (intent.wantsAvailability || intent.wantsBook) {
    const service = serviceInterest ?? pickEnabledService(settings)?.name ?? "Consultation";
    const durationMin = pickEnabledService(settings)?.durationMin ?? 30;

    const startAt = proposeNextSlot(settings, nowMs, preferredTimeOfDay);
    if (startAt) {
      return {
        nextAi: {
          ...policyPatch,
          state: "awaiting_confirmation",
          updatedAt: nowMs,
          serviceInterest: service,
          preferredDay,
          preferredTimeOfDay,
          lastSuggestedAt: startAt,
          proposed: { service, startAt, durationMin },
        } as any,
        nextLeadStage: lead.stage === "New" ? "Qualified" : undefined,
        draftReply: buildProposeTimesReply(service, startAt, durationMin),
      };
    }

    return {
      nextAi: { ...policyPatch, state: "qualifying", updatedAt: nowMs, serviceInterest, preferredDay, preferredTimeOfDay } as any,
      nextLeadStage: lead.stage === "New" ? "Qualified" : undefined,
      draftReply: buildQualifyingReply(settings),
    };
  }

  // -------------------------
  // Awaiting confirmation -> confirm -> create appointment
  // -------------------------
  if (currentAiState === "awaiting_confirmation" && leadMsg) {
    const proposed = (lead.ai as any)?.proposed as { service: string; startAt: number; durationMin: number } | undefined;

    if (intent.gaveConfirmation && proposed?.startAt) {
      return {
        nextAi: {
          ...policyPatch,
          state: "booked",
          updatedAt: nowMs,
          serviceInterest: proposed.service,
          lastSuggestedAt: proposed.startAt,
          proposed: null,
        } as any,
        nextLeadStage: "Booked",
        shouldCreateAppointment: { service: proposed.service, startAt: proposed.startAt, durationMin: proposed.durationMin },
        draftReply: `Perfect — you’re booked ✅\n\nIf you need to reschedule later, just tell me.`,
      };
    }

    if (intent.gaveNo) {
      return {
        nextAi: { ...policyPatch, state: "proposing_times", updatedAt: nowMs, serviceInterest, preferredDay, preferredTimeOfDay, proposed: null } as any,
        draftReply: `No worries — what day works better, and do you prefer morning or afternoon?`,
      };
    }
  }

  // Default
  return {
    nextAi: { ...policyPatch, state: "qualifying", updatedAt: nowMs, serviceInterest, preferredDay, preferredTimeOfDay } as any,
    nextLeadStage: lead.stage === "New" ? "Qualified" : undefined,
    draftReply: `Got it — to book you correctly: what service do you need, and what day/time works best?`,
  };
}
