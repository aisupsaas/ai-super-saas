// apps/frontend/app/(business)/appointment-closer/_logic/useDevFollowupsTick.ts

"use client";

import { useEffect, useRef } from "react";

export function useDevFollowupsTick(enabled: boolean, tenantId: string) {
  const startedRef = useRef(false);

  useEffect(() => {
    if (!enabled) return;
    if (process.env.NODE_ENV !== "development") return;

    // extra safety gate (must be explicitly enabled)
    const apiTickEnabled = process.env.NEXT_PUBLIC_AC_DEV_API_TICK === "1";
    if (!apiTickEnabled) return;

    const secret = process.env.NEXT_PUBLIC_AC_DEV_CRON_SECRET;
    if (!secret) return;

    if (startedRef.current) return;
    startedRef.current = true;

    const abort = new AbortController();

    const run = async () => {
      if (typeof document !== "undefined" && document.hidden) return;

      try {
        await fetch(`/appointment-closer/api/tenants/${tenantId}/followups/tick`, {
          method: "POST",
          headers: { "x-ac-dev-secret": secret },
          signal: abort.signal,
        });
      } catch {
        // ignore in dev
      }
    };

    run();
    const t = window.setInterval(() => void run(), 30_000);

    return () => {
      abort.abort();
      window.clearInterval(t);
      startedRef.current = false;
    };
  }, [enabled, tenantId]);
}
