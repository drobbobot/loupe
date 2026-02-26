// Account deletion handler
//
// Deletes the user's account and all associated data.
// Architecture reference: architecture.md §8 — "Users can delete their account
// and all associated data via the settings screen"
//
// Steps:
// 1. Cancel any active Stripe subscription
// 2. Delete the user from auth.users (cascades to all public.* tables via FK)

import { NextResponse } from "next/server";
import { createClient, createServiceClient } from "@/lib/supabase/server";
import { stripe } from "@/lib/stripe";

export async function DELETE() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Fetch user profile for Stripe customer ID
    const { data: profile } = await supabase
      .from("users")
      .select("stripe_customer_id")
      .eq("id", user.id)
      .single();

    // Cancel active Stripe subscriptions if they exist
    if (profile?.stripe_customer_id) {
      try {
        const subscriptions = await stripe.subscriptions.list({
          customer: profile.stripe_customer_id,
          status: "active",
        });

        for (const sub of subscriptions.data) {
          await stripe.subscriptions.cancel(sub.id);
        }
      } catch (stripeErr) {
        // Log but don't block account deletion
        console.error("Stripe cancellation error during account delete:", stripeErr);
      }
    }

    // Delete the user via service role (cascades to all tables)
    const serviceClient = createServiceClient();
    const { error: deleteError } =
      await serviceClient.auth.admin.deleteUser(user.id);

    if (deleteError) {
      console.error("Account deletion failed:", deleteError);
      return NextResponse.json(
        { error: "Failed to delete account" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Account deletion error:", err);
    return NextResponse.json(
      { error: "Failed to delete account" },
      { status: 500 }
    );
  }
}
