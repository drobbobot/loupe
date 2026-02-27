// ─────────────────────────────────────────────────────────────────────────────
// /lenses — Lens Library entry page
//
// Server Component that fetches all lenses from Sanity (or seed data fallback),
// then renders the spiral map and a list view.
//
// Auth is NOT required — browsable pre-assessment and pre-signup.
// Post-assessment: user's primary/secondary lens is highlighted on the spiral.
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from "next";
import { getAllLenses } from "@/lib/sanity/queries";
import { getAllSeedLenses, GROUP_INTROS } from "@/lib/lens-data";
import { createClient } from "@/lib/supabase/server";
import { LensLibraryClient } from "./lens-library-client";
import type { LensSlug } from "@loupe/types";

export const metadata: Metadata = {
  title: "Lens Library",
  description:
    "Explore the eight Spiral Dynamics lenses — from survival instinct to holistic awareness. Understand yourself and the people around you.",
};

export default async function LensesPage() {
  // ── Fetch lens data ────────────────────────────────────────────────────
  let lenses: Array<{
    slug: LensSlug;
    colourHex: string;
    displayName: string;
    tagline: string;
    group: "me" | "we" | "everybody";
    inwardOutward: "inward" | "outward" | "integrating";
  }>;

  try {
    const sanityLenses = await getAllLenses();
    lenses =
      sanityLenses && sanityLenses.length > 0
        ? sanityLenses
        : getAllSeedLenses().map((l) => ({
            slug: l.slug,
            colourHex: l.colourHex,
            displayName: l.displayName,
            tagline: l.tagline,
            group: l.group,
            inwardOutward: l.inwardOutward,
          }));
  } catch {
    lenses = getAllSeedLenses().map((l) => ({
      slug: l.slug,
      colourHex: l.colourHex,
      displayName: l.displayName,
      tagline: l.tagline,
      group: l.group,
      inwardOutward: l.inwardOutward,
    }));
  }

  // ── Check for user's assessment result ──────────────────────────────────
  let primaryLens: LensSlug | null = null;
  let secondaryLens: LensSlug | null = null;

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { data: result } = await supabase
        .from("assessment_results")
        .select("primary_lens, secondary_lens")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (result) {
        primaryLens = result.primary_lens as LensSlug;
        secondaryLens = result.secondary_lens as LensSlug;
      }
    }
  } catch {
    // Not authenticated or no result — fine, show neutral view
  }

  return (
    <LensLibraryClient
      lenses={lenses}
      primaryLens={primaryLens}
      secondaryLens={secondaryLens}
      groupIntros={GROUP_INTROS}
    />
  );
}
