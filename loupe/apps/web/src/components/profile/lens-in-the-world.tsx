"use client";

// ─────────────────────────────────────────────────────────────────────────────
// LensInTheWorld — Your Lens in the World
//
// Contextualises the user's lens within the current cultural moment.
// This section helps the user feel that their worldview is part of a
// larger conversation, not an isolated personality trait.
// ─────────────────────────────────────────────────────────────────────────────

import { motion } from "framer-motion";
import Link from "next/link";
import type { ProfileData } from "@/lib/profile-data";

interface LensInTheWorldProps {
  profile: ProfileData;
}

export function LensInTheWorld({ profile }: LensInTheWorldProps) {
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
        Your lens in the world
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-warm-500">
        Your worldview doesn&apos;t exist in a vacuum — it&apos;s part of a
        larger cultural conversation.
      </p>

      {/* Content card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15 }}
        className="mt-6 rounded-2xl border border-warm-200 bg-white p-6"
      >
        <div className="prose-editorial text-warm-700">
          {profile.lensInTheWorld.split("\n\n").map((p, i) => (
            <p key={i} className={i > 0 ? "mt-4" : ""}>
              {p}
            </p>
          ))}
        </div>
      </motion.div>

      {/* CTA to lens library */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.25 }}
        className="mt-6 flex flex-wrap gap-3"
      >
        <Link
          href={`/lenses/${profile.primaryLens}`}
          className="inline-flex items-center gap-2 rounded-full border border-warm-200 px-4 py-2 text-sm font-medium text-warm-600 transition-colors hover:border-warm-400 hover:text-warm-900"
        >
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: profile.colours.DEFAULT }}
          />
          Read full {profile.displayName} profile
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M4 2l4 4-4 4" />
          </svg>
        </Link>
        <Link
          href="/lenses"
          className="inline-flex items-center gap-2 rounded-full border border-warm-200 px-4 py-2 text-sm font-medium text-warm-600 transition-colors hover:border-warm-400 hover:text-warm-900"
        >
          Explore all lenses
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M4 2l4 4-4 4" />
          </svg>
        </Link>
      </motion.div>
    </motion.section>
  );
}
