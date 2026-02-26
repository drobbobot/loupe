"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(
      email,
      {
        redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
      }
    );

    setLoading(false);

    if (resetError) {
      setError(resetError.message);
      return;
    }

    setSent(true);
  }

  if (sent) {
    return (
      <div className="text-center">
        <p className="text-warm-600 text-sm leading-relaxed mb-6">
          If an account exists for <strong className="text-warm-800">{email}</strong>,
          you&apos;ll receive a password reset link shortly.
        </p>
        <Link
          href="/signin"
          className="text-sm font-medium text-warm-700 hover:text-warm-900"
        >
          Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-warm-700 mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border border-warm-300 bg-white px-3 py-2.5 text-sm text-warm-900 placeholder:text-warm-400 focus:border-warm-500 focus:outline-none focus:ring-1 focus:ring-warm-500"
          placeholder="you@example.com"
        />
      </div>

      {error && <p className="text-sm text-lens-red">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-warm-900 px-4 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-warm-800 disabled:opacity-50 active:scale-[0.99]"
      >
        {loading ? "Sending…" : "Send reset link"}
      </button>

      <p className="text-center text-sm text-warm-500">
        <Link href="/signin" className="font-medium text-warm-700 hover:text-warm-900">
          Back to sign in
        </Link>
      </p>
    </form>
  );
}
