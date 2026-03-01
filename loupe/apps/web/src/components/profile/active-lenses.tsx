"use client";

// ─────────────────────────────────────────────────────────────────────────────
// ActiveLenses — Horizontal bar chart of all 8 lenses ranked by strength
//
// Shows how active each lens is across the user's full assessment.
// The primary and secondary lenses are labelled. Bars use lens colours.
// ─────────────────────────────────────────────────────────────────────────────

import { motion } from "framer-motion";
import type { LensSlug } from "@loupe/types";
import { LENS_COLORS, LENS_DISPLAY_NAMES } from "@loupe/types";

interface ActiveLensesProps {
  activeLenses: Array<{ lens: LensSlug; strength: number }>;
  primaryLens: LensSlug;
  secondaryLens: LensSlug;
}

export function ActiveLenses({
  activeLenses,
  primaryLens,
  secondaryLens,
}: ActiveLensesProps) {
  // Normalise strengths relative to max
  const maxStrength = Math.max(...activeLenses.map((l) => l.strength), 0.01);

  return (
    <section className="mx-auto max-w-2xl px-6 py-10">
      <h2 className="font-serif text-2xl font-medium text-warm-900">
        All your lenses
      </h2>
      <p className="mt-2 text-sm text-warm-500 leading-relaxed">
        Every lens lives in you to some degree. Here&rsquo;s how active each one
        is across your responses.
      </p>

      <div className="mt-6 space-y-3">
        {activeLenses.map(({ lens, strength }, i) => {
          const pct = (strength / maxStrength) * 100;
          const isPrimary = lens === primaryLens;
          const isSecondary = lens === secondaryLens;
          const colors = LENS_COLORS[lens];

          return (
            <div key={lens} className="flex items-center gap-3">
              {/* Lens colour dot */}
              <div
                className="h-2.5 w-2.5 flex-shrink-0 rounded-full"
                style={{ backgroundColor: colors.DEFAULT }}
              />

              {/* Name + badge */}
              <div className="flex w-24 flex-shrink-0 items-center gap-1.5">
                <span className="text-sm text-warm-700">
                  {LENS_DISPLAY_NAMES[lens]}
                </span>
                {isPrimary && (
                  <span className="text-[10px] font-medium text-warm-400">
                    1st
                  </span>
                )}
                {isSecondary && (
                  <span className="text-[10px] font-medium text-warm-400">
                    2nd
                  </span>
                )}
              </div>

              {/* Bar */}
              <div className="flex-1">
                <div className="h-2 w-full rounded-full bg-warm-100">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{
                      duration: 0.6,
                      delay: i * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: colors.DEFAULT }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
