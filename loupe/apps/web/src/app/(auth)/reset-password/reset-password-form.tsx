"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function ResetPasswordForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password !== confirm) {
      setError("Passwords don't match.");
      return;
    }

    setLoading(true);

    const supabase = createClient();
    const { error: updateError } = await supabase.auth.updateUser({
      password,
    });

    setLoading(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    // Password updated — redirect to home
    router.push("/");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-warm-700 mb-1">
          New password
        </label>
        <input
          id="password"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border border-warm-300 bg-white px-3 py-2.5 text-sm text-warm-900 placeholder:text-warm-400 focus:border-warm-500 focus:outline-none focus:ring-1 focus:ring-warm-500"
          placeholder="At least 8 characters"
        />
      </div>

      <div>
        <label htmlFor="confirm" className="block text-sm font-medium text-warm-700 mb-1">
          Confirm password
        </label>
        <input
          id="confirm"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="w-full rounded-lg border border-warm-300 bg-white px-3 py-2.5 text-sm text-warm-900 placeholder:text-warm-400 focus:border-warm-500 focus:outline-none focus:ring-1 focus:ring-warm-500"
        />
      </div>

      {error && <p className="text-sm text-lens-red">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-warm-900 px-4 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-warm-800 disabled:opacity-50 active:scale-[0.99]"
      >
        {loading ? "Updating…" : "Update password"}
      </button>
    </form>
  );
}
