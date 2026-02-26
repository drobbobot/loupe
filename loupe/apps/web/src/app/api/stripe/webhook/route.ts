// Stripe webhook handler
//
// Receives subscription lifecycle events from Stripe and keeps the
// subscriptions table and users.subscription_status in sync.
//
// Architecture reference: architecture.md §3.6, §7.2
// Security: Verifies Stripe signature. Uses service-role client to bypass RLS.

import { NextResponse, type NextRequest } from "next/server";
import { stripe } from "@/lib/stripe";
import { createServiceClient } from "@/lib/supabase/server";
import type Stripe from "stripe";

// Disable Next.js body parsing — Stripe needs the raw body for signature verification
export const runtime = "nodejs";

const relevantEvents = new Set([
  "customer.subscription.created",
  "customer.subscription.updated",
  "customer.subscription.deleted",
]);

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Webhook signature verification failed:", message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (!relevantEvents.has(event.type)) {
    // Acknowledge events we don't handle
    return NextResponse.json({ received: true });
  }

  const subscription = event.data.object as Stripe.Subscription;
  const supabaseUserId = subscription.metadata.supabase_user_id;

  if (!supabaseUserId) {
    console.error("Webhook: subscription missing supabase_user_id metadata");
    return NextResponse.json(
      { error: "Missing user metadata" },
      { status: 400 }
    );
  }

  const supabase = createServiceClient();

  try {
    switch (event.type) {
      case "customer.subscription.created":
      case "customer.subscription.updated": {
        // Upsert the subscription record
        const { error: subError } = await supabase
          .from("subscriptions")
          .upsert(
            {
              user_id: supabaseUserId,
              stripe_subscription_id: subscription.id,
              stripe_price_id: subscription.items.data[0]?.price.id ?? "",
              status: subscription.status,
              current_period_start: new Date(
                subscription.current_period_start * 1000
              ).toISOString(),
              current_period_end: new Date(
                subscription.current_period_end * 1000
              ).toISOString(),
              cancel_at_period_end: subscription.cancel_at_period_end,
              updated_at: new Date().toISOString(),
            },
            { onConflict: "stripe_subscription_id" }
          );

        if (subError) {
          console.error("Webhook: subscription upsert failed:", subError);
          return NextResponse.json({ error: "DB error" }, { status: 500 });
        }

        // Update the user's subscription status
        const isActive =
          subscription.status === "active" ||
          subscription.status === "trialing";

        const newStatus = isActive
          ? "active"
          : subscription.cancel_at_period_end
            ? "cancelled"
            : "free";

        await supabase
          .from("users")
          .update({ subscription_status: newStatus })
          .eq("id", supabaseUserId);

        break;
      }

      case "customer.subscription.deleted": {
        // Subscription ended — revert to free
        await supabase
          .from("subscriptions")
          .update({
            status: subscription.status,
            cancel_at_period_end: false,
            updated_at: new Date().toISOString(),
          })
          .eq("stripe_subscription_id", subscription.id);

        await supabase
          .from("users")
          .update({ subscription_status: "free" })
          .eq("id", supabaseUserId);

        break;
      }
    }
  } catch (err) {
    console.error("Webhook processing error:", err);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }

  return NextResponse.json({ received: true });
}
