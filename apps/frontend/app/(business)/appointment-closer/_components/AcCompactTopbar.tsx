"use client";

import { useEffect } from "react";

/**
 * Adds/removes a class on <html> so we can style the GLOBAL topbar differently
 * while inside the Appointment Closer sub-app.
 */
export function AcCompactTopbar() {
  useEffect(() => {
    const el = document.documentElement;
    el.classList.add("in-ac");
    return () => el.classList.remove("in-ac");
  }, []);

  return null;
}
