"use client";

// ─────────────────────────────────────────────────────────────────────────────
// QuestionCard — Wraps a question with its text and appropriate input component
//
// Handles:
//   - Displaying the question text (serif, generous spacing)
//   - Selecting the right input component based on inputType
//   - Animating question transitions
//   - Back button (when not on first question)
// ─────────────────────────────────────────────────────────────────────────────

import { useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { AssessmentQuestion, AssessmentResponse } from "@loupe/types";
import { SliderInput } from "./slider-input";
import { MultipleChoiceInput } from "./multiple-choice-input";
import { BinaryInput } from "./binary-input";
import { RankedInput } from "./ranked-input";

interface QuestionCardProps {
  question: AssessmentQuestion;
  questionIndex: number;
  onAnswer: (response: AssessmentResponse) => void;
  onBack?: () => void;
  canGoBack: boolean;
  /** Previously recorded response for this question (if going back) */
  existingResponse?: AssessmentResponse;
}

export function QuestionCard({
  question,
  questionIndex,
  onAnswer,
  onBack,
  canGoBack,
  existingResponse,
}: QuestionCardProps) {
  const handleAnswer = useCallback(
    (value: number | string | string[]) => {
      onAnswer({
        questionId: question.id,
        responseValue: value,
        inputType: question.inputType,
      });
    },
    [question.id, question.inputType, onAnswer]
  );

  // Extract previous value for pre-filling when going back
  const previousValue = existingResponse?.responseValue;

  const inputComponent = useMemo(() => {
    switch (question.inputType) {
      case "slider":
        return (
          <SliderInput
            question={question}
            onAnswer={(v) => handleAnswer(v)}
            initialValue={
              typeof previousValue === "number" ? previousValue : undefined
            }
          />
        );

      case "multiple_choice":
        return (
          <MultipleChoiceInput
            question={question}
            onAnswer={(v) => handleAnswer(v)}
            initialValue={
              typeof previousValue === "string" ? previousValue : undefined
            }
          />
        );

      case "binary":
        return (
          <BinaryInput
            question={question}
            onAnswer={(v) => handleAnswer(v)}
            initialValue={
              typeof previousValue === "string" ? previousValue : undefined
            }
          />
        );

      case "ranked":
        return (
          <RankedInput
            question={question}
            onAnswer={(v) => handleAnswer(v)}
            initialValue={
              Array.isArray(previousValue) ? previousValue : undefined
            }
          />
        );

      default:
        return (
          <p className="text-warm-500">
            Unsupported input type: {question.inputType}
          </p>
        );
    }
  }, [question, handleAnswer, previousValue]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="mx-auto flex w-full max-w-lg flex-col items-center gap-8 px-4"
      >
        {/* Question text */}
        <h2 className="text-center font-serif text-xl leading-relaxed text-warm-900 sm:text-2xl">
          {question.questionText}
        </h2>

        {/* Input component */}
        {inputComponent}

        {/* Back button */}
        {canGoBack && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            onClick={onBack}
            className="mt-2 text-sm text-warm-400 transition-colors hover:text-warm-600"
          >
            ← Back
          </motion.button>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
