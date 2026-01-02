"use client";

import Link from "next/link";
import { useAuth } from "./AuthProvider";

export default function HeaderAuth() {
  const auth = useAuth();

  // Loading state (prevents flicker)
  if (auth.status === "loading") {
    return (
      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
          Loading…
        </span>
      </div>
    );
  }

  // Guest state
  if (auth.status !== "authed") {
    return (
      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <Link href="/login" className="btn">
          Sign in
        </Link>
        <Link href="/register" className="btn btn-primary">
          Register
        </Link>
      </div>
    );
  }

  // Authed state
  const email = auth.user?.email ?? "Account";
  const holder = !!auth.user?.isTokenHolder;

  return (
    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
      <div className="header-user">
        <span className="header-email" title={email}>
          {email}
        </span>
        <span className={`header-badge ${holder ? "holder" : "registered"}`}>
          {holder ? "HOLD" : "REGISTERED"}
        </span>
      </div>

      <button className="btn" onClick={() => auth.logout()} title="Logout">
        Logout
      </button>
    </div>
  );
}
