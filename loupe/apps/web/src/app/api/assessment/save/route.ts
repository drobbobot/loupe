// ─────────────────────────────────────────────────────────────────────────────
// POST /api/assessment/save
//
// Saves a previously completed assessment result for a now-authenticated user.
// Used in the post-assessment signup flow:
//   1. User completes assessment (unauthenticated)
//   2. User creates account / signs in
//   3. Client sends the result + raw responses to this endpoint for persistence
//
// Requires authentication.
// ─────────────────────────────────────────────────────────────────────────────

import { NextResponse } from "next/server";
import type { AssessmentResponse, AssessmentResult } from "@loupe/types";
import { createClient, createServiceClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    // ── Auth check ────────────────────────────────────────────────────────
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const body = await request.json();

    // ── Validate request ──────────────────────────────────────────────────
    const result = body.result as AssessmentResult | undefined;
    const responses = body.responses as AssessmentResponse[] | undefined;

    if (!result || !result.primaryLens || !result.secondaryLens) {
      return NextResponse.json(
        { error: "Missing or invalid result object" },
        { status: 400 }
      );
    }

    if (!responses || !Array.isArray(responses)) {
      return NextResponse.json(
        { error: "Missing responses array" },
        { status: 400 }
      );
    }

    // ── Check for recent existing result (prevent duplicates) ─────────────
    const serviceClient = createServiceClient();

    const { data: existing } = await serviceClient
      .from("assessment_results")
      .select("id, completed_at")
      .eq("user_id", user.id)
      .order("completed_at", { ascending: false })
      .limit(1)
      .single();

    if (existing) {
      // Check if user already has a result from the last hour (likely duplicate)
      const lastResult = new Date(existing.completed_at);
      const hourAgo = new Date(Date.now() - 60 * 60 * 1000);
      if (lastResult > hourAgo) {
        return NextResponse.json(
          { error: "A recent result already exists", existingId: existing.id },
          { status: 409 }
        );
      }
    }

    // ── Save to database ──────────────────────────────────────────────────
    const { data: saved, error: insertError } = await serviceClient
      .from("assessment_results")
      .insert({
        user_id: user.id,
        responses: responses as unknown as Record<string, unknown>,
        primary_lens: result.primaryLens,
        secondary_lens: result.secondaryLens,
        shadow_flags: result.shadowFlags,
        growth_orientation: result.growthOrientation,
        confidence_level: result.confidenceLevel,
        inflation_flag: result.inflationFlag,
      })
      .select("id")
      .single();

    if (insertError) {
      console.error("Failed to save assessment result:", insertError);
      return NextResponse.json(
        { error: "Failed to save result" },
        { status: 500 }
      );
    }

    return NextResponse.json({ id: saved.id, saved: true });
  } catch (error) {
    console.error("Assessment save error:", error);
    return NextResponse.json(
      { error: "Failed to save assessment" },
      { status: 500 }
    );
  }
}
