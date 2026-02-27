"use client";

// ─────────────────────────────────────────────────────────────────────────────
// ResultReveal — The signature "lens colour flood" design moment
//
// Design notes (design.md §5, prd.md §4.3):
//   - First screen: reveals primary lens name, colour, and single sentence
//   - Beat of pause — users sit with result before more content loads
//   - Full-screen lens colour flood background
//   - This is the product's first deep trust moment — handle with care
//   - Reduced motion: skip animation, show result immediately
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { AssessmentResult, LensSlug } from "@loupe/types";
import { LENS_COLORS } from "@loupe/types";

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
    "You see the world through the lens of what\u2019s real, physical, and immediate.",
  purple:
    "You see the world through the lens of belonging, ritual, and the bonds that hold us together.",
  red:
    "You see the world through the lens of action, power, and the courage to be fully yourself.",
  blue:
    "You see the world through the lens of principle, duty, and the structures that give life meaning.",
  orange:
    "You see the world through the lens of achievement, possibility, and the drive to make things better.",
  green:
    "You see the world through the lens of connection, fairness, and the belief that every voice matters.",
  yellow:
    "You see the world through the lens of systems, patterns, and the integration of many truths.",
  turquoise:
    "You see the world through the lens of wholeness \u2014 the living web that connects everything.",
};

export function ResultReveal({ result, onComplete }: ResultRevealProps) {
  const [phase, setPhase] = useState<"flood" | "name" | "tagline" | "ready">(
    "flood"
  );

  const lens = result.primaryLens;
  const colors = LENS_COLORS[lens];

  // Timed reveal sequence
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase("name"), 1200),
      setTimeout(() => setPhase("tagline"), 2400),
      setTimeout(() => setPhase("ready"), 4000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const handleContinue = useCallback(() => {
    onComplete();
  }, [onComplete]);

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
        style={{
          width: 100,
          height: 100,
          backgroundColor: colors.DEFAULT,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* "Your lens is..." prelude */}
        <AnimatePresence>
          {(phase === "name" ||
            phase === "tagline" ||
            phase === "ready") && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4 text-sm uppercase tracking-widest"
              style={{ color: colors.text }}
            >
              Your lens is
            </motion.p>
          )}
        </AnimatePresence>

        {/* Lens name — the hero moment */}
        <AnimatePresence>
          {(phase === "name" ||
            phase === "tagline" ||
            phase === "ready") && (
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

        {/* Tagline — after a beat */}
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

        {/* Continue prompt */}
        <AnimatePresence>
          {phase === "ready" && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              onClick={handleContinue}
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
