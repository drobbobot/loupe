import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { statusLabel } from "@/lib/subscription";
import type { SubscriptionStatus } from "@loupe/types";
import { AccountActions } from "./account-actions";

export const metadata: Metadata = {
  title: "Account",
};

export default async function AccountPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/signin?next=/account");
  }

  const { data: profile } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile) {
    redirect("/signin");
  }

  const status = profile.subscription_status as SubscriptionStatus;
  const hasStripeCustomer = !!profile.stripe_customer_id;

  // Calculate trial days remaining
  let trialDaysLeft: number | null = null;
  if (status === "trial" && profile.trial_ends_at) {
    const diff =
      new Date(profile.trial_ends_at).getTime() - Date.now();
    trialDaysLeft = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }

  return (
    <main className="flex min-h-screen flex-col items-center px-6 py-24">
      <div className="w-full max-w-lg">
        <h1 className="font-serif text-2xl font-medium text-warm-900 mb-8">
          Account
        </h1>

        {/* Profile info */}
        <section className="mb-8">
          <h2 className="text-sm font-medium text-warm-500 mb-3">Details</h2>
          <div className="rounded-xl border border-warm-200 bg-white p-5 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-warm-500">Email</span>
              <span className="text-warm-900">{profile.email}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-warm-500">Member since</span>
              <span className="text-warm-900">
                {new Date(profile.created_at).toLocaleDateString("en-AU", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </section>

        {/* Subscription */}
        <section className="mb-8">
          <h2 className="text-sm font-medium text-warm-500 mb-3">
            Subscription
          </h2>
          <div className="rounded-xl border border-warm-200 bg-white p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-warm-900">
                  {statusLabel(status)}
                </p>
                {trialDaysLeft !== null && (
                  <p className="text-xs text-warm-500 mt-0.5">
                    {trialDaysLeft} day{trialDaysLeft !== 1 ? "s" : ""}{" "}
                    remaining in your trial
                  </p>
                )}
                {status === "cancelled" && (
                  <p className="text-xs text-warm-500 mt-0.5">
                    Access continues until the end of your billing period
                  </p>
                )}
              </div>

              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  status === "active" || status === "trial"
                    ? "bg-lens-green/10 text-lens-green"
                    : status === "cancelled"
                      ? "bg-warm-100 text-warm-500"
                      : "bg-warm-100 text-warm-600"
                }`}
              >
                {status === "active" || status === "trial"
                  ? "Active"
                  : status === "cancelled"
                    ? "Ending"
                    : "Free"}
              </span>
            </div>

            <AccountActions
              status={status}
              hasStripeCustomer={hasStripeCustomer}
            />
          </div>
        </section>

        {/* Danger zone */}
        <section>
          <h2 className="text-sm font-medium text-warm-500 mb-3">
            Danger zone
          </h2>
          <div className="rounded-xl border border-warm-200 bg-white p-5">
            <p className="text-sm text-warm-600 mb-3">
              Permanently delete your account and all associated data. This
              cannot be undone.
            </p>
            <AccountActions deleteOnly />
          </div>
        </section>
      </div>
    </main>
  );
}
