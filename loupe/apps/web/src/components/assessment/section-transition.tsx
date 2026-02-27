"use client";

// ─────────────────────────────────────────────────────────────────────────────
// SectionTransition — Full-screen interstitial between assessment sections
//
// Design notes (prd.md §4.1):
//   - These are NOT loading screens — they are content
//   - They acknowledge the section just completed
//   - They orient users to the next section
//   - They are micro-moments of reflection
//   - Brief pause before auto-dismiss or user tap
// ─────────────────────────────────────────────────────────────────────────────

import { useCallback } from "react";
import { motion } from "framer-motion";

interface SectionTransitionProps {
  section: number;
  transitionText: string;
  onContinue: () => void;
}

export function SectionTransition({
  section,
  transitionText,
  onContinue,
}: SectionTransitionProps) {
  const handleContinue = useCallback(() => {
    onContinue();
  }, [onContinue]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center"
    >
      {/* Section number — subtle marker */}
      <motion.span
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="mb-6 text-xs font-medium uppercase tracking-widest text-warm-400"
      >
        Part {section} of 5
      </motion.span>

      {/* Transition copy */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="max-w-md font-serif text-xl leading-relaxed text-warm-800"
      >
        {transitionText}
      </motion.p>

      {/* Continue button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.4 }}
        onClick={handleContinue}
        className="mt-10 rounded-full border border-warm-300 px-8 py-3 text-sm font-medium text-warm-700 transition-colors hover:border-warm-400 hover:bg-warm-50"
      >
        Continue
      </motion.button>
    </motion.div>
  );
}
