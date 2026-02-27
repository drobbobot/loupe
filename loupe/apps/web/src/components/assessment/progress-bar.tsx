"use client";

// ─────────────────────────────────────────────────────────────────────────────
// ProgressBar — Always-visible assessment completion indicator
//
// Design notes (prd.md §4.1, design.md §5):
//   - Shows real completion progress (no fake acceleration)
//   - Fixed at the top of the assessment viewport
//   - Subtle, warm styling — doesn't compete with question content
//   - Section markers give sense of journey shape
// ─────────────────────────────────────────────────────────────────────────────

import { motion } from "framer-motion";

interface ProgressBarProps {
  current: number; // 0-based index of current question
  total: number;   // total number of questions
  section: number; // current section (1-5)
}

export function ProgressBar({ current, total, section }: ProgressBarProps) {
  const progress = total > 0 ? Math.min(current / total, 1) : 0;

  return (
    <div className="flex w-full items-center gap-3">
      {/* Progress track */}
      <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-warm-200">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-warm-900"
          initial={{ width: 0 }}
          animate={{ width: `${progress * 100}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      {/* Section & count label */}
      <span className="shrink-0 text-xs tabular-nums text-warm-400">
        {Math.min(current + 1, total)}/{total}
      </span>
    </div>
  );
}
