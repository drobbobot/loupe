"use client";

// ─────────────────────────────────────────────────────────────────────────────
// BinaryInput — Two-option instinctive response
//
// Design notes:
//   - Presented as two large, side-by-side cards (or stacked on mobile)
//   - Designed for quick, gut-level decisions
//   - Selection auto-advances after brief visual confirmation
//   - On desktop: left/right arrow keys to select
//   - On mobile: could be enhanced to support swipe later
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import type { AssessmentQuestion } from "@loupe/types";

interface BinaryInputProps {
  question: AssessmentQuestion;
  onAnswer: (value: string) => void;
  initialValue?: string;
}

export function BinaryInput({
  question,
  onAnswer,
  initialValue,
}: BinaryInputProps) {
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
      setTimeout(() => onAnswer(value), 350);
    },
    [onAnswer, isExiting]
  );

  // Keyboard shortcuts: ArrowLeft → first option, ArrowRight → second option
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (isExiting) return;
      if (e.key === "ArrowLeft" && options[0]) {
        handleSelect(options[0].value);
      } else if (e.key === "ArrowRight" && options[1]) {
        handleSelect(options[1].value);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [options, handleSelect, isExiting]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2"
      role="radiogroup"
      aria-label={question.questionText}
    >
      {options.map((option, index) => {
        const isSelected = selected === option.value;
        return (
          <motion.button
            key={option.value}
            onClick={() => handleSelect(option.value)}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{
              opacity: 1,
              scale: isSelected ? 1.02 : 1,
            }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
            whileHover={{ scale: isExiting ? undefined : 1.02 }}
            whileTap={{ scale: 0.98 }}
            role="radio"
            aria-checked={isSelected}
            className={`
              relative flex min-h-[120px] flex-col items-center justify-center
              rounded-2xl border-2 px-6 py-6 text-center
              transition-all duration-200
              ${
                isSelected
                  ? "border-warm-900 bg-warm-900/5 shadow-sm"
                  : "border-warm-200 bg-white hover:border-warm-400"
              }
            `}
          >
            <span
              className={`text-[15px] leading-snug ${
                isSelected
                  ? "font-medium text-warm-900"
                  : "text-warm-700"
              }`}
            >
              {option.label}
            </span>

            {/* Keyboard hint */}
            <span className="mt-3 hidden text-xs text-warm-400 sm:block">
              {index === 0 ? "\u2190" : "\u2192"}
            </span>
          </motion.button>
        );
      })}
    </motion.div>
  );
}
