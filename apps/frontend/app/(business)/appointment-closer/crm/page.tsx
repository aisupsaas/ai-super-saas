"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

type StageUI = "New" | "Qualified" | "Booked" | "Completed" | "No-Show" | "Cold";
const ALL_STAGES_UI: StageUI[] = ["New", "Qualified", "Booked", "Completed", "No-Show", "Cold"];

type LeadStageStore = "New" | "Qualified" | "Booked" | "Cold" | "Won" | "Lost";
const STORE_STAGES: LeadStageStore[] = ["New", "Qualified", "Booked", "Cold", "Won", "Lost"];

function toStageUI(stage: string): StageUI {
  if (stage === "Won") return "Completed";
  if (stage === "Lost") return "No-Show";
  return stage as any;
}
function toStoreStage(stage: StageUI): LeadStageStore {
  if (stage === "Completed") return "Won";
  if (stage === "No-Show") return "Lost";
  return stage as any;
}

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

function relTimeFromMs(pastMs: number | null) {
  if (!pastMs) return "—";
  const diff = Date.now() - pastMs;
  const m = Math.floor(diff / 60000);
  if (m < 1) return "now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

function isoDate(ms: number) {
  const d = new Date(ms);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
function timeHHMM(ms: number) {
  const d = new Date(ms);
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${hh}:${mm}`;
}

// keep for now (demo tenant)
const tenantId = "t_demo";

/** -------------------------
 * AI helpers (safe + defensive)
 * -------------------------- */
type AiMode = "auto" | "review" | "takeover";
function isAiMode(x: any): x is AiMode {
  return x === "auto" || x === "review" || x === "takeover";
}
function asObjectJson(x: unknown): Record<string, any> {
  return x && typeof x === "object" && !Array.isArray(x) ? (x as any) : {};
}

function aiModeLabel(mode: AiMode) {
  if (mode === "review") return "REVIEW";
  if (mode === "takeover") return "TAKEOVER";
  return "AUTO";
}

function aiStateLabel(state: string) {
  switch (state) {
    case "inbox_new":
      return "New";
    case "faq_or_pricing":
      return "FAQ/Pricing";
    case "qualifying":
      return "Qualifying";
    case "proposing_times":
      return "Proposing times";
    case "awaiting_confirmation":
      return "Awaiting confirm";
    case "booked":
      return "Booked";
    case "reschedule":
      return "Reschedule";
    case "cancel":
      return "Cancel";
    case "followup_pending":
      return "Followup pending";
    case "handoff_human":
      return "Handoff";
    default:
      return state ? state : "—";
  }
}
function aiAttention(ai: Record<string, any>) {
  const mode = isAiMode(ai.mode) ? (ai.mode as AiMode) : "auto";
  const state = typeof ai.state === "string" ? ai.state : "";

  // 🚦 warn-only: show only when operator likely needs to look
  const warnStates = new Set([
    "handoff_human",
    "followup_pending",
    "awaiting_confirmation",
    "cancel",
    "reschedule",
  ]);

  if (mode === "takeover") return { kind: "warn" as const, label: "ATTN" };
  if (warnStates.has(state)) return { kind: "warn" as const, label: "ATTN" };

  // Optional: show nothing (no noise)
  return null;
}

/** -------------------------
 * CRM chip helpers (compact + consistent)
 * -------------------------- */
function chipTone(kind: "stage" | "ai" | "mode" | "ch", value: string) {
  // keep it neutral; no new greens.
  // we only slightly bold important ones via classes; real colors handled by your design system.
  if (kind === "stage") {
    if (value === "Booked" || value === "Qualified") return "is-strong";
    return "";
  }
  if (kind === "mode") {
    if (value === "TAKEOVER" || value === "REVIEW") return "is-strong";
    return "";
  }
  return "";
}

type LeadsListItem = {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  stage: string;
  updatedAt: number;

  channel: string | null;
  conversationId: string | null;
  lastAt: number | null;

  lastMessageAt: number | null;
  lastMessageFrom: "lead" | "ai" | "human" | null;
  lastMessagePreview: string;

  ai?: unknown;

  nextAppointment: null | {
    id: string;
    service: string;
    startAt: number;
    durationMin: number;
    status: string;
  };
};

type LeadDetail = {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  stage: string;
  notes: string | null;
  updatedAt: number;
  ai?: unknown;
};

export default function CRMPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const leadIdFromUrl = searchParams.get("leadId") ?? "";

  const [items, setItems] = useState<LeadsListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  const [selectedLeadId, setSelectedLeadId] = useState<string>("");
  const [stageFilter, setStageFilter] = useState<StageUI | "All">("All");
  const [search, setSearch] = useState("");

  const [detail, setDetail] = useState<LeadDetail | null>(null);

  const [aiModeSaving, setAiModeSaving] = useState(false);
  const [aiModeError, setAiModeError] = useState<string>("");

  // Stage update state (optimistic UI)
  const [stageSavingLeadId, setStageSavingLeadId] = useState<string>("");
  const [stageError, setStageError] = useState<string>("");

  // Load list
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(`/appointment-closer/api/tenants/${tenantId}/leads?limit=200&offset=0`, {
          cache: "no-store",
        });
        const data = await res.json();
        if (!alive) return;
        if (!data?.ok) throw new Error(data?.error ?? "Failed to load leads");
        setItems(data.items ?? []);
      } catch (e: any) {
        if (!alive) return;
        setError(e?.message ?? "Failed to load leads");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  // Auto-select from URL or first
  useEffect(() => {
    if (!items.length) return;

    const exists = leadIdFromUrl && items.some((l) => l.id === leadIdFromUrl);
    if (exists && selectedLeadId !== leadIdFromUrl) {
      setSelectedLeadId(leadIdFromUrl);
      return;
    }
    if (!selectedLeadId) setSelectedLeadId(items[0].id);
  }, [items, leadIdFromUrl, selectedLeadId]);

  // URL sync (throttled)
  const lastUrlWriteRef = useRef(0);
  useEffect(() => {
    if (!selectedLeadId) return;
    if (leadIdFromUrl === selectedLeadId) return;

    const now = Date.now();
    if (now - lastUrlWriteRef.current < 250) return;
    lastUrlWriteRef.current = now;

    router.replace(`/appointment-closer/crm?leadId=${selectedLeadId}`, { scroll: false });
  }, [selectedLeadId, leadIdFromUrl, router]);

  // Load selected lead detail
  const loadLeadDetail = async (leadId: string) => {
    const res = await fetch(`/appointment-closer/api/tenants/${tenantId}/leads/${leadId}`, { cache: "no-store" });
    const data = await res.json();
    if (!data?.ok) throw new Error(data?.error ?? "Failed to load lead");
    return (data.lead ?? null) as LeadDetail | null;
  };

  useEffect(() => {
    let alive = true;
    if (!selectedLeadId) {
      setDetail(null);
      return;
    }
    (async () => {
      try {
        const lead = await loadLeadDetail(selectedLeadId);
        if (!alive) return;
        setDetail(lead);
      } catch {
        if (!alive) return;
        setDetail(null);
      }
    })();
    return () => {
      alive = false;
    };
  }, [selectedLeadId]);

  // Derived AI mode from detail.ai JSON (right panel)
  const aiObj = useMemo(() => asObjectJson(detail?.ai), [detail?.ai]);
  const currentAiMode: AiMode = isAiMode(aiObj.mode) ? aiObj.mode : "auto";
  const currentAiReason: string = typeof aiObj.modeReason === "string" ? aiObj.modeReason : "";

  const setAiMode = async (mode: AiMode) => {
    if (!selectedLeadId) return;
    setAiModeSaving(true);
    setAiModeError("");

    try {
      const reason =
        mode === "auto"
          ? ""
          : mode === "review"
            ? "Set by operator in CRM (review)"
            : "Set by operator in CRM (takeover)";

      const res = await fetch(`/appointment-closer/api/tenants/${tenantId}/leads/${selectedLeadId}/ai-mode`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ mode, reason }),
      });

      const data = await res.json();
      if (!data?.ok) throw new Error(data?.error ?? "Failed to update AI mode");

      const lead = await loadLeadDetail(selectedLeadId);
      setDetail(lead);

      // update list cache if list includes ai
      setItems((prev) => prev.map((x) => (x.id === selectedLeadId ? { ...x, ai: (lead as any)?.ai ?? x.ai } : x)));
    } catch (e: any) {
      setAiModeError(e?.message ?? "Failed to update AI mode");
    } finally {
      setAiModeSaving(false);
    }
  };

  /** -------------------------
   * Optimistic stage change
   * -------------------------- */
  const patchLead = async (leadId: string, patch: { stage?: LeadStageStore; notes?: string | null; ai?: any }) => {
    const res = await fetch(`/appointment-closer/api/tenants/${tenantId}/leads/${leadId}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(patch),
    });
    const data = await res.json();
    if (!data?.ok) throw new Error(data?.error ?? "Failed to update lead");
    return data?.lead as any;
  };

  const setLeadStageOptimistic = async (leadId: string, nextStoreStage: LeadStageStore) => {
    if (!leadId) return;
    setStageError("");
    setStageSavingLeadId(leadId);

    // snapshot previous value (for revert)
    const prevRow = items.find((x) => x.id === leadId);
    const prevStage = prevRow?.stage ?? "";

    // optimistic UI updates (list + detail)
    setItems((prev) => prev.map((x) => (x.id === leadId ? { ...x, stage: nextStoreStage, updatedAt: Date.now() } : x)));
    setDetail((prev) => (prev?.id === leadId ? { ...prev, stage: nextStoreStage, updatedAt: Date.now() } : prev));

    try {
      const updated = await patchLead(leadId, { stage: nextStoreStage });

      // reconcile with server
      if (updated?.stage) {
        setItems((prev) =>
          prev.map((x) =>
            x.id === leadId
              ? {
                  ...x,
                  stage: String(updated.stage),
                  updatedAt: typeof updated.updatedAt === "number" ? updated.updatedAt : x.updatedAt,
                  ai: updated.ai ?? x.ai,
                }
              : x
          )
        );
      }
      setDetail((prev) =>
        prev?.id === leadId
          ? {
              ...prev,
              stage: String(updated?.stage ?? prev.stage),
              updatedAt: typeof updated?.updatedAt === "number" ? updated.updatedAt : prev.updatedAt,
              ai: updated?.ai ?? prev.ai,
            }
          : prev
      );
    } catch (e: any) {
      // revert
      setItems((prev) => prev.map((x) => (x.id === leadId ? { ...x, stage: prevStage || x.stage } : x)));
      setDetail((prev) => (prev?.id === leadId ? { ...prev, stage: prevStage || prev.stage } : prev));
      setStageError(e?.message ?? "Failed to update stage");
    } finally {
      setStageSavingLeadId("");
    }
  };

  // Filter
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return items.filter((lead) => {
      const stageUI = toStageUI(lead.stage);
      const matchesStage = stageFilter === "All" ? true : stageUI === stageFilter;
      const text = (lead.name + " " + (lead.channel ?? "") + " " + lead.lastMessagePreview).toLowerCase();
      const matchesSearch = !q ? true : text.includes(q);
      return matchesStage && matchesSearch;
    });
  }, [items, stageFilter, search]);

  const stageCounts = useMemo(() => {
    const map: Record<StageUI, number> = {
      New: 0,
      Qualified: 0,
      Booked: 0,
      Completed: 0,
      "No-Show": 0,
      Cold: 0,
    };
    for (const l of items) {
      const s = toStageUI(l.stage);
      map[s] = (map[s] ?? 0) + 1;
    }
    return map;
  }, [items]);

  const stats = useMemo(() => {
    const total = items.length;
    const hot = items.filter((l) => l.stage === "Qualified" || l.stage === "Booked").length;
    const cold = items.filter((l) => l.stage === "Cold").length;
    const booked = items.filter((l) => l.stage === "Booked").length;
    return { total, hot, cold, booked };
  }, [items]);

  const selectedRow = useMemo(() => items.find((x) => x.id === selectedLeadId) ?? null, [items, selectedLeadId]);

  return (
    <div className="space-y-4">
      {/* Header */}
      <section className="surface p-4">
        <div className="ac-toolbar">
          <div>
            <div className="hero-eyebrow">CRM</div>
            <h1 className="hero-title" style={{ fontSize: "1.7rem" }}>
              Lead Pipeline
            </h1>
            <p className="hero-subtitle" style={{ maxWidth: 900 }}>
              DB-backed pipeline: stages, last activity, next appointment, and AI mode control.
            </p>
          </div>

          <div className="ac-page-actions">
            <Link className="btn" href="/appointment-closer">
              Dashboard
            </Link>
            <Link className="btn" href="/appointment-closer/conversations">
              Inbox
            </Link>
            <span className="btn is-current" aria-current="page">
              CRM
            </span>
            <Link className="btn" href="/appointment-closer/scheduling">
              Scheduling
            </Link>
            <Link className="btn" href="/appointment-closer/settings">
              Settings
            </Link>
          </div>

          <div className="kpi-row">
            <div className="kpi">
              <div className="kpi-label">Total</div>
              <div className="kpi-value">{stats.total}</div>
            </div>
            <div className="kpi">
              <div className="kpi-label">Hot</div>
              <div className="kpi-value">{stats.hot}</div>
            </div>
            <div className="kpi">
              <div className="kpi-label">Booked</div>
              <div className="kpi-value">{stats.booked}</div>
            </div>
            <div className="kpi">
              <div className="kpi-label">Cold</div>
              <div className="kpi-value">{stats.cold}</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3-column layout */}
      <div className="ac-crm-grid">
        {/* LEFT: Pipeline */}
        <section className="surface p-3 ac-crm-left">
          <div className="panel-head">
            <div>
              <div className="panel-title">Pipeline</div>
              <div className="panel-subtitle">Choose a stage</div>
            </div>
            <div className="badge">{stageFilter === "All" ? "ALL" : stageFilter}</div>
          </div>

          <div className="ac-pipeline">
            <button
              type="button"
              className={`pipe-item ${stageFilter === "All" ? "active" : ""}`}
              onClick={() => setStageFilter("All")}
            >
              <span className="pipe-name">All</span>
              <span className="badge">{items.length}</span>
            </button>

            {ALL_STAGES_UI.map((s) => (
              <button
                key={s}
                type="button"
                className={`pipe-item ${stageFilter === s ? "active" : ""}`}
                onClick={() => setStageFilter(s)}
              >
                <span className="pipe-name">{s}</span>
                <span className="badge">{stageCounts[s] ?? 0}</span>
              </button>
            ))}
          </div>

          <div style={{ marginTop: "0.75rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <Link className="btn" style={{ flex: 1 }} href="/appointment-closer/conversations">
              Inbox
            </Link>
            <Link className="btn" style={{ flex: 1 }} href="/appointment-closer/scheduling">
              Scheduling
            </Link>
          </div>

          {stageError ? (
            <div className="note" style={{ marginTop: "0.75rem", color: "#b91c1c" }}>
              {stageError}
            </div>
          ) : null}
        </section>

        {/* MIDDLE: Leads list */}
        <section className="surface p-3 ac-crm-mid" style={{ display: "flex", flexDirection: "column" }}>
          <div className="panel-head">
            <div>
              <div className="panel-title">Leads</div>
              <div className="panel-subtitle">
                {stageFilter === "All" ? "All stages" : stageFilter} · {filtered.length} shown
              </div>
            </div>
            <div className="badge">{loading ? "LOADING" : "READY"}</div>
          </div>

          <input
            className="input"
            placeholder="Search name, channel, last message…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div style={{ marginTop: "0.75rem", overflow: "auto", display: "grid", gap: "0.6rem" }}>
            {loading ? (
              <div className="panel">
                <div className="panel-title">Loading…</div>
                <div className="panel-subtitle">Fetching leads from DB.</div>
              </div>
            ) : error ? (
              <div className="panel">
                <div className="panel-title">Error</div>
                <div className="panel-subtitle">{error}</div>
              </div>
            ) : filtered.length === 0 ? (
              <div className="panel">
                <div className="panel-title">No matches</div>
                <div className="panel-subtitle">Try another keyword or stage.</div>
              </div>
            ) : (
              filtered.map((lead) => {
                const isSelected = lead.id === selectedLeadId;
                const stageUI = toStageUI(lead.stage);
                const lastSeen = relTimeFromMs(lead.lastMessageAt ?? lead.lastAt ?? lead.updatedAt);

                // AI snapshot (list row)
                const rowAi = asObjectJson((lead as any).ai);
                const attn = aiAttention(rowAi);
                const rowMode: AiMode = isAiMode(rowAi.mode) ? rowAi.mode : "auto";
                const rowState = typeof rowAi.state === "string" ? rowAi.state : "";
                const rowModeText = aiModeLabel(rowMode);
                const rowStateText = rowState ? aiStateLabel(rowState) : "—";

                // store stage (for PATCH)
                const stageForSelect: LeadStageStore =
                  (lead.stage as LeadStageStore) && STORE_STAGES.includes(lead.stage as any)
                    ? (lead.stage as LeadStageStore)
                    : "New";

                const savingThis = stageSavingLeadId === lead.id;

                return (
                  <button
                    key={lead.id}
                    type="button"
                    onClick={() => setSelectedLeadId(lead.id)}
                    className={`lead-card ${isSelected ? "active" : ""}`}
                  >
                    <div className="lead-top">
                      <div className="lead-name">{lead.name}</div>
                      <div className="lead-meta">{lastSeen}</div>
                    </div>

                    {/* ✅ CRM compact chips row (no inbox meta reuse) */}
                    <div className="ac-crm-chips" style={{ marginTop: "0.45rem" }}>
                      <span className={`ac-crm-chip ${chipTone("stage", stageUI)}`} title="Stage">
                        <span className="ac-crm-chip-k">Stage</span>
                        <span className="ac-crm-chip-v">{stageUI}</span>
                      </span>

                      <span className={`ac-crm-chip ${chipTone("ai", rowStateText)}`} title="AI state">
                        <span className="ac-crm-chip-k">AI</span>
                        <span className="ac-crm-chip-v">{rowStateText}</span>
                      </span>

                      <span className={`ac-crm-chip ${chipTone("mode", rowModeText)}`} title="AI mode">
                        <span className="ac-crm-chip-k">Mode</span>
                        <span className="ac-crm-chip-v">{rowModeText}</span>
                      </span>

                      <span className={`ac-crm-chip ${chipTone("ch", lead.channel ?? "")}`} title="Channel">
                        <span className="ac-crm-chip-k">Ch</span>
                        <span className="ac-crm-chip-v">{lead.channel ? channelLabel(lead.channel) : "—"}</span>
                      </span>
                       {attn ? (
                      <span className={`badge ${attn.kind === "warn" ? "badge-warn" : "badge-soft"}`} title="Needs attention">
                            {attn.label}
                          </span>
                        ) : null}

                      {/* Inline stage control (fast ops) */}
                      <span className="ac-crm-chip is-control" title="Change stage" style={{ marginLeft: "auto" }}>
                        <span className="ac-crm-chip-k">Set</span>
                        <span className="ac-crm-chip-v">
                          <select
                            className="input"
                            style={{ height: 34, padding: "0 0.55rem", borderRadius: 12, maxWidth: 160 }}
                            value={stageForSelect}
                            disabled={savingThis}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => {
                              e.stopPropagation();
                              const next = e.target.value as LeadStageStore;
                              setLeadStageOptimistic(lead.id, next);
                            }}
                          >
                            {STORE_STAGES.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                        </span>
                      </span>
                    </div>

                    <div className="lead-preview" style={{ marginTop: "0.4rem" }}>
                      {lead.lastMessagePreview || "—"}
                    </div>

                    {savingThis ? (
                      <div className="note" style={{ marginTop: "0.35rem" }}>
                        Saving stage…
                      </div>
                    ) : null}
                  </button>
                );
              })
            )}
          </div>
        </section>

        {/* RIGHT: Lead detail */}
        <section className="surface p-3 ac-crm-right">
          {!selectedRow ? (
            <div className="panel">
              <div className="panel-title">Select a lead</div>
              <div className="panel-subtitle">Pick a lead to view details.</div>
            </div>
          ) : (
            <>
              <div className="panel-head">
                <div>
                  <div className="panel-title">{selectedRow.name}</div>
                  <div className="panel-subtitle">
                    {selectedRow.channel ? channelLabel(selectedRow.channel) : "—"} ·{" "}
                    <span style={{ fontWeight: 800 }}>{toStageUI(selectedRow.stage)}</span>
                  </div>
                </div>
                <div className="badge">{currentAiMode.toUpperCase()}</div>
              </div>

              {/* Quick stage buttons */}
              <div className="panel">
                <div className="panel-title">Stage</div>
                <div className="panel-subtitle">One-tap updates (no modal)</div>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "0.65rem" }}>
                  {STORE_STAGES.map((s) => {
                    const active = String(selectedRow.stage) === s;
                    const saving = stageSavingLeadId === selectedRow.id;
                    return (
                      <button
                        key={s}
                        type="button"
                        className={`btn ${active ? "btn-primary" : ""}`}
                        disabled={saving || active}
                        onClick={() => setLeadStageOptimistic(selectedRow.id, s)}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
                {stageSavingLeadId === selectedRow.id ? (
                  <div className="note" style={{ marginTop: "0.55rem" }}>
                    Saving stage…
                  </div>
                ) : null}
              </div>

              <div className="panel">
                <div className="panel-title">Contact</div>
                <div className="panel-subtitle">
                  {selectedRow.phone ?? "—"} · {selectedRow.email ?? "—"}
                </div>
              </div>

              <div className="panel">
                <div className="panel-title">AI Mode</div>
                <div className="panel-subtitle">
                  Current: <b>{currentAiMode}</b>
                  {currentAiMode !== "auto" && currentAiReason ? ` · ${currentAiReason}` : ""}
                </div>

                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "0.65rem" }}>
                  <button
                    className="btn"
                    type="button"
                    onClick={() => setAiMode("auto")}
                    disabled={aiModeSaving || currentAiMode === "auto"}
                  >
                    Auto
                  </button>
                  <button
                    className="btn"
                    type="button"
                    onClick={() => setAiMode("review")}
                    disabled={aiModeSaving || currentAiMode === "review"}
                  >
                    Review
                  </button>
                  <button
                    className="btn"
                    type="button"
                    onClick={() => setAiMode("takeover")}
                    disabled={aiModeSaving || currentAiMode === "takeover"}
                  >
                    Takeover
                  </button>
                </div>

                {aiModeError ? (
                  <div className="note" style={{ marginTop: "0.6rem", color: "#b91c1c" }}>
                    {aiModeError}
                  </div>
                ) : (
                  <div className="note" style={{ marginTop: "0.6rem" }}>
                    auto = AI can send · review = draft-only · takeover = no AI sends/followups
                  </div>
                )}
              </div>

              <div className="panel">
                <div className="panel-title">Next appointment</div>
                <div className="panel-subtitle">Upcoming booking (if any)</div>

                {selectedRow.nextAppointment ? (
                  <div style={{ marginTop: "0.65rem" }}>
                    <div className="badge badge-green">{selectedRow.nextAppointment.status}</div>
                    <div style={{ marginTop: "0.45rem", fontWeight: 850, color: "var(--text-strong)" }}>
                      {selectedRow.nextAppointment.service}
                    </div>
                    <div className="note">
                      {isoDate(selectedRow.nextAppointment.startAt)} · {timeHHMM(selectedRow.nextAppointment.startAt)}
                    </div>
                  </div>
                ) : (
                  <div className="note" style={{ marginTop: "0.65rem" }}>
                    — none scheduled
                  </div>
                )}
              </div>

              <div className="panel">
                <div className="panel-title">Last message</div>
                <div className="panel-subtitle">
                  Last seen {relTimeFromMs(selectedRow.lastMessageAt ?? selectedRow.lastAt ?? selectedRow.updatedAt)}
                </div>
                <div style={{ marginTop: "0.65rem", whiteSpace: "pre-wrap", fontSize: "0.9rem" }}>
                  {selectedRow.lastMessagePreview || "—"}
                </div>
              </div>

              <div className="panel">
                <div className="panel-title">Notes</div>
                <div className="panel-subtitle">Editing route later</div>
                <textarea
                  className="input"
                  style={{ borderRadius: 16, minHeight: 110, resize: "none", marginTop: "0.65rem" }}
                  placeholder="Notes editing route comes next."
                  value={detail?.notes ?? ""}
                  readOnly
                />
              </div>

              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                <Link
                  className="btn"
                  href={
                    selectedRow.conversationId
                      ? `/appointment-closer/conversations?convId=${selectedRow.conversationId}`
                      : `/appointment-closer/conversations?leadId=${selectedRow.id}`
                  }
                >
                  Open conversation
                </Link>

                <Link className="btn" href="/appointment-closer/scheduling">
                  Schedule
                </Link>
              </div>

              <div className="note">Next: Step 2D — consistency pass (radius/spacing/chips/hover parity).</div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}
