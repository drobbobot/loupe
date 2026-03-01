"use client";

// ─────────────────────────────────────────────────────────────────────────────
// GoDeeper CTA — Prompts quick-quiz users to take the deep assessment
//
// Shown on quick-quiz profiles between HowYouShowUp and Shadow. Makes the
// case for the deeper view without invalidating what they already learned.
//
// Tone: "You've seen the headline — here's the full story."
// ─────────────────────────────────────────────────────────────────────────────

import Link from "next/link";
import { motion } from "framer-motion";
import type { ProfileData } from "@/lib/profile-data";
import { LENS_COLORS, LIFE_DOMAINS } from "@loupe/types";
import { QUICK_QUESTION_COUNT, DEEP_QUESTION_COUNT } from "@/lib/assessment/question-bank";

interface GoDeepCtaProps {
  profile: ProfileData;
}

export function GoDeepCta({ profile }: GoDeepCtaProps) {
  const colors = profile.colours;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-2xl px-6 py-10"
    >
      <div
        className="overflow-hidden rounded-2xl"
        style={{ backgroundColor: colors.bg }}
      >
        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-start gap-4">
            {/* Mini domain dots — hint at what the deep assessment reveals */}
            <div className="flex flex-shrink-0 flex-col gap-1 pt-1">
              {LIFE_DOMAINS.map(
                (_, i) => (
                  <div
                    key={i}
                    className="rounded-full"
                    style={{
                      width: 6,
                      height: 6,
                      backgroundColor: colors.DEFAULT,
                      opacity: 0.25 + i * 0.12,
                    }}
                  />
                )
              )}
            </div>

            <div>
              <h3
                className="font-serif text-xl font-medium"
                style={{ color: colors.text }}
              >
                Go deeper
              </h3>
              <p
                className="mt-2 text-sm leading-relaxed"
                style={{ color: colors.text + "cc" }}
              >
                Your centre of gravity is{" "}
                <strong style={{ color: colors.DEFAULT }}>
                  {profile.displayName}
                </strong>{" "}
                — but that&rsquo;s the headline. The deep assessment maps how your
                lens shifts across {LIFE_DOMAINS.slice(0, -1).join(", ")}, and {LIFE_DOMAINS[LIFE_DOMAINS.length - 1]}. You might be surprised where it moves.
              </p>
              <p
                className="mt-2 text-sm leading-relaxed"
                style={{ color: colors.text + "99" }}
              >
                About 15 minutes. Your quick quiz answers carry over, so you
                won&rsquo;t repeat anything.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-6 flex items-center gap-4">
            <Link
              href="/assessment/deep"
              className="inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-medium text-white transition-transform hover:scale-105"
              style={{ backgroundColor: colors.DEFAULT }}
            >
              Take the deep assessment
            </Link>
            <span
              className="text-xs"
              style={{ color: colors.text + "77" }}
            >
              ~{DEEP_QUESTION_COUNT - QUICK_QUESTION_COUNT} new questions
            </span>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
