// ─────────────────────────────────────────────────────────────────────────────
// Dev Preview — Development-only route for testing the profile view
//
// Renders a mock profile for any lens without needing a Supabase session.
// Usage: /dev-preview?lens=orange&secondary=green&confidence=high
//
// Query params:
//   - lens: primary lens slug (default: "orange")
//   - secondary: secondary lens slug (default: "green")
//   - confidence: "high" | "medium" | "low" (default: "high")
//   - inflation: "true" | "false" (default: "false")
//
// This route should NOT exist in production. Guard with env check if needed.
// ─────────────────────────────────────────────────────────────────────────────

import { ProfileClient } from "@/components/profile/profile-client";
import { assembleProfile } from "@/lib/profile-data";
import { getSeedLens } from "@/lib/lens-data";
import { PORTRAITS } from "@/lib/assessment/portraits";
import { LENS_SLUGS } from "@loupe/types";
import type { AssessmentResult, LensSlug, ConfidenceLevel } from "@loupe/types";

interface Props {
  searchParams: Promise<{
    lens?: string;
    secondary?: string;
    confidence?: string;
    inflation?: string;
  }>;
}

export default async function DevPreviewPage({ searchParams }: Props) {
  const params = await searchParams;

  // Parse query params with defaults
  const primarySlug = (
    LENS_SLUGS.includes(params.lens as LensSlug) ? params.lens : "orange"
  ) as LensSlug;

  const secondarySlug = (
    LENS_SLUGS.includes(params.secondary as LensSlug) ? params.secondary : "green"
  ) as LensSlug;

  const confidence = (
    ["high", "medium", "low"].includes(params.confidence ?? "")
      ? params.confidence
      : "high"
  ) as ConfidenceLevel;

  const inflation = params.inflation === "true";

  // Build mock assessment result
  const portrait = PORTRAITS[primarySlug];
  const mockResult: AssessmentResult = {
    primaryLens: primarySlug,
    secondaryLens: secondarySlug,
    shadowFlags: portrait.shadowFlags,
    growthOrientation: portrait.growthOrientation,
    confidenceLevel: confidence,
    inflationFlag: inflation,
  };

  const primaryLens = getSeedLens(primarySlug)!;
  const secondaryLens = getSeedLens(secondarySlug)!;

  const profile = assembleProfile(mockResult, primaryLens, secondaryLens, portrait);

  // Mock completed date — 30 days ago (within cooldown)
  const completedAt = new Date(
    Date.now() - 30 * 24 * 60 * 60 * 1000
  ).toISOString();

  return <ProfileClient profile={profile} completedAt={completedAt} />;
}
