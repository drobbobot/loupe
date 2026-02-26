import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { hasFullAccess } from "@/lib/subscription";
import { SubscribeButton } from "./subscribe-button";

export const metadata: Metadata = {
  title: "Pricing",
};

// Design reference: design.md §6 "Subscription / trial"
// PRD reference: prd.md §7
//
// One tier (Personal), clear monthly/annual toggle.
// "3 weeks free, no credit card." — prominent and honest.

export default async function PricingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let subscriptionStatus: string | undefined;
  if (user) {
    const { data: profile } = await supabase
      .from("users")
      .select("subscription_status")
      .eq("id", user.id)
      .single();
    subscriptionStatus = profile?.subscription_status;
  }

  const alreadySubscribed = hasFullAccess(
    subscriptionStatus as "free" | "trial" | "active" | "cancelled" | undefined
  );

  return (
    <main className="flex min-h-screen flex-col items-center px-6 py-24">
      <div className="w-full max-w-lg text-center">
        <h1 className="font-serif text-3xl font-medium text-warm-900 mb-3">
          One plan. Full access.
        </h1>
        <p className="text-warm-500 text-base leading-relaxed mb-12 max-w-prose mx-auto">
          Everything in Loupe — the full Lens Library, your personalised
          profile, relational guides, and cultural analysis.
        </p>

        {alreadySubscribed ? (
          <div className="rounded-2xl border border-warm-200 bg-warm-50 p-8">
            <p className="text-warm-700 font-medium mb-2">
              You have full access
            </p>
            <p className="text-warm-500 text-sm mb-6">
              {subscriptionStatus === "trial"
                ? "Your 3-week trial is active."
                : "Your Personal subscription is active."}
            </p>
            <Link
              href="/account"
              className="text-sm font-medium text-warm-700 hover:text-warm-900"
            >
              Manage account
            </Link>
          </div>
        ) : (
          <div className="rounded-2xl border border-warm-200 bg-white p-8">
            <p className="font-serif text-xl font-medium text-warm-900 mb-1">
              Personal
            </p>
            <p className="text-warm-500 text-sm mb-6">
              3 weeks free, no credit card required
            </p>

            {/* Pricing */}
            <div className="mb-8 space-y-3">
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-3xl font-semibold text-warm-900">
                  $16
                </span>
                <span className="text-warm-500 text-sm">/month</span>
              </div>
              <p className="text-warm-400 text-sm">
                or $160/year (2 months free)
              </p>
            </div>

            {/* Feature list */}
            <ul className="text-left text-sm text-warm-600 space-y-2.5 mb-8">
              {[
                "The Lens Assessment — discover your centre of gravity",
                "Your Profile — personalised lens portrait and shadow guide",
                "The full Lens Library — all eight lenses, deeply written",
                "Navigating Relationships — understand any two-lens dynamic",
                "The World Right Now — cultural analysis through the framework",
              ].map((feature) => (
                <li key={feature} className="flex gap-2.5">
                  <svg
                    className="mt-0.5 h-4 w-4 shrink-0 text-warm-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>

            {/* Free tier note */}
            <div className="border-t border-warm-100 pt-6 mb-6">
              <p className="text-warm-400 text-xs leading-relaxed">
                Without a subscription, you keep your assessment result, your
                full profile, and two World Right Now pieces — always free.
              </p>
            </div>

            {user ? (
              <SubscribeButton />
            ) : (
              <Link
                href="/signup"
                className="inline-flex w-full items-center justify-center rounded-lg bg-warm-900 px-4 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-warm-800 active:scale-[0.99]"
              >
                Create free account
              </Link>
            )}

            <p className="mt-4 text-warm-400 text-xs">
              Cancel anytime. 7-day refund policy on first charge.
            </p>
          </div>
        )}

        <Link
          href="/"
          className="mt-8 inline-block text-sm text-warm-500 hover:text-warm-700"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
