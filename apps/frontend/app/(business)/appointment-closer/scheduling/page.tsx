"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { acActions, useAcStore, type Appointment, type SuggestedSlot } from "../_store/acStore";

type AppointmentStatusUI = "Booked" | "Completed" | "No-Show" | "Cancelled";

function formatDateLabel(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function msToISODate(ms: number) {
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

function addMinutes(ms: number, minutes: number) {
  return ms + minutes * 60 * 1000;
}

function toUIStatus(storeStatus: string): AppointmentStatusUI {
  if (storeStatus === "Booked") return "Booked";
  if (storeStatus === "Canceled") return "Cancelled";
  return "Booked";
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

function parseHHMMToMin(s: string) {
  const [hh, mm] = s.split(":").map((x) => parseInt(x, 10));
  if (!Number.isFinite(hh) || !Number.isFinite(mm)) return 0;
  return hh * 60 + mm;
}

function clamp(n: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, n));
}

function overlaps(aS: number, aE: number, bS: number, bE: number) {
  return aS < bE && bS < aE;
}

function dayStartMs(dayISO: string) {
  return new Date(dayISO + "T00:00:00").getTime();
}

function weekdayKeyFromISO(dayISO: string) {
  const d = new Date(dayISO + "T00:00:00");
  const dow = d.getDay(); // 0=Sun
  switch (dow) {
    case 0:
      return "sun" as const;
    case 1:
      return "mon" as const;
    case 2:
      return "tue" as const;
    case 3:
      return "wed" as const;
    case 4:
      return "thu" as const;
    case 5:
      return "fri" as const;
    default:
      return "sat" as const;
  }
}

type DayAppt = {
  id: string;
  leadId: string;
  client: string;
  service: string;
  date: string;
  startTime: string;
  endTime: string;
  startAt: number;
  endAt: number;
  status: AppointmentStatusUI;
  channel: string;
  convId: string | null;
  isConflict: boolean;
};

type DayListRow =
  | { kind: "now"; nowLabel: string }
  | { kind: "appt"; appt: DayAppt };

type ViewMode = "list" | "timeline";

/** Step 4: deterministic suggestion engine */
function suggestSlots(params: {
  dayISO: string;
  durationMin: number;
  stepMin: number;
  bufferMin: number;
  enabledWindow: { startMin: number; endMin: number } | null;
  appts: { id: string; startAt: number; endAt: number }[];
  nowMs: number;
  limit?: number;
}): SuggestedSlot[] {
  const { dayISO, durationMin, stepMin, bufferMin, enabledWindow, appts, nowMs, limit = 6 } = params;

  if (!enabledWindow) return [];
  if (enabledWindow.endMin <= enabledWindow.startMin) return [];

  const d0 = dayStartMs(dayISO);
  const winStart = d0 + enabledWindow.startMin * 60_000;
  const winEnd = d0 + enabledWindow.endMin * 60_000;

  const durMs = Math.max(15, Math.floor(durationMin)) * 60_000;
  const stepMs = Math.max(5, Math.floor(stepMin)) * 60_000;
  const bufMs = Math.max(0, Math.floor(bufferMin)) * 60_000;

  const blocked = appts.map((a) => ({
    id: a.id,
    s: a.startAt - bufMs,
    e: a.endAt + bufMs,
  }));

  const candidates: SuggestedSlot[] = [];

  for (let s = winStart; s + durMs <= winEnd; s += stepMs) {
    const e = s + durMs;

    // lead time
    if (s - nowMs < 20 * 60_000) continue;

    // reject conflicts
    let hasConflict = false;
    for (let i = 0; i < blocked.length; i++) {
      const b = blocked[i];
      if (overlaps(s, e, b.s, b.e)) {
        hasConflict = true;
        break;
      }
    }
    if (hasConflict) continue;

    const reasons: string[] = [];

    const delta = s - nowMs;
    const soonScore = clamp(60 - Math.floor(delta / (60 * 60_000)) * 5, 10, 60);
    if (soonScore >= 50) reasons.push("Soonest available slot");
    else reasons.push("Available within preferred hours");

    const mid = (enabledWindow.startMin + enabledWindow.endMin) / 2;
    const minsFrom0 = Math.floor((s - d0) / 60_000);
    const midDist = Math.abs(minsFrom0 - mid);
    const midScore = clamp(25 - Math.floor(midDist / 30), 0, 25);
    if (midScore >= 18) reasons.push("Stable mid-day timing");

    let nearestEdgeDist = 999_999_999;
    if (blocked.length) {
      for (let i = 0; i < blocked.length; i++) {
        const b = blocked[i];
        const dist = Math.min(Math.abs(s - b.e), Math.abs(e - b.s));
        if (dist < nearestEdgeDist) nearestEdgeDist = dist;
      }
    }

    const edgeScore = clamp(15 - Math.floor(nearestEdgeDist / (30 * 60_000)), 0, 15);
    if (edgeScore >= 10) reasons.push("Minimizes schedule gaps");

    const score = clamp(soonScore + midScore + edgeScore, 0, 100);
    candidates.push({ startAt: s, endAt: e, score, reasons: reasons.slice(0, 3) });
  }

  candidates.sort((a, b) => b.score - a.score || a.startAt - b.startAt);
  return candidates.slice(0, limit);
}

export default function SchedulingPage() {
  const leads = useAcStore((s) => s.leads);
  const convs = useAcStore((s) => s.conversations);
  const appts = useAcStore((s) => s.appointments);
  const settings = useAcStore((s) => s.settings);
  const schedUi = useAcStore((s) => s.ui?.scheduling);

  // ✅ stable “today” for this session (avoids recompute per render)
  const todayISO = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const [selectedDate, setSelectedDate] = useState<string>(todayISO);

  const [nowMs, setNowMs] = useState<number>(() => Date.now());
  const isTodaySelected = selectedDate === todayISO;

  useEffect(() => {
    if (!isTodaySelected) return;
    setNowMs(Date.now());
    const t = setInterval(() => setNowMs(Date.now()), 30_000);
    return () => clearInterval(t);
  }, [isTodaySelected]);

  const [viewMode, setViewMode] = useState<ViewMode>("list");

  // Quick create
  const [newClient, setNewClient] = useState("");
  const [newService, setNewService] = useState("");
  const [newDate, setNewDate] = useState<string>(todayISO);
  const [newStartTime, setNewStartTime] = useState("09:00");
  const [newEndTime, setNewEndTime] = useState("09:30");
  const [newChannel, setNewChannel] = useState("Manual"); // UI only

  /** -------------------------
   * Step 5 — Build lookup maps once (O(n) access)
   * -------------------------- */
  const leadById = useMemo(() => {
    const m = new Map<string, (typeof leads)[number]>();
    for (const l of leads) m.set(l.id, l);
    return m;
  }, [leads]);

  const convByLeadId = useMemo(() => {
    const m = new Map<string, (typeof convs)[number]>();
    for (const c of convs) m.set(c.leadId, c);
    return m;
  }, [convs]);

  const apptById = useMemo(() => {
    const m = new Map<string, Appointment>();
    for (const a of appts) m.set(a.id, a);
    return m;
  }, [appts]);

  const newDurationMin = useMemo(() => {
    const s = new Date(`${newDate}T${newStartTime}:00`).getTime();
    const e = new Date(`${newDate}T${newEndTime}:00`).getTime();
    return Math.max(15, Math.round((e - s) / 60000));
  }, [newDate, newStartTime, newEndTime]);

  const appointmentsForDay = useMemo((): DayAppt[] => {
    const list: DayAppt[] = [];

    for (const a of appts) {
      if (a.status === "Canceled") continue;

      const date = msToISODate(a.startAt);
      if (date !== selectedDate) continue;

      const lead = leadById.get(a.leadId);
      const convo = convByLeadId.get(a.leadId);

      const startAt = a.startAt;
      const endAt = addMinutes(a.startAt, a.durationMin);

      list.push({
        id: a.id,
        leadId: a.leadId,
        client: lead?.name ?? "Unknown",
        service: a.service,
        date,
        startTime: timeHHMM(startAt),
        endTime: timeHHMM(endAt),
        startAt,
        endAt,
        status: toUIStatus(a.status),
        channel: convo ? channelLabel(convo.channel) : "Manual",
        convId: convo?.id ?? null,
        isConflict: false,
      });
    }

    list.sort((x, y) => x.startAt - y.startAt);

    // overlaps
    for (let i = 1; i < list.length; i++) {
      const prev = list[i - 1];
      const cur = list[i];
      if (cur.startAt < prev.endAt) {
        prev.isConflict = true;
        cur.isConflict = true;
      }
    }

    return list;
  }, [appts, selectedDate, leadById, convByLeadId]);

  const dayRows = useMemo((): DayListRow[] => {
    const rows: DayListRow[] = appointmentsForDay.map((appt) => ({ kind: "appt", appt }));
    if (!isTodaySelected) return rows;

    const nowLabel = timeHHMM(nowMs);
    const idx = appointmentsForDay.findIndex((a) => a.startAt > nowMs);
    const markerRow: DayListRow = { kind: "now", nowLabel };

    if (rows.length === 0) return [markerRow];
    if (idx === -1) return [...rows, markerRow];
    return [...rows.slice(0, idx), markerRow, ...rows.slice(idx)];
  }, [appointmentsForDay, isTodaySelected, nowMs]);

  const stats = useMemo(() => {
    let todayCount = 0;
    let upcomingCount = 0;

    for (const a of appts) {
      if (a.status === "Canceled") continue;
      const d = msToISODate(a.startAt);
      if (d === todayISO) todayCount += 1;
      if (d >= todayISO && a.status === "Booked") upcomingCount += 1;
    }

    return { todayCount, upcomingCount, completedCount: 0 };
  }, [appts, todayISO]);

  // 7-day window
  const weekDates = useMemo(() => {
    const result: string[] = [];
    const start = new Date(todayISO + "T00:00:00");
    for (let i = 0; i < 7; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      result.push(d.toISOString().slice(0, 10));
    }
    return result;
  }, [todayISO]);

  const weekCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const d of weekDates) map[d] = 0;

    for (const a of appts) {
      if (a.status === "Canceled") continue;
      const d = msToISODate(a.startAt);
      if (map[d] !== undefined) map[d] += 1;
    }

    return map;
  }, [appts, weekDates]);

  const dayConflictCount = useMemo(() => appointmentsForDay.filter((a) => a.isConflict).length, [appointmentsForDay]);

  const workingWindowForNewDate = useMemo(() => {
    const key = weekdayKeyFromISO(newDate);
    const h = settings.hours[key];
    if (!h || !h.enabled) return null;
    const startMin = parseHHMMToMin(h.open);
    const endMin = parseHHMMToMin(h.close);
    return endMin > startMin ? { startMin, endMin } : null;
  }, [settings.hours, newDate]);

  const apptsForNewDate = useMemo(() => {
    const out: { id: string; startAt: number; endAt: number }[] = [];
    for (const a of appts) {
      if (a.status === "Canceled") continue;
      if (msToISODate(a.startAt) !== newDate) continue;
      out.push({ id: a.id, startAt: a.startAt, endAt: addMinutes(a.startAt, a.durationMin) });
    }
    out.sort((a, b) => a.startAt - b.startAt);
    return out;
  }, [appts, newDate]);

  // compute suggestions (deterministic)
  const computedSuggestions: SuggestedSlot[] = useMemo(() => {
    const stepMin = settings.booking.slotMinutes || 30;
    const bufferMin = settings.booking.bufferMinutes || 10;

    return suggestSlots({
      dayISO: newDate,
      durationMin: newDurationMin,
      stepMin,
      bufferMin,
      enabledWindow: workingWindowForNewDate,
      appts: apptsForNewDate,
      nowMs,
      limit: 6,
    });
  }, [
    settings.booking.slotMinutes,
    settings.booking.bufferMinutes,
    newDate,
    newDurationMin,
    workingWindowForNewDate,
    apptsForNewDate,
    nowMs,
  ]);

  // Persist only when meaningfully changed
  const lastPersistKey = useRef<string>("");

  useEffect(() => {
    const key = `${newDate}|${newDurationMin}|${computedSuggestions
      .map((x) => `${x.startAt}-${x.endAt}-${x.score}`)
      .join(",")}`;

    if (key === lastPersistKey.current) return;
    lastPersistKey.current = key;

    acActions.setSlotSuggestions(newDate, newDurationMin, computedSuggestions);
  }, [newDate, newDurationMin, computedSuggestions]);

  // Use store when it matches current query
  const slotSuggestions: SuggestedSlot[] = useMemo(() => {
    const storeSlots = schedUi?.slotSuggestions;
    const ok =
      schedUi?.slotSuggestionForDay === newDate &&
      schedUi?.slotSuggestionDurationMin === newDurationMin &&
      Array.isArray(storeSlots);

    return ok ? (storeSlots as SuggestedSlot[]) : computedSuggestions;
  }, [schedUi, newDate, newDurationMin, computedSuggestions]);

  const quickCreateConflicts = useMemo(() => {
    const bufferMin = settings.booking.bufferMinutes || 10;
    const bufMs = Math.max(0, bufferMin) * 60_000;

    const startAt = new Date(`${newDate}T${newStartTime}:00`).getTime();
    const endAt = new Date(`${newDate}T${newEndTime}:00`).getTime();

    const conflicts = apptsForNewDate
      .filter((a) => overlaps(startAt, endAt, a.startAt - bufMs, a.endAt + bufMs))
      .map((a) => {
        const apt = apptById.get(a.id);
        const lead = apt ? leadById.get(apt.leadId) : undefined;
        return { id: a.id, leadName: lead?.name ?? "Unknown", startAt: a.startAt, endAt: a.endAt };
      });

    return { startAt, endAt, conflicts };
  }, [
    settings.booking.bufferMinutes,
    newDate,
    newStartTime,
    newEndTime,
    apptsForNewDate,
    apptById,
    leadById,
  ]);

  function applySuggestion(slot: SuggestedSlot) {
    const s = new Date(slot.startAt);
    const e = new Date(slot.endAt);
    const start = `${String(s.getHours()).padStart(2, "0")}:${String(s.getMinutes()).padStart(2, "0")}`;
    const end = `${String(e.getHours()).padStart(2, "0")}:${String(e.getMinutes()).padStart(2, "0")}`;
    setNewDate(msToISODate(slot.startAt));
    setNewStartTime(start);
    setNewEndTime(end);
  }

  const handleQuickCreate = () => {
    if (!newClient.trim() || !newService.trim()) return;
    if (quickCreateConflicts.conflicts.length) return;

    const leadId = acActions.ensureLeadByName(newClient.trim(), "Booked");
    const startAt = new Date(`${newDate}T${newStartTime}:00`).getTime();
    const endAt = new Date(`${newDate}T${newEndTime}:00`).getTime();
    const durationMin = Math.max(15, Math.round((endAt - startAt) / 60000));

    acActions.createAppointment(leadId, newService.trim(), startAt, durationMin);

    setSelectedDate(newDate);
    setNewClient("");
    setNewService("");
  };

  /** -------------------------
   * Layout stability values (Step 5)
   * -------------------------- */
  const SUGGESTIONS_MIN_HEIGHT = 320; // keeps Quick Create stable when suggestions change
  const CONFLICT_BOX_MIN_HEIGHT = 160;

  return (
    <div className="space-y-4">
      {/* Header */}
      <section className="surface p-4">
        <div className="ac-toolbar">
          <div>
            <div className="hero-eyebrow">Scheduling</div>
            <h1 className="hero-title" style={{ fontSize: "1.7rem" }}>
              Schedule
            </h1>
            <p className="hero-subtitle" style={{ maxWidth: 900 }}>
              Central view of all appointments booked by AI Appointment Closer — connected to Conversations and CRM.
            </p>
          </div>

          <div className="ac-page-actions">
            <Link className="btn" href="/appointment-closer">
              Dashboard
            </Link>
            <Link className="btn" href="/appointment-closer/conversations">
              Inbox
            </Link>
            <Link className="btn" href="/appointment-closer/crm">
              CRM
            </Link>
            <span className="btn is-current" aria-current="page">
              Scheduling
            </span>
            <Link className="btn" href="/appointment-closer/settings">
              Settings
            </Link>
          </div>

          <div className="kpi-row">
            <div className="kpi">
              <div className="kpi-label">Today</div>
              <div className="kpi-value">{stats.todayCount}</div>
            </div>
            <div className="kpi">
              <div className="kpi-label">Upcoming booked</div>
              <div className="kpi-value">{stats.upcomingCount}</div>
            </div>
            <div className="kpi">
              <div className="kpi-label">Completed</div>
              <div className="kpi-value">{stats.completedCount}</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3-column layout */}
      <div className="ac-sched-grid">
        {/* LEFT */}
        <section className="surface p-3 ac-sched-left">
          <div className="panel-head">
            <div>
              <div className="panel-title">Week overview</div>
              <div className="panel-subtitle">Next 7 days</div>
            </div>
            <button type="button" className="btn" onClick={() => setSelectedDate(todayISO)}>
              Jump to today
            </button>
          </div>

          <div className="week-strip">
            {weekDates.map((d) => {
              const isSelected = d === selectedDate;
              const countForDay = weekCounts[d] ?? 0;
              const dt = new Date(d + "T00:00:00");

              return (
                <button
                  key={d}
                  type="button"
                  onClick={() => setSelectedDate(d)}
                  className={`week-day ${isSelected ? "active" : ""}`}
                >
                  <div className="week-day-num">{dt.getDate()}</div>
                  <div className="week-day-dow">{dt.toLocaleDateString(undefined, { weekday: "short" })}</div>
                  <div className="week-day-count">{countForDay ? `${countForDay} appt` : "—"}</div>
                </button>
              );
            })}
          </div>

          <div className="note" style={{ marginTop: "0.75rem" }}>
            Later, this connects to real calendar integrations (Google, Outlook, etc.).
          </div>
        </section>

        {/* MIDDLE */}
        <section className="surface p-3 ac-sched-mid" style={{ display: "flex", flexDirection: "column" }}>
          <div className="panel-head" style={{ marginBottom: "0.75rem" }}>
            <div>
              <div className="panel-title">{formatDateLabel(selectedDate)}</div>
              <div className="panel-subtitle">
                {appointmentsForDay.length} appointment{appointmentsForDay.length !== 1 ? "s" : ""} ·{" "}
                {dayConflictCount ? (
                  <span style={{ fontWeight: 900 }}>
                    {dayConflictCount} conflict{dayConflictCount !== 1 ? "s" : ""}
                  </span>
                ) : (
                  "No conflicts"
                )}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                flexWrap: "wrap",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              {isTodaySelected ? <span className="badge badge-soft">NOW {timeHHMM(nowMs)}</span> : null}
              {dayConflictCount ? <span className="badge badge-warn">CONFLICTS</span> : null}

              <button type="button" className="btn" onClick={() => setViewMode((m) => (m === "list" ? "timeline" : "list"))}>
                View: {viewMode === "list" ? "List" : "Timeline"}
              </button>

              <Link className="btn" href={`/appointment-closer/crm?apptDate=${selectedDate}`}>
                Jump to CRM (day)
              </Link>

              <span className="badge">DAY</span>
            </div>
          </div>

          {appointmentsForDay.length === 0 ? (
            <div className="panel">
              <div className="panel-title">No appointments yet</div>
              <div className="panel-subtitle">When AI AC books a slot, it will appear here.</div>
            </div>
          ) : (
            <div className="day-list">
              {dayRows.map((row, idx) => {
                if (row.kind === "now") {
                  return (
                    <div key={`now-${idx}`} className="now-marker" aria-label={`Current time ${row.nowLabel}`}>
                      <div className="now-line" />
                      <div className="now-pill">
                        <span className="badge badge-soft">NOW</span>
                        <span style={{ fontWeight: 900, color: "var(--text-strong)" }}>{row.nowLabel}</span>
                      </div>
                    </div>
                  );
                }

                const a = row.appt;
                return (
                  <div key={a.id} className={`appt-card ${a.isConflict ? "is-conflict" : ""}`}>
                    <div className="appt-top">
                      <div className="appt-name">{a.client}</div>
                      <div className="appt-time">
                        {a.startTime} – {a.endTime}
                      </div>
                    </div>

                    <div className="appt-sub">
                      <span>{a.service}</span>
                      <span className="badge">{a.channel}</span>
                    </div>

                    <div className="appt-actions">
                      {a.isConflict ? <span className="badge badge-warn">Conflict</span> : null}
                      <span className="badge badge-green">{a.status}</span>

                      <Link className="btn" href={`/appointment-closer/crm?leadId=${a.leadId}`}>
                        View in CRM
                      </Link>

                      <Link
                        className="btn"
                        href={
                          a.convId
                            ? `/appointment-closer/conversations?convId=${a.convId}`
                            : `/appointment-closer/conversations?leadId=${a.leadId}`
                        }
                      >
                        Open conversation
                      </Link>
                    </div>

                    {a.isConflict ? (
                      <div className="note" style={{ marginTop: "0.45rem" }}>
                        This appointment overlaps another one. (Resolve actions live in Quick Create suggestions.)
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* RIGHT */}
        <section className="surface p-3 ac-sched-right">
          <div className="panel-head">
            <div>
              <div className="panel-title">Quick create</div>
              <div className="panel-subtitle">Manual add (demo)</div>
            </div>
            <div className="badge">ADD</div>
          </div>

          <div className="panel" style={{ marginTop: "0.75rem" }}>
            <div className="panel-title">New appointment</div>
            <div className="panel-subtitle">Creates lead if not found, then books slot</div>

            <div style={{ marginTop: "0.75rem", display: "grid", gap: "0.6rem" }}>
              <div>
                <div className="note" style={{ marginBottom: "0.35rem" }}>
                  Client name
                </div>
                <input className="input" value={newClient} onChange={(e) => setNewClient(e.target.value)} placeholder="Jane Doe" />
              </div>

              <div>
                <div className="note" style={{ marginBottom: "0.35rem" }}>
                  Service
                </div>
                <input
                  className="input"
                  value={newService}
                  onChange={(e) => setNewService(e.target.value)}
                  placeholder="Consultation, haircut, etc."
                />
              </div>

              <div className="ac-sched-form-2">
                <div>
                  <div className="note" style={{ marginBottom: "0.35rem" }}>
                    Date
                  </div>
                  <input className="input" type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} />
                </div>

                <div>
                  <div className="note" style={{ marginBottom: "0.35rem" }}>
                    Channel
                  </div>
                  <input className="input" value={newChannel} onChange={(e) => setNewChannel(e.target.value)} placeholder="Instagram, WhatsApp…" />
                </div>
              </div>

              <div className="ac-sched-form-2">
                <div>
                  <div className="note" style={{ marginBottom: "0.35rem" }}>
                    Start time
                  </div>
                  <input className="input" type="time" value={newStartTime} onChange={(e) => setNewStartTime(e.target.value)} />
                </div>

                <div>
                  <div className="note" style={{ marginBottom: "0.35rem" }}>
                    End time
                  </div>
                  <input className="input" type="time" value={newEndTime} onChange={(e) => setNewEndTime(e.target.value)} />
                </div>
              </div>

              {/* Conflict detection + quick resolution via suggestions (stable height) */}
              <div style={{ minHeight: CONFLICT_BOX_MIN_HEIGHT }}>
                {quickCreateConflicts.conflicts.length ? (
                  <div className="surface" style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 12 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center" }}>
                      <div style={{ fontWeight: 900, color: "var(--text-strong)" }}>Conflict detected</div>
                      <span className="badge badge-warn">RESOLVE</span>
                    </div>
                    <div className="note" style={{ marginTop: 6 }}>
                      Selected time overlaps an existing appointment (buffer-aware).
                    </div>

                    <div style={{ marginTop: 10, display: "grid", gap: 8 }}>
                      {quickCreateConflicts.conflicts.map((c) => (
                        <div key={c.id} style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                          <div className="note" style={{ fontWeight: 900 }}>
                            {c.leadName}
                          </div>
                          <div className="note">
                            {timeHHMM(c.startAt)}–{timeHHMM(c.endAt)}
                          </div>
                        </div>
                      ))}
                    </div>

                    {slotSuggestions.length ? (
                      <div style={{ marginTop: 12 }}>
                        <div className="note" style={{ marginBottom: 8, fontWeight: 900 }}>
                          Suggested alternatives
                        </div>
                        <div style={{ display: "grid", gap: 8 }}>
                          {slotSuggestions.slice(0, 3).map((s: SuggestedSlot) => (
                            <button key={`${s.startAt}`} type="button" className="btn" onClick={() => applySuggestion(s)}>
                              Apply {timeHHMM(s.startAt)}–{timeHHMM(s.endAt)}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="note" style={{ marginTop: 12 }}>
                        No valid alternatives found within business hours.
                      </div>
                    )}
                  </div>
                ) : null}
              </div>

              {/* Suggestions (stable height) */}
              <div className="panel" style={{ minHeight: SUGGESTIONS_MIN_HEIGHT }}>
                <div className="panel-title">Best times (suggested)</div>
                <div className="panel-subtitle">Deterministic: hours + conflicts + buffers. Explainable reasons only.</div>

                {!workingWindowForNewDate ? (
                  <div className="note" style={{ marginTop: 10 }}>
                    Business hours are disabled for this day. Enable hours in Settings.
                  </div>
                ) : slotSuggestions.length === 0 ? (
                  <div className="note" style={{ marginTop: 10 }}>
                    No available slots found for this duration.
                  </div>
                ) : (
                  <div style={{ marginTop: 10, display: "grid", gap: 10 }}>
                    {slotSuggestions.map((s: SuggestedSlot) => (
                      <div
                        key={`${s.startAt}`}
                        className="surface"
                        style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 12, display: "grid", gap: 8 }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center" }}>
                          <div style={{ fontWeight: 900, color: "var(--text-strong)" }}>
                            {timeHHMM(s.startAt)}–{timeHHMM(s.endAt)}
                          </div>
                          <button type="button" className="btn" onClick={() => applySuggestion(s)}>
                            Use
                          </button>
                        </div>

                        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                          {s.reasons.slice(0, 3).map((r, i) => (
                            <span key={i} className="badge badge-soft">
                              {r}
                            </span>
                          ))}
                        </div>

                        <div className="note">Score: {s.score}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button type="button" className="btn btn-primary" onClick={handleQuickCreate} disabled={quickCreateConflicts.conflicts.length > 0}>
                Add appointment
              </button>

              <div className="note">
                Next Step (Step 4): wire these suggestions to AI proposals in conversations (proposing_times state) with “why this time” surfaced.
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
