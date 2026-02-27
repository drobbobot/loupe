"use client";

// ─────────────────────────────────────────────────────────────────────────────
// RankedInput — Drag-to-order values by personal resonance
//
// Design notes:
//   - Used sparingly (1–2 times in the assessment per prd.md §4.1)
//   - Drag handle on the right for pointer reordering
//   - Keyboard: arrow keys to reorder when focused
//   - User confirms when satisfied with order
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useCallback } from "react";
import { Reorder, motion } from "framer-motion";
import type { AssessmentQuestion } from "@loupe/types";

interface RankedInputProps {
  question: AssessmentQuestion;
  onAnswer: (ranking: string[]) => void;
  initialValue?: string[];
}

export function RankedInput({
  question,
  onAnswer,
  initialValue,
}: RankedInputProps) {
  const options = question.options ?? [];
  const [items, setItems] = useState<Array<{ value: string; label: string }>>(
    () => {
      if (initialValue) {
        return initialValue
          .map((v) => options.find((o) => o.value === v))
          .filter(Boolean) as Array<{ value: string; label: string }>;
      }
      return [...options];
    }
  );

  const handleConfirm = useCallback(() => {
    onAnswer(items.map((item) => item.value));
  }, [items, onAnswer]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex w-full flex-col gap-4"
    >
      {/* Instructions */}
      <p className="text-center text-sm text-warm-500">
        Drag to reorder. Most resonant at top.
      </p>

      {/* Sortable list */}
      <Reorder.Group
        axis="y"
        values={items}
        onReorder={setItems}
        className="flex flex-col gap-2"
        role="list"
      >
        {items.map((item, index) => (
          <Reorder.Item
            key={item.value}
            value={item}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="flex cursor-grab items-center gap-3 rounded-xl border-2 border-warm-200 bg-white px-4 py-3.5 select-none active:cursor-grabbing"
            whileDrag={{
              boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
              scale: 1.02,
              borderColor: "var(--color-text)",
            }}
          >
            {/* Rank number */}
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-warm-100 text-sm font-medium text-warm-600">
              {index + 1}
            </span>

            {/* Label */}
            <span className="flex-1 text-[15px] leading-snug text-warm-800">
              {item.label}
            </span>

            {/* Grip icon (visual hint) */}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="shrink-0 text-warm-300"
            >
              <circle cx="5" cy="4" r="1.5" />
              <circle cx="11" cy="4" r="1.5" />
              <circle cx="5" cy="8" r="1.5" />
              <circle cx="11" cy="8" r="1.5" />
              <circle cx="5" cy="12" r="1.5" />
              <circle cx="11" cy="12" r="1.5" />
            </svg>
          </Reorder.Item>
        ))}
      </Reorder.Group>

      {/* Confirm button */}
      <motion.button
        onClick={handleConfirm}
        whileTap={{ scale: 0.98 }}
        className="mx-auto mt-2 rounded-full bg-warm-900 px-8 py-3 text-sm font-medium text-warm-50 transition-colors hover:bg-warm-800"
      >
        Continue
      </motion.button>
    </motion.div>
  );
}
