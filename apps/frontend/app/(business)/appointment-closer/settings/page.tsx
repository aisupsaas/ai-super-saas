"use client";

import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { acActions, type Settings, useAcStore } from "../_store/acStore";

type Tab = "Business" | "Services" | "FAQ" | "Qualify" | "Booking" | "Follow-ups";

const TAB_META: Record<Tab, { desc: string; pill: string }> = {
  Business: { desc: "Name, timezone, hours", pill: "Core" },
  Services: { desc: "Pricing + durations", pill: "Pricing" },
  FAQ: { desc: "Instant answers library", pill: "Replies" },
  Qualify: { desc: "Pre-book questions", pill: "Leads" },
  Booking: { desc: "Slots, buffers, window", pill: "Rules" },
  "Follow-ups": { desc: "Cold lead sequence", pill: "Automation" },
};

const DAYS = [
  ["mon", "Mon"],
  ["tue", "Tue"],
  ["wed", "Wed"],
  ["thu", "Thu"],
  ["fri", "Fri"],
  ["sat", "Sat"],
  ["sun", "Sun"],
] as const;

export default function AppointmentCloserSettingsPage() {
  const saved = useAcStore((s) => s.settings);

  const [draft, setDraft] = useState<Settings>(saved);
  const [tab, setTab] = useState<Tab>("Business");

  const [dirty, setDirty] = useState(false);
  const [savedFlash, setSavedFlash] = useState<null | "saved">(null);

  // refresh draft when store changes (seed/reset)
  useEffect(() => setDraft(saved), [saved]);

  // dirty indicator
  useEffect(() => {
    const a = JSON.stringify(saved);
    const b = JSON.stringify(draft);
    setDirty(a !== b);
  }, [saved, draft]);

  const checklistDone = useMemo(() => {
    const businessOk = draft.businessName.trim().length > 1;
    const servicesOk = draft.services.some((s) => s.enabled);
    const faqOk = draft.faqs.some((f) => f.enabled);
    const qualOk = draft.qualQs.some((q) => q.enabled);
    const bookingOk = draft.booking.slotMinutes >= 10 && draft.booking.maxDaysAhead >= 1;
    const followOk = draft.followups.sequence.some((f) => f.enabled);

    const doneCount = [businessOk, servicesOk, faqOk, qualOk, bookingOk, followOk].filter(Boolean).length;
    return { doneCount, total: 6 };
  }, [draft]);

  const saveNow = () => {
    acActions.saveSettings(draft);
    setSavedFlash("saved");
    window.setTimeout(() => setSavedFlash(null), 900);
  };

  const resetChanges = () => setDraft(saved);

  return (
    <div className="space-y-4">
      {/* ✅ Unified product header + nav row (no extra top panel) */}
      <section className="surface p-4">
        <div className="ac-toolbar">
          <div>
            <div className="hero-eyebrow">SETTINGS</div>
            <h1 className="hero-title" style={{ fontSize: "1.7rem" }}>
              Ai Appointment Closer Playbook
            </h1>
            <p className="hero-subtitle" style={{ maxWidth: 980 }}>
              Configure the playbook so Ai AC can reply, qualify, book, and follow-up automatically.
            </p>

            <div style={{ marginTop: "0.75rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              <span className="kpi-mini">
                <span className="kpi-dot" />
                Setup: <b>{checklistDone.doneCount}</b> / {checklistDone.total}
              </span>

              <span className="kpi-mini">
                Status:{" "}
                <b style={{ color: dirty ? "var(--text-strong)" : "var(--text-soft)" }}>
                  {dirty ? "Unsaved changes" : "Up to date"}
                </b>
              </span>

              {savedFlash === "saved" ? <span className="kpi-mini">✅ Saved</span> : null}
            </div>
          </div>

          <div style={{ display: "grid", gap: "0.6rem", justifyItems: "end" }}>
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
              <Link className="btn" href="/appointment-closer/scheduling">
                Scheduling
              </Link>
              <span className="btn is-current" aria-current="page">
                Settings
              </span>
            </div>

            <div className="settings-actions">
              <button className="btn" type="button" onClick={saveNow} disabled={!dirty}>
                Save (local)
              </button>
              <button className="btn" type="button" onClick={resetChanges} disabled={!dirty}>
                Reset changes
              </button>
              <button className="btn" type="button" onClick={() => acActions.resetToSeed()}>
                Reset demo data
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Control panel layout */}
      <div className="settings-shell">
        {/* Left nav */}
        <aside className="settings-sidebar">
          <section className="surface p-3">
            <div className="settings-nav">
              {(Object.keys(TAB_META) as Tab[]).map((t) => {
                const active = t === tab;
                return (
                  <button
                    key={t}
                    type="button"
                    className={`settings-tab ${active ? "active" : ""}`}
                    onClick={() => setTab(t)}
                  >
                    <div style={{ minWidth: 0 }}>
                      <div className="settings-tab-title">{t}</div>
                      <div className="settings-tab-sub">{TAB_META[t].desc}</div>
                    </div>
                    <span className="settings-tab-pill">{TAB_META[t].pill}</span>
                  </button>
                );
              })}
            </div>

            <div className="note">
              Tip: enable at least 1 Service + 1 FAQ + 1 Follow-up to see Ai AC behave better in Conversations.
            </div>
          </section>
        </aside>

        {/* Right content */}
        <main className="settings-main">
          {/* BUSINESS */}
          {tab === "Business" && (
            <section className="surface p-4 space-y-4">
              <div>
                <h2 className="section-title">Business info</h2>
                <p className="section-subtitle">These details personalize AI replies and booking rules.</p>
              </div>

              <div className="form-grid-2">
                <Field label="Business name" hint="Shown in messages and summaries">
                  <input
                    className="input"
                    value={draft.businessName}
                    onChange={(e) => setDraft((d) => ({ ...d, businessName: e.target.value }))}
                    placeholder="Example: Sara Studio"
                  />
                </Field>

                <Field label="Timezone" hint="Used for scheduling + follow-ups">
                  <input
                    className="input"
                    value={draft.timezone}
                    onChange={(e) => setDraft((d) => ({ ...d, timezone: e.target.value }))}
                    placeholder="America/New_York"
                  />
                </Field>
              </div>

              <div className="panel">
                <div className="panel-title">Business hours</div>
                <div className="panel-subtitle">Enable a day to allow bookings in that window.</div>
              </div>

              <div className="space-y-2">
                {DAYS.map(([key, label]) => {
                  const day = draft.hours[key];
                  return (
                    <div key={key} className="card-row">
                      <div className="row-split">
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                          <span style={{ width: 44, fontWeight: 900, color: "var(--text-strong)" }}>{label}</span>
                          <span className={`badge ${day.enabled ? "badge-green" : ""}`}>
                            {day.enabled ? "Open" : "Closed"}
                          </span>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                          <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Open</span>
                          <input
                            type="time"
                            className="input"
                            style={{ width: 140 }}
                            value={day.open}
                            onChange={(e) =>
                              setDraft((d) => ({
                                ...d,
                                hours: { ...d.hours, [key]: { ...d.hours[key], open: e.target.value } },
                              }))
                            }
                            disabled={!day.enabled}
                          />

                          <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Close</span>
                          <input
                            type="time"
                            className="input"
                            style={{ width: 140 }}
                            value={day.close}
                            onChange={(e) =>
                              setDraft((d) => ({
                                ...d,
                                hours: { ...d.hours, [key]: { ...d.hours[key], close: e.target.value } },
                              }))
                            }
                            disabled={!day.enabled}
                          />
                        </div>

                        <button
                          type="button"
                          className={`toggle ${day.enabled ? "on" : ""}`}
                          onClick={() =>
                            setDraft((d) => ({
                              ...d,
                              hours: { ...d.hours, [key]: { ...d.hours[key], enabled: !d.hours[key].enabled } },
                            }))
                          }
                        >
                          {day.enabled ? "Enabled" : "Closed"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* SERVICES */}
          {tab === "Services" && (
            <section className="surface p-4 space-y-4">
              <div>
                <h2 className="section-title">Services & pricing</h2>
                <p className="section-subtitle">
                  Ai AC uses enabled services to answer pricing questions and create booking types.
                </p>
              </div>

              <div className="space-y-2">
                {draft.services.map((s) => (
                  <div key={s.id} className="card-row">
                    <div className="row-split">
                      <div style={{ flex: 1, minWidth: 220 }}>
                        <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: 6 }}>
                          Service name
                        </div>
                        <input
                          className="input"
                          value={s.name}
                          onChange={(e) =>
                            setDraft((d) => ({
                              ...d,
                              services: d.services.map((x) => (x.id === s.id ? { ...x, name: e.target.value } : x)),
                            }))
                          }
                        />
                      </div>

                      <div style={{ display: "flex", gap: "0.65rem", flexWrap: "wrap" }}>
                        <div style={{ width: 140 }}>
                          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: 6 }}>
                            From ($)
                          </div>
                          <input
                            type="number"
                            className="input"
                            value={s.priceFrom}
                            onChange={(e) =>
                              setDraft((d) => ({
                                ...d,
                                services: d.services.map((x) =>
                                  x.id === s.id ? { ...x, priceFrom: Number(e.target.value) } : x
                                ),
                              }))
                            }
                          />
                        </div>

                        <div style={{ width: 160 }}>
                          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: 6 }}>
                            Duration (min)
                          </div>
                          <input
                            type="number"
                            className="input"
                            value={s.durationMin}
                            onChange={(e) =>
                              setDraft((d) => ({
                                ...d,
                                services: d.services.map((x) =>
                                  x.id === s.id ? { ...x, durationMin: Number(e.target.value) } : x
                                ),
                              }))
                            }
                          />
                        </div>
                      </div>

                      <button
                        type="button"
                        className={`toggle ${s.enabled ? "on" : ""}`}
                        onClick={() =>
                          setDraft((d) => ({
                            ...d,
                            services: d.services.map((x) => (x.id === s.id ? { ...x, enabled: !x.enabled } : x)),
                          }))
                        }
                      >
                        {s.enabled ? "Enabled" : "Disabled"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* FAQ */}
          {tab === "FAQ" && (
            <section className="surface p-4 space-y-4">
              <div>
                <h2 className="section-title">FAQ answers</h2>
                <p className="section-subtitle">AI matches customer questions to enabled FAQs and replies instantly.</p>
              </div>

              <div className="space-y-2">
                {draft.faqs.map((f) => (
                  <div key={f.id} className="card-row">
                    <div className="row-split" style={{ marginBottom: "0.65rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <span className="badge">FAQ</span>
                        <span className={`badge ${f.enabled ? "badge-green" : ""}`}>
                          {f.enabled ? "Enabled" : "Disabled"}
                        </span>
                      </div>

                      <button
                        type="button"
                        className={`toggle ${f.enabled ? "on" : ""}`}
                        onClick={() =>
                          setDraft((d) => ({
                            ...d,
                            faqs: d.faqs.map((x) => (x.id === f.id ? { ...x, enabled: !x.enabled } : x)),
                          }))
                        }
                      >
                        {f.enabled ? "Enabled" : "Disabled"}
                      </button>
                    </div>

                    <Field label="Question">
                      <input
                        className="input"
                        value={f.q}
                        onChange={(e) =>
                          setDraft((d) => ({
                            ...d,
                            faqs: d.faqs.map((x) => (x.id === f.id ? { ...x, q: e.target.value } : x)),
                          }))
                        }
                        placeholder="Example: How much is a consultation?"
                      />
                    </Field>

                    <Field label="Answer" hint="Keep it short + clear (AI will paste it)">
                      <textarea
                        className="input"
                        style={{ borderRadius: "var(--r-md)", minHeight: 92 }}
                        value={f.a}
                        onChange={(e) =>
                          setDraft((d) => ({
                            ...d,
                            faqs: d.faqs.map((x) => (x.id === f.id ? { ...x, a: e.target.value } : x)),
                          }))
                        }
                        placeholder="Example: Consultation is $50 for 30 minutes. Want morning or afternoon?"
                      />
                    </Field>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* QUALIFY */}
          {tab === "Qualify" && (
            <section className="surface p-4 space-y-4">
              <div>
                <h2 className="section-title">Qualification questions</h2>
                <p className="section-subtitle">Ask these before booking so only qualified leads become appointments.</p>
              </div>

              <div className="space-y-2">
                {draft.qualQs.map((q) => (
                  <div key={q.id} className="card-row">
                    <div className="row-split" style={{ marginBottom: "0.65rem" }}>
                      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
                        <span className="badge">Qualify</span>
                        <span className={`badge ${q.enabled ? "badge-green" : ""}`}>
                          {q.enabled ? "Enabled" : "Disabled"}
                        </span>
                        <span className="badge">{q.required ? "Required" : "Optional"}</span>
                      </div>

                      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                        <button
                          type="button"
                          className={`toggle ${q.required ? "on" : ""}`}
                          onClick={() =>
                            setDraft((d) => ({
                              ...d,
                              qualQs: d.qualQs.map((x) => (x.id === q.id ? { ...x, required: !x.required } : x)),
                            }))
                          }
                        >
                          {q.required ? "Required" : "Optional"}
                        </button>

                        <button
                          type="button"
                          className={`toggle ${q.enabled ? "on" : ""}`}
                          onClick={() =>
                            setDraft((d) => ({
                              ...d,
                              qualQs: d.qualQs.map((x) => (x.id === q.id ? { ...x, enabled: !x.enabled } : x)),
                            }))
                          }
                        >
                          {q.enabled ? "Enabled" : "Disabled"}
                        </button>
                      </div>
                    </div>

                    <Field label="Question">
                      <input
                        className="input"
                        value={q.question}
                        onChange={(e) =>
                          setDraft((d) => ({
                            ...d,
                            qualQs: d.qualQs.map((x) => (x.id === q.id ? { ...x, question: e.target.value } : x)),
                          }))
                        }
                        placeholder="Example: What day/time works best for you?"
                      />
                    </Field>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* BOOKING */}
          {tab === "Booking" && (
            <section className="surface p-4 space-y-4">
              <div>
                <h2 className="section-title">Booking rules</h2>
                <p className="section-subtitle">Control slot sizes, buffers, and how far ahead customers can book.</p>
              </div>

              <div className="form-grid-3">
                <Field label="Slot length (minutes)" hint="Minimum 10">
                  <input
                    type="number"
                    className="input"
                    value={draft.booking.slotMinutes}
                    min={10}
                    onChange={(e) =>
                      setDraft((d) => ({ ...d, booking: { ...d.booking, slotMinutes: Number(e.target.value) } }))
                    }
                  />
                </Field>

                <Field label="Buffer between appointments (minutes)" hint="0 = no buffer">
                  <input
                    type="number"
                    className="input"
                    value={draft.booking.bufferMinutes}
                    min={0}
                    onChange={(e) =>
                      setDraft((d) => ({ ...d, booking: { ...d.booking, bufferMinutes: Number(e.target.value) } }))
                    }
                  />
                </Field>

                <Field label="Max days ahead" hint="Booking window">
                  <input
                    type="number"
                    className="input"
                    value={draft.booking.maxDaysAhead}
                    min={1}
                    onChange={(e) =>
                      setDraft((d) => ({ ...d, booking: { ...d.booking, maxDaysAhead: Number(e.target.value) } }))
                    }
                  />
                </Field>
              </div>

              <div className="form-grid-2">
                <div className="card-row">
                  <div className="row-split">
                    <div>
                      <div style={{ fontWeight: 900, color: "var(--text-strong)" }}>Allow rescheduling</div>
                      <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: 4 }}>
                        Lets leads request new times.
                      </div>
                    </div>
                    <button
                      className={`toggle ${draft.booking.allowReschedule ? "on" : ""}`}
                      type="button"
                      onClick={() =>
                        setDraft((d) => ({
                          ...d,
                          booking: { ...d.booking, allowReschedule: !d.booking.allowReschedule },
                        }))
                      }
                    >
                      {draft.booking.allowReschedule ? "ON" : "OFF"}
                    </button>
                  </div>
                </div>

                <div className="card-row">
                  <div className="row-split">
                    <div>
                      <div style={{ fontWeight: 900, color: "var(--text-strong)" }}>Allow cancellations</div>
                      <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: 4 }}>
                        Lets leads cancel scheduled times.
                      </div>
                    </div>
                    <button
                      className={`toggle ${draft.booking.allowCancel ? "on" : ""}`}
                      type="button"
                      onClick={() =>
                        setDraft((d) => ({
                          ...d,
                          booking: { ...d.booking, allowCancel: !d.booking.allowCancel },
                        }))
                      }
                    >
                      {draft.booking.allowCancel ? "ON" : "OFF"}
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* FOLLOW-UPS */}
          {tab === "Follow-ups" && (
            <section className="surface p-4 space-y-4">
              <div>
                <h2 className="section-title">Follow-up rules</h2>
                <p className="section-subtitle">Ai AC re-engages leads who stop replying using your enabled sequence.</p>
              </div>

              <Field label="Cold lead follow-up starts after (hours)" hint="When a lead goes quiet">
                <input
                  type="number"
                  className="input"
                  value={draft.followups.coldLeadAfterHours}
                  min={1}
                  onChange={(e) =>
                    setDraft((d) => ({
                      ...d,
                      followups: { ...d.followups, coldLeadAfterHours: Number(e.target.value) },
                    }))
                  }
                />
              </Field>

              <div className="space-y-2">
                {draft.followups.sequence.map((f) => (
                  <div key={f.id} className="card-row">
                    <div className="row-split" style={{ marginBottom: "0.65rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                        <span className="badge">Follow-up</span>
                        <span className="badge">After {f.afterHours}h</span>
                        <span className={`badge ${f.enabled ? "badge-green" : ""}`}>
                          {f.enabled ? "Enabled" : "Disabled"}
                        </span>
                      </div>

                      <button
                        className={`toggle ${f.enabled ? "on" : ""}`}
                        type="button"
                        onClick={() =>
                          setDraft((d) => ({
                            ...d,
                            followups: {
                              ...d.followups,
                              sequence: d.followups.sequence.map((x) =>
                                x.id === f.id ? { ...x, enabled: !x.enabled } : x
                              ),
                            },
                          }))
                        }
                      >
                        {f.enabled ? "Enabled" : "Disabled"}
                      </button>
                    </div>

                    <Field label="Message" hint="AI will send exactly this text">
                      <textarea
                        className="input"
                        style={{ borderRadius: "var(--r-md)", minHeight: 92 }}
                        value={f.message}
                        onChange={(e) =>
                          setDraft((d) => ({
                            ...d,
                            followups: {
                              ...d.followups,
                              sequence: d.followups.sequence.map((x) =>
                                x.id === f.id ? { ...x, message: e.target.value } : x
                              ),
                            },
                          }))
                        }
                      />
                    </Field>
                  </div>
                ))}
              </div>

              <div className="note">
                Next: add “test follow-up” to generate drafts inside Conversations for a selected lead.
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="form-row">
      <div className="form-label-row">
        <label className="form-label">{label}</label>
        {hint ? <span className="form-hint">{hint}</span> : null}
      </div>
      {children}
    </div>
  );
}
