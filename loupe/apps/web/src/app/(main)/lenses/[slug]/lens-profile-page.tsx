"use client";

// ─────────────────────────────────────────────────────────────────────────────
// LensProfilePage — Client wrapper for a lens profile
//
// Sets the lens colour theme on mount and renders the full profile:
//   - Statement header (full colour)
//   - Content sections
//   - Navigation to adjacent lenses
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { LENS_SLUGS, LENS_COLORS, type LensSlug } from "@loupe/types";
import { setLensTheme, clearLensTheme } from "@/lib/lens-theme";
import { LensProfileHeader } from "@/components/lenses/lens-profile-header";
import { LensProfileContent } from "@/components/lenses/lens-profile-content";
import type { LensProfile } from "@/lib/lens-data";

interface LensProfilePageProps {
  lens: LensProfile;
}

export function LensProfilePage({ lens }: LensProfilePageProps) {
  // Set lens colour theme on mount, clear on unmount
  useEffect(() => {
    setLensTheme(lens.slug);
    return () => clearLensTheme();
  }, [lens.slug]);

  // Find adjacent lenses for navigation
  const currentIndex = LENS_SLUGS.indexOf(lens.slug);
  const prevSlug = currentIndex > 0 ? LENS_SLUGS[currentIndex - 1] : null;
  const nextSlug =
    currentIndex < LENS_SLUGS.length - 1
      ? LENS_SLUGS[currentIndex + 1]
      : null;

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

  return (
    <main className="min-h-screen pb-24">
      {/* Back to library */}
      <div className="absolute left-4 top-[4.5rem] z-10">
        <Link
          href="/lenses"
          className="flex items-center gap-1 rounded-full bg-white/80 px-3 py-1.5 text-xs font-medium text-warm-600 backdrop-blur-sm transition-colors hover:bg-white hover:text-warm-900"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M8.5 3L4.5 7L8.5 11" />
          </svg>
          All lenses
        </Link>
      </div>

      {/* Statement header */}
      <LensProfileHeader
        slug={lens.slug}
        displayName={lens.displayName}
        tagline={lens.tagline}
        group={lens.group}
      />

      {/* Content sections */}
      <LensProfileContent lens={lens} />

      {/* Adjacent lens navigation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mx-auto flex max-w-2xl items-center justify-between px-6 pb-8"
      >
        {prevSlug ? (
          <Link
            href={`/lenses/${prevSlug}`}
            className="flex items-center gap-2 rounded-full border border-warm-200 px-4 py-2 text-sm text-warm-600 transition-colors hover:border-warm-400 hover:text-warm-900"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M8.5 3L4.5 7L8.5 11" />
            </svg>
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: LENS_COLORS[prevSlug].DEFAULT }}
            />
            {LENS_NAMES[prevSlug]}
          </Link>
        ) : (
          <div />
        )}

        {nextSlug ? (
          <Link
            href={`/lenses/${nextSlug}`}
            className="flex items-center gap-2 rounded-full border border-warm-200 px-4 py-2 text-sm text-warm-600 transition-colors hover:border-warm-400 hover:text-warm-900"
          >
            {LENS_NAMES[nextSlug]}
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: LENS_COLORS[nextSlug].DEFAULT }}
            />
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M5.5 3L9.5 7L5.5 11" />
            </svg>
          </Link>
        ) : (
          <div />
        )}
      </motion.div>
    </main>
  );
}
