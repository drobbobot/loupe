// ─────────────────────────────────────────────────────────────────────────────
// Loupe — Assessment Flow State (Zustand)
//
// Client-side store managing the full assessment journey:
//   - Current question index and section
//   - Collected responses
//   - Submission status
//   - Result data (after scoring)
//
// Architecture notes:
//   - Responses are stored locally until submission
//   - Scoring happens server-side via POST /api/assessment/submit
//   - This store holds the returned portrait result for the reveal UI
//   - Raw scores are NEVER available client-side
// ─────────────────────────────────────────────────────────────────────────────

import { create } from "zustand";
import type {
  AssessmentQuestion,
  AssessmentResponse,
  AssessmentResult,
} from "@loupe/types";

// ── Types ────────────────────────────────────────────────────────────────────

type AssessmentPhase =
  | "loading"      // fetching questions
  | "intro"        // pre-assessment intro screen
  | "transition"   // section transition interstitial
  | "question"     // answering a question
  | "submitting"   // POST to server
  | "reveal"       // result reveal animation
  | "result"       // full result view
  | "save-prompt"  // prompt to create account / save
  | "error";       // something went wrong

interface AssessmentState {
  // ── Questions ───────────────────────────────────────────────────────────
  questions: AssessmentQuestion[];
  currentIndex: number;

  // ── Responses ───────────────────────────────────────────────────────────
  responses: AssessmentResponse[];

  // ── Navigation ──────────────────────────────────────────────────────────
  phase: AssessmentPhase;
  /** Which section we're currently in (1-5) */
  currentSection: number;

  // ── Result ──────────────────────────────────────────────────────────────
  result: (AssessmentResult & { saved: boolean }) | null;
  error: string | null;

  // ── Actions ─────────────────────────────────────────────────────────────
  /** Load questions and initialise the assessment */
  initialise: (questions: AssessmentQuestion[]) => void;

  /** Begin the assessment from the intro screen */
  start: () => void;

  /** Record a response and advance to the next question */
  answer: (response: AssessmentResponse) => void;

  /** Go back to the previous question (if allowed) */
  goBack: () => void;

  /** Complete the section transition and show next question */
  completeTransition: () => void;

  /** Submit all responses to the server for scoring */
  submit: () => Promise<void>;

  /** Move from reveal animation to full result */
  completeReveal: () => void;

  /** Reset the entire assessment (for retake flow) */
  reset: () => void;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function getCurrentSection(
  questions: AssessmentQuestion[],
  index: number
): number {
  if (index >= questions.length) {
    return questions[questions.length - 1]?.section ?? 1;
  }
  return questions[index]?.section ?? 1;
}

function shouldShowTransition(
  questions: AssessmentQuestion[],
  index: number,
  previousSection: number
): boolean {
  if (index >= questions.length) return false;
  const question = questions[index];
  // Show transition when entering a new section AND the question has transition copy
  return (
    question.section !== previousSection &&
    !!question.sectionTransition
  );
}

// ── Store ────────────────────────────────────────────────────────────────────

export const useAssessmentStore = create<AssessmentState>((set, get) => ({
  // Initial state
  questions: [],
  currentIndex: 0,
  responses: [],
  phase: "loading",
  currentSection: 1,
  result: null,
  error: null,

  initialise: (questions) => {
    set({
      questions,
      currentIndex: 0,
      responses: [],
      phase: "intro",
      currentSection: 1,
      result: null,
      error: null,
    });
  },

  start: () => {
    const { questions } = get();
    const firstQuestion = questions[0];
    // If the first question has a section transition, show it
    if (firstQuestion?.sectionTransition) {
      set({ phase: "transition" });
    } else {
      set({ phase: "question" });
    }
  },

  answer: (response) => {
    const { questions, currentIndex, responses, currentSection } = get();

    // Add or update the response for this question
    const existingIndex = responses.findIndex(
      (r) => r.questionId === response.questionId
    );
    const updatedResponses =
      existingIndex >= 0
        ? responses.map((r, i) => (i === existingIndex ? response : r))
        : [...responses, response];

    const nextIndex = currentIndex + 1;

    // Check if assessment is complete
    if (nextIndex >= questions.length) {
      set({
        responses: updatedResponses,
        currentIndex: nextIndex,
        phase: "submitting",
      });
      // Auto-submit
      setTimeout(() => get().submit(), 0);
      return;
    }

    // Check if we're entering a new section
    const nextSection = getCurrentSection(questions, nextIndex);
    const needsTransition = shouldShowTransition(
      questions,
      nextIndex,
      currentSection
    );

    set({
      responses: updatedResponses,
      currentIndex: nextIndex,
      currentSection: nextSection,
      phase: needsTransition ? "transition" : "question",
    });
  },

  goBack: () => {
    const { currentIndex, questions } = get();
    if (currentIndex <= 0) return;

    const prevIndex = currentIndex - 1;
    const prevSection = getCurrentSection(questions, prevIndex);

    set({
      currentIndex: prevIndex,
      currentSection: prevSection,
      phase: "question",
    });
  },

  completeTransition: () => {
    set({ phase: "question" });
  },

  submit: async () => {
    const { responses } = get();

    set({ phase: "submitting", error: null });

    try {
      const res = await fetch("/api/assessment/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ responses }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Server error: ${res.status}`);
      }

      const result = await res.json();

      set({
        result,
        phase: "reveal",
      });
    } catch (error) {
      console.error("Assessment submission failed:", error);
      set({
        error:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
        phase: "error",
      });
    }
  },

  completeReveal: () => {
    const { result } = get();
    if (!result) return;

    if (result.saved) {
      // Already saved (user was authenticated) — go to full result
      set({ phase: "result" });
    } else {
      // Not saved — prompt to create account
      set({ phase: "save-prompt" });
    }
  },

  reset: () => {
    set({
      questions: [],
      currentIndex: 0,
      responses: [],
      phase: "loading",
      currentSection: 1,
      result: null,
      error: null,
    });
  },
}));
