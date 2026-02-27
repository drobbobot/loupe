// ─────────────────────────────────────────────────────────────────────────────
// Loupe — Assessment Engine (barrel export)
//
// ██████████████████████████████████████████████████████████████████████████████
// ██  SERVER-SIDE ONLY — NEVER import from client components.               ██
// ██  This module re-exports the scoring engine for use in Route Handlers.  ██
// ██████████████████████████████████████████████████████████████████████████████
// ─────────────────────────────────────────────────────────────────────────────

export { scoreAssessment } from "./scoring";
export { SEED_QUESTIONS } from "./questions";
