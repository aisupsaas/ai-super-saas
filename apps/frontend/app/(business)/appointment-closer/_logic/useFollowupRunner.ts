// apps/frontend/app/(business)/appointment-closer/_logic/useFollowupRunner.ts

"use client";

import { useEffect, useRef } from "react";
import { acActions } from "../_store/acStore";

export function useFollowupRunner(enabled: boolean = true) {
  const didRunOnceRef = useRef(false);

  useEffect(() => {
    if (!enabled) return;

    // Avoid double immediate run in dev StrictMode
    if (!didRunOnceRef.current) {
      didRunOnceRef.current = true;
      acActions.runDueFollowups(Date.now());
    }

    const t = window.setInterval(() => {
      acActions.runDueFollowups(Date.now());
    }, 30_000);

    return () => window.clearInterval(t);
  }, [enabled]);
}
