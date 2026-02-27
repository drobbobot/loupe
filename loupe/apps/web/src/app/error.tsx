"use client";

// ─────────────────────────────────────────────────────────────────────────────
// Global Error Boundary — Catches uncaught errors across the app
//
// Shows a warm, calming error screen that matches the Loupe brand.
// Provides a retry button and a way to navigate home.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to console in development
    console.error("Uncaught error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-cream px-6 text-center">
      {/* Warning icon */}
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-warm-100">
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          className="text-warm-400"
        >
          <circle cx="14" cy="14" r="12" stroke="currentColor" strokeWidth="2" />
          <path
            d="M14 9v6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="14" cy="19" r="1" fill="currentColor" />
        </svg>
      </div>

      <h1 className="font-serif text-3xl font-medium text-warm-900">
        Something went wrong
      </h1>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-warm-500">
        We hit an unexpected issue. This is on us, not you. Try again, or head
        back to familiar ground.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          onClick={reset}
          className="inline-flex items-center justify-center rounded-full bg-warm-900 px-6 py-3 text-sm font-medium text-cream transition-colors hover:bg-warm-800"
        >
          Try again
        </button>
        <a
          href="/"
          className="inline-flex items-center justify-center rounded-full border border-warm-200 px-6 py-3 text-sm font-medium text-warm-600 transition-colors hover:bg-warm-50"
        >
          Go home
        </a>
      </div>
    </div>
  );
}
