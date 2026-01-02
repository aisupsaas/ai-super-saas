"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useAuth } from "./_auth/AuthProvider";

type Gate = "OPEN" | "REGISTER" | "HOLD" | "SPEND" | "SOON";

type AppCard = {
  id: string;
  title: string;
  subtitle: string;
  href?: string; // only present if OPEN for now
  category: "Business" | "Game" | "Etc.";
  gate: Gate; // platform access level
  badge: "LIVE" | "SOON" | "FUTURE" | "EMPTY"; // gate handles locked states
  gradientClass: string;
  icon: string;
  updatedAt: string; // for “Recently Used”
};

const APPS: AppCard[] = [
  // Business
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

  // Game (locked -> HOLD for now)
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

  // Etc (future)
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

function computeGate(app: AppCard, isLoggedIn: boolean, isTokenHolder: boolean): Gate {
  if (app.gate === "OPEN") return "OPEN";
  if (app.gate === "SOON") return "SOON";

  if (app.gate === "REGISTER") return isLoggedIn ? "OPEN" : "REGISTER";
  if (app.gate === "HOLD") return isLoggedIn && isTokenHolder ? "OPEN" : "HOLD";

  // SPEND stays locked for now
  return "SPEND";
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

function Row({
  title,
  hint,
  items,
  viewAllHref,
}: {
  title: string;
  hint?: string;
  items: AppCard[];
  viewAllHref?: string;
}) {
  return (
    <section className="category-section">
      <div className="row-header">
        <h2 className="category-title">{title}</h2>

        <div className="row-hint">
          {hint ? hint : ""}

          {viewAllHref && (
            <Link
              href={viewAllHref}
              style={{
                marginLeft: "0.8rem",
                color: "var(--accent)",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              View all →
            </Link>
          )}
        </div>
      </div>

      <div className="horizontal-scroll snap">
        {items.map((app) => (
          <div key={app.id} className="snap-item">
            <Card app={app} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default function HomePage() {
  const auth = useAuth();
  const isLoggedIn = auth.status === "authed";
  const isTokenHolder = !!auth.user?.isTokenHolder;

  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return APPS;
    return APPS.filter((a) => {
      const hay = `${a.title} ${a.subtitle} ${a.category} ${a.badge} ${a.gate}`.toLowerCase();
      return hay.includes(s);
    });
  }, [q]);

  // 2) Auth-aware list (dynamic gate + safe href)
  const displayApps = useMemo(() => {
    return filtered.map((a) => {
      const displayGate = computeGate(a, isLoggedIn, isTokenHolder);

      // Only allow navigation when OPEN and href exists
      const canOpen = displayGate === "OPEN" && !!a.href;

      return {
        ...a,
        gate: displayGate,
        href: canOpen ? a.href : undefined,
      } as AppCard;
    });
  }, [filtered, isLoggedIn, isTokenHolder]);

  // 3) Recently used must come AFTER displayApps
  const recentlyUsed = useMemo(() => {
    return [...displayApps]
      .filter((a) => a.gate === "OPEN" && a.href)
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
      .slice(0, 6);
  }, [displayApps]);

  // 4) Category splits
  const business = displayApps.filter((a) => a.category === "Business");
  const game = displayApps.filter((a) => a.category === "Game");
  const etc = displayApps.filter((a) => a.category === "Etc.");

  // 5) Featured
  const featured = useMemo(() => {
    return business.slice(0, 4);
  }, [business]);

  return (
    <div className="space-y-10">
      {/* Hero */}
      <section className="dash-hero surface">
        <div className="dash-hero-inner hero-grid">
          {/* Left */}
          <div>
            <div className="dash-eyebrow">AI PLATFORM</div>
            <h1 className="dash-title">AI SUP SAAS</h1>

            <p className="dash-subtitle">
              A multi-category platform. Start with <b>Ai Appointment Closer</b> — then unlock the rest.
            </p>

            <div className="dashboard-pill-row" style={{ marginTop: "0.8rem" }}>
              <span className="dashboard-pill">1) Register → browse</span>
              <span className="dashboard-pill">2) Hold tokens → unlock</span>
              <span className="dashboard-pill">3) Spend tokens → premium actions</span>
            </div>

            {/* Search */}
            <div className="dash-search" style={{ marginTop: "1rem" }}>
              <input
                className="search-input"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search apps, categories, features..."
              />
              <button className="btn" onClick={() => setQ("")}>
                Clear
              </button>
            </div>
          </div>

          {/* Right CTA */}
          <aside className="hero-cta">
            <div className="hero-cta-title">Get started</div>
            <div className="hero-cta-text">
              Create an account to unlock your dashboard and access modules based on your level
              (Register / Hold / Spend).
            </div>

            <div className="hero-cta-actions">
              <Link className="btn" href="/register">
                Register
              </Link>
              <Link className="btn" href="/login">
                Sign in
              </Link>
            </div>

            <div className="hero-cta-text" style={{ opacity: 0.9 }}>
              No wallet required to register. Token checks come later.
            </div>
          </aside>
        </div>
      </section>

      {/* Featured first */}
      <Row title="Featured" hint="Start here" items={featured} />

      {/* Recently used */}
      <Row
        title="Recently used"
        hint="Quick access to your active modules"
        items={recentlyUsed.length ? recentlyUsed : business.slice(0, 2)}
      />

      {/* Business */}
      <Row
        title="Business"
        hint="Core SaaS modules"
        items={business}
        viewAllHref="/category/business"
      />

      {/* Game */}
      <Row
        title="Game (GKP — Gain Knowledge by Playing)"
        hint="Learning games will appear here"
        items={game}
        viewAllHref="/category/game"
      />

      {/* Etc */}
      <Row
        title="Etc."
        hint="Experimental tools and future ideas"
        items={etc}
        viewAllHref="/category/etc"
      />

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="surface p-4">
          <p className="text-sm text-gray-600">
            No results for <b>{q}</b>. Try another keyword.
          </p>
        </div>
      )}
    </div>
  );
}
