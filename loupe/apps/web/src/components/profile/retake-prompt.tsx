"use client";

// ─────────────────────────────────────────────────────────────────────────────
// RetakePrompt — Assessment retake CTA with 90-day cooldown
//
// Shows at the bottom of the profile:
//   - If 90+ days since last assessment: "Retake the assessment" CTA
//   - If < 90 days: shows when retake becomes available
//   - If no date info: shows neutral retake prompt
//
// The 90-day cooldown prevents over-testing while allowing for genuine
// life-stage shifts. We display days remaining in a warm, non-pushy way.
// ─────────────────────────────────────────────────────────────────────────────

import { motion } from "framer-motion";
import Link from "next/link";
import type { ProfileData } from "@/lib/profile-data";

interface RetakePromptProps {
  profile: ProfileData;
  completedAt: string | null; // ISO date of last assessment
}

const COOLDOWN_DAYS = 90;

export function RetakePrompt({ profile, completedAt }: RetakePromptProps) {
  const now = new Date();
  let canRetake = true;
  let daysRemaining = 0;

  if (completedAt) {
    const completedDate = new Date(completedAt);
    const cooldownEnd = new Date(completedDate);
    cooldownEnd.setDate(cooldownEnd.getDate() + COOLDOWN_DAYS);

    if (now < cooldownEnd) {
      canRetake = false;
      daysRemaining = Math.ceil(
        (cooldownEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
      );
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-2xl px-6 pb-32 pt-10"
    >
      <div className="rounded-2xl border border-warm-200 bg-gradient-to-br from-warm-50 to-white p-6 text-center">
        {/* Spiral icon */}
        <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-warm-100">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke={profile.colours.DEFAULT}
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <path d="M10 2a8 8 0 0 1 0 16 6 6 0 0 1 0-12 4 4 0 0 1 0 8 2 2 0 0 1 0-4" />
          </svg>
        </div>

        <h3 className="font-serif text-lg font-medium text-warm-900">
          Lenses shift over time
        </h3>

        {canRetake ? (
          <>
            <p className="mt-2 text-sm leading-relaxed text-warm-500">
              Life experiences, relationships, and growth can shift your centre
              of gravity. When you&apos;re ready, you can retake the assessment
              to see how your perspective has evolved.
            </p>
            <Link
              href="/assessment"
              className="mt-5 inline-flex items-center justify-center rounded-full border-2 px-6 py-2.5 text-sm font-medium transition-all hover:scale-105"
              style={{
                borderColor: profile.colours.DEFAULT,
                color: profile.colours.DEFAULT,
              }}
            >
              Retake the assessment
            </Link>
          </>
        ) : (
          <>
            <p className="mt-2 text-sm leading-relaxed text-warm-500">
              To give your results time to settle and reflect genuine shifts
              rather than mood, the assessment has a 90-day cooldown between
              attempts.
            </p>
            <p className="mt-4 text-sm font-medium text-warm-400">
              Available again in {daysRemaining} {daysRemaining === 1 ? "day" : "days"}
            </p>
          </>
        )}
      </div>
    </motion.section>
  );
}
