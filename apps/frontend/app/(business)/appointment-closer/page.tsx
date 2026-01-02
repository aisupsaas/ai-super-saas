// ai-super-saas/apps/frontend/app/(business)/appointment-closer/page.tsx
"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useAcStore } from "./_store/acStore";

const CHANNELS = ["IG", "WhatsApp", "Facebook", "Website"] as const;

type Channel = (typeof CHANNELS)[number];

function chName(ch: Channel) {
  if (ch === "IG") return "Instagram";
  if (ch === "WhatsApp") return "WhatsApp";
  if (ch === "Facebook") return "Facebook";
  if (ch === "Website") return "Website";
  return ch;
}

function startOfDay(ms: number) {
  const d = new Date(ms);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

function endOfDay(ms: number) {
  const d = new Date(ms);
  d.setHours(23, 59, 59, 999);
  return d.getTime();
}

export default function AppointmentCloserHome() {
  const convs = useAcStore((s) => s.conversations);
  const leads = useAcStore((s) => s.leads);
  const appts = useAcStore((s) => s.appointments);

  const now = Date.now();
  const day0 = startOfDay(now);
  const day1 = endOfDay(now);

  const stats = useMemo(() => {
    const unreadTotal = convs.reduce((sum, c) => sum + (c.unreadCount ?? 0), 0);

    const newLeads = leads.filter((l) => l.stage === "New").length;

    const dueFollowups = leads.filter(
      (l) => !!l.nextFollowUpAt && l.nextFollowUpAt <= now && l.stage !== "Won" && l.stage !== "Lost"
    ).length;

    const apptsToday = appts.filter((a) => a.status !== "Canceled" && a.startAt >= day0 && a.startAt <= day1).length;

    const needsStageUpdate = leads.filter((l) => l.stage === "Qualified").length;

    return { unreadTotal, newLeads, dueFollowups, apptsToday, needsStageUpdate };
  }, [convs, leads, appts, now, day0, day1]);

  const channelStats = useMemo(() => {
    return CHANNELS.map((ch) => {
      const list = convs.filter((c) => c.channel === ch);
      const unread = list.reduce((sum, c) => sum + (c.unreadCount ?? 0), 0);
      return { ch, total: list.length, unread };
    });
  }, [convs]);

  const workQueue = useMemo(() => {
    return [
      {
        title: "Reply to unread messages",
        sub: "Messages → filter: Unread",
        count: stats.unreadTotal,
        href: "/appointment-closer/conversations?filter=Unread",
      },
      {
        title: "Followups due now",
        sub: "Calendar → due followups",
        count: stats.dueFollowups,
        href: "/appointment-closer/scheduling?tab=followups&scope=due",
      },
      {
        title: "New leads to qualify",
        sub: "Leads → stage: New",
        count: stats.newLeads,
        href: "/appointment-closer/crm?stage=New",
      },
      {
        title: "Qualified leads to close",
        sub: "Leads → stage: Qualified",
        count: stats.needsStageUpdate,
        href: "/appointment-closer/crm?stage=Qualified",
      },
    ];
  }, [stats]);

  return (
    <div className="space-y-6">
      {/* HERO + NAV */}
<section className="surface p-4 ac-dash-hero">
  <div className="ac-hero-head">
    {/* ✅ Title + Nav on one row */}
    <div className="ac-hero-top">
      <div className="hero">
        <div className="hero-eyebrow">AI APPOINTMENTS CLOSER</div>

        <div className="ac-hero-title-row">
          <h1 className="hero-title">Dashboard</h1>
        </div>

        <p className="hero-subtitle">
          One place to manage messages, leads, followups, and bookings.
        </p>

        <div className="pill-row" style={{ marginTop: "0.75rem" }}>
          <span className="pill">Modes: Auto / Review / Takeover</span>
          <span className="pill">Followups scheduler</span>
          <span className="pill">Leads + Messages</span>
        </div>
      </div>

      {/* ✅ Segmented nav stays exactly the same, just positioned here */}
      <div className="ac-page-actions ac-dash-nav" aria-label="Appointment Closer navigation">
        <span className="btn is-current" aria-current="page">Dashboard</span>
        <Link className="btn" href="/appointment-closer/conversations">Inbox</Link>
        <Link className="btn" href="/appointment-closer/crm">Leads</Link>
        <Link className="btn" href="/appointment-closer/scheduling">Calendar</Link>
        <Link className="btn" href="/appointment-closer/settings">Settings</Link>
      </div>
    </div>
  </div>
</section>

      {/* TODAY (clickable tiles) */}
      <section className="surface p-4 ac-dash-card">
        <div className="row-header">
          <h2 className="category-title">Today</h2>
          <div className="row-hint">Do these first</div>
        </div>

        <div className="ac-stats" style={{ marginTop: "0.75rem" }}>
          <Link className="ac-stat" href="/appointment-closer/conversations?filter=Unread">
            <div className="ac-stat-label">Unread messages</div>
            <div className="ac-stat-value">{stats.unreadTotal}</div>
          </Link>

          <Link className="ac-stat" href="/appointment-closer/scheduling?tab=followups&scope=due">
            <div className="ac-stat-label">Due followups</div>
            <div className="ac-stat-value">{stats.dueFollowups}</div>
          </Link>

          <Link className="ac-stat" href="/appointment-closer/scheduling?tab=appointments&scope=today">
            <div className="ac-stat-label">Appointments today</div>
            <div className="ac-stat-value">{stats.apptsToday}</div>
          </Link>

          <Link className="ac-stat" href="/appointment-closer/crm?stage=New">
            <div className="ac-stat-label">New leads</div>
            <div className="ac-stat-value">{stats.newLeads}</div>
          </Link>
        </div>
      </section>

      {/* WORK QUEUE (simple list) */}
      <section className="surface p-4 ac-dash-card">
        <div className="row-header">
          <h2 className="category-title">Work queue</h2>
          <div className="row-hint">What to do next</div>
        </div>

        <div style={{ marginTop: "0.75rem", display: "grid", gap: "0.6rem" }}>
          {workQueue.map((x) => (
            <div key={x.title} className="ac-queue-item">
              <div style={{ minWidth: 0 }}>
                <div className="ac-queue-title" style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <span>{x.title}</span>
                  <span className="badge">{x.count}</span>
                </div>
                <div className="ac-queue-sub">{x.sub}</div>
              </div>
              <Link className="btn" href={x.href}>
                Go →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CHANNELS */}
      <section className="surface p-4 ac-dash-card">
        <div className="row-header">
          <h2 className="category-title">Channels</h2>
          <div className="row-hint">Where messages come from</div>
        </div>

        <div className="ac-channels" style={{ marginTop: "0.9rem" }}>
          {channelStats.map((x) => (
            <div key={x.ch} className="panel ac-channel-card ac-dash-channel">
              <div className="panel-head">
                <div>
                  <div className="panel-title">{chName(x.ch)}</div>
                  <div className="panel-subtitle">
                    {x.total} conversation{x.total === 1 ? "" : "s"}
                  </div>
                </div>

                <span className="badge">{x.unread} unread</span>
              </div>

              <div className="ac-dash-channel-actions">
                <Link className="btn" href={`/appointment-closer/conversations?channel=${x.ch}`}>
                  View {chName(x.ch)} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
