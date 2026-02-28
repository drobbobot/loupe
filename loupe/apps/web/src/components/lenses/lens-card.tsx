"use client";

// ─────────────────────────────────────────────────────────────────────────────
// LensCard — Summary card for list view on /lenses
//
// Shows lens colour swatch, name, tagline, and group badge.
// Links to the full lens profile.
// ─────────────────────────────────────────────────────────────────────────────

import { motion } from "framer-motion";
import Link from "next/link";
import { LENS_COLORS, LENS_FOCUS, type LensSlug } from "@loupe/types";

interface LensCardProps {
  slug: LensSlug;
  displayName: string;
  tagline: string;
  group: "me" | "we" | "everybody";
  isPrimary?: boolean;
  isSecondary?: boolean;
  index: number;
}

export function LensCard({
  slug,
  displayName,
  tagline,
  group,
  isPrimary,
  isSecondary,
  index,
}: LensCardProps) {
  const colors = LENS_COLORS[slug];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Link
        href={`/lenses/${slug}`}
        className="group flex items-start gap-4 rounded-2xl border-2 border-warm-200 bg-white p-4 transition-all duration-200 hover:border-warm-400 hover:shadow-sm"
      >
        {/* Colour swatch */}
        <div
          className="mt-0.5 h-10 w-10 shrink-0 rounded-xl"
          style={{ backgroundColor: colors.DEFAULT }}
        />

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-serif text-lg font-medium text-warm-900">
              {displayName}
            </h3>
            {isPrimary && (
              <span className="rounded-full px-2 py-0.5 text-2xs font-medium" style={{ backgroundColor: colors.bg, color: colors.text }}>
                Your lens
              </span>
            )}
            {isSecondary && (
              <span className="rounded-full bg-warm-100 px-2 py-0.5 text-2xs font-medium text-warm-600">
                Secondary
              </span>
            )}
          </div>
          <p className="mt-1 text-sm leading-snug text-warm-500 line-clamp-2">
            {tagline}
          </p>
        </div>

        {/* Focus badge */}
        <span className="mt-1 shrink-0 rounded-full bg-warm-100 px-2 py-0.5 text-2xs font-medium text-warm-400">
          {LENS_FOCUS[slug]}
        </span>
      </Link>
    </motion.div>
  );
}
