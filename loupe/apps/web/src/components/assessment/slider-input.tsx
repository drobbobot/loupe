"use client";

// ─────────────────────────────────────────────────────────────────────────────
// SliderInput — Continuous gradient response (0–100)
//
// Design notes:
//   - Custom-styled range input with warm colour palette
//   - Pole labels at each end reveal what the extremes mean
//   - Uniform track (no fill) — avoids progress-bar bias
//   - Starts at center (50) — user must move it to confirm
//   - Keyboard accessible (arrow keys adjust by 1, Page Up/Down by 10)
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import type { AssessmentQuestion } from "@loupe/types";

interface SliderInputProps {
  question: AssessmentQuestion;
  onAnswer: (value: number) => void;
  initialValue?: number;
}

export function SliderInput({
  question,
  onAnswer,
  initialValue,
}: SliderInputProps) {
  const [value, setValue] = useState(initialValue ?? 50);
  const [hasInteracted, setHasInteracted] = useState(
    initialValue !== undefined
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseInt(e.target.value, 10);
      setValue(newValue);
      if (!hasInteracted) setHasInteracted(true);
    },
    [hasInteracted]
  );

  const handleConfirm = useCallback(() => {
    onAnswer(value);
  }, [value, onAnswer]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="flex w-full flex-col gap-6"
    >
      {/* Slider track */}
      <div className="relative px-1 pt-2">
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={value}
          onChange={handleChange}
          aria-label={question.questionText}
          className="assessment-slider w-full cursor-pointer"
        />
      </div>

      {/* Pole labels */}
      <div className="flex items-start justify-between gap-4">
        <span className="max-w-[40%] text-left text-sm leading-snug text-warm-500">
          {question.sliderConfig?.labelMin ?? "Less"}
        </span>
        <span className="max-w-[40%] text-right text-sm leading-snug text-warm-500">
          {question.sliderConfig?.labelMax ?? "More"}
        </span>
      </div>

      {/* Confirm button */}
      <motion.button
        onClick={handleConfirm}
        disabled={!hasInteracted}
        initial={{ opacity: 0 }}
        animate={{ opacity: hasInteracted ? 1 : 0.4 }}
        whileTap={{ scale: 0.98 }}
        className="mx-auto mt-2 rounded-full bg-warm-900 px-8 py-3 text-sm font-medium text-warm-50 transition-colors hover:bg-warm-800 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Continue
      </motion.button>

      {/* Custom slider styles — uniform track, no fill */}
      <style jsx global>{`
        .assessment-slider {
          -webkit-appearance: none;
          appearance: none;
          height: 3px;
          background: var(--color-border);
          border-radius: 2px;
          outline: none;
        }
        .assessment-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: var(--color-text);
          border: 3px solid var(--color-bg);
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
          cursor: pointer;
          transition: transform 0.15s ease;
        }
        .assessment-slider::-webkit-slider-thumb:hover {
          transform: scale(1.15);
        }
        .assessment-slider::-moz-range-thumb {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: var(--color-text);
          border: 3px solid var(--color-bg);
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
          cursor: pointer;
        }
        .assessment-slider::-moz-range-track {
          height: 3px;
          background: var(--color-border);
          border: none;
          border-radius: 2px;
        }
        .assessment-slider:focus-visible::-webkit-slider-thumb {
          box-shadow: 0 0 0 3px var(--lens-color);
        }
      `}</style>
    </motion.div>
  );
}
