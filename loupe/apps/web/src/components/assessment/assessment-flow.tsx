"use client";

// ─────────────────────────────────────────────────────────────────────────────
// AssessmentFlow — Main orchestrator for the entire assessment experience
//
// Renders the correct phase based on Zustand store state:
//   loading → intro → [transition → question]×35 → submitting → reveal → result/save
//
// This is a full-screen, standalone experience — no nav header, no footer.
// The user is in "flow state" and shouldn't be distracted.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type {
  AssessmentQuestion,
  AssessmentResponse,
  AssessmentTier,
  LensSlug,
} from "@loupe/types";
import { useAssessmentStore } from "@/stores/assessment";
import { LensGem } from "@/components/ui/lens-gem";
import { ProgressBar } from "./progress-bar";
import { SectionTransition } from "./section-transition";
import { QuestionCard } from "./question-card";
import { ResultReveal } from "./result-reveal";
import { SavePrompt } from "./save-prompt";

interface AssessmentFlowProps {
  /** Questions loaded from Sanity (or seed fallback) via server component */
  questions: AssessmentQuestion[];
  /** Assessment tier — affects intro copy, submission, and result display */
  tier?: AssessmentTier;
  /** Pre-populated responses from a previous quick quiz (deep pre-populate flow) */
  prePopulatedResponses?: AssessmentResponse[];
}

export function AssessmentFlow({
  questions,
  tier = "quick",
  prePopulatedResponses,
}: AssessmentFlowProps) {
  const store = useAssessmentStore();

  // Initialise store with questions on mount
  useEffect(() => {
    store.initialise(questions, tier, prePopulatedResponses);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions, tier]);

  const currentQuestion = store.questions[store.currentIndex];
  const existingResponse = store.responses.find(
    (r) => r.questionId === currentQuestion?.id
  );
  const totalSections = store.questions.reduce(
    (max, q) => Math.max(max, q.section),
    1
  );

  // Keyboard: Escape to go back
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && store.phase === "question") {
        store.goBack();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [store]);

  return (
    <div className="relative flex min-h-screen flex-col bg-[var(--color-bg)]">
      {/* ── Progress bar (visible during questions) ────────────────────── */}
      {(store.phase === "question" ||
        store.phase === "transition") && (
        <div className="fixed left-0 right-0 top-16 z-40 mx-auto max-w-lg px-6 py-3">
          <ProgressBar
            current={store.currentIndex}
            total={store.questions.length}
            section={store.currentSection}
          />
        </div>
      )}

      {/* ── Main content area ──────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col items-center justify-center pt-16 pb-8">
        <AnimatePresence mode="wait">
          {/* Loading */}
          {store.phase === "loading" && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-warm-300 border-t-warm-900" />
              <p className="text-sm text-warm-500">Preparing your assessment...</p>
            </motion.div>
          )}

          {/* Intro screen */}
          {store.phase === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex max-w-md flex-col items-center px-6 text-center"
            >
              <h1 className="font-serif text-3xl font-medium text-warm-900 sm:text-4xl">
                {store.tier === "deep" ? "Go deeper" : "Find your lens"}
              </h1>
              <p className="mt-4 text-warm-600 leading-relaxed">
                {store.tier === "deep"
                  ? "This assessment maps how your lens shifts across the different areas of your life \u2014 work, relationships, conflict, politics, meaning, and change. About 15 minutes."
                  : "Twelve questions, about 3 minutes. Discover the perspective you see the world through most naturally."}
              </p>
              <p className="mt-3 text-warm-500 text-sm">
                Answer with how you actually are, not how you&apos;d like to be.
                The most useful results tend to surprise people a little.
              </p>

              <motion.button
                onClick={store.start}
                whileTap={{ scale: 0.98 }}
                className="mt-10 rounded-full bg-warm-900 px-10 py-3.5 text-sm font-medium text-warm-50 transition-colors hover:bg-warm-800"
              >
                Begin
              </motion.button>

              <p className="mt-6 text-xs text-warm-400">
                {store.tier === "deep"
                  ? `${store.questions.length} questions \u00b7 6 domains \u00b7 No account required`
                  : "12 questions \u00b7 3 sections \u00b7 No account required"}
              </p>
            </motion.div>
          )}

          {/* Section transition */}
          {store.phase === "transition" && currentQuestion && (
            <SectionTransition
              key={`transition-${store.currentSection}`}
              section={store.currentSection}
              totalSections={totalSections}
              transitionText={
                currentQuestion.sectionTransition ?? ""
              }
              onContinue={store.completeTransition}
            />
          )}

          {/* Question */}
          {store.phase === "question" && currentQuestion && (
            <QuestionCard
              key={currentQuestion.id}
              question={currentQuestion}
              questionIndex={store.currentIndex}
              onAnswer={store.answer}
              onBack={store.goBack}
              canGoBack={store.currentIndex > 0}
              existingResponse={existingResponse}
            />
          )}

          {/* Submitting */}
          {store.phase === "submitting" && (
            <motion.div
              key="submitting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-warm-300 border-t-warm-900" />
              <p className="font-serif text-lg text-warm-700">
                Discovering your lens...
              </p>
            </motion.div>
          )}

          {/* Error */}
          {store.phase === "error" && (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex max-w-md flex-col items-center gap-4 px-6 text-center"
            >
              <p className="text-warm-900 font-medium">
                Something went wrong
              </p>
              <p className="text-sm text-warm-600">{store.error}</p>
              <button
                onClick={() => store.submit()}
                className="mt-4 rounded-full bg-warm-900 px-8 py-3 text-sm font-medium text-warm-50 hover:bg-warm-800"
              >
                Try again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Full-screen overlays (reveal + save) ──────────────────────── */}
      {store.phase === "reveal" && store.result && (
        <ResultReveal
          result={store.result}
          onComplete={store.completeReveal}
        />
      )}

      {store.phase === "save-prompt" && store.result && (
        <SavePrompt result={store.result} />
      )}

      {store.phase === "result" && store.result && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[var(--color-bg)] px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <LensGem
              slug={store.result.primaryLens as LensSlug}
              size={180}
              spin
            />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-6 text-sm uppercase tracking-widest text-warm-400"
          >
            Your Centre of Gravity is
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-2 font-serif text-4xl font-medium text-warm-900 capitalize"
          >
            {store.result.primaryLens}
          </motion.h1>
        </div>
      )}
    </div>
  );
}
