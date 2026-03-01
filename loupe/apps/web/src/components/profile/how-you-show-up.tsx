"use client";

// ─────────────────────────────────────────────────────────────────────────────
// HowYouShowUp — Contextual view of the user's lens across life
//
// Quick quiz:  Three panels (at work / in relationships / under stress)
//              using generic editorial content keyed to primary lens.
//
// Deep result: Six panels (one per life domain) using the actual
//              per-domain narratives from the scoring engine — much more
//              personal and specific.
//
// Design: swipeable/tappable panels, one visible at a time on mobile.
// Uses AnimatePresence for cross-fade transitions between panels.
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ProfileData } from "@/lib/profile-data";
import type { LensSlug, LifeDomain } from "@loupe/types";
import { LENS_COLORS, LENS_DISPLAY_NAMES, DOMAIN_LABELS } from "@loupe/types";

interface HowYouShowUpProps {
  profile: ProfileData;
}

// ── Quick quiz panels ─────────────────────────────────────────────────────

const QUICK_PANELS = [
  { key: "atWork" as const, label: "At work", icon: BriefcaseIcon },
  { key: "inRelationships" as const, label: "In relationships", icon: HeartIcon },
  { key: "underStress" as const, label: "Under stress", icon: WaveIcon },
];

// ── Deep domain panels ────────────────────────────────────────────────────

const DOMAIN_ICONS: Record<LifeDomain, React.FC<{ className?: string }>> = {
  work: BriefcaseIcon,
  relationships: HeartIcon,
  politics: LandmarkIcon,
  conflict: ShieldIcon,
  meaning: CompassIcon,
  change: WindIcon,
};

const DOMAIN_ORDER: LifeDomain[] = [
  "work",
  "relationships",
  "politics",
  "conflict",
  "meaning",
  "change",
];

export function HowYouShowUp({ profile }: HowYouShowUpProps) {
  const isDeep = !!profile.deep;

  // Quick quiz: one of three panels
  const [quickPanel, setQuickPanel] = useState<"atWork" | "inRelationships" | "underStress">("atWork");
  // Deep: one of six domains
  const [activeDomain, setActiveDomain] = useState<LifeDomain>("work");

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
        {isDeep
          ? "Your lens expresses differently depending on context. Here\u2019s what the assessment found across six areas of your life."
          : "Your lens colours everything — but it expresses differently depending on the context."}
      </p>

      {/* ── Quick quiz mode: 3 panels ──────────────────────────────────── */}
      {!isDeep && (
        <>
          <div className="mt-6 flex gap-1 rounded-xl bg-warm-100/60 p-1">
            {QUICK_PANELS.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setQuickPanel(key)}
                className={`
                  relative flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2.5 text-xs font-medium transition-colors
                  ${
                    quickPanel === key
                      ? "text-warm-900"
                      : "text-warm-400 hover:text-warm-600"
                  }
                `}
              >
                {quickPanel === key && (
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

          <div className="mt-6 min-h-[200px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={quickPanel}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="prose-editorial text-warm-700"
              >
                {profile.howYouShowUp[quickPanel].split("\n\n").map((p, i) => (
                  <p key={i} className={i > 0 ? "mt-4" : ""}>
                    {p}
                  </p>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </>
      )}

      {/* ── Deep mode: 6 domain panels ─────────────────────────────────── */}
      {isDeep && profile.deep && (
        <>
          {/* Scrollable domain tabs */}
          <div className="mt-6 flex gap-1 overflow-x-auto rounded-xl bg-warm-100/60 p-1 scrollbar-hide">
            {DOMAIN_ORDER.map((domain) => {
              const Icon = DOMAIN_ICONS[domain];
              const domainProfile = profile.deep!.domainProfiles.find(
                (dp) => dp.domain === domain
              );
              const domainColor = domainProfile
                ? LENS_COLORS[domainProfile.dominantLens].DEFAULT
                : undefined;

              return (
                <button
                  key={domain}
                  onClick={() => setActiveDomain(domain)}
                  className={`
                    relative flex flex-shrink-0 items-center justify-center gap-1.5 rounded-lg px-3 py-2.5 text-xs font-medium transition-colors
                    ${
                      activeDomain === domain
                        ? "text-warm-900"
                        : "text-warm-400 hover:text-warm-600"
                    }
                  `}
                >
                  {activeDomain === domain && (
                    <motion.div
                      layoutId="how-you-show-up-tab-deep"
                      className="absolute inset-0 rounded-lg bg-white shadow-sm"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    <Icon className="h-3.5 w-3.5" />
                    {DOMAIN_LABELS[domain].split(" & ")[0]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Domain content panel */}
          <div className="mt-6 min-h-[200px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDomain}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                {/* Domain lens badge */}
                {(() => {
                  const dp = profile.deep!.domainProfiles.find(
                    (d) => d.domain === activeDomain
                  );
                  if (!dp) return null;
                  const domainColor = LENS_COLORS[dp.dominantLens];
                  return (
                    <div className="mb-3 flex items-center gap-2">
                      <div
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: domainColor.DEFAULT }}
                      />
                      <span className="text-xs font-medium text-warm-400">
                        {LENS_DISPLAY_NAMES[dp.dominantLens]} lens
                        {dp.dominantLens !== profile.primaryLens && (
                          <span className="ml-1 text-warm-300">
                            &middot; different from your centre
                          </span>
                        )}
                      </span>
                    </div>
                  );
                })()}

                {/* Narrative */}
                <div className="prose-editorial text-warm-700">
                  {profile.deep!.domainNarratives[activeDomain]
                    .split("\n\n")
                    .map((p, i) => (
                      <p key={i} className={i > 0 ? "mt-4" : ""}>
                        {p}
                      </p>
                    ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </>
      )}
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

function LandmarkIcon({ className }: { className?: string }) {
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
      <path d="M8 1L2 5v1h12V5L8 1z" />
      <path d="M3 6v6M6.5 6v6M9.5 6v6M13 6v6" />
      <path d="M1 12h14v2H1z" />
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
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
      <path d="M8 1.5L2 4v4c0 3.5 2.5 5.5 6 7 3.5-1.5 6-3.5 6-7V4L8 1.5z" />
    </svg>
  );
}

function CompassIcon({ className }: { className?: string }) {
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
      <circle cx="8" cy="8" r="6.5" />
      <path d="M10.5 5.5L9 9 5.5 10.5 7 7l3.5-1.5z" />
    </svg>
  );
}

function WindIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <path d="M1 8h9.5a2 2 0 1 0-2-2" />
      <path d="M1 5h6a2 2 0 1 1-2 2" />
      <path d="M3 11h8a2 2 0 1 0-2-2" />
    </svg>
  );
}
