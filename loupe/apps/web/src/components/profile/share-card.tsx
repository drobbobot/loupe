"use client";

// ─────────────────────────────────────────────────────────────────────────────
// ShareCard — The visual card rendered for sharing
//
// Design (prd.md §4.1, design.md §5.5):
//   - Background: user's lens colour at full saturation
//   - Content: pull-quote + "Which lens do you see the world through?"
//   - Lens name does NOT appear prominently — content speaks, not label
//   - Loupe branding small in corner
//   - Beautiful enough to share for aesthetic reasons alone
//
// This component renders the card preview AND is captured as an image
// using html2canvas for the actual share export.
// ─────────────────────────────────────────────────────────────────────────────

import { forwardRef } from "react";
import type { LensSlug } from "@loupe/types";

interface ShareCardProps {
  quote: string;
  lensColour: string;
  lensName: string;
  variant?: "portrait" | "square";
}

export const ShareCard = forwardRef<HTMLDivElement, ShareCardProps>(
  function ShareCard({ quote, lensColour, lensName, variant = "portrait" }, ref) {
    const isPortrait = variant === "portrait";

    return (
      <div
        ref={ref}
        className="relative overflow-hidden"
        style={{
          width: isPortrait ? 360 : 360,
          height: isPortrait ? 640 : 360,
          backgroundColor: lensColour,
        }}
      >
        {/* Decorative large circle — subtle depth */}
        <div
          className="absolute rounded-full"
          style={{
            width: isPortrait ? 400 : 300,
            height: isPortrait ? 400 : 300,
            right: isPortrait ? -120 : -80,
            top: isPortrait ? -100 : -60,
            backgroundColor: "rgba(255,255,255,0.06)",
          }}
        />

        {/* Decorative small circle */}
        <div
          className="absolute rounded-full"
          style={{
            width: isPortrait ? 180 : 120,
            height: isPortrait ? 180 : 120,
            left: isPortrait ? -60 : -40,
            bottom: isPortrait ? 80 : 40,
            backgroundColor: "rgba(0,0,0,0.06)",
          }}
        />

        {/* Content */}
        <div className="relative flex h-full flex-col justify-between p-8">
          {/* Loupe branding */}
          <div className="flex items-center justify-between">
            <span
              className="font-serif text-sm font-medium tracking-wide"
              style={{ color: "rgba(255,253,249,0.7)" }}
            >
              Loupe
            </span>
            <span
              className="text-[10px] font-medium uppercase tracking-widest"
              style={{ color: "rgba(255,253,249,0.4)" }}
            >
              {lensName} lens
            </span>
          </div>

          {/* Quote — the hero */}
          <div className={isPortrait ? "py-8" : "py-4"}>
            {/* Quote mark */}
            <span
              className="mb-2 block font-serif text-4xl leading-none"
              style={{ color: "rgba(255,253,249,0.25)" }}
            >
              &ldquo;
            </span>
            <p
              className={`font-serif font-medium italic leading-relaxed ${
                isPortrait ? "text-xl" : "text-base"
              }`}
              style={{ color: "#FFFDF9" }}
            >
              {quote}
            </p>
          </div>

          {/* Invitation */}
          <div>
            <div
              className="mb-3 h-px w-10"
              style={{ backgroundColor: "rgba(255,253,249,0.2)" }}
            />
            <p
              className="text-xs font-medium leading-relaxed"
              style={{ color: "rgba(255,253,249,0.6)" }}
            >
              Which lens do you see the world through?
            </p>
            <p
              className="mt-1 text-[10px] font-medium tracking-wide"
              style={{ color: "rgba(255,253,249,0.35)" }}
            >
              loupe.app
            </p>
          </div>
        </div>
      </div>
    );
  }
);
