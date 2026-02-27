// ─────────────────────────────────────────────────────────────────────────────
// Home — Dual-mode entry point
//
// Pre-assessment: Shows the marketing landing page with "Find your lens" CTA.
// Post-assessment: Shows the personalised "Your Profile" view.
//
// The home page is a Server Component that checks for an authenticated user
// with an assessment result. If found, it assembles the profile data and
// renders the ProfileClient. Otherwise, it shows the landing page.
//
// Auth is optional — the landing page works without login.
// The profile requires both a user session AND an assessment result.
// ─────────────────────────────────────────────────────────────────────────────

import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { ProfileClient } from "@/components/profile/profile-client";
import { assembleProfile } from "@/lib/profile-data";
import { getSeedLens } from "@/lib/lens-data";
import { PORTRAITS } from "@/lib/assessment/portraits";
import type { AssessmentResult, LensSlug, ConfidenceLevel } from "@loupe/types";

export default async function HomePage() {
  // Try to get authenticated user + assessment result
  let profile = null;
  let completedAt: string | null = null;

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      // Fetch most recent assessment result
      const { data: result } = await supabase
        .from("assessment_results")
        .select("*")
        .eq("user_id", user.id)
        .order("completed_at", { ascending: false })
        .limit(1)
        .single();

      if (result) {
        // Map DB row to AssessmentResult shape
        const assessmentResult: AssessmentResult = {
          primaryLens: result.primary_lens as LensSlug,
          secondaryLens: result.secondary_lens as LensSlug,
          shadowFlags: result.shadow_flags as AssessmentResult["shadowFlags"],
          growthOrientation: (result.growth_orientation as string) ?? "",
          confidenceLevel: (result.confidence_level as ConfidenceLevel) ?? "high",
          inflationFlag: result.inflation_flag ?? false,
        };

        completedAt = result.completed_at;

        // Get lens profiles for primary + secondary
        const primaryLens = getSeedLens(assessmentResult.primaryLens);
        const secondaryLens = getSeedLens(assessmentResult.secondaryLens);

        if (primaryLens && secondaryLens) {
          const portrait = PORTRAITS[assessmentResult.primaryLens];
          profile = assembleProfile(
            assessmentResult,
            primaryLens,
            secondaryLens,
            portrait
          );
        }
      }
    }
  } catch {
    // Auth or DB errors — fall through to landing page
    // This is expected in dev when Supabase isn't configured
  }

  // ── Post-assessment: show profile ──────────────────────────────────────
  if (profile) {
    return <ProfileClient profile={profile} completedAt={completedAt} />;
  }

  // ── Pre-assessment: show landing page ──────────────────────────────────
  return (
    <main className="flex flex-col items-center justify-center px-6" style={{ height: "calc(100dvh - 3.5rem - 4rem)" }}>
      <div className="w-full max-w-lg text-center">
        {/* Wordmark — replace with SVG logo once identity is designed */}
        <h1 className="mb-6 font-serif text-4xl font-medium tracking-tight text-warm-900">
          Loupe
        </h1>

        <p className="mb-4 text-lg leading-relaxed text-warm-600">
          The people around you aren&apos;t irrational.
          <br />
          They&apos;re just seeing through a different lens.
        </p>

        <p className="mx-auto mb-12 max-w-prose text-base leading-relaxed text-warm-500">
          Loupe uses Spiral Dynamics to help you understand your own worldview —
          and genuinely connect with people who see things differently.
        </p>

        {/* Primary CTA — wording from design.md §8 */}
        <Link
          href="/assessment"
          className="inline-flex items-center justify-center rounded-full bg-warm-900 px-8 py-4 text-base font-medium text-cream transition-all hover:bg-warm-800 active:scale-[0.98]"
        >
          Find your lens
        </Link>

        <p className="mt-6 text-sm text-warm-400">
          Takes about 15 minutes. No account required to start.
        </p>
      </div>
    </main>
  );
}
