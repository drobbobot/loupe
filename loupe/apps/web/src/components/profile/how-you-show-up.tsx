"use client";

// ─────────────────────────────────────────────────────────────────────────────
// HowYouShowUp — Three-panel contextual view
//
// Shows how the user's primary lens manifests across three life contexts:
//   1. At work
//   2. In relationships
//   3. Under stress
//
// Design: swipeable/tappable panels, one visible at a time on mobile.
// Uses AnimatePresence for cross-fade transitions between panels.
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ProfileData } from "@/lib/profile-data";

interface HowYouShowUpProps {
  profile: ProfileData;
}

const PANELS = [
  { key: "atWork" as const, label: "At work", icon: BriefcaseIcon },
  { key: "inRelationships" as const, label: "In relationships", icon: HeartIcon },
  { key: "underStress" as const, label: "Under stress", icon: WaveIcon },
];

export function HowYouShowUp({ profile }: HowYouShowUpProps) {
  const [activePanel, setActivePanel] = useState<"atWork" | "inRelationships" | "underStress">("atWork");

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
        How you show up
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-warm-500">
        Your lens colours everything — but it expresses differently depending on
        the context.
      </p>

      {/* Panel selector tabs */}
      <div className="mt-6 flex gap-1 rounded-xl bg-warm-100/60 p-1">
        {PANELS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActivePanel(key)}
            className={`
              relative flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2.5 text-xs font-medium transition-colors
              ${
                activePanel === key
                  ? "text-warm-900"
                  : "text-warm-400 hover:text-warm-600"
              }
            `}
          >
            {activePanel === key && (
              <motion.div
                layoutId="how-you-show-up-tab"
                className="absolute inset-0 rounded-lg bg-white shadow-sm"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <Icon className="h-3.5 w-3.5" />
              {label}
            </span>
          </button>
        ))}
      </div>

      {/* Panel content */}
      <div className="mt-6 min-h-[200px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePanel}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="prose-editorial text-warm-700"
          >
            {profile.howYouShowUp[activePanel].split("\n\n").map((p, i) => (
              <p key={i} className={i > 0 ? "mt-4" : ""}>
                {p}
              </p>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.section>
  );
}

// ── Inline SVG icons ────────────────────────────────────────────────────────

function BriefcaseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="5" width="12" height="9" rx="1.5" />
      <path d="M5.5 5V3.5A1.5 1.5 0 0 1 7 2h2a1.5 1.5 0 0 1 1.5 1.5V5" />
    </svg>
  );
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 13.7C8 13.7 1.5 9.5 1.5 5.5A3 3 0 0 1 8 4a3 3 0 0 1 6.5 1.5c0 4-6.5 8.2-6.5 8.2z" />
    </svg>
  );
}

function WaveIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <path d="M1 8c1-2.5 2.5-2.5 3.5 0S7 10.5 8 8s2.5-2.5 3.5 0S14 10.5 15 8" />
    </svg>
  );
}
