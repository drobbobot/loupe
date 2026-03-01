"use client";

// ─────────────────────────────────────────────────────────────────────────────
// StressRegression — Shows the user's regression pattern under stress
//
// Only rendered when the deep assessment detects a stress regression
// (conflict-domain dominant lens sits 2+ positions below centre of gravity).
//
// Design: warm, honest, non-shaming. This is insight, not diagnosis.
// ─────────────────────────────────────────────────────────────────────────────

import { motion } from "framer-motion";
import type { LensSlug } from "@loupe/types";
import { LENS_COLORS, LENS_DISPLAY_NAMES } from "@loupe/types";

interface StressRegressionProps {
  centreOfGravity: LensSlug;
  stressLens: LensSlug;
  narrative: string;
}

export function StressRegression({
  centreOfGravity,
  stressLens,
  narrative,
}: StressRegressionProps) {
  const cogColors = LENS_COLORS[centreOfGravity];
  const stressColors = LENS_COLORS[stressLens];

  return (
    <section className="mx-auto max-w-2xl px-6 py-10">
      <h2 className="font-serif text-2xl font-medium text-warm-900">
        Under pressure
      </h2>
      <p className="mt-2 text-sm text-warm-500 leading-relaxed">
        When the heat turns up, most of us don&rsquo;t reach for our most
        developed perspective. We drop back to something older and more familiar.
      </p>

      {/* Visual: CoG → stress lens */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-6 flex items-center justify-center gap-3"
      >
        <div className="flex flex-col items-center gap-1">
          <div
            className="h-10 w-10 rounded-full"
            style={{ backgroundColor: cogColors.DEFAULT }}
          />
          <span className="text-xs text-warm-500">
            {LENS_DISPLAY_NAMES[centreOfGravity]}
          </span>
          <span className="text-[10px] text-warm-400">your centre</span>
        </div>

        {/* Arrow */}
        <div className="flex items-center gap-1 px-2">
          <div className="h-px w-8 bg-warm-300" />
          <svg
            width="8"
            height="8"
            viewBox="0 0 8 8"
            className="text-warm-300"
          >
            <path d="M0 0 L8 4 L0 8 Z" fill="currentColor" />
          </svg>
        </div>

        <div className="flex flex-col items-center gap-1">
          <div
            className="h-10 w-10 rounded-full"
            style={{ backgroundColor: stressColors.DEFAULT }}
          />
          <span className="text-xs text-warm-500">
            {LENS_DISPLAY_NAMES[stressLens]}
          </span>
          <span className="text-[10px] text-warm-400">under stress</span>
        </div>
      </motion.div>

      {/* Narrative */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-6 rounded-xl border border-warm-200 bg-warm-50/50 p-5"
      >
        <p className="text-sm text-warm-600 leading-relaxed">{narrative}</p>
      </motion.div>
    </section>
  );
}
