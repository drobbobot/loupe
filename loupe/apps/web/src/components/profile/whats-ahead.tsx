"use client";

// ─────────────────────────────────────────────────────────────────────────────
// WhatsAhead — Growth orientation + secondary lens note
//
// Shows what the "next" lens on the spiral sees that the primary lens
// sometimes misses. This is descriptive, not prescriptive — there's no
// hierarchy implied.
//
// Tone: "sees something you sometimes miss" — invitation, not instruction.
// ─────────────────────────────────────────────────────────────────────────────

import { motion } from "framer-motion";
import Link from "next/link";
import type { ProfileData } from "@/lib/profile-data";
import { DOMAIN_LABELS, LENS_COLORS } from "@loupe/types";

interface WhatsAheadProps {
  profile: ProfileData;
}

export function WhatsAhead({ profile }: WhatsAheadProps) {
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
        What&apos;s ahead
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-warm-500">
        Growth on the spiral isn&apos;t about leaving your lens behind — it&apos;s about
        expanding what you can see.
      </p>

      {/* Growth orientation card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15 }}
        className="mt-6 rounded-2xl border border-warm-200 bg-gradient-to-br from-white to-warm-50/50 p-6"
      >
        <div className="mb-3 flex items-center gap-2">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            stroke={profile.colours.DEFAULT}
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <path d="M9 2v14M9 2l-4 4M9 2l4 4" />
          </svg>
          <span
            className="text-xs font-medium uppercase tracking-wider"
            style={{ color: profile.colours.text }}
          >
            Growth edge
          </span>
        </div>
        <div className="prose-editorial text-warm-700">
          {profile.whatsAhead.growthOrientation.split("\n\n").map((p, i) => (
            <p key={i} className={i > 0 ? "mt-4" : ""}>
              {p}
            </p>
          ))}
        </div>
      </motion.div>

      {/* Secondary lens note */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.25 }}
        className="mt-6 rounded-2xl p-6"
        style={{ backgroundColor: profile.secondaryColours.bg }}
      >
        <div className="mb-3 flex items-center gap-2">
          <span
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: profile.secondaryColours.DEFAULT }}
          />
          <span
            className="text-xs font-medium uppercase tracking-wider"
            style={{ color: profile.secondaryColours.text }}
          >
            Your secondary lens: {profile.secondaryDisplayName}
          </span>
        </div>
        <p
          className="text-sm leading-relaxed"
          style={{ color: profile.secondaryColours.text }}
        >
          {profile.whatsAhead.secondaryNote}
        </p>

        {/* Deep assessment: show where the secondary lens is strongest */}
        {profile.deep && (() => {
          const secondaryDomains = profile.deep.domainProfiles
            .filter((dp) => dp.dominantLens === profile.secondaryLens || dp.secondaryLens === profile.secondaryLens)
            .map((dp) => dp.domain);

          if (secondaryDomains.length === 0) return null;

          return (
            <p
              className="mt-3 text-xs leading-relaxed"
              style={{ color: profile.secondaryColours.text + "bb" }}
            >
              Your {profile.secondaryDisplayName} lens is most active in{" "}
              {secondaryDomains
                .map((d) => DOMAIN_LABELS[d].split(" & ")[0].toLowerCase())
                .join(secondaryDomains.length === 2 ? " and " : ", ")}
              .
            </p>
          );
        })()}

        <Link
          href={`/lenses/${profile.secondaryLens}`}
          className="mt-4 inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-white/50"
          style={{
            borderColor: profile.secondaryColours.DEFAULT,
            color: profile.secondaryColours.DEFAULT,
          }}
        >
          Explore {profile.secondaryDisplayName} lens
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
