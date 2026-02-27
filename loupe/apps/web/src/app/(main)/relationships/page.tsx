// ─────────────────────────────────────────────────────────────────────────────
// Relationships Hub — Lens pair selector
//
// Pre-assessment: All lenses shown, user picks any two to explore.
// Post-assessment: User's primary lens is pre-selected.
//
// Server Component that checks for authenticated user + assessment result,
// then renders the client-side hub with optional pre-selection.
// ─────────────────────────────────────────────────────────────────────────────

import { createClient } from "@/lib/supabase/server";
import { RelationshipHub } from "@/components/relationships/relationship-hub";
import type { LensSlug } from "@loupe/types";

export default async function RelationshipsPage() {
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
        .order("completed_at", { ascending: false })
        .limit(1)
        .single();

      if (result) {
        primaryLens = result.primary_lens as LensSlug;
        secondaryLens = result.secondary_lens as LensSlug;
      }
    }
  } catch {
    // Auth or DB errors — fall through without pre-selection
  }

  return (
    <RelationshipHub
      userPrimaryLens={primaryLens}
      userSecondaryLens={secondaryLens}
    />
  );
}
