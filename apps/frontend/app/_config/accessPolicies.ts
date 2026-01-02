// apps/frontend/app/_config/accessPolicies.ts

export type AccessPolicy =
  | { type: "explore" }
  | { type: "hold"; token: "AI_SUP"; minAmount: number }
  | { type: "spend"; token: "AI_SUP"; cost: number };

export const APP_ACCESS: Record<string, AccessPolicy> = {
  // Appointment Closer example:
  "appointment-closer": { type: "hold", token: "AI_SUP", minAmount: 1 },

  // Example explore-only apps:
  "public-gallery": { type: "explore" },

  // Example spend apps:
  "premium-app": { type: "spend", token: "AI_SUP", cost: 5 },
};

// Optional: per-feature policies
export const FEATURE_ACCESS: Record<string, AccessPolicy> = {
  "appointment-closer.ai-send": { type: "hold", token: "AI_SUP", minAmount: 1 },
  "appointment-closer.export": { type: "spend", token: "AI_SUP", cost: 1 },
};
