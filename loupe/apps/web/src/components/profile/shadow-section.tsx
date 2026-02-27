"use client";

// ─────────────────────────────────────────────────────────────────────────────
// ShadowSection — Your Shadow
//
// Displays the user's shadow tendencies and triggers in an honest but
// compassionate way. This is one of the most sensitive parts of the profile.
//
// Tone: "Every lens has a shadow" — normalising, not pathologising.
// Design: Slightly muted colour treatment, expandable triggers list.
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ProfileData } from "@/lib/profile-data";

interface ShadowSectionProps {
  profile: ProfileData;
}

export function ShadowSection({ profile }: ShadowSectionProps) {
  const [showTriggers, setShowTriggers] = useState(false);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-2xl px-6 py-10"
    >
      {/* Section header */}
      <h2 className="font-serif text-2xl font-medium text-warm-900">
        Your shadow
      </h2>

      {/* Intro */}
      <p className="mt-3 text-sm leading-relaxed text-warm-500">
        {profile.shadow.intro}
      </p>

      {/* Tendencies */}
      <div className="mt-8">
        <h3 className="mb-4 text-xs font-medium uppercase tracking-wider text-warm-400">
          When you contract, you may
        </h3>
        <ul className="space-y-3">
          {profile.shadow.tendencies.map((tendency, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-3 rounded-xl bg-warm-50 p-4"
            >
              <span
                className="mt-1 h-2 w-2 flex-shrink-0 rounded-full"
                style={{ backgroundColor: profile.colours.DEFAULT, opacity: 0.5 }}
              />
              <span className="text-sm leading-relaxed text-warm-700">
                {tendency}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Triggers — expandable */}
      <div className="mt-8">
        <button
          onClick={() => setShowTriggers(!showTriggers)}
          className="flex w-full items-center justify-between rounded-xl border border-warm-200 px-4 py-3 text-left transition-colors hover:border-warm-300"
        >
          <div>
            <h3 className="text-xs font-medium uppercase tracking-wider text-warm-400">
              What activates this
            </h3>
            <p className="mt-0.5 text-sm text-warm-600">
              {showTriggers ? "The situations that trigger your shadow" : "Tap to see your trigger patterns"}
            </p>
          </div>
          <motion.svg
            animate={{ rotate: showTriggers ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="text-warm-400"
          >
            <path d="M4 6l4 4 4-4" />
          </motion.svg>
        </button>

        <AnimatePresence>
          {showTriggers && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                height: { type: "spring", stiffness: 200, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="overflow-hidden"
            >
              <ul className="mt-3 space-y-2 pb-2">
                {profile.shadow.triggers.map((trigger, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-3 rounded-lg px-4 py-2"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      className="mt-0.5 flex-shrink-0"
                    >
                      <path
                        d="M7 1L8.5 5.5L13 7L8.5 8.5L7 13L5.5 8.5L1 7L5.5 5.5L7 1Z"
                        fill={profile.colours.DEFAULT}
                        opacity="0.3"
                      />
                    </svg>
                    <span className="text-sm leading-relaxed text-warm-600">
                      {trigger}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
