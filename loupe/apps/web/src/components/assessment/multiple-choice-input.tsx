"use client";

// ─────────────────────────────────────────────────────────────────────────────
// MultipleChoiceInput — Scenario-based, 3–4 options
//
// Design notes:
//   - Cards stack vertically, each is a tappable/clickable option
//   - No obvious "right" answer — all options feel reasonable
//   - Selection auto-advances after a brief delay (lets user see their pick)
//   - Keyboard: arrow keys to navigate, Enter/Space to select
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import type { AssessmentQuestion } from "@loupe/types";

interface MultipleChoiceInputProps {
  question: AssessmentQuestion;
  onAnswer: (value: string) => void;
  initialValue?: string;
}

export function MultipleChoiceInput({
  question,
  onAnswer,
  initialValue,
}: MultipleChoiceInputProps) {
  const [selected, setSelected] = useState<string | null>(
    initialValue ?? null
  );
  const [isExiting, setIsExiting] = useState(false);
  const options = question.options ?? [];

  const handleSelect = useCallback(
    (value: string) => {
      if (isExiting) return;
      setSelected(value);
      setIsExiting(true);
      // Brief delay so user sees their selection before advancing
      setTimeout(() => onAnswer(value), 350);
    },
    [onAnswer, isExiting]
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="flex w-full flex-col gap-3"
      role="radiogroup"
      aria-label={question.questionText}
    >
      {options.map((option, index) => {
        const isSelected = selected === option.value;
        return (
          <motion.button
            key={option.value}
            onClick={() => handleSelect(option.value)}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: index * 0.06 }}
            role="radio"
            aria-checked={isSelected}
            className={`
              group relative w-full rounded-xl border-2 px-5 py-4
              text-left transition-all duration-200
              flex items-start gap-3
              ${
                isSelected
                  ? "border-warm-900 bg-warm-900/5"
                  : "border-warm-200 bg-white hover:border-warm-400 hover:bg-warm-50"
              }
            `}
          >
            {/* Option letter (subtle) */}
            <span
              className={`
                shrink-0 flex h-6 w-6 items-center justify-center rounded-full
                text-xs font-medium transition-colors
                ${
                  isSelected
                    ? "bg-warm-900 text-warm-50"
                    : "bg-warm-100 text-warm-500 group-hover:bg-warm-200"
                }
              `}
            >
              {String.fromCharCode(65 + index)}
            </span>

            <span
              className={`text-[15px] leading-snug pt-0.5 ${
                isSelected ? "text-warm-900" : "text-warm-700"
              }`}
            >
              {option.label}
            </span>
          </motion.button>
        );
      })}
    </motion.div>
  );
}
