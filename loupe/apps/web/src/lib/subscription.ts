// Subscription access helpers
// Used server-side to gate content behind subscription status.
//
// Access tiers (from prd.md §7):
//   free      → assessment + Your Profile + 2 World Right Now pieces
//   trial     → full Personal tier access for 3 weeks
//   active    → full Personal tier access (paying subscriber)
//   cancelled → drops to free at period end

import type { SubscriptionStatus } from "@loupe/types";

/**
 * Whether the user has full Personal tier access.
 * True during trial or with an active subscription.
 */
export function hasFullAccess(status: SubscriptionStatus | undefined): boolean {
  return status === "trial" || status === "active";
}

/**
 * Whether the user can access paywalled content.
 * Same as hasFullAccess — separated for clarity at call sites.
 */
export function canAccessContent(
  status: SubscriptionStatus | undefined
): boolean {
  return hasFullAccess(status);
}

/**
 * Whether the user should see the subscription prompt.
 * Shown when they're on free tier or their trial has ended.
 */
export function shouldShowPaywall(
  status: SubscriptionStatus | undefined
): boolean {
  return !hasFullAccess(status);
}

/**
 * Human-readable label for the subscription status.
 */
export function statusLabel(status: SubscriptionStatus): string {
  switch (status) {
    case "free":
      return "Free";
    case "trial":
      return "Trial";
    case "active":
      return "Personal";
    case "cancelled":
      return "Cancelled";
  }
}
