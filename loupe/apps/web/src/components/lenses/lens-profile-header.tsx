"use client";

// ─────────────────────────────────────────────────────────────────────────────
// LensProfileHeader — Full-screen statement header for a lens profile
//
// Design notes (design.md §5.3):
//   - Full screen background shifts to lens colour on entry
//   - Large typographic header with lens name — a statement screen
//   - One evocative sentence tagline
// ─────────────────────────────────────────────────────────────────────────────

import { motion } from "framer-motion";
import { LENS_COLORS, LENS_FOCUS, LENS_TAGS, type LensSlug } from "@loupe/types";
import { LensGem } from "@/components/ui/lens-gem";

interface LensProfileHeaderProps {
  slug: LensSlug;
  displayName: string;
  tagline: string;
}

export function LensProfileHeader({
  slug,
  displayName,
  tagline,
}: LensProfileHeaderProps) {
  const colors = LENS_COLORS[slug];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative flex min-h-[50vh] flex-col items-center justify-center px-6 py-16 text-center"
      style={{ backgroundColor: colors.bg }}
    >
      {/* Interactive lens gem */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mb-8"
      >
        <LensGem slug={slug} size={140} />
      </motion.div>

      {/* Focus badge */}
      <motion.span
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-4 rounded-full px-3 py-1 text-xs font-medium tracking-wide"
        style={{ backgroundColor: `${colors.DEFAULT}15`, color: colors.text }}
      >
        {LENS_FOCUS[slug]}
      </motion.span>

      {/* Lens name — display typography */}
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="font-serif text-display font-medium tracking-tight"
        style={{ color: colors.DEFAULT }}
      >
        {displayName}
      </motion.h1>

      {/* Lens tags */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="mt-3 text-sm tracking-wide"
        style={{ color: `${colors.text}99` }}
      >
        {LENS_TAGS[slug].join(" · ")}
      </motion.p>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.4 }}
        className="mt-4 max-w-md font-serif text-lg italic leading-relaxed"
        style={{ color: colors.text }}
      >
        {tagline}
      </motion.p>

      {/* Colour accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.75, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="mt-8 h-0.5 w-12 origin-center"
        style={{ backgroundColor: colors.DEFAULT }}
      />
    </motion.div>
  );
}


