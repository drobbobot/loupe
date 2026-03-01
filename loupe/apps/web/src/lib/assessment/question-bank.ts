// ─────────────────────────────────────────────────────────────────────────────
// Loupe — Question Bank
//
// Central module that assembles the question pools for both assessment tiers.
//
// Quick Quiz:  12 questions (2 per domain) — maximum discrimination per question
// Deep:        60 questions (original 35 + 25 new) — full domain coverage
//
// The pre-populate flow: if a user has taken the Quick Quiz, the Deep Assessment
// skips those 12 questions and asks only the remaining 48.
// ─────────────────────────────────────────────────────────────────────────────

import type { AssessmentQuestion, LifeDomain } from "@loupe/types";
import { SEED_QUESTIONS } from "./questions";
import { DEEP_ADDITIONAL_QUESTIONS } from "./questions-deep";

// ── Quick Quiz Questions ─────────────────────────────────────────────────────
// 12 questions selected for maximum per-lens discrimination.
// 2 per domain, deliberately varied input types.

const QUICK_QUESTION_IDS = new Set([
  // Work & Ambition
  "q001",  // slider — productive vs. follow the day
  "q005",  // MC — team project off track

  // Relationships & Intimacy
  "q003",  // binary — honesty vs. gentleness
  "q033",  // slider — suffering of strangers

  // Politics & Society
  "q009",  // slider — rule-breaking
  "q030",  // slider — right way to live

  // Conflict & Stress
  "q016",  // slider — winning arguments
  "q023",  // binary — trust betrayal

  // Meaning & Purpose
  "q008",  // MC — free weekend
  "q032",  // MC — deepest meaning

  // Change & Uncertainty
  "q013",  // binary — logic vs. intuition
  "q028",  // binary — change disrupts plans
]);

/**
 * The 12 Quick Quiz questions, ordered for a good flow experience.
 * Section transitions are injected for the quick-quiz context.
 */
export function getQuickQuestions(): AssessmentQuestion[] {
  const quickPool = SEED_QUESTIONS.filter((q) => QUICK_QUESTION_IDS.has(q.id));

  // Re-number sections for the quick quiz (3 sections of 4)
  // and add quick-quiz-specific transitions
  const ordered: AssessmentQuestion[] = [
    // Section 1: Who are you day to day?
    withQuickMeta(find(quickPool, "q001"), 1, "This takes about 3 minutes. Twelve questions, no right answers \u2014 just go with your gut."),
    withQuickMeta(find(quickPool, "q005"), 1),
    withQuickMeta(find(quickPool, "q003"), 1),
    withQuickMeta(find(quickPool, "q008"), 1),

    // Section 2: How do you see the world?
    withQuickMeta(find(quickPool, "q009"), 2, "Now a few questions about how you see the wider world."),
    withQuickMeta(find(quickPool, "q030"), 2),
    withQuickMeta(find(quickPool, "q016"), 2),
    withQuickMeta(find(quickPool, "q023"), 2),

    // Section 3: What matters most?
    withQuickMeta(find(quickPool, "q032"), 3, "Almost there. These last questions are about what really matters to you."),
    withQuickMeta(find(quickPool, "q033"), 3),
    withQuickMeta(find(quickPool, "q013"), 3),
    withQuickMeta(find(quickPool, "q028"), 3),
  ];

  return ordered;
}

/**
 * All 60 Deep Assessment questions, ordered by life-domain sections.
 * Original 35 + 25 new, grouped into 6 domain-based sections.
 */
export function getDeepQuestions(): AssessmentQuestion[] {
  const allQuestions = [...SEED_QUESTIONS, ...DEEP_ADDITIONAL_QUESTIONS];

  // Group by domain, maintaining a good flow within each domain
  const domainOrder: LifeDomain[] = [
    "work",
    "relationships",
    "politics",
    "conflict",
    "meaning",
    "change",
  ];

  const domainSectionMap: Record<LifeDomain, number> = {
    work: 1,
    relationships: 2,
    politics: 3,
    conflict: 4,
    meaning: 5,
    change: 6,
  };

  const domainTransitions: Record<LifeDomain, string> = {
    work:
      "We\u2019re going to start with how you show up in the world of work and ambition. There are no right answers \u2014 just notice what feels most like you.",
    relationships:
      "Now let\u2019s look at how you connect with the people closest to you \u2014 the relationships that actually test who you are.",
    politics:
      "These next questions touch on the wider world \u2014 fairness, power, how society should work. No political knowledge needed \u2014 just your honest instinct.",
    conflict:
      "When things get difficult \u2014 when there\u2019s conflict, or the stakes are high \u2014 a different part of you shows up. Let\u2019s see what that looks like.",
    meaning:
      "What gives your life depth? These questions explore what calls to you beneath the surface of the everyday.",
    change:
      "Finally \u2014 how you relate to the unknown. Some people run toward change. Some resist it. Most of us do both.",
  };

  const ordered: AssessmentQuestion[] = [];

  for (const domain of domainOrder) {
    const domainQs = allQuestions
      .filter((q) => q.domain === domain)
      // Keep original order within each domain (seed questions first, then deep)
      .sort((a, b) => {
        // Seed questions (q###) before deep questions (d###)
        const aIsDeep = a.id.startsWith("d") ? 1 : 0;
        const bIsDeep = b.id.startsWith("d") ? 1 : 0;
        if (aIsDeep !== bIsDeep) return aIsDeep - bIsDeep;
        return a.id.localeCompare(b.id);
      });

    domainQs.forEach((q, i) => {
      ordered.push({
        ...q,
        section: domainSectionMap[domain],
        // Only the first question of each domain gets a transition
        sectionTransition: i === 0 ? domainTransitions[domain] : undefined,
      });
    });
  }

  return ordered;
}

/**
 * Deep Assessment questions excluding ones the user has already answered
 * (for the pre-populate flow after taking the Quick Quiz).
 */
export function getDeepQuestionsExcluding(
  answeredIds: string[]
): AssessmentQuestion[] {
  const answered = new Set(answeredIds);
  const allDeep = getDeepQuestions();
  return allDeep.filter((q) => !answered.has(q.id));
}

/**
 * Map of question ID → domain for scoring purposes.
 * Includes all questions from both pools.
 */
export function getQuestionDomainMap(): Record<string, LifeDomain> {
  const allQuestions = [...SEED_QUESTIONS, ...DEEP_ADDITIONAL_QUESTIONS];
  const map: Record<string, LifeDomain> = {};
  for (const q of allQuestions) {
    if (q.domain) {
      map[q.id] = q.domain;
    }
  }
  return map;
}

// ── Helpers ────────────────────────────────────────────────────────────────

function find(pool: AssessmentQuestion[], id: string): AssessmentQuestion {
  const q = pool.find((q) => q.id === id);
  if (!q) throw new Error(`Quick quiz question ${id} not found in pool`);
  return q;
}

function withQuickMeta(
  q: AssessmentQuestion,
  section: number,
  sectionTransition?: string
): AssessmentQuestion {
  return {
    ...q,
    section,
    sectionTransition,
  };
}
