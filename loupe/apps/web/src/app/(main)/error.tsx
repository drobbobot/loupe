"use client";

// ─────────────────────────────────────────────────────────────────────────────
// Main Layout Error Boundary — Catches errors within the main app shell
//
// Shows within the NavHeader + BottomNav frame so the user stays oriented.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect } from "react";
import Link from "next/link";

export default function MainError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Main layout error:", error);
  }, [error]);

  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-warm-100">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="text-warm-400"
        >
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 8v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="12" cy="16" r="0.75" fill="currentColor" />
        </svg>
      </div>

      <h2 className="font-serif text-2xl font-medium text-warm-900">
        Something went wrong
      </h2>
      <p className="mt-2 max-w-xs text-sm leading-relaxed text-warm-500">
        We couldn&apos;t load this page. Try refreshing, or come back in a moment.
      </p>

      <div className="mt-6 flex gap-3">
        <button
          onClick={reset}
          className="inline-flex items-center justify-center rounded-full bg-warm-900 px-5 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-warm-800"
        >
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full border border-warm-200 px-5 py-2.5 text-sm font-medium text-warm-600 transition-colors hover:bg-warm-50"
        >
          Go home
        </Link>
      </div>
    </main>
  );
}
