// ─────────────────────────────────────────────────────────────────────────────
// Custom 404 page — Warm, on-brand "lost in the spiral" not-found page
//
// Shows when a user navigates to a route that doesn't exist.
// Uses the warm design system palette with a gentle spiral motif.
// ─────────────────────────────────────────────────────────────────────────────

import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-cream px-6 text-center">
      {/* Spiral motif */}
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-warm-100">
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          className="text-warm-400"
        >
          <path
            d="M16 4C10.477 4 6 8.477 6 14c0 3.866 2.193 7.222 5.4 8.9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M16 8c-3.314 0-6 2.686-6 6 0 2.21 1.194 4.14 2.973 5.184"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M16 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"
            fill="currentColor"
          />
        </svg>
      </div>

      <h1 className="font-serif text-3xl font-medium text-warm-900">
        Lost in the spiral
      </h1>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-warm-500">
        The page you&apos;re looking for doesn&apos;t exist, or may have moved.
        Let&apos;s get you back on track.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full bg-warm-900 px-6 py-3 text-sm font-medium text-cream transition-colors hover:bg-warm-800"
        >
          Go home
        </Link>
        <Link
          href="/lenses"
          className="inline-flex items-center justify-center rounded-full border border-warm-200 px-6 py-3 text-sm font-medium text-warm-600 transition-colors hover:bg-warm-50"
        >
          Explore lenses
        </Link>
      </div>
    </div>
  );
}
