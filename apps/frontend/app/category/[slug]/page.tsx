"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useParams } from "next/navigation";

type Gate = "OPEN" | "REGISTER" | "HOLD" | "SPEND" | "SOON";

type AppCard = {
  id: string;
  title: string;
  subtitle: string;
  href?: string;
  category: "Business" | "Game" | "Etc.";
  gate: Gate;
  badge: "LIVE" | "SOON" | "FUTURE" | "EMPTY";
  gradientClass: string;
  icon: string;
  updatedAt: string;
};

const APPS: AppCard[] = [
  {
    id: "ai-ac",
    title: "Ai Appointment Closer",
    subtitle: "Automated conversations, scheduling, and CRM — no human needed.",
    href: "/appointment-closer",
    category: "Business",
    gate: "OPEN",
    badge: "LIVE",
    gradientClass: "grad-green",
    icon: "🤖",
    updatedAt: "2025-12-15",
  },
  {
    id: "rights",
    title: "AI Rights Manager",
    subtitle: "Ownership, licensing, and revenue tracking for creators.",
    category: "Business",
    gate: "SOON",
    badge: "SOON",
    gradientClass: "grad-slate",
    icon: "🧾",
    updatedAt: "2025-12-01",
  },
  {
    id: "builder",
    title: "AI One-Page Business Builder",
    subtitle: "Turn ideas into a business blueprint in minutes.",
    category: "Business",
    gate: "SOON",
    badge: "SOON",
    gradientClass: "grad-indigo",
    icon: "🧠",
    updatedAt: "2025-11-20",
  },
  {
    id: "ops",
    title: "AI Operations Brain",
    subtitle: "Central brain for workflows, SOPs, and operations.",
    category: "Business",
    gate: "SOON",
    badge: "FUTURE",
    gradientClass: "grad-amber",
    icon: "⚙️",
    updatedAt: "2025-11-07",
  },

  ...Array.from({ length: 5 }).map((_, i) => ({
    id: `gkp-${i}`,
    title: "Coming Soon",
    subtitle: "Educational game modules will appear here.",
    category: "Game" as const,
    gate: "HOLD" as const,
    badge: "EMPTY" as const,
    gradientClass: "grad-slate",
    icon: "🎮",
    updatedAt: "2025-10-01",
  })),

  ...Array.from({ length: 5 }).map((_, i) => ({
    id: `etc-${i}`,
    title: "Future Module",
    subtitle: "Reserved space for experimental tools and ideas.",
    category: "Etc." as const,
    gate: "SOON" as const,
    badge: "EMPTY" as const,
    gradientClass: "grad-slate",
    icon: "🧪",
    updatedAt: "2025-09-01",
  })),
];

function gateCtaLabel(gate: Gate) {
  switch (gate) {
    case "OPEN":
      return "Open →";
    case "REGISTER":
      return "Register →";
    case "HOLD":
      return "Hold required";
    case "SPEND":
      return "Spend required";
    case "SOON":
    default:
      return "Soon";
  }
}

function overlayTitle(gate: Gate) {
  return gate === "REGISTER" ? "Register" : "Locked";
}

function overlayText(gate: Gate) {
  switch (gate) {
    case "REGISTER":
      return "Create an account to access this module.";
    case "HOLD":
      return "Hold tokens to unlock.";
    case "SPEND":
      return "Spend tokens to use premium actions.";
    case "SOON":
    default:
      return "This module is coming soon.";
  }
}

function overlayBadge(gate: Gate) {
  switch (gate) {
    case "REGISTER":
      return "REGISTER";
    case "HOLD":
      return "HOLD";
    case "SPEND":
      return "SPEND";
    case "SOON":
    default:
      return "SOON";
  }
}

function Card({ app }: { app: AppCard }) {
  const isOpen = app.gate === "OPEN" && !!app.href;

  const inner = (
    <div className={`app-tile ${app.gradientClass}`}>
      <div className="app-tile-inner">
        <div className="app-tile-top">
          <div className="app-icon">{app.icon}</div>
          <div className={`app-badge ${app.badge !== "LIVE" ? "muted" : ""}`}>
            {app.badge}
          </div>
        </div>

        <div className="app-tile-mid">
          <div className="app-title">{app.title}</div>
          <div className="app-subtitle">{app.subtitle}</div>
        </div>

        <div className="app-tile-bottom">
          <span className="app-meta">{app.category}</span>
          <span className="app-cta">{gateCtaLabel(app.gate)}</span>
        </div>

        {!isOpen && (
          <>
            <div className="app-locked-overlay" />
            <div className="module-locked-overlay">
              <div>
                <div className="module-locked-label">{overlayTitle(app.gate)}</div>
                <div className="module-locked-text">{overlayText(app.gate)}</div>
              </div>
              <div className="module-locked-badge">{overlayBadge(app.gate)}</div>
            </div>
          </>
        )}
      </div>
    </div>
  );

  return isOpen ? (
    <Link href={app.href!} className="no-underline">
      {inner}
    </Link>
  ) : (
    <div>{inner}</div>
  );
}

function normalizeSlug(slug: string) {
  const s = slug.trim().toLowerCase();
  if (s === "business") return "Business";
  if (s === "game" || s === "games" || s === "gkp") return "Game";
  if (s === "etc" || s === "etcs" || s === "tools") return "Etc.";
  return null;
}

export default function CategoryPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug ?? "business";

  const category = normalizeSlug(slug);

  const [q, setQ] = useState("");

  const items = useMemo(() => {
    if (!category) return [];
    return APPS.filter((a) => a.category === category);
  }, [category]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return items;
    return items.filter((a) => {
      const hay = `${a.title} ${a.subtitle} ${a.badge} ${a.gate}`.toLowerCase();
      return hay.includes(s);
    });
  }, [q, items]);

  return (
    <div className="space-y-6">
      <section className="surface p-4">
        <div className="hero">
          <div className="hero-eyebrow">CATEGORY</div>
          <h1 className="hero-title">{category ?? "Unknown"}</h1>
          <p className="hero-subtitle">
            Browse all modules in this category. Locked modules show exactly what’s required.
          </p>

          <div className="dash-search" style={{ marginTop: "0.8rem" }}>
            <input
              className="search-input"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search inside this category..."
            />
            <button className="btn" onClick={() => setQ("")}>
              Clear
            </button>
            <Link className="btn" href="/">
              Back
            </Link>
          </div>
        </div>
      </section>

      {/* Grid instead of horizontal scroll on category pages */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))",
          gap: "1rem",
        }}
      >
        {filtered.map((app) => (
          <div key={app.id}>
            <Card app={app} />
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="surface p-4">
          <p className="text-sm text-gray-600">
            No results for <b>{q}</b>.
          </p>
        </div>
      )}
    </div>
  );
}
