"use client";

// ─────────────────────────────────────────────────────────────────────────────
// ProfileHeader — Centre of Gravity
//
// The hero section of the profile page. Shows:
//   - Primary lens name + colour flood background
//   - "Centre of gravity" descriptor
//   - Second-person editorial summary
//   - Secondary lens pill
//
// Design notes (prd.md §4.4, design.md §6):
//   - Full-colour lens background (softer than lens profile header)
//   - Serif typography for lens name
//   - Warm, personal tone — this is YOUR result
// ─────────────────────────────────────────────────────────────────────────────

import { motion } from "framer-motion";
import { LENS_FOCUS } from "@loupe/types";
import type { ProfileData } from "@/lib/profile-data";

interface ProfileHeaderProps {
  profile: ProfileData;
  onShare?: () => void;
}

export function ProfileHeader({ profile, onShare }: ProfileHeaderProps) {

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden px-6 pb-12 pt-8"
      style={{ backgroundColor: profile.colours.bg }}
    >
      {/* Decorative accent circle */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.08 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full"
        style={{ backgroundColor: profile.colours.DEFAULT }}
      />

      <div className="relative z-10 mx-auto max-w-2xl">
        {/* Focus badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-3"
        >
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium tracking-wide"
            style={{
              backgroundColor: `${profile.colours.DEFAULT}20`,
              color: profile.colours.text,
            }}
          >
            {LENS_FOCUS[profile.slug]}
          </span>
        </motion.div>

        {/* "Your lens" prelude */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-1 text-sm font-medium uppercase tracking-widest"
          style={{ color: profile.colours.text }}
        >
          Your lens
        </motion.p>

        {/* Primary lens name */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-serif text-5xl font-medium tracking-tight sm:text-6xl"
          style={{ color: profile.colours.DEFAULT }}
        >
          {profile.displayName}
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-3 font-serif text-lg italic leading-relaxed"
          style={{ color: profile.colours.text }}
        >
          {profile.tagline}
        </motion.p>

        {/* Accent bar */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="my-6 h-0.5 w-16 origin-left"
          style={{ backgroundColor: profile.colours.DEFAULT }}
        />

        {/* Centre of gravity description */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="prose-editorial"
          style={{ color: profile.colours.text }}
        >
          {profile.centreOfGravity.split("\n\n").map((p, i) => (
            <p key={i} className={i > 0 ? "mt-4" : ""}>
              {p}
            </p>
          ))}
        </motion.div>

        {/* Secondary lens pill + share button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <span
              className="text-xs font-medium uppercase tracking-wider"
              style={{ color: profile.colours.text, opacity: 0.7 }}
            >
              Secondary lens
            </span>
            <span className="flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium"
              style={{
                borderColor: profile.secondaryColours.DEFAULT,
                color: profile.secondaryColours.DEFAULT,
              }}
            >
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: profile.secondaryColours.DEFAULT }}
              />
              {profile.secondaryDisplayName}
            </span>
          </div>

          {onShare && (
            <button
              onClick={onShare}
              className="flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-medium transition-all hover:bg-white/20 active:scale-[0.96]"
              style={{
                borderColor: `${profile.colours.DEFAULT}40`,
                color: profile.colours.text,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 7V12H11V7" />
                <path d="M7 1V9" />
                <path d="M4.5 3.5L7 1L9.5 3.5" />
              </svg>
              Share
            </button>
          )}
        </motion.div>
      </div>
    </motion.section>
  );
}
