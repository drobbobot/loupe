// ─────────────────────────────────────────────────────────────────────────────
// /assessment/quick — Quick Quiz (12 questions, ~3 minutes)
//
// Server Component that loads the curated 12-question subset and passes
// them to the AssessmentFlow orchestrator in "quick" mode.
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from "next";
import { getQuickQuestions } from "@/lib/assessment/question-bank";
import { AssessmentFlow } from "@/components/assessment/assessment-flow";

export const metadata: Metadata = {
  title: "Quick Quiz — Find Your Lens",
  description:
    "12 questions, about 3 minutes. Discover your primary lens — the perspective you see the world through most naturally.",
};

export default function QuickQuizPage() {
  const questions = getQuickQuestions();

  return <AssessmentFlow questions={questions} tier="quick" />;
}
