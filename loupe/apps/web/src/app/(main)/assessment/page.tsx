// ─────────────────────────────────────────────────────────────────────────────
// /assessment — Full assessment flow page
//
// Server Component that:
//   1. Fetches questions from Sanity (with seed fallback for dev)
//   2. Passes them to the client AssessmentFlow orchestrator
//
// This page does NOT require authentication (prd.md §7.1 — assessment before signup).
// The assessment is a full-screen standalone experience — no nav header needed.
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from "next";
import { getAssessmentQuestions } from "@/lib/sanity/queries";
import { SEED_QUESTIONS } from "@/lib/assessment/questions";
import { AssessmentFlow } from "@/components/assessment/assessment-flow";

export const metadata: Metadata = {
  title: "Find Your Lens",
  description:
    "Discover which lens you see the world through. A 15-minute assessment that reveals your primary perspective.",
};

export default async function AssessmentPage() {
  // Fetch from Sanity; fall back to seed data in development
  let questions = await getAssessmentQuestions();

  if (!questions || questions.length === 0) {
    console.warn(
      "No assessment questions found in Sanity — using seed fallback"
    );
    questions = SEED_QUESTIONS;
  }

  return <AssessmentFlow questions={questions} />;
}
