"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { SubscriptionStatus } from "@loupe/types";

type Props =
  | { status: SubscriptionStatus; hasStripeCustomer: boolean; deleteOnly?: never }
  | { deleteOnly: true; status?: never; hasStripeCustomer?: never };

export function AccountActions(props: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  async function handleManageSubscription() {
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" });
      const { url, error } = await res.json();
      if (error) {
        console.error("Portal error:", error);
        setLoading(false);
        return;
      }
      window.location.href = url;
    } catch {
      setLoading(false);
    }
  }

  async function handleDeleteAccount() {
    setLoading(true);
    try {
      const res = await fetch("/api/account", { method: "DELETE" });
      if (res.ok) {
        router.push("/");
        router.refresh();
      } else {
        console.error("Delete failed");
        setLoading(false);
      }
    } catch {
      setLoading(false);
    }
  }

  // Delete-only variant for the danger zone section
  if (props.deleteOnly) {
    return (
      <>
        {!confirmDelete ? (
          <button
            type="button"
            onClick={() => setConfirmDelete(true)}
            className="rounded-lg border border-lens-red/30 px-4 py-2 text-sm font-medium text-lens-red transition-colors hover:bg-lens-red/5"
          >
            Delete account
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleDeleteAccount}
              disabled={loading}
              className="rounded-lg bg-lens-red px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-lens-red/90 disabled:opacity-50"
            >
              {loading ? "Deleting…" : "Confirm deletion"}
            </button>
            <button
              type="button"
              onClick={() => setConfirmDelete(false)}
              className="text-sm text-warm-500 hover:text-warm-700"
            >
              Cancel
            </button>
          </div>
        )}
      </>
    );
  }

  const { status, hasStripeCustomer } = props;

  return (
    <div className="flex gap-3">
      {status === "active" && hasStripeCustomer && (
        <button
          type="button"
          onClick={handleManageSubscription}
          disabled={loading}
          className="rounded-lg border border-warm-300 px-4 py-2 text-sm font-medium text-warm-700 transition-colors hover:bg-warm-50 disabled:opacity-50"
        >
          {loading ? "Loading…" : "Manage subscription"}
        </button>
      )}

      {(status === "free" || status === "cancelled") && (
        <Link
          href="/pricing"
          className="rounded-lg bg-warm-900 px-4 py-2 text-sm font-medium text-cream transition-colors hover:bg-warm-800"
        >
          Subscribe
        </Link>
      )}

      {status === "trial" && (
        <Link
          href="/pricing"
          className="rounded-lg border border-warm-300 px-4 py-2 text-sm font-medium text-warm-700 transition-colors hover:bg-warm-50"
        >
          Subscribe now
        </Link>
      )}
    </div>
  );
}
