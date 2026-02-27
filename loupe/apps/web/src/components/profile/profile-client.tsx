"use client";

// ─────────────────────────────────────────────────────────────────────────────
// ProfileClient — Orchestrator for the Your Profile page
//
// Assembles all profile sections in order:
//   1. ProfileHeader (Centre of Gravity)
//   2. ConfidenceNotes (if applicable)
//   3. HowYouShowUp (3 context panels)
//   4. ShadowSection
//   5. WhatsAhead (growth orientation + secondary lens)
//   6. LensInTheWorld
//   7. RetakePrompt
//
// Sets the lens colour theme on mount (like lens profile page).
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useState } from "react";
import { setLensTheme, clearLensTheme } from "@/lib/lens-theme";
import { extractShareQuotes } from "@/lib/share-quotes";
import type { ProfileData } from "@/lib/profile-data";
import { ProfileHeader } from "./profile-header";
import { ConfidenceNotes } from "./confidence-notes";
import { HowYouShowUp } from "./how-you-show-up";
import { ShadowSection } from "./shadow-section";
import { WhatsAhead } from "./whats-ahead";
import { LensInTheWorld } from "./lens-in-the-world";
import { RetakePrompt } from "./retake-prompt";
import { ShareModal } from "./share-modal";

interface ProfileClientProps {
  profile: ProfileData;
  completedAt: string | null;
}

export function ProfileClient({ profile, completedAt }: ProfileClientProps) {
  const [shareOpen, setShareOpen] = useState(false);
  const shareQuotes = extractShareQuotes(profile);

  // Set lens colour theme on mount, clear on unmount
  useEffect(() => {
    setLensTheme(profile.primaryLens);
    return () => clearLensTheme();
  }, [profile.primaryLens]);

  return (
    <main className="min-h-screen pb-24">
      <ProfileHeader profile={profile} onShare={() => setShareOpen(true)} />
      <ConfidenceNotes profile={profile} />

      {/* Divider */}
      <div className="mx-auto my-2 max-w-2xl px-6">
        <div className="h-px bg-warm-200/60" />
      </div>

      <HowYouShowUp profile={profile} />

      {/* Divider */}
      <div className="mx-auto max-w-2xl px-6">
        <div className="h-px bg-warm-200/60" />
      </div>

      <ShadowSection profile={profile} />

      {/* Divider */}
      <div className="mx-auto max-w-2xl px-6">
        <div className="h-px bg-warm-200/60" />
      </div>

      <WhatsAhead profile={profile} />

      {/* Divider */}
      <div className="mx-auto max-w-2xl px-6">
        <div className="h-px bg-warm-200/60" />
      </div>

      <LensInTheWorld profile={profile} />

      {/* Divider */}
      <div className="mx-auto max-w-2xl px-6">
        <div className="h-px bg-warm-200/60" />
      </div>

      <RetakePrompt profile={profile} completedAt={completedAt} />

      {/* Share modal */}
      <ShareModal
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        quotes={shareQuotes}
        lensColour={profile.colours.DEFAULT}
        lensName={profile.displayName}
      />
    </main>
  );
}
