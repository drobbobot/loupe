"use client";

// ─────────────────────────────────────────────────────────────────────────────
// ResultReveal — The signature "lens colour flood" design moment
//
// Two modes:
//   Quick Quiz:  colour flood → lens name → tagline → "Explore your result"
//   Deep:        colour flood → "centre of gravity" → lens name → tagline →
//                domain dots preview → "Explore your full map"
//
// Design notes (design.md §5, prd.md §4.3):
//   - First screen: reveals primary lens name, colour, and single sentence
//   - Beat of pause — users sit with result before more content loads
//   - Full-screen lens colour flood background
//   - This is the product's first deep trust moment — handle with care
//   - The deep reveal adds a "peek" at domain diversity to build anticipation
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { AssessmentResult, LensSlug, LifeDomain } from "@loupe/types";
import { LENS_COLORS, DOMAIN_LABELS, LIFE_DOMAINS, isDeepResult } from "@loupe/types";

interface ResultRevealProps {
  result: AssessmentResult;
  onComplete: () => void;
}

// Lens display names
const LENS_NAMES: Record<LensSlug, string> = {
  beige: "Beige",
  purple: "Purple",
  red: "Red",
  blue: "Blue",
  orange: "Orange",
  green: "Green",
  yellow: "Yellow",
  turquoise: "Turquoise",
};

// One-line evocative descriptions for the reveal moment
const LENS_TAGLINES: Record<LensSlug, string> = {
  beige:
    "You primarily see the world through the lens of what\u2019s real, physical, and immediate.",
  purple:
    "You primarily see the world through the lens of belonging, ritual, and the bonds that hold us together.",
  red:
    "You primarily see the world through the lens of action, power, and the courage to be fully yourself.",
  blue:
    "You primarily see the world through the lens of principle, duty, and the structures that give life meaning.",
  orange:
    "You primarily see the world through the lens of achievement, possibility, and the drive to make things better.",
  green:
    "You primarily see the world through the lens of connection, fairness, and the belief that every voice matters.",
  yellow:
    "You primarily see the world through the lens of systems, patterns, and the integration of many truths.",
  turquoise:
    "You primarily see the world through the lens of wholeness \u2014 the living web that connects everything.",
};

// ── Quick Quiz Reveal ─────────────────────────────────────────────────────

function QuickReveal({
  result,
  onComplete,
}: ResultRevealProps) {
  const [phase, setPhase] = useState<"flood" | "name" | "tagline" | "ready">(
    "flood"
  );

  const lens = result.primaryLens;
  const colors = LENS_COLORS[lens];

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase("name"), 1200),
      setTimeout(() => setPhase("tagline"), 2400),
      setTimeout(() => setPhase("ready"), 4000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      initial={{ backgroundColor: "#FAF8F5" }}
      animate={{ backgroundColor: colors.bg }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center px-6"
    >
      {/* Colour flood overlay */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 30, opacity: 0.12 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="pointer-events-none absolute rounded-full"
        style={{ width: 100, height: 100, backgroundColor: colors.DEFAULT }}
      />

      <div className="relative z-10 flex flex-col items-center text-center">
        <AnimatePresence>
          {phase !== "flood" && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4 text-sm uppercase tracking-widest"
              style={{ color: colors.text }}
            >
              Your Centre of Gravity is
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {phase !== "flood" && (
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="font-serif text-5xl font-medium sm:text-7xl"
              style={{ color: colors.DEFAULT }}
            >
              {LENS_NAMES[lens]}
            </motion.h1>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {(phase === "tagline" || phase === "ready") && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-6 max-w-md font-serif text-lg leading-relaxed"
              style={{ color: colors.text }}
            >
              {LENS_TAGLINES[lens]}
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {phase === "ready" && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              onClick={onComplete}
              className="mt-12 rounded-full px-10 py-3.5 text-sm font-medium text-white transition-transform hover:scale-105"
              style={{ backgroundColor: colors.DEFAULT }}
            >
              Explore your result
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ── Deep Assessment Reveal ────────────────────────────────────────────────

type DeepPhase =
  | "flood"
  | "prelude"
  | "name"
  | "tagline"
  | "domains"
  | "ready";

function DeepReveal({
  result,
  onComplete,
}: ResultRevealProps) {
  const [phase, setPhase] = useState<DeepPhase>("flood");

  const deep = isDeepResult(result) ? result : null;
  const lens = deep?.centreOfGravity ?? result.primaryLens;
  const colors = LENS_COLORS[lens];

  // Build domain colour map for the preview dots
  const domainLenses = new Map<LifeDomain, LensSlug>();
  if (deep) {
    for (const dp of deep.domainProfiles) {
      domainLenses.set(dp.domain, dp.dominantLens);
    }
  }

  // How many distinct lenses across domains?
  const uniqueDomainLenses = new Set(domainLenses.values()).size;
  const hasVariety = uniqueDomainLenses >= 3;

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase("prelude"), 1200),
      setTimeout(() => setPhase("name"), 2600),
      setTimeout(() => setPhase("tagline"), 4000),
      setTimeout(() => setPhase("domains"), 5800),
      setTimeout(() => setPhase("ready"), 8000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      initial={{ backgroundColor: "#FAF8F5" }}
      animate={{ backgroundColor: colors.bg }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center px-6"
    >
      {/* Colour flood overlay */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 30, opacity: 0.12 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="pointer-events-none absolute rounded-full"
        style={{ width: 100, height: 100, backgroundColor: colors.DEFAULT }}
      />

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Phase 1: "Your centre of gravity" */}
        <AnimatePresence>
          {phase !== "flood" && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4 text-sm uppercase tracking-widest"
              style={{ color: colors.text }}
            >
              Your centre of gravity
            </motion.p>
          )}
        </AnimatePresence>

        {/* Phase 2: Lens name */}
        <AnimatePresence>
          {phase !== "flood" && phase !== "prelude" && (
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="font-serif text-5xl font-medium sm:text-7xl"
              style={{ color: colors.DEFAULT }}
            >
              {LENS_NAMES[lens]}
            </motion.h1>
          )}
        </AnimatePresence>

        {/* Phase 3: Tagline */}
        <AnimatePresence>
          {(phase === "tagline" ||
            phase === "domains" ||
            phase === "ready") && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-6 max-w-md font-serif text-lg leading-relaxed"
              style={{ color: colors.text }}
            >
              {LENS_TAGLINES[lens]}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Phase 4: Domain preview — shows how lens shifts across life */}
        <AnimatePresence>
          {(phase === "domains" || phase === "ready") && deep && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-10"
            >
              <p
                className="mb-4 text-xs uppercase tracking-wider"
                style={{ color: colors.text + "99" }}
              >
                {hasVariety
                  ? "But your lens shifts across life"
                  : "Your lens across life"}
              </p>

              {/* Domain dots row */}
              <div className="flex items-center justify-center gap-4">
                {LIFE_DOMAINS.map((domain, i) => {
                  const domainLens = domainLenses.get(domain);
                  if (!domainLens) return null;
                  const domainColor = LENS_COLORS[domainLens];
                  const isSameAsCoG = domainLens === lens;

                  return (
                    <motion.div
                      key={domain}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: i * 0.12,
                        duration: 0.4,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="flex flex-col items-center gap-1.5"
                    >
                      <div
                        className="rounded-full transition-transform"
                        style={{
                          width: isSameAsCoG ? 20 : 16,
                          height: isSameAsCoG ? 20 : 16,
                          backgroundColor: domainColor.DEFAULT,
                          opacity: isSameAsCoG ? 1 : 0.75,
                        }}
                      />
                      <span
                        className="text-[9px] leading-none"
                        style={{ color: colors.text + "88" }}
                      >
                        {DOMAIN_LABELS[domain].split(" & ")[0]}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Phase 5: CTA */}
        <AnimatePresence>
          {phase === "ready" && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              onClick={onComplete}
              className="mt-10 rounded-full px-10 py-3.5 text-sm font-medium text-white transition-transform hover:scale-105"
              style={{ backgroundColor: colors.DEFAULT }}
            >
              Explore your full map
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ── Exported component — picks the right reveal ──────────────────────────

export function ResultReveal({ result, onComplete }: ResultRevealProps) {
  if (isDeepResult(result)) {
    return <DeepReveal result={result} onComplete={onComplete} />;
  }
  return <QuickReveal result={result} onComplete={onComplete} />;
}
