// ─────────────────────────────────────────────────────────────────────────────
// /assessment/deep — Deep Assessment (60 questions, ~15 minutes)
//
// Server Component that loads the full 60-question pool (or 48 if the user
// has already taken the quick quiz) and passes them to AssessmentFlow.
//
// Pre-populate flow:
//   If the user has a saved quick-quiz result, their 12 answered question IDs
//   are excluded from the deep pool and their responses are passed as
//   prePopulatedResponses so they get merged at submit time.
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from "next";
import { cookies } from "next/headers";
import {
  getDeepQuestions,
  getDeepQuestionsExcluding,
} from "@/lib/assessment/question-bank";
import { createClient } from "@/lib/supabase/server";
import { AssessmentFlow } from "@/components/assessment/assessment-flow";

export const metadata: Metadata = {
  title: "Deep Assessment — Map Your Lenses",
  description:
    "60 questions across 6 life domains, about 15 minutes. Discover how your lens shifts across work, relationships, politics, conflict, meaning, and change.",
};

export default async function DeepAssessmentPage() {
  // Try to load previous quick quiz responses for pre-populate
  let questions = getDeepQuestions();
  let prePopulatedResponses: Array<{
    questionId: string;
    responseValue: number | string | string[];
    inputType: "slider" | "multiple_choice" | "binary" | "ranked" | "image";
  }> = [];

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      // Check for most recent quick quiz result
      const { data: quickResult } = await supabase
        .from("assessment_results")
        .select("responses")
        .eq("user_id", user.id)
        .eq("tier", "quick")
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      const qr = quickResult as Record<string, unknown> | null;
      if (qr?.responses) {
        const previousResponses = qr.responses as typeof prePopulatedResponses;
        const answeredIds = previousResponses.map((r) => r.questionId);

        // Exclude already-answered questions from the deep pool
        questions = getDeepQuestionsExcluding(answeredIds);
        prePopulatedResponses = previousResponses;
      }
    }
  } catch {
    // Not authenticated or no previous result — use full question set
  }

  return (
    <AssessmentFlow
      questions={questions}
      tier="deep"
      prePopulatedResponses={
        prePopulatedResponses.length > 0 ? prePopulatedResponses : undefined
      }
    />
  );
}
