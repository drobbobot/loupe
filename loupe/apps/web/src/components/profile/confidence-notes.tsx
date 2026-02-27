"use client";

// ─────────────────────────────────────────────────────────────────────────────
// ConfidenceNotes — Caveat banners for medium/low confidence + inflation
//
// These appear at the top of the profile when the assessment's anti-inflation
// checks or confidence scoring indicate the result should be held lightly.
//
// Tone: gentle, normalising. "This is completely natural" not "your result
// is wrong." The goal is to increase trust in the tool, not undermine it.
// ─────────────────────────────────────────────────────────────────────────────

import { motion } from "framer-motion";
import type { ProfileData } from "@/lib/profile-data";

interface ConfidenceNotesProps {
  profile: ProfileData;
}

export function ConfidenceNotes({ profile }: ConfidenceNotesProps) {
  const hasNotes = profile.confidenceNote || profile.inflationNote;
  if (!hasNotes) return null;

  return (
    <div className="mx-auto max-w-2xl space-y-3 px-6 pt-6">
      {profile.inflationNote && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="rounded-xl border border-amber-200/60 bg-amber-50/50 px-4 py-3"
        >
          <div className="flex items-start gap-3">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="mt-0.5 flex-shrink-0"
            >
              <circle cx="8" cy="8" r="6.5" stroke="#D97706" strokeWidth="1.5" />
              <path d="M8 5v3.5" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="8" cy="11" r="0.75" fill="#D97706" />
            </svg>
            <p className="text-xs leading-relaxed text-amber-800">
              {profile.inflationNote}
            </p>
          </div>
        </motion.div>
      )}

      {profile.confidenceNote && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="rounded-xl border border-warm-200/60 bg-warm-50/50 px-4 py-3"
        >
          <div className="flex items-start gap-3">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="mt-0.5 flex-shrink-0"
            >
              <circle cx="8" cy="8" r="6.5" stroke="#9CA3AF" strokeWidth="1.5" />
              <path d="M8 5v3.5" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="8" cy="11" r="0.75" fill="#9CA3AF" />
            </svg>
            <p className="text-xs leading-relaxed text-warm-600">
              {profile.confidenceNote}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
