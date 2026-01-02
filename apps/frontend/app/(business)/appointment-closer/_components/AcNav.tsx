"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/appointment-closer", label: "Dashboard" },
  { href: "/appointment-closer/conversations", label: "Conversations" },
  { href: "/appointment-closer/scheduling", label: "Scheduling" },
  { href: "/appointment-closer/crm", label: "CRM" },
  { href: "/appointment-closer/settings", label: "Settings" },
];

export function AcNav() {
  const path = usePathname();

  return (
    <div className="surface p-3" style={{ position: "sticky", top: 64, zIndex: 20 }}>
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
        <span className="badge">Ai AC</span>
        {links.map((l) => {
          const active = path === l.href;
          return (
            <Link key={l.href} href={l.href} className={`btn ${active ? "disabled" : ""}`}>
              {l.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
