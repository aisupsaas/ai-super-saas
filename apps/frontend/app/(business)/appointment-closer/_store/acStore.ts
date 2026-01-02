"use client";

import { useSyncExternalStore } from "react";

/** -------------------------
 * Types
 * -------------------------- */
export type LeadStage = "New" | "Qualified" | "Booked" | "Cold" | "Won" | "Lost";

export type Message = {
  id: string;
  at: number; // unix ms
  from: "lead" | "ai" | "human";
  text: string;
};

export type Conversation = {
  id: string;
  leadId: string;
  channel: "IG" | "WhatsApp" | "Facebook" | "Website";
  unreadCount: number;
  lastAt: number;
  messages: Message[];
};

/** -------------------------
 * AI Conversation State
 * -------------------------- */
export type AiState =
  | "inbox_new"
  | "faq_or_pricing"
  | "qualifying"
  | "proposing_times"
  | "awaiting_confirmation"
  | "booked"
  | "reschedule"
  | "cancel"
  | "followup_pending"
  | "handoff_human";

/** policy mode (no buttons) */
export type AiMode = "auto" | "review" | "takeover";

/** ✅ Step 4: followup draft stored on lead.ai */
export type FollowupDraft = {
  text: string;
  stepId: string;
  createdAt: number;
};

/** ✅ Step 4 scheduling suggestions (store persisted) */
export type SuggestedSlot = {
  startAt: number; // ms
  endAt: number; // ms
  score: number; // 0..100
  reasons: string[]; // short explainable strings
};

export type AiMeta = {
  mode: AiMode;
  modeReason?: string;
  confidence?: number; // 0..1
  lastHumanAt?: number;

  state: AiState;
  updatedAt: number;

  // v1 memory
  serviceInterest?: string;
  preferredDay?: string;
  preferredTimeOfDay?: "morning" | "afternoon" | "evening";
  lastSuggestedAt?: number;
  lastFollowupStepId?: string;

  /** ✅ Step 4 */
  followupDraft?: FollowupDraft;
};

export type Lead = {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  stage: LeadStage;
  createdAt: number;
  updatedAt: number;
  nextFollowUpAt?: number;
  notes?: string;
  ai?: AiMeta;
};

export type Appointment = {
  id: string;
  leadId: string;
  service: string;
  startAt: number;
  durationMin: number;
  status: "Booked" | "Pending" | "Canceled";
};

export type Hours = Record<
  "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun",
  { open: string; close: string; enabled: boolean }
>;

export type Service = {
  id: string;
  name: string;
  priceFrom: number;
  durationMin: number;
  enabled: boolean;
};

export type FAQ = {
  id: string;
  q: string;
  a: string;
  enabled: boolean;
};

export type QualQ = {
  id: string;
  question: string;
  required: boolean;
  enabled: boolean;
};

export type FollowupStep = {
  id: string;
  afterHours: number;
  message: string;
  enabled: boolean;
};

export type Settings = {
  businessName: string;
  timezone: string;
  hours: Hours;
  services: Service[];
  faqs: FAQ[];
  qualQs: QualQ[];
  booking: {
    slotMinutes: number;
    bufferMinutes: number;
    maxDaysAhead: number;
    allowReschedule: boolean;
    allowCancel: boolean;
  };
  followups: {
    coldLeadAfterHours: number;
    sequence: FollowupStep[];
  };
};

/** -------------------------
 * ✅ UI State (Step 4)
 * (kept separate from domain state; safe to change frequently)
 * -------------------------- */
export type SchedulingUiState = {
  slotSuggestionForDay: string | null; // "YYYY-MM-DD"
  slotSuggestionDurationMin: number;
  slotSuggestions: SuggestedSlot[];
};

export type UiState = {
  scheduling: SchedulingUiState;
};

export type AcState = {
  version: 1;
  settings: Settings;
  leads: Lead[];
  conversations: Conversation[];
  appointments: Appointment[];

  /** ✅ Step 4 (optional for migration safety) */
  ui?: UiState;
};

/** -------------------------
 * LocalStorage
 * -------------------------- */
const LS_KEY = "aiac_state_v1";

function uid(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2)}_${Date.now()}`;
}

function startOfTodayMs() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

function defaultUiState(): UiState {
  return {
    scheduling: {
      slotSuggestionForDay: null,
      slotSuggestionDurationMin: 30,
      slotSuggestions: [],
    },
  };
}

function emptyState(): AcState {
  return {
    version: 1,
    settings: {
      businessName: "Your Business",
      timezone: "America/New_York",
      hours: {
        mon: { open: "09:00", close: "18:00", enabled: true },
        tue: { open: "09:00", close: "18:00", enabled: true },
        wed: { open: "09:00", close: "18:00", enabled: true },
        thu: { open: "09:00", close: "18:00", enabled: true },
        fri: { open: "09:00", close: "18:00", enabled: true },
        sat: { open: "10:00", close: "16:00", enabled: false },
        sun: { open: "10:00", close: "16:00", enabled: false },
      },
      services: [],
      faqs: [],
      qualQs: [],
      booking: {
        slotMinutes: 30,
        bufferMinutes: 10,
        maxDaysAhead: 30,
        allowReschedule: true,
        allowCancel: true,
      },
      followups: {
        coldLeadAfterHours: 24,
        sequence: [
          {
            id: "fu_1",
            afterHours: 2,
            enabled: true,
            message:
              "Hey! Quick follow-up 🙂 Do you want to book a time, or did you have any questions I can answer?",
          },
          {
            id: "fu_2",
            afterHours: 24,
            enabled: true,
            message:
              "Just checking in — I can share a couple available time options. What day works best for you?",
          },
          {
            id: "fu_3",
            afterHours: 48,
            enabled: true,
            message:
              "Last quick check-in — totally ok if now isn’t the right time. Want me to close this out or follow up later?",
          },
        ],
      },
    },
    leads: [],
    conversations: [],
    appointments: [],
    ui: defaultUiState(),
  };
}

// Stable snapshot for SSR
const SERVER_SNAPSHOT: AcState = emptyState();

/** -------------------------
 * Seed Data (client only)
 * -------------------------- */
function seedState(): AcState {
  const now = Date.now();
  const today0 = startOfTodayMs();

  const leads: Lead[] = [
    {
      id: "lead_sarah",
      name: "Sarah Lee",
      stage: "New",
      createdAt: now - 86_400_000,
      updatedAt: now - 600_000,
      nextFollowUpAt: now + 2 * 3_600_000,
      ai: { mode: "auto", state: "inbox_new", updatedAt: now },
    },
    {
      id: "lead_nadia",
      name: "Nadia R.",
      stage: "Qualified",
      createdAt: now - 172_800_000,
      updatedAt: now - 1_200_000,
      ai: { mode: "auto", state: "faq_or_pricing", updatedAt: now },
    },
    {
      id: "lead_chris",
      name: "Chris K.",
      stage: "Booked",
      createdAt: now - 604_800_000,
      updatedAt: now - 3_600_000,
      ai: { mode: "auto", state: "reschedule", updatedAt: now },
    },
  ];

  const conversations: Conversation[] = [
    {
      id: "conv_sarah",
      leadId: "lead_sarah",
      channel: "IG",
      unreadCount: 1,
      lastAt: now - 300_000,
      messages: [
        { id: uid("m"), at: now - 720_000, from: "lead", text: "Hi! Are you taking new clients this week?" },
      ],
    },
    {
      id: "conv_nadia",
      leadId: "lead_nadia",
      channel: "WhatsApp",
      unreadCount: 2,
      lastAt: now - 1_080_000,
      messages: [
        { id: uid("m"), at: now - 1_800_000, from: "lead", text: "How much for the full package?" },
        { id: uid("m"), at: now - 1_080_000, from: "lead", text: "Any openings tomorrow?" },
      ],
    },
    {
      id: "conv_chris",
      leadId: "lead_chris",
      channel: "Website",
      unreadCount: 0,
      lastAt: now - 2_520_000,
      messages: [
        { id: uid("m"), at: now - 3_600_000, from: "ai", text: "Sure — I can help reschedule. What time works best?" },
        { id: uid("m"), at: now - 2_520_000, from: "lead", text: "Can I reschedule my appointment?" },
      ],
    },
  ];

  const appointments: Appointment[] = [
    {
      id: "apt_1",
      leadId: "lead_chris",
      service: "Consultation",
      startAt: today0 + 10 * 3_600_000,
      durationMin: 30,
      status: "Booked",
    },
  ];

  return {
    version: 1,
    settings: emptyState().settings,
    leads,
    conversations,
    appointments,
    ui: defaultUiState(),
  };
}

function loadState(): AcState {
  if (typeof window === "undefined") return SERVER_SNAPSHOT;

  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) {
      const seeded = seedState();
      localStorage.setItem(LS_KEY, JSON.stringify(seeded));
      return seeded;
    }

    const parsed = JSON.parse(raw) as AcState;

    if (!parsed || parsed.version !== 1) {
      const seeded = seedState();
      localStorage.setItem(LS_KEY, JSON.stringify(seeded));
      return seeded;
    }

    // ✅ migration-safe: ensure ui exists for older snapshots
    if (!parsed.ui) parsed.ui = defaultUiState();
    if (!parsed.ui.scheduling) parsed.ui.scheduling = defaultUiState().scheduling;

    // ✅ also ensure suggestions fields exist
    if (parsed.ui.scheduling.slotSuggestionForDay === undefined) parsed.ui.scheduling.slotSuggestionForDay = null;
    if (parsed.ui.scheduling.slotSuggestionDurationMin === undefined)
      parsed.ui.scheduling.slotSuggestionDurationMin = 30;
    if (!Array.isArray(parsed.ui.scheduling.slotSuggestions)) parsed.ui.scheduling.slotSuggestions = [];

    return parsed;
  } catch {
    const seeded = seedState();
    localStorage.setItem(LS_KEY, JSON.stringify(seeded));
    return seeded;
  }
}

function saveState(s: AcState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(LS_KEY, JSON.stringify(s));
}

/** -------------------------
 * Store
 * -------------------------- */
let state: AcState = SERVER_SNAPSHOT;
let didClientInit = false;

const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

if (typeof window !== "undefined") {
  queueMicrotask(() => {
    if (!didClientInit) {
      didClientInit = true;
      state = loadState();
      emit();
    }
  });
}

function setState(updater: (prev: AcState) => AcState) {
  state = updater(state);
  saveState(state);
  emit();
}

export function getAcState() {
  return state;
}

export function subscribeAc(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useAcStore<T>(selector: (s: AcState) => T): T {
  return useSyncExternalStore(subscribeAc, () => selector(getAcState()), () => selector(SERVER_SNAPSHOT));
}

/** -------------------------
 * Policy helpers
 * -------------------------- */
export function isAiPaused(ai?: AiMeta | null) {
  return ai?.mode === "review" || ai?.mode === "takeover";
}

/** -------------------------
 * Actions
 * -------------------------- */
export const acActions = {
  resetToSeed() {
    setState(() => seedState());
  },

  saveSettings(next: Settings) {
    setState((prev) => ({ ...prev, settings: next }));
  },

  /** -------------------------
   * ✅ Step 4 — Scheduling suggestions (persisted)
   * -------------------------- */
  setSlotSuggestions(dayISO: string, durationMin: number, slots: SuggestedSlot[]) {
    setState((prev) => ({
      ...prev,
      ui: {
        ...(prev.ui ?? defaultUiState()),
        scheduling: {
          ...(prev.ui?.scheduling ?? defaultUiState().scheduling),
          slotSuggestionForDay: dayISO,
          slotSuggestionDurationMin: durationMin,
          slotSuggestions: slots,
        },
      },
    }));
  },

  clearSlotSuggestions() {
    setState((prev) => ({
      ...prev,
      ui: {
        ...(prev.ui ?? defaultUiState()),
        scheduling: {
          ...(prev.ui?.scheduling ?? defaultUiState().scheduling),
          slotSuggestionForDay: null,
          slotSuggestions: [],
        },
      },
    }));
  },

  /** ✅ Step 4 */
  setLeadFollowupDraft(leadId: string, draft: FollowupDraft) {
    const now = Date.now();
    setState((prev) => ({
      ...prev,
      leads: prev.leads.map((l) =>
        l.id === leadId
          ? {
              ...l,
              ai: {
                ...(l.ai ?? { mode: "auto", state: "inbox_new", updatedAt: now }),
                mode: l.ai?.mode ?? "auto",
                state: l.ai?.state ?? "inbox_new",
                updatedAt: now,
                followupDraft: draft,
              },
              updatedAt: now,
            }
          : l
      ),
    }));
  },

  /** ✅ Step 4 */
  clearLeadFollowupDraft(leadId: string) {
    const now = Date.now();
    setState((prev) => ({
      ...prev,
      leads: prev.leads.map((l) =>
        l.id === leadId
          ? {
              ...l,
              ai: l.ai ? { ...l.ai, followupDraft: undefined, updatedAt: now } : l.ai,
              updatedAt: now,
            }
          : l
      ),
    }));
  },

  /** Schedule first followup if none exists */
  ensureFirstFollowupScheduled(leadId: string) {
    const st = getAcState();
    const lead = st.leads.find((l) => l.id === leadId);
    if (!lead) return;

    if (isAiPaused(lead.ai)) return;
    if (lead.nextFollowUpAt) return;
    if (lead.stage === "Won" || lead.stage === "Lost") return;

    const steps = st.settings.followups.sequence.filter((s) => s.enabled);
    if (!steps.length) return;

    const first = steps[0];
    const at = Date.now() + first.afterHours * 3_600_000;

    acActions.scheduleLeadFollowup(leadId, at);
  },

  /** Leads */
  addLead(name: string, stage: LeadStage = "New"): string {
    const trimmed = name.trim();
    if (!trimmed) return "";

    const now = Date.now();
    const id = uid("lead");

    setState((prev) => ({
      ...prev,
      leads: [
        {
          id,
          name: trimmed,
          stage,
          createdAt: now,
          updatedAt: now,
          ai: { mode: "auto", state: "inbox_new", updatedAt: now },
        },
        ...prev.leads,
      ],
    }));

    return id;
  },

  ensureLeadByName(name: string, stageIfCreate: LeadStage = "New"): string {
    const trimmed = name.trim();
    if (!trimmed) return "";

    const existing = getAcState().leads.find((l) => l.name.trim().toLowerCase() === trimmed.toLowerCase());
    if (existing) return existing.id;

    return acActions.addLead(trimmed, stageIfCreate);
  },

  /** AI meta */
  setLeadAiMeta(leadId: string, patch: Partial<AiMeta>) {
    const now = Date.now();
    setState((prev) => ({
      ...prev,
      leads: prev.leads.map((l) =>
        l.id === leadId
          ? {
              ...l,
              ai: {
                mode: l.ai?.mode ?? "auto",
                state: l.ai?.state ?? "inbox_new",
                updatedAt: now,
                ...l.ai,
                ...patch,
              },
              updatedAt: now,
            }
          : l
      ),
    }));
  },

  moveLeadStage(leadId: string, stage: LeadStage) {
    const now = Date.now();
    setState((prev) => ({
      ...prev,
      leads: prev.leads.map((l) => (l.id === leadId ? { ...l, stage, updatedAt: now } : l)),
    }));
  },

  updateLeadNotes(leadId: string, notes: string) {
    const now = Date.now();
    setState((prev) => ({
      ...prev,
      leads: prev.leads.map((l) => (l.id === leadId ? { ...l, notes, updatedAt: now } : l)),
    }));
  },

  /** Conversations */
  markConversationRead(conversationId: string) {
    setState((prev) => ({
      ...prev,
      conversations: prev.conversations.map((c) => (c.id === conversationId ? { ...c, unreadCount: 0 } : c)),
    }));
  },

  addMessage(conversationId: string, from: Message["from"], text: string) {
    const at = Date.now();
    const t = text.trim();
    if (!t) return;

    setState((prev) => ({
      ...prev,
      conversations: prev.conversations.map((c) =>
        c.id !== conversationId
          ? c
          : {
              ...c,
              lastAt: at,
              unreadCount: from === "lead" ? c.unreadCount + 1 : c.unreadCount,
              messages: [...c.messages, { id: uid("m"), at, from, text: t }],
            }
      ),
    }));

    const conv = getAcState().conversations.find((c) => c.id === conversationId);
    if (conv) {
      acActions.clearLeadFollowupDraft(conv.leadId);
    }

    if (from === "lead") {
      if (conv) {
        acActions.clearLeadFollowup(conv.leadId);
        acActions.setLeadAiMeta(conv.leadId, { lastFollowupStepId: undefined });
      }
    }

    if (from === "human") {
      if (conv) acActions.setLeadAiMeta(conv.leadId, { lastHumanAt: at });
    }

    if (from === "ai") {
      if (conv) acActions.ensureFirstFollowupScheduled(conv.leadId);
    }
  },

  /** Appointments */
  createAppointment(leadId: string, service: string, startAt: number, durationMin: number) {
    const apt: Appointment = {
      id: uid("apt"),
      leadId,
      service: service.trim() || "Consultation",
      startAt,
      durationMin: Math.max(15, Math.floor(durationMin)),
      status: "Booked",
    };

    const now = Date.now();

    setState((prev) => ({
      ...prev,
      appointments: [apt, ...prev.appointments],
      leads: prev.leads.map((l) => (l.id === leadId ? { ...l, stage: "Booked", updatedAt: now } : l)),
    }));
  },

  setAppointmentStatus(appointmentId: string, status: Appointment["status"]) {
    setState((prev) => ({
      ...prev,
      appointments: prev.appointments.map((a) => (a.id === appointmentId ? { ...a, status } : a)),
    }));
  },

  rescheduleLatestAppointment(leadId: string, newStartAt: number) {
    const now = Date.now();
    setState((prev) => {
      const latest = prev.appointments
        .filter((a) => a.leadId === leadId && a.status !== "Canceled")
        .sort((a, b) => b.startAt - a.startAt)[0];

      if (!latest) return prev;

      return {
        ...prev,
        appointments: prev.appointments.map((a) =>
          a.id === latest.id ? { ...a, startAt: newStartAt, status: "Booked" } : a
        ),
        leads: prev.leads.map((l) => (l.id === leadId ? { ...l, stage: "Booked", updatedAt: now } : l)),
      };
    });
  },

  cancelLatestAppointment(leadId: string) {
    const now = Date.now();
    setState((prev) => {
      const latest = prev.appointments
        .filter((a) => a.leadId === leadId && a.status !== "Canceled")
        .sort((a, b) => b.startAt - a.startAt)[0];

      if (!latest) return prev;

      return {
        ...prev,
        appointments: prev.appointments.map((a) => (a.id === latest.id ? { ...a, status: "Canceled" } : a)),
        leads: prev.leads.map((l) =>
          l.id === leadId ? { ...l, stage: "Qualified", updatedAt: now, nextFollowUpAt: undefined } : l
        ),
      };
    });
  },

  /** -------------------------
   * Followups (v1 + Step 4 drafts)
   * -------------------------- */
  scheduleLeadFollowup(leadId: string, at: number) {
    const now = Date.now();
    setState((prev) => ({
      ...prev,
      leads: prev.leads.map((l) => (l.id === leadId ? { ...l, nextFollowUpAt: at, updatedAt: now } : l)),
    }));
  },

  clearLeadFollowup(leadId: string) {
    const now = Date.now();
    setState((prev) => ({
      ...prev,
      leads: prev.leads.map((l) => (l.id === leadId ? { ...l, nextFollowUpAt: undefined, updatedAt: now } : l)),
    }));
  },

  /** Runs due followups */
  runDueFollowups(nowMs: number = Date.now()) {
    setState((prev) => {
      const enabledSteps = (prev.settings.followups.sequence ?? []).filter((s) => s.enabled);
      if (!enabledSteps.length) return prev;

      const anyDue = prev.leads.some((l) => !!l.nextFollowUpAt && l.nextFollowUpAt <= nowMs);
      if (!anyDue) return prev;

      const convByLead = new Map(prev.conversations.map((c) => [c.leadId, c]));

      let conversations = prev.conversations;
      let leads = prev.leads;
      let changed = false;

      const addAiMsg = (conversationId: string, text: string) => {
        const at = nowMs;
        conversations = conversations.map((c) =>
          c.id !== conversationId
            ? c
            : {
                ...c,
                lastAt: at,
                unreadCount: c.unreadCount,
                messages: [...c.messages, { id: uid("m"), at, from: "ai" as const, text }],
              }
        );
        changed = true;
      };

      leads = leads.map((l) => {
        if (!l.nextFollowUpAt) return l;
        if (l.nextFollowUpAt > nowMs) return l;

        if (l.ai?.mode === "takeover") {
          changed = true;
          return { ...l, nextFollowUpAt: undefined, updatedAt: nowMs };
        }

        if (l.stage === "Won" || l.stage === "Lost") {
          changed = true;
          return { ...l, nextFollowUpAt: undefined, updatedAt: nowMs };
        }

        const conv = convByLead.get(l.id);
        if (!conv) {
          changed = true;
          return { ...l, nextFollowUpAt: undefined, updatedAt: nowMs };
        }

        const lastId = l.ai?.lastFollowupStepId;
        const idx = lastId ? enabledSteps.findIndex((s) => s.id === lastId) : -1;

        const nextStep = idx === -1 ? enabledSteps[0] : enabledSteps[idx + 1];
        if (!nextStep) {
          changed = true;
          return { ...l, nextFollowUpAt: undefined, updatedAt: nowMs };
        }

        if (l.ai?.mode === "review") {
          changed = true;
          return {
            ...l,
            nextFollowUpAt: undefined,
            updatedAt: nowMs,
            ai: {
              ...(l.ai ?? { mode: "review", state: "inbox_new", updatedAt: nowMs }),
              mode: "review",
              state: "followup_pending",
              updatedAt: nowMs,
              followupDraft: { text: nextStep.message, stepId: nextStep.id, createdAt: nowMs },
            },
          };
        }

        addAiMsg(conv.id, nextStep.message);

        const nextIdx = enabledSteps.findIndex((s) => s.id === nextStep.id);
        const afterThis = enabledSteps[nextIdx + 1];
        const nextFollowUpAt = afterThis ? nowMs + afterThis.afterHours * 3_600_000 : undefined;

        changed = true;
        return {
          ...l,
          nextFollowUpAt,
          updatedAt: nowMs,
          ai: {
            ...(l.ai ?? { mode: "auto", state: "inbox_new", updatedAt: nowMs }),
            mode: "auto",
            state: "followup_pending",
            updatedAt: nowMs,
            lastFollowupStepId: nextStep.id,
            followupDraft: undefined,
          },
        };
      });

      if (!changed) return prev;
      return { ...prev, leads, conversations };
    });
  },
};
