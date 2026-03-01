// ─────────────────────────────────────────────────────────────────────────────
// /assessment — Assessment landing page (choose your path)
//
// Presents the two assessment tiers:
//   Quick Quiz:      12 questions, ~3 minutes, find your primary lens
//   Deep Assessment:  60 questions, ~15 minutes, full portrait with domain map
//
// If the user has a previous quick quiz result, the Deep Assessment
// CTA changes to "Go Deeper" and pre-populates their earlier answers.
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Find Your Lens",
  description:
    "Discover which lens you see the world through. Take the quick quiz or dive deep.",
};

export default function AssessmentLandingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--color-bg)] px-6 pb-24 pt-16">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="font-serif text-4xl font-medium text-warm-900 sm:text-5xl">
          Find your lens
        </h1>
        <p className="mt-4 text-warm-600 leading-relaxed">
          There are no right answers. Just honest ones.
          The most useful results tend to surprise people a little.
        </p>
      </div>

      <div className="mx-auto mt-12 flex max-w-2xl flex-col gap-6 sm:flex-row">
        {/* Quick Quiz card */}
        <Link
          href="/assessment/quick"
          className="group flex flex-1 flex-col rounded-2xl border border-warm-200 bg-white p-8 transition-all hover:border-warm-300 hover:shadow-lg"
        >
          <div className="text-xs font-medium uppercase tracking-widest text-warm-400">
            Quick Quiz
          </div>
          <h2 className="mt-3 font-serif text-2xl font-medium text-warm-900">
            Find your primary lens
          </h2>
          <p className="mt-2 flex-1 text-sm text-warm-600 leading-relaxed">
            12 questions, about 3 minutes. You&apos;ll get your primary lens and a
            brief portrait of how you see the world.
          </p>
          <div className="mt-6 flex items-center gap-2 text-sm font-medium text-warm-900 transition-colors group-hover:text-warm-700">
            Start the quiz
            <span className="transition-transform group-hover:translate-x-0.5">&rarr;</span>
          </div>
        </Link>

        {/* Deep Assessment card */}
        <Link
          href="/assessment/deep"
          className="group flex flex-1 flex-col rounded-2xl border border-warm-200 bg-white p-8 transition-all hover:border-warm-300 hover:shadow-lg"
        >
          <div className="text-xs font-medium uppercase tracking-widest text-warm-400">
            Deep Assessment
          </div>
          <h2 className="mt-3 font-serif text-2xl font-medium text-warm-900">
            Map your full portrait
          </h2>
          <p className="mt-2 flex-1 text-sm text-warm-600 leading-relaxed">
            60 questions across 6 areas of life, about 15 minutes. Discover your
            centre of gravity, how your lens shifts between work, relationships,
            and the wider world, and what happens when things get hard.
          </p>
          <div className="mt-6 flex items-center gap-2 text-sm font-medium text-warm-900 transition-colors group-hover:text-warm-700">
            Go deeper
            <span className="transition-transform group-hover:translate-x-0.5">&rarr;</span>
          </div>
        </Link>
      </div>

      <p className="mt-10 text-center text-xs text-warm-400">
        No account required &middot; Results are private
      </p>
    </div>
  );
}
