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
    <main className="pb-24">
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section
        className="flex flex-col items-center justify-center px-6"
        style={{ minHeight: "calc(100dvh - 3.5rem - 4rem)" }}
      >
        <div className="w-full max-w-lg text-center">
          <h1 className="mb-6 font-serif text-4xl font-medium tracking-tight text-warm-900">
            Loupe
          </h1>

          <p className="mb-4 text-lg leading-relaxed text-warm-600">
            The people around you aren&apos;t irrational.
            <br />
            They&apos;re just seeing through a different lens.
          </p>

          <p className="mx-auto mb-12 max-w-prose text-base leading-relaxed text-warm-500">
            Loupe uses Spiral Dynamics to help you understand your own
            worldview — and genuinely connect with people who see things
            differently.
          </p>

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

        {/* Scroll hint */}
        <div className="mt-12 animate-bounce text-warm-300">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 7L10 13L16 7" />
          </svg>
        </div>
      </section>

      {/* ── What is Spiral Dynamics? ──────────────────────────────────── */}
      <section className="mx-auto max-w-lg px-6 pt-16">
        <h2 className="font-serif text-2xl font-medium text-warm-900">
          What is Spiral Dynamics?
        </h2>
        <p className="mt-4 text-base leading-relaxed text-warm-600">
          Spiral Dynamics is a model of how people see the world. Developed
          from the research of psychologist Clare Graves, it maps eight
          distinct value systems — called lenses — that shape how we make
          decisions, what we care about, and what drives us mad about each
          other.
        </p>
        <p className="mt-4 text-base leading-relaxed text-warm-600">
          These aren&apos;t personality types. They&apos;re worldviews — ways
          of making sense of complexity. Each one emerged in response to real
          human challenges, and each one carries genuine wisdom along with
          predictable blind spots.
        </p>
      </section>

      {/* ── The Eight Lenses ─────────────────────────────────────────── */}
      <section className="mx-auto max-w-lg px-6 pt-14">
        <h2 className="font-serif text-2xl font-medium text-warm-900">
          Eight ways of seeing
        </h2>
        <p className="mt-4 text-base leading-relaxed text-warm-600">
          The lenses aren&apos;t a ladder. They&apos;re a spiral — each one
          building on what came before, solving problems the previous lens
          couldn&apos;t. No lens is better. Each is a valid response to real
          conditions.
        </p>

        <div className="mt-8 space-y-4">
          <LensRow color="#C4A882" name="Beige" desc="Survival instinct. The body knows what it needs." />
          <LensRow color="#6B4E9B" name="Purple" desc="Belonging and ritual. We are held by the group." />
          <LensRow color="#C0392B" name="Red" desc="Personal power. I will not be diminished." />
          <LensRow color="#1E3A6E" name="Blue" desc="Order and purpose. There is a right way to live." />
          <LensRow color="#C4622D" name="Orange" desc="Achievement and strategy. What actually works?" />
          <LensRow color="#3D7A52" name="Green" desc="Equality and empathy. Every voice matters." />
          <LensRow color="#B89A28" name="Yellow" desc="Systems thinking. Everything connects." />
          <LensRow color="#1A6B7A" name="Turquoise" desc="Holism and presence. The river finds the way." />
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/lenses"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-warm-500 transition-colors hover:text-warm-700"
          >
            Explore all lenses
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5.5 3L9.5 7L5.5 11" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ── Why it matters ────────────────────────────────────────────── */}
      <section className="mx-auto max-w-lg px-6 pt-14">
        <h2 className="font-serif text-2xl font-medium text-warm-900">
          Why it matters
        </h2>
        <div className="mt-6 space-y-6">
          <ReasonCard
            title="Understand yourself"
            body="Discover which lens shapes your decisions, what you value most, and where your blind spots hide. Not a label — a mirror."
          />
          <ReasonCard
            title="Navigate relationships"
            body="The person who drives you mad isn't broken — they're operating from a different lens. Understanding that changes everything."
          />
          <ReasonCard
            title="See the bigger picture"
            body="Politics, culture, workplaces — most conflict isn't about facts. It's about people optimising for different things. Spiral Dynamics shows you what those things are."
          />
        </div>
      </section>

      {/* ── Bottom CTA ────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-lg px-6 pt-16 text-center">
        <p className="font-serif text-xl font-medium text-warm-800">
          Ready to find your lens?
        </p>
        <p className="mt-2 text-sm text-warm-500">
          A 15-minute assessment. No right answers — just honest ones.
        </p>
        <Link
          href="/assessment"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-warm-900 px-8 py-4 text-base font-medium text-cream transition-all hover:bg-warm-800 active:scale-[0.98]"
        >
          Find your lens
        </Link>
      </section>
    </main>
  );
}

// ── Inline helper components (Server Components, no separate file needed) ──

function LensRow({ color, name, desc }: { color: string; name: string; desc: string }) {
  return (
    <div className="flex items-start gap-3.5">
      <div
        className="mt-1 h-4 w-4 shrink-0 rounded-full"
        style={{ backgroundColor: color }}
      />
      <div>
        <span className="text-sm font-semibold text-warm-800">{name}</span>
        <span className="ml-1.5 text-sm text-warm-500">{desc}</span>
      </div>
    </div>
  );
}

function ReasonCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-warm-200/60 bg-white/50 p-5">
      <h3 className="text-sm font-semibold text-warm-800">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-warm-500">{body}</p>
    </div>
  );
}
