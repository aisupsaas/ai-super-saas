// apps/frontend/app/(business)/appointment-closer/_logic/acSlotSuggest.ts

import type { Hours } from "../_store/acStore";

/** If you already exported SuggestedSlot in acStore.ts, import it instead of redefining.
 *  Example:
 *    import type { SuggestedSlot, Hours } from "../_store/acStore";
 */
export type SuggestedSlot = {
  startAt: number; // ms
  endAt: number; // ms
  score: number; // 0..100
  reasons: string[]; // short explainable strings
};

type Appt = { id: string; startAt: number; endAt: number };

function overlaps(aS: number, aE: number, bS: number, bE: number) {
  return aS < bE && bS < aE;
}

function clamp(n: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, n));
}

function parseHHMMToMin(s: string) {
  const [hh, mm] = s.split(":").map((x) => parseInt(x, 10));
  if (!Number.isFinite(hh) || !Number.isFinite(mm)) return 0;
  return hh * 60 + mm;
}

function weekdayKeyFromISO(dayISO: string): keyof Hours {
  const d = new Date(dayISO + "T00:00:00");
  const dow = d.getDay(); // 0=Sun
  switch (dow) {
    case 0:
      return "sun";
    case 1:
      return "mon";
    case 2:
      return "tue";
    case 3:
      return "wed";
    case 4:
      return "thu";
    case 5:
      return "fri";
    default:
      return "sat";
  }
}

function dayStartMs(dayISO: string) {
  return new Date(dayISO + "T00:00:00").getTime();
}

/** Convert your Settings.hours into a working window for a given dayISO */
export function getWorkingWindowForDay(params: {
  dayISO: string;
  hours: Hours;
}): { startMin: number; endMin: number } | null {
  const { dayISO, hours } = params;
  const key = weekdayKeyFromISO(dayISO);
  const h = hours[key];
  if (!h || !h.enabled) return null;

  const startMin = parseHHMMToMin(h.open);
  const endMin = parseHHMMToMin(h.close);
  if (endMin <= startMin) return null;

  return { startMin, endMin };
}

/** Deterministic suggestion engine (logic-first, explainable) */
export function suggestSlots(params: {
  dayISO: string; // "YYYY-MM-DD"
  durationMin: number;
  stepMin?: number; // default 15
  bufferMin?: number; // default 10
  hours: Hours; // ✅ uses your existing Settings.hours shape
  appts: Appt[];
  nowMs?: number;
  limit?: number; // default 6
}): SuggestedSlot[] {
  const {
    dayISO,
    durationMin,
    stepMin = 15,
    bufferMin = 10,
    hours,
    appts,
    nowMs = Date.now(),
    limit = 6,
  } = params;

  const win = getWorkingWindowForDay({ dayISO, hours });
  if (!win) return [];

  const d0 = dayStartMs(dayISO);
  const winStart = d0 + win.startMin * 60_000;
  const winEnd = d0 + win.endMin * 60_000;

  const durMs = Math.max(15, Math.floor(durationMin)) * 60_000;
  const stepMs = Math.max(5, Math.floor(stepMin)) * 60_000;
  const bufMs = Math.max(0, Math.floor(bufferMin)) * 60_000;

  const blocked = appts.map((a) => ({
    id: a.id,
    s: a.startAt - bufMs,
    e: a.endAt + bufMs,
  }));

  const candidates: SuggestedSlot[] = [];

  for (let s = winStart; s + durMs <= winEnd; s += stepMs) {
    const e = s + durMs;

    // 20-minute lead time to avoid "book for right now"
    if (s - nowMs < 20 * 60_000) continue;

    // reject if overlaps buffered appointments
    const conflicts = blocked.filter((b) => overlaps(s, e, b.s, b.e));
    if (conflicts.length) continue;

    const reasons: string[] = [];

    // Heuristic 1: soonest availability (stable + deterministic)
    const delta = s - nowMs;
    const soonScore = clamp(60 - Math.floor(delta / (60 * 60_000)) * 5, 10, 60);
    if (soonScore >= 50) reasons.push("Soonest available slot");
    else reasons.push("Available within preferred hours");

    // Heuristic 2: mid-window stability (mild preference)
    const mid = (win.startMin + win.endMin) / 2;
    const minsFrom0 = Math.floor((s - d0) / 60_000);
    const midDist = Math.abs(minsFrom0 - mid);
    const midScore = clamp(25 - Math.floor(midDist / 30), 0, 25);
    if (midScore >= 18) reasons.push("Stable mid-day timing");

    // Heuristic 3: reduce fragmentation (prefer near edges of existing blocks)
    const nearestEdgeDist =
      blocked.length > 0
        ? Math.min(...blocked.map((b) => Math.min(Math.abs(s - b.e), Math.abs(e - b.s))))
        : 999_999_999;

    const edgeScore = clamp(15 - Math.floor(nearestEdgeDist / (30 * 60_000)), 0, 15);
    if (edgeScore >= 10) reasons.push("Minimizes schedule gaps");

    const score = clamp(soonScore + midScore + edgeScore, 0, 100);

    candidates.push({
      startAt: s,
      endAt: e,
      score,
      reasons: reasons.slice(0, 3),
    });
  }

  candidates.sort((a, b) => b.score - a.score || a.startAt - b.startAt);
  return candidates.slice(0, limit);
}
