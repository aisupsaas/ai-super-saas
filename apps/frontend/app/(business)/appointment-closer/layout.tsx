// ai-super-saas/apps/frontend/app/(business)/appointment-closer/layout.tsx
"use client";

import type React from "react";
import { useEffect } from "react";

export default function AppointmentCloserLayout({ children }: { children: React.ReactNode }) {
  // ✅ AC-only styling flags (body + html)
  useEffect(() => {
    const prevBody = document.body.getAttribute("data-app");
    const hadHtmlClass = document.documentElement.classList.contains("in-ac");

    document.body.setAttribute("data-app", "appointment-closer");
    document.documentElement.classList.add("in-ac");

    return () => {
      if (prevBody) document.body.setAttribute("data-app", prevBody);
      else document.body.removeAttribute("data-app");

      if (!hadHtmlClass) document.documentElement.classList.remove("in-ac");
    };
  }, []);

  return (
    <div className="ac-app-bg">
      <div className="ac-shell">{children}</div>
    </div>
  );
}
