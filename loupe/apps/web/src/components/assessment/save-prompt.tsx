"use client";

// ─────────────────────────────────────────────────────────────────────────────
// SavePrompt — Invite unauthenticated users to save their result
//
// Shown after the result reveal for users who took the assessment without
// an account. Flow:
//   1. "Save your result and start exploring"
//   2. Redirects to /signup?next=/assessment/result
//   3. After signup, client saves the result via POST /api/assessment/save
//
// Design notes:
//   - Warm, low-pressure — not a hard paywall
//   - Shows the primary lens colour environment
//   - Option to skip (result is ephemeral — only in memory)
// ─────────────────────────────────────────────────────────────────────────────

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import type { AssessmentResult, LensSlug } from "@loupe/types";
import { LENS_COLORS } from "@loupe/types";

interface SavePromptProps {
  result: AssessmentResult;
}

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

export function SavePrompt({ result }: SavePromptProps) {
  const router = useRouter();
  const colors = LENS_COLORS[result.primaryLens];

  const handleSave = useCallback(() => {
    // Store result in sessionStorage so it can be saved after signup
    sessionStorage.setItem(
      "loupe_unsaved_result",
      JSON.stringify(result)
    );
    sessionStorage.setItem(
      "loupe_unsaved_responses",
      // The store has the responses — we'll need to pass them through
      // For now, redirect to signup with a return path
      "pending"
    );
    router.push("/signup?next=/assessment/result&save=1");
  }, [result, router]);

  const handleSkip = useCallback(() => {
    router.push("/");
  }, [router]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-screen flex-col items-center justify-center px-6"
      style={{ backgroundColor: colors.bg }}
    >
      <div className="flex max-w-md flex-col items-center text-center">
        {/* Lens badge */}
        <div
          className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl text-2xl font-medium text-white"
          style={{ backgroundColor: colors.DEFAULT }}
        >
          {LENS_NAMES[result.primaryLens][0]}
        </div>

        <h2
          className="font-serif text-2xl font-medium"
          style={{ color: colors.text }}
        >
          Save your result
        </h2>

        <p className="mt-4 text-warm-600" style={{ color: colors.text + "cc" }}>
          Create a free account to keep your{" "}
          <strong style={{ color: colors.DEFAULT }}>
            {LENS_NAMES[result.primaryLens]}
          </strong>{" "}
          profile, explore your full portrait, and unlock the lens library.
        </p>

        {/* Save CTA */}
        <motion.button
          onClick={handleSave}
          whileTap={{ scale: 0.98 }}
          className="mt-8 w-full rounded-full py-3.5 text-sm font-medium text-white transition-transform hover:scale-[1.02]"
          style={{ backgroundColor: colors.DEFAULT }}
        >
          Create account & save
        </motion.button>

        {/* Skip */}
        <button
          onClick={handleSkip}
          className="mt-4 text-sm text-warm-500 transition-colors hover:text-warm-700"
        >
          Skip for now
        </button>

        <p className="mt-8 text-xs text-warm-400">
          Your result will be lost if you leave without saving.
        </p>
      </div>
    </motion.div>
  );
}
