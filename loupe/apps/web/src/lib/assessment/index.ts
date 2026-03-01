// ─────────────────────────────────────────────────────────────────────────────
// Loupe — Assessment Engine (barrel export)
//
// ██████████████████████████████████████████████████████████████████████████████
// ██  SERVER-SIDE ONLY — NEVER import from client components.               ██
// ██  This module re-exports the scoring engine for use in Route Handlers.  ██
// ██████████████████████████████████████████████████████████████████████████████
// ─────────────────────────────────────────────────────────────────────────────

// Scoring
export {
  scoreAssessment,
  scoreQuickAssessment,
  scoreDeepAssessment,
} from "./scoring";

// Question pools (server-side for seed scripts; clients get questions via props)
export { SEED_QUESTIONS } from "./questions";
export { DEEP_ADDITIONAL_QUESTIONS } from "./questions-deep";
export {
  getQuickQuestions,
  getDeepQuestions,
  getDeepQuestionsExcluding,
  getQuestionDomainMap,
} from "./question-bank";
