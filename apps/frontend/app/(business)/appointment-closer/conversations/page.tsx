// ai-super-saas/apps/frontend/app/(business)/appointment-closer/conversations/page.tsx

"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { acActions, useAcStore, type LeadStage } from "../_store/acStore";
import { runAcStateMachine } from "../_logic/acStateMachine";
import { useFollowupRunner } from "../_logic/useFollowupRunner";
import { ChannelPill } from "../_components/ChannelPill";

function channelLabel(ch: string) {
  switch (ch) {
    case "IG":
      return "Instagram";
    case "WhatsApp":
      return "WhatsApp";
    case "Facebook":
      return "Facebook";
    case "Website":
      return "Website";
    default:
      return ch;
  }
}

function relTimeFrom(nowMs: number, pastMs: number) {
  if (!nowMs) return "—";
  const diff = nowMs - pastMs;
  const m = Math.floor(diff / 60000);
  if (m < 1) return "now";
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  const d = Math.floor(h / 24);
  return `${d}d`;
}

function timeHHMM(ms: number, mounted: boolean) {
  if (!mounted) return "—";
  return new Date(ms).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

const STAGES: LeadStage[] = ["New", "Qualified", "Booked", "Cold", "Won", "Lost"];

export default function ConversationsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const leadIdFromUrl = searchParams.get("leadId") ?? "";
  const convIdFromUrl = searchParams.get("convId") ?? "";

  useFollowupRunner(true);

  const acState = useAcStore((s) => s);
  const leads = useAcStore((s) => s.leads);
  const convs = useAcStore((s) => s.conversations);
  const appts = useAcStore((s) => s.appointments);
  const settings = useAcStore((s) => s.settings);

  const [selectedId, setSelectedId] = useState<string>("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"All" | "Unread" | "New" | "Booked" | "Cold">("All");
  const [input, setInput] = useState("");

  const [mounted, setMounted] = useState(false);
  const [nowMs, setNowMs] = useState(0);

  const messagesRef = useRef<HTMLDivElement | null>(null);
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    setMounted(true);
    setNowMs(Date.now());
    const t = window.setInterval(() => setNowMs(Date.now()), 60_000);
    return () => window.clearInterval(t);
  }, []);

  const selected = useMemo(() => convs.find((c) => c.id === selectedId) ?? null, [convs, selectedId]);
  const leadById = useMemo(() => new Map(leads.map((l) => [l.id, l])), [leads]);

  const selectedLead = useMemo(() => {
    if (!selected) return null;
    return leadById.get(selected.leadId) ?? null;
  }, [selected, leadById]);

  // ✅ all conversations for this lead (multi-channel)
  const leadConvs = useMemo(() => {
    if (!selected) return [];
    return convs.filter((c) => c.leadId === selected.leadId);
  }, [convs, selected]);

  // ✅ merged timeline across all channels for this lead
  const mergedMessages = useMemo(() => {
    if (!leadConvs.length) return [];
    const all = leadConvs.flatMap((c) =>
      (c.messages ?? []).map((m) => ({
        ...m,
        __channel: c.channel,
        __convId: c.id,
      }))
    );
    all.sort((a, b) => a.at - b.at);
    return all;
  }, [leadConvs]);

  // mode policy
  const effectiveMode = (selectedLead?.ai as any)?.mode ?? "auto";
  const isPausedByMode = effectiveMode === "review" || effectiveMode === "takeover";

  // prevent auto-apply loop: only process each lead message once
  const lastAutoAppliedLeadMsgIdRef = useRef<string>("");

  useEffect(() => {
    if (!selected || !selectedLead) return;
    if (effectiveMode === "takeover") return;

    const last = selected.messages[selected.messages.length - 1];
    if (!last) return;
    if (last.from !== "lead") return;

    if (lastAutoAppliedLeadMsgIdRef.current === last.id) return;

    const out = runAcStateMachine({ state: acState, lead: selectedLead, conv: selected }, last.at);

    if (out.nextAi) acActions.setLeadAiMeta(selectedLead.id, out.nextAi);
    if (out.nextLeadStage && selectedLead.stage !== out.nextLeadStage) {
      acActions.moveLeadStage(selectedLead.id, out.nextLeadStage);
    }

    lastAutoAppliedLeadMsgIdRef.current = last.id;
  }, [acState, selected, selectedLead, effectiveMode]);

  // deep-link selection
  useEffect(() => {
    if (!convs.length) return;

    if (convIdFromUrl && convs.some((c) => c.id === convIdFromUrl)) {
      if (selectedId !== convIdFromUrl) setSelectedId(convIdFromUrl);
      return;
    }

    if (leadIdFromUrl) {
      const match = convs.find((c) => c.leadId === leadIdFromUrl);
      if (match && selectedId !== match.id) setSelectedId(match.id);
      return;
    }

    if (!selectedId) setSelectedId(convs[0].id);
  }, [convs, convIdFromUrl, leadIdFromUrl, selectedId]);

  // keep selection valid
  useEffect(() => {
    if (!convs.length) {
      if (selectedId) setSelectedId("");
      return;
    }
    if (selectedId && !convs.some((c) => c.id === selectedId)) setSelectedId(convs[0]?.id ?? "");
  }, [convs, selectedId]);

  // URL sync (throttled)
  const lastUrlWriteRef = useRef(0);
  useEffect(() => {
    if (!selectedId) return;
    if (convIdFromUrl === selectedId) return;

    const now = Date.now();
    if (now - lastUrlWriteRef.current < 250) return;
    lastUrlWriteRef.current = now;

    router.replace(`/appointment-closer/conversations?convId=${selectedId}`, { scroll: false });
  }, [selectedId, convIdFromUrl, router]);

  // scroll tracking
  useEffect(() => {
    const el = messagesRef.current;
    if (!el) return;

    const onScroll = () => {
      const threshold = 24;
      const isAtBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - threshold;
      setAtBottom(isAtBottom);
    };

    onScroll();
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, [selectedId]);

  // auto-mark read
  useEffect(() => {
    if (!selectedId) return;
    if (!selected) return;
    if (selected.unreadCount <= 0) return;
    if (!atBottom) return;
    acActions.markConversationRead(selectedId);
  }, [selectedId, selected, atBottom]);

  // sidebar list items
  const listItems = useMemo(() => {
    const q = search.trim().toLowerCase();

    const enriched = convs.map((c) => {
      const lead = leadById.get(c.leadId);
      const last = c.messages[c.messages.length - 1];
      return {
        id: c.id,
        leadId: c.leadId,
        name: lead?.name ?? "Unknown",
        stage: lead?.stage ?? "New",
        channel: c.channel,
        unreadCount: c.unreadCount,
        lastAt: c.lastAt,
        lastText: last?.text ?? "—",
      };
    });

    return enriched
      .filter((x) => {
        const matchesSearch = !q
          ? true
          : (x.name + " " + channelLabel(x.channel) + " " + x.lastText).toLowerCase().includes(q);

        const matchesFilter =
          filter === "All"
            ? true
            : filter === "Unread"
              ? x.unreadCount > 0
              : filter === "New"
                ? x.stage === "New"
                : filter === "Booked"
                  ? x.stage === "Booked"
                  : x.stage === "Cold";

        return matchesSearch && matchesFilter;
      })
      .sort((a, b) => b.unreadCount - a.unreadCount || b.lastAt - a.lastAt);
  }, [convs, leadById, search, filter]);

  const canSend = input.trim().length > 0 && !!selected;

  const handleSend = () => {
    if (!selected) return;
    const t = input.trim();
    if (!t) return;

    const from = effectiveMode === "auto" ? "ai" : "human";
    acActions.addMessage(selected.id, from, t);
    setInput("");
  };

  const handleComposerKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key !== "Enter") return;
    if (e.shiftKey) return;
    e.preventDefault();
    if (canSend) handleSend();
  };

  const handleQuickAIReply = (kind: "pricing" | "availability" | "qualify") => {
    if (!selected || !selectedLead) return;
    if (isPausedByMode) return;

    if (kind === "pricing") {
      acActions.addMessage(
        selected.id,
        "ai",
        `Sure — here’s pricing to get started:\n• Consultation: $50 (30 min)\n• Standard Appointment: from $120 (60 min)\n\nWhat service do you want, and what day/time works best?`
      );
    } else if (kind === "availability") {
      acActions.addMessage(
        selected.id,
        "ai",
        `We have a few openings this week. What day works best for you (Mon–Fri), and do you prefer morning or afternoon?`
      );
    } else {
      acActions.addMessage(
        selected.id,
        "ai",
        `Quick questions so I can book you correctly:\n1) What service do you need?\n2) What day/time works best?\n3) Any special notes or budget range?`
      );
      acActions.moveLeadStage(selectedLead.id, "Qualified");
    }
  };

  const handleCreateAppointment = () => {
    if (!selectedLead) return;

    const service = settings.services.find((s) => s.enabled) ?? settings.services[0];
    const serviceName = service?.name ?? "Consultation";
    const durationMin = service?.durationMin ?? 30;

    const defaultStartAt = Date.now() + 2 * 60 * 60 * 1000; // demo
    acActions.createAppointment(selectedLead.id, serviceName, defaultStartAt, durationMin);
    acActions.moveLeadStage(selectedLead.id, "Booked");
  };

  const selectedLeadAppointments = useMemo(() => {
    if (!selectedLead) return [];
    return appts
      .filter((a) => a.leadId === selectedLead.id && a.status !== "Canceled")
      .sort((a, b) => a.startAt - b.startAt)
      .slice(0, 3)
      .map((a) => ({
        id: a.id,
        when: mounted
          ? `${new Date(a.startAt).toLocaleDateString(undefined, { month: "short", day: "numeric" })} ${timeHHMM(
              a.startAt,
              mounted
            )}`
          : "—",
        service: a.service,
        status: a.status,
      }));
  }, [appts, selectedLead, mounted]);

  // machine suggestion
  const machine = useMemo(() => {
    if (!selected || !selectedLead) return null;
    if (effectiveMode === "takeover") return null;
    const last = selected.messages[selected.messages.length - 1];
    return runAcStateMachine({ state: acState, lead: selectedLead, conv: selected }, last?.at ?? Date.now());
  }, [acState, selected, selectedLead, effectiveMode]);

  const msgs = selected?.messages ?? [];
  const lastMsg = msgs.length ? msgs[msgs.length - 1] : null;
  const followupDraft = (selectedLead?.ai as any)?.followupDraft ?? null;

  const suggestionKind: "machine" | "followup" | null =
    machine?.draftReply && lastMsg?.from === "lead" ? "machine" : followupDraft?.text ? "followup" : null;

  const suggestionText =
    suggestionKind === "machine"
      ? machine?.draftReply ?? ""
      : suggestionKind === "followup"
        ? followupDraft?.text ?? ""
        : "";

  const showSuggestion = !!suggestionKind && effectiveMode !== "takeover";
  // --- AI Ops Center (UI-only signals) ---
const lastLeadMsgAt = useMemo(() => {
  if (!mergedMessages.length) return 0;
  const last = [...mergedMessages].reverse().find((m: any) => m.from === "lead");
  return last?.at ?? 0;
}, [mergedMessages]);

const lastAiMsgAt = useMemo(() => {
  if (!mergedMessages.length) return 0;
  const last = [...mergedMessages].reverse().find((m: any) => m.from === "ai");
  return last?.at ?? 0;
}, [mergedMessages]);

const lastHumanMsgAt = useMemo(() => {
  if (!mergedMessages.length) return 0;
  const last = [...mergedMessages].reverse().find((m: any) => m.from === "human");
  return last?.at ?? 0;
}, [mergedMessages]);

const lastAiActionAt = Math.max(lastAiMsgAt, selectedLead?.ai?.updatedAt ?? 0);
const lastUserActionAt = Math.max(lastHumanMsgAt, selectedLead?.ai?.lastHumanAt ?? 0);

// Who are we waiting on?
const waitingOn = useMemo<"lead" | "you" | "none">(() => {
  if (!selected) return "none";
  if (!mergedMessages.length) return "none";

  const last = mergedMessages[mergedMessages.length - 1] as any;

  // If AI is paused, it's on the human operator.
  if (effectiveMode === "review" || effectiveMode === "takeover") {
    return last?.from === "lead" ? "you" : "none";
  }

  // Auto mode:
  // - last message from lead -> AI should reply (system "waiting on you/AI action", but operationally: needs a response)
  // - last message from AI/human -> waiting on lead
  if (last?.from === "lead") return "you";
  return "lead";
}, [selected, mergedMessages, effectiveMode]);

// Risk flags (UI only)
  const aiRisks = useMemo(() => {
    const out: string[] = [];

    const conf = selectedLead?.ai?.confidence;
    if (typeof conf === "number" && conf < 0.4) out.push("Low confidence");

    if (selectedLead?.nextFollowUpAt && selectedLead.nextFollowUpAt <= Date.now()) {
      out.push("Follow-up overdue");
    }

    if (effectiveMode !== "auto") out.push("AI paused");

    // optional: if no lead selected, keep it clean (no warnings)
    if (!selectedLead || !selected) return [];

    return out;
  }, [selectedLead, selected, effectiveMode]);

// Compact “status line” strings
const lastAiActionLabel =
  lastAiActionAt > 0 ? `${relTimeFrom(nowMs, lastAiActionAt)} ago` : "—";

const waitingLabel =
  waitingOn === "lead" ? "Waiting on lead" : waitingOn === "you" ? "Waiting on you" : "—";

  // --- AI risk flags (UI only) ---

if ((selectedLead?.ai?.confidence ?? 1) < 0.4) {
  aiRisks.push("Low confidence");
}

if (selectedLead?.nextFollowUpAt && selectedLead.nextFollowUpAt < Date.now()) {
  aiRisks.push("Follow-up overdue");
}

if (effectiveMode !== "auto") {
  aiRisks.push("AI paused");
}

  const applyMachineSideEffects = (draftWasActuallySentAsAi: boolean) => {
    if (!selected || !selectedLead || !machine) return;

    if (machine.nextAi) acActions.setLeadAiMeta(selectedLead.id, machine.nextAi);
    if (machine.nextLeadStage) acActions.moveLeadStage(selectedLead.id, machine.nextLeadStage);

    if (draftWasActuallySentAsAi) {
      if (machine.shouldCreateAppointment) {
        const { service, startAt, durationMin } = machine.shouldCreateAppointment;
        acActions.createAppointment(selectedLead.id, service, startAt, durationMin);
        acActions.moveLeadStage(selectedLead.id, "Booked");
      }
      if ((machine as any).shouldRescheduleLatestAppointment) {
        const { leadId, newStartAt } = (machine as any).shouldRescheduleLatestAppointment;
        acActions.rescheduleLatestAppointment(leadId, newStartAt);
      }
      if ((machine as any).shouldCancelLatestAppointment) {
        const { leadId } = (machine as any).shouldCancelLatestAppointment;
        acActions.cancelLatestAppointment(leadId);
      }
    }
  };

  const handleUseSuggestion = () => {
    if (!selectedLead || !suggestionText) return;
    setInput(suggestionText);
    if (suggestionKind === "followup") acActions.clearLeadFollowupDraft(selectedLead.id);
  };

  const handleSendSuggestion = () => {
    if (!selected || !selectedLead || !suggestionText) return;

    if (effectiveMode !== "auto") {
      setInput(suggestionText);
      if (suggestionKind === "machine") applyMachineSideEffects(false);
      if (suggestionKind === "followup") acActions.clearLeadFollowupDraft(selectedLead.id);
      return;
    }

    acActions.addMessage(selected.id, "ai", suggestionText);
    if (suggestionKind === "machine") applyMachineSideEffects(true);
    if (suggestionKind === "followup") acActions.clearLeadFollowupDraft(selectedLead.id);
    setInput("");
  };

  // compact meta for header (UI only)
  const headerMeta = useMemo(() => {
    if (!selected) return [];
    const out: Array<{ k: string; v: string; tone?: "strong" }> = [];
    out.push({ k: "Thread", v: "Unified" });
    out.push({ k: "Stage", v: selectedLead?.stage ?? "—" });
    out.push({ k: "Unread", v: String(selected.unreadCount) });
    if (effectiveMode !== "auto") {
      out.push({ k: "Mode", v: effectiveMode === "review" ? "Review" : "Takeover", tone: "strong" });
    }
    return out;
  }, [selected, selectedLead, effectiveMode]);

  return (
    <div className="space-y-4 ac-inbox-page">
      {/* Header */}
      <section className="surface p-4">
        <div className="ac-toolbar">
          <div style={{ minWidth: 0 }}>
            <div className="hero-eyebrow">INBOX</div>
            <h1 className="hero-title" style={{ fontSize: "1.7rem" }}>
              Conversations
            </h1>
            <p className="hero-subtitle" style={{ maxWidth: 900 }}>
              Multi-channel inbox — Instagram, WhatsApp, Facebook, Website. Center view merges all messages for the lead.
            </p>
          </div>

          {/* segmented nav look */}
          <div className="ac-page-actions ac-dash-nav">
            <Link className="btn" href="/appointment-closer">
              Dashboard
            </Link>
            <span className="btn is-current" aria-current="page">
              Inbox
            </span>
            <Link className="btn" href="/appointment-closer/crm">
              CRM
            </Link>
            <Link className="btn" href="/appointment-closer/scheduling">
              Scheduling
            </Link>
            <Link className="btn" href="/appointment-closer/settings">
              Settings
            </Link>
          </div>

          {/* Filter tabs (chips) */}
          <div className="ac-inbox-filters" style={{ width: "100%", justifyContent: "flex-end" }}>
            {(["All", "Unread", "New", "Booked", "Cold"] as const).map((k) => (
              <button
                key={k}
                className={`ac-inbox-tab ${filter === k ? "is-active" : ""}`}
                type="button"
                onClick={() => setFilter(k)}
              >
                {k}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Layout: AI panel top, then Inbox + Chat */}
      <div className="ac-inbox-layout">
        {/* TOP: AI Panel */}
       {/* TOP: AI Panel (AI Ops Center) */}
       
<section className="surface p-3 ac-ai-top">
  <div className="ac-ai-top-head">
    <div style={{ minWidth: 0 }}>
      <div className="panel-title">AI Ops Center</div>
      <div className="panel-subtitle">
        Lead snapshot • AI state • Next actions
      </div>
    </div>

       <div className="ac-ai-top-badges">
          <span className="badge">{String(effectiveMode).toUpperCase()}</span>

          {selectedLead?.ai?.state ? <span className="badge">{selectedLead.ai.state}</span> : null}

          {/* compact live indicators */}
          <span className="badge badge-soft">Last AI: {lastAiActionLabel}</span>
          <span className="badge badge-soft">{waitingLabel}</span>

          {/* risk flags */}
          {aiRisks.map((risk) => (
            <span key={risk} className="badge badge-warn">
              {risk}
            </span>
          ))}
        </div>
          </div>

  <div className="ac-ai-grid">
    {/* Card 1: Lead Snapshot */}
    <div className="ac-ai-card">
      <div className="ac-ai-card-head">
        <div>
          <div className="ac-ai-card-title">Lead snapshot</div>
          <div className="ac-ai-card-sub">Who you’re talking to</div>
        </div>

        <span className="badge">{selectedLead ? selectedLead.stage : "—"}</span>
      </div>

      <div className="ac-ai-kv">
        <div className="ac-ai-k">
          <span className="ac-ai-k-label">Lead</span>
          <span className="ac-ai-k-value">{selectedLead?.name ?? "No lead selected"}</span>
        </div>

        <div className="ac-ai-k">
          <span className="ac-ai-k-label">Unread</span>
          <span className="ac-ai-k-value">{selected?.unreadCount ?? 0}</span>
        </div>

        <div className="ac-ai-k">
          <span className="ac-ai-k-label">Thread</span>
          <span className="ac-ai-k-value">{selected ? "Unified" : "—"}</span>
        </div>
      </div>

      <div className="ac-ai-actions">
        <Link
          className="btn"
          href={selected ? `/appointment-closer/crm?leadId=${selected.leadId}` : "/appointment-closer/crm"}
        >
          Open CRM
        </Link>

        <button className="btn" type="button" onClick={handleCreateAppointment} disabled={!selectedLead}>
          Create appt
        </button>
      </div>
    </div>

    {/* Card 2: AI Status */}
    <div className="ac-ai-card">
      <div className="ac-ai-card-head">
        <div>
          <div className="ac-ai-card-title">AI status</div>
          <div className="ac-ai-card-sub">Behavior + policy</div>
        </div>
        <span className="badge">{String(effectiveMode).toUpperCase()}</span>
      </div>

      <div className="ac-ai-kv">
        <div className="ac-ai-k">
          <span className="ac-ai-k-label">State</span>
          <span className="ac-ai-k-value">{selectedLead?.ai?.state ?? "—"}</span>
        </div>

        <div className="ac-ai-k">
          <span className="ac-ai-k-label">Confidence</span>
          <span className="ac-ai-k-value">
            {typeof selectedLead?.ai?.confidence === "number"
              ? `${Math.round(selectedLead.ai.confidence * 100)}%`
              : "—"}
          </span>
        </div>
          {typeof selectedLead?.ai?.confidence === "number" && (
            <div className="ac-ai-confidence">
              <div className="ac-ai-confidence-bar">
                <span
                  style={{ width: `${Math.round(selectedLead.ai.confidence * 100)}%` }}
                />
              </div>
              <div className="ac-ai-confidence-label">
                {Math.round(selectedLead.ai.confidence * 100)}% confidence
              </div>
            </div>
          )}

        <div className="ac-ai-k">
          <span className="ac-ai-k-label">Policy</span>
          <span className="ac-ai-k-value">{isPausedByMode ? "Paused" : "Active"}</span>
        </div>
      </div>

      <div className="ac-ai-mini-note">
        <span className="note" style={{ display: "inline-block", maxWidth: 520 }}>
          {selectedLead?.ai?.modeReason
            ? `Reason: ${selectedLead.ai.modeReason}`
            : "Tip: Review mode drafts followups instead of sending."}
        </span>
      </div>

      <div className="ac-ai-actions">
        <Link className="btn" href="/appointment-closer/settings">
          AI settings
        </Link>
        <Link className="btn" href="/appointment-closer/scheduling">
          Scheduling
        </Link>
      </div>
    </div>

    {/* Card 3: Next Actions */}
    <div className="ac-ai-card">
      <div className="ac-ai-card-head">
        <div>
          <div className="ac-ai-card-title">Next actions</div>
          <div className="ac-ai-card-sub">System suggestions</div>
        </div>
        <span className="badge">{suggestionKind ? "SUGGESTION" : "—"}</span>
      </div>
      <div className="ac-ai-next">
  <div className="ac-ai-next-row">
    <div className="ac-ai-next-label">Suggestion</div>
    <div className="ac-ai-next-value">
      {suggestionKind === "machine"
        ? "AI reply ready"
        : suggestionKind === "followup"
          ? "Follow-up draft ready"
          : "—"}
    </div>
  </div>

  <div className="ac-ai-next-row">
    <div className="ac-ai-next-label">Follow-up</div>
    <div className="ac-ai-next-value">
      {selectedLead?.nextFollowUpAt
        ? mounted
          ? new Date(selectedLead.nextFollowUpAt).toLocaleString([], {
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
          : "—"
        : "—"}
    </div>
  </div>
</div>

      <div className="ac-ai-actions">
        <button className="btn" type="button" onClick={handleUseSuggestion} disabled={!suggestionText}>
          Use
        </button>
        <button
          className="btn btn-primary"
          type="button"
          onClick={handleSendSuggestion}
          disabled={!suggestionText || !selected}
          title={effectiveMode !== "auto" ? "Review mode: puts in composer (draft-only)" : undefined}
        >
          {effectiveMode === "auto" ? "Send" : "Draft"}
        </button>
      </div>
    </div>
  </div>
</section>

        {/* BOTTOM: Inbox + Chat */}
        <div className="ac-inbox-main">
          {/* LEFT */}
          <div className="ac-left">
            <section className="surface p-3">
              <div className="panel-head">
                <div>
                  <div className="panel-title">Inbox</div>
                  <div className="panel-subtitle">{listItems.length} active</div>
                </div>
                <div className="badge">{filter}</div>
              </div>

              <input
                className="input"
                placeholder="Search name, channel, text…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <div className="ac-list" style={{ marginTop: "0.75rem", maxHeight: 520 }}>
                {listItems.length === 0 ? (
                  <div className="panel">
                    <div className="panel-title">No results</div>
                    <div className="panel-subtitle">No conversations match your filters.</div>
                  </div>
                ) : (
                  listItems.map((conv) => {
                    const isSelected = conv.id === selectedId;
                    const lastPreview = conv.lastText || "—";
                    return (
                      <button
                        key={conv.id}
                        type="button"
                        onClick={() => setSelectedId(conv.id)}
                        className={`ac-item ${isSelected ? "selected" : ""}`}
                      >
                        <div className="ac-item-top">
                          <div className="ac-item-name" title={conv.name}>
                            {conv.unreadCount > 0 ? <span className="unread-dot" /> : null}
                            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                              {conv.name}
                            </span>
                          </div>
                          <div className="ac-item-meta">{relTimeFrom(nowMs, conv.lastAt)}</div>
                        </div>

                        <div className="ac-inbox-preview" title={lastPreview}>
                          {lastPreview}
                        </div>

                        <div className="ac-inbox-item-foot">
                          <span className="ac-inbox-tag" title="Lead stage">
                            {conv.stage}
                          </span>
                          <span className="ch-icons" title={channelLabel(conv.channel)}>
                            <ChannelPill channel={conv.channel} />
                          </span>
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            </section>
          </div>

          {/* CHAT */}
          <div className="ac-mid">
            <section className="surface" style={{ display: "flex", flexDirection: "column", minHeight: 640 }}>
              <div className="ac-chat-head">
                <div style={{ minWidth: 0 }}>
                  <div className="ac-chat-title">
                    {selectedLead ? selectedLead.name : selected ? "Unknown lead" : "No conversation selected"}
                  </div>

                  {selected ? (
                    <div className="ac-inbox-meta">
                      {headerMeta.map((m) => (
                        <span key={m.k} className={`ac-inbox-meta-chip ${m.tone === "strong" ? "is-strong" : ""}`}>
                          <span className="ac-inbox-meta-k">{m.k}</span>
                          <span className="ac-inbox-meta-v">{m.v}</span>
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div className="ac-chat-sub">Pick a conversation to start.</div>
                  )}
                </div>

                {selected && (
                  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", justifyContent: "flex-end" }}>
                    {selected.unreadCount > 0 && (
                      <button className="btn" type="button" onClick={() => acActions.markConversationRead(selected.id)}>
                        Mark read
                      </button>
                    )}
                    <Link className="btn" href={`/appointment-closer/crm?leadId=${selected.leadId}`}>
                      View in CRM
                    </Link>
                    <button className="btn" type="button" onClick={handleCreateAppointment} disabled={!selectedLead}>
                      Create appointment
                    </button>
                  </div>
                )}
              </div>

              <div ref={messagesRef} className="ac-messages">
                {!selected ? (
                  <div className="panel">
                    <div className="panel-title">Pick a conversation</div>
                    <div className="panel-subtitle">Select a lead from the Inbox to view the unified thread.</div>
                  </div>
                ) : mergedMessages.length === 0 ? (
                  <div className="panel">
                    <div className="panel-title">No messages yet</div>
                    <div className="panel-subtitle">
                      When the lead messages from any channel, it will appear here with a channel badge.
                    </div>
                  </div>
                ) : (
                  mergedMessages.map((m: any) => {
                    const side = m.from === "lead" ? "right" : "left";
                    const senderLabel =
                      m.from === "lead" ? (selectedLead?.name ?? "Lead") : m.from === "human" ? "Human" : "Ai AC";

                    return (
                      <div key={`${m.__convId}:${m.id}`} className={`bubble-row ${side}`}>
                        <div className={`bubble ac-bubble ${m.from === "lead" ? "" : "alt"}`} style={{ maxWidth: "min(78%, 760px)" }}>
                          <div className="ac-inbox-bubble-top">
                            <span className="ch-icons" title={channelLabel(m.__channel)}>
                              <ChannelPill channel={m.__channel} />
                            </span>
                            <span className={`ac-inbox-sender ${m.from !== "lead" ? "is-system" : ""}`}>{senderLabel}</span>
                          </div>

                          <div className="ac-inbox-bubble-text" style={{ whiteSpace: "pre-wrap" }}>
                            {m.text}
                          </div>

                          <div className="bubble-meta">
                            <span className="note" style={{ fontSize: "0.72rem" }}>
                              {timeHHMM(m.at, mounted)}
                            </span>
                            <span className="note" style={{ fontSize: "0.72rem" }}>
                              via {channelLabel(m.__channel)}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              <div className="ac-composer">
                <div className="ac-inbox-quick">
                  <button className="btn" type="button" onClick={() => handleQuickAIReply("pricing")} disabled={!selected || isPausedByMode}>
                    Quick: pricing
                  </button>
                  <button
                    className="btn"
                    type="button"
                    onClick={() => handleQuickAIReply("availability")}
                    disabled={!selected || isPausedByMode}
                  >
                    Quick: availability
                  </button>
                  <button className="btn" type="button" onClick={() => handleQuickAIReply("qualify")} disabled={!selectedLead || isPausedByMode}>
                    Quick: qualify
                  </button>
                </div>

                {showSuggestion ? (
                  <div className="ac-inbox-suggest">
                    <div className="ac-inbox-suggest-head">
                      <div>
                        <div className="ac-inbox-suggest-title">
                          {suggestionKind === "machine" ? "AI suggestion" : "Follow-up draft"}
                        </div>
                      </div>

                      <div className="ac-inbox-suggest-actions">
                        <button type="button" className="btn" onClick={handleUseSuggestion}>
                          Use
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={handleSendSuggestion}
                          disabled={!suggestionText || !selected}
                          title={effectiveMode !== "auto" ? "Review mode: this will place it in composer (draft-only)" : undefined}
                        >
                          {effectiveMode === "auto" ? "Send" : "Draft"}
                        </button>
                      </div>
                    </div>

                    <div className="ac-inbox-suggest-body" style={{ whiteSpace: "pre-wrap" }}>
                      {suggestionText}
                    </div>
                  </div>
                ) : null}

                <div className="input-row">
                  <textarea
                    className="input"
                    style={{ borderRadius: 16, minHeight: 54, resize: "none", flex: 1 }}
                    placeholder={
                      isPausedByMode
                        ? "Human review/takeover — you are replying as Human (Enter = send, Shift+Enter = new line)"
                        : "Type a reply as Ai AC... (Enter = send, Shift+Enter = new line)"
                    }
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleComposerKeyDown}
                  />
                  <button type="button" onClick={handleSend} className="btn" disabled={!canSend}>
                    {isPausedByMode ? "Send as Human" : "Send as Ai AC"}
                  </button>
                </div>

                <div className="note">
                  Unified thread: messages from IG/WA/FB/Web all appear together — each bubble shows its channel badge.
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
