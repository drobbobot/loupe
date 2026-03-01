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
import { LoupeLogo } from "@/components/ui/loupe-logo";
import { LENS_SLUGS, LENS_COLORS, LENS_DISPLAY_NAMES, LENS_TAGS, LENS_DESCRIPTIONS } from "@loupe/types";
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
          tier: ((result as Record<string, unknown>).tier as AssessmentResult["tier"]) ?? "quick",
          primaryLens: (result as Record<string, unknown>).primary_lens as LensSlug,
          secondaryLens: (result as Record<string, unknown>).secondary_lens as LensSlug,
          shadowFlags: (result as Record<string, unknown>).shadow_flags as AssessmentResult["shadowFlags"],
          growthOrientation: ((result as Record<string, unknown>).growth_orientation as string) ?? "",
          confidenceLevel: ((result as Record<string, unknown>).confidence_level as ConfidenceLevel) ?? "high",
          inflationFlag: ((result as Record<string, unknown>).inflation_flag as boolean) ?? false,
        };

        completedAt = (result as Record<string, unknown>).completed_at as string;

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
    return (
      <>
        <ProfileClient profile={profile} completedAt={completedAt} />
        <SiteCredits />
      </>
    );
  }

  // ── Pre-assessment: show landing page ──────────────────────────────────
  return (
    <main>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section
        className="flex flex-col items-center justify-center px-6"
        style={{ minHeight: "calc(100dvh - 3.5rem - 4rem)" }}
      >
        <div className="w-full max-w-lg text-center">
          <div className="mb-8 flex justify-center">
            <LoupeLogo size={120} animated />
          </div>
          <h1 className="mb-6 font-serif text-4xl font-medium tracking-tight text-warm-900">
            Loupe
          </h1>

          <p className="mb-4 text-lg leading-relaxed text-warm-600">
            The people in your life aren&apos;t irrational.
            <br />
            They&apos;re seeing through a different lens.
          </p>

          <p className="mx-auto mb-12 max-w-prose text-base leading-relaxed text-warm-500">
            When you understand where someone is coming from,
            their behaviour stops being mysterious.
            Loupe helps you find your lens first — then understand theirs.
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
          Spiral Dynamics is a map of how people make sense of the world.
          Built on the research of psychologist Clare Graves, it describes
          eight value systems — spaces within us — that shape what we care
          about, how we make decisions, and why we so often talk past each
          other.
        </p>
        <p className="mt-4 text-base leading-relaxed text-warm-600">
          These aren&apos;t fixed personality types. They&apos;re centres of
          gravity — ways of organising the world that feel completely obvious
          from the inside. Each one emerged because it solved a real human
          problem. Each one carries genuine wisdom. And each one has a shadow.
        </p>
        <p className="mt-4 text-base leading-relaxed text-warm-600">
          Most of us move between several of these spaces depending on context.
          But one tends to be home.
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
          {LENS_SLUGS.map((slug) => (
            <LensRow
              key={slug}
              color={LENS_COLORS[slug].DEFAULT}
              name={LENS_DISPLAY_NAMES[slug]}
              tags={LENS_TAGS[slug].join(" · ")}
              desc={LENS_DESCRIPTIONS[slug]}
            />
          ))}
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
            title="Start with yourself"
            body="Find your centre of gravity — the lens that shapes your decisions, your defaults under pressure, and where your shadow hides. Not a label. A mirror. Use this on yourself first."
          />
          <ReasonCard
            title="Understand the people around you"
            body="The person who drives you mad isn't broken. They're not irrational. They're optimising for something different. When you can see their lens, the friction starts to make sense."
          />
          <ReasonCard
            title="Read what&apos;s actually happening"
            body="Most conflict — in politics, culture, families, workplaces — isn&apos;t really about the surface issue. It&apos;s about people operating from different value systems. Spiral Dynamics shows you what those are."
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
        <p className="mt-3 text-xs text-warm-400">
          A note: this is a tool for understanding, not a weapon for winning arguments.
          Start with yourself.
        </p>
        <Link
          href="/assessment"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-warm-900 px-8 py-4 text-base font-medium text-cream transition-all hover:bg-warm-800 active:scale-[0.98]"
        >
          Find your lens
        </Link>
      </section>

      <SiteCredits />
    </main>
  );
}

// ── Inline helper components (Server Components, no separate file needed) ──

function LensRow({ color, name, tags, desc }: { color: string; name: string; tags: string; desc: string }) {
  return (
    <div className="flex items-start gap-3.5">
      <div
        className="mt-1 h-4 w-4 shrink-0 rounded-full"
        style={{ backgroundColor: color }}
      />
      <div>
        <span className="text-sm font-semibold text-warm-800">{name}</span>
        <span className="ml-1.5 text-xs text-warm-400">{tags}</span>
        <p className="mt-0.5 text-sm text-warm-500">{desc}</p>
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

function SiteCredits() {
  return (
    <footer className="mx-auto max-w-lg px-6 pb-24 pt-16">
      <p className="text-center text-xs leading-relaxed text-warm-300">
        Spiral Dynamics was developed from the foundational research of{" "}
        <a
          href="https://en.wikipedia.org/wiki/Clare_W._Graves"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 transition-colors hover:text-warm-500"
        >
          Clare Graves
        </a>
        , and expanded by{" "}
        <a
          href="https://www.spiraldynamics.org"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 transition-colors hover:text-warm-500"
        >
          Don Beck &amp; Chris Cowan
        </a>
        . The language and framing throughout Loupe draws from the work of{" "}
        <a
          href="https://robbell.com"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 transition-colors hover:text-warm-500"
        >
          Rob &amp; Trace Bell
        </a>
        .
      </p>
    </footer>
  );
}
