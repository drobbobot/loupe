// ─────────────────────────────────────────────────────────────────────────────
// POST /api/assessment/submit
//
// Receives raw assessment responses and returns a portrait result.
// Scoring happens entirely server-side — the client never sees raw scores.
//
// Architecture (architecture.md §6):
//   Client sends:  { responses: [{questionId, responseValue, inputType}] }
//   Server returns: { primaryLens, secondaryLens, shadowFlags, growthOrientation,
//                     confidenceLevel, inflationFlag }
//
// Auth is OPTIONAL at this endpoint:
//   - Unauthenticated users can complete the assessment (pre-signup flow)
//   - If authenticated, the result is saved to the database immediately
//   - If not authenticated, the result is returned but NOT saved
//     (client prompts account creation, then saves via POST /api/assessment/save)
// ─────────────────────────────────────────────────────────────────────────────

import { NextResponse } from "next/server";
import type { AssessmentResponse } from "@loupe/types";
import { scoreAssessment } from "@/lib/assessment";
import { createClient, createServiceClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // ── Validate request ──────────────────────────────────────────────────
    const responses = body.responses as AssessmentResponse[] | undefined;

    if (!responses || !Array.isArray(responses) || responses.length === 0) {
      return NextResponse.json(
        { error: "Missing or empty responses array" },
        { status: 400 }
      );
    }

    // Basic validation: each response must have questionId and responseValue
    for (const r of responses) {
      if (!r.questionId || r.responseValue === undefined || !r.inputType) {
        return NextResponse.json(
          {
            error: `Invalid response item: missing questionId, responseValue, or inputType`,
          },
          { status: 400 }
        );
      }
    }

    // ── Score the assessment ──────────────────────────────────────────────
    const result = scoreAssessment(responses);

    // ── Check if user is authenticated ────────────────────────────────────
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      // Authenticated — save result to database using service role
      // (bypasses RLS, but we manually set user_id)
      const serviceClient = createServiceClient();

      const { error: insertError } = await serviceClient
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
        });

      if (insertError) {
        console.error("Failed to save assessment result:", insertError);
        // Don't fail the request — still return the result
        // The user can save manually later
      }
    }

    // ── Return portrait (never raw scores) ────────────────────────────────
    return NextResponse.json({
      ...result,
      saved: !!user, // tell client whether result was persisted
    });
  } catch (error) {
    console.error("Assessment submission error:", error);
    return NextResponse.json(
      { error: "Failed to process assessment" },
      { status: 500 }
    );
  }
}
