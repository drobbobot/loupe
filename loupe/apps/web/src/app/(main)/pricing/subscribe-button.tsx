"use client";

import { useState } from "react";

export function SubscribeButton() {
  const [interval, setInterval] = useState<"monthly" | "annual">("annual");
  const [loading, setLoading] = useState(false);

  async function handleSubscribe() {
    setLoading(true);

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ interval }),
      });

      const { url, error } = await res.json();

      if (error) {
        console.error("Checkout error:", error);
        setLoading(false);
        return;
      }

      // Redirect to Stripe Checkout
      window.location.href = url;
    } catch {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      {/* Interval toggle */}
      <div className="flex items-center justify-center gap-2 rounded-lg bg-warm-50 p-1">
        <button
          type="button"
          onClick={() => setInterval("monthly")}
          className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
            interval === "monthly"
              ? "bg-white text-warm-900 shadow-sm"
              : "text-warm-500 hover:text-warm-700"
          }`}
        >
          Monthly
        </button>
        <button
          type="button"
          onClick={() => setInterval("annual")}
          className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
            interval === "annual"
              ? "bg-white text-warm-900 shadow-sm"
              : "text-warm-500 hover:text-warm-700"
          }`}
        >
          Annual
          <span className="ml-1.5 text-xs text-warm-400">save 17%</span>
        </button>
      </div>

      <button
        type="button"
        onClick={handleSubscribe}
        disabled={loading}
        className="w-full rounded-lg bg-warm-900 px-4 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-warm-800 disabled:opacity-50 active:scale-[0.99]"
      >
        {loading
          ? "Redirecting…"
          : interval === "annual"
            ? "Subscribe — $160/year"
            : "Subscribe — $16/month"}
      </button>
    </div>
  );
}
