// ─────────────────────────────────────────────────────────────────────────────
// Loupe — Assessment Scoring Engine
//
// ██████████████████████████████████████████████████████████████████████████████
// ██  SERVER-SIDE ONLY — NEVER import this file from client components.     ██
// ██████████████████████████████████████████████████████████████████████████████
//
// Flow (architecture.md §6):
//   1. Client submits raw responses: [{questionId, responseValue, inputType}]
//   2. This engine maps responses → lens dimension scores via WEIGHTS
//   3. Anti-inflation checks run (tension pairs, lower lens dismissal, variance)
//   4. Portrait is assembled: primary, secondary, shadow, growth, confidence
//   5. Only portrait data is returned — NEVER raw scores
// ─────────────────────────────────────────────────────────────────────────────

import type {
  LensSlug,
  AssessmentResponse,
  AssessmentResult,
  ConfidenceLevel,
} from "@loupe/types";
import { LENS_SLUGS } from "@loupe/types";
import {
  WEIGHTS,
  RANKED_POSITION_MULTIPLIERS,
  TENSION_PAIRS,
  LOWER_LENS_DISMISSAL,
  VARIANCE_THRESHOLD,
} from "./weights";
import { PORTRAITS } from "./portraits";

// ── Types ────────────────────────────────────────────────────────────────────

type LensScores = Record<LensSlug, number>;

interface InflationReport {
  tensionPairFlags: string[];
  lowerLensDismissal: boolean;
  lowVariance: boolean;
  isInflated: boolean;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function emptyScores(): LensScores {
  return Object.fromEntries(LENS_SLUGS.map((l) => [l, 0])) as LensScores;
}

/** Add partial weights to running score totals */
function addWeights(
  scores: LensScores,
  weights: Partial<Record<LensSlug, number>>,
  multiplier = 1
): void {
  for (const [lens, weight] of Object.entries(weights)) {
    scores[lens as LensSlug] += weight * multiplier;
  }
}

/** Normalise scores to 0–1 range relative to max achievable */
function normalise(scores: LensScores): LensScores {
  const max = Math.max(...Object.values(scores), 1); // avoid div by zero
  const normalised = emptyScores();
  for (const lens of LENS_SLUGS) {
    normalised[lens] = scores[lens] / max;
  }
  return normalised;
}

/** Standard deviation of an array of numbers */
function standardDeviation(values: number[]): number {
  const n = values.length;
  if (n === 0) return 0;
  const mean = values.reduce((a, b) => a + b, 0) / n;
  const variance = values.reduce((sum, v) => sum + (v - mean) ** 2, 0) / n;
  return Math.sqrt(variance);
}

// ── Step 1: Calculate Raw Scores ─────────────────────────────────────────────

function calculateRawScores(responses: AssessmentResponse[]): LensScores {
  const scores = emptyScores();

  for (const response of responses) {
    const weight = WEIGHTS[response.questionId];
    if (!weight) continue; // skip unknown questions (e.g., calibration items)

    switch (weight.type) {
      case "slider": {
        // responseValue is 0–100; interpolate between low (0) and high (100)
        const value =
          typeof response.responseValue === "number"
            ? response.responseValue
            : parseFloat(String(response.responseValue));

        if (isNaN(value)) break;

        const t = Math.max(0, Math.min(100, value)) / 100;
        // Low pole contributes (1-t), high pole contributes t
        addWeights(scores, weight.low, 1 - t);
        addWeights(scores, weight.high, t);
        break;
      }

      case "choice": {
        // responseValue is the selected option value string
        const selected = String(response.responseValue);
        const optionWeights = weight.options[selected];
        if (optionWeights) {
          addWeights(scores, optionWeights);
        }
        break;
      }

      case "ranked": {
        // responseValue is an array of item values in rank order (1st to last)
        const ranking = response.responseValue;
        if (!Array.isArray(ranking)) break;

        for (let i = 0; i < ranking.length; i++) {
          const itemValue = String(ranking[i]);
          const itemWeights = weight.items[itemValue];
          const positionMultiplier =
            RANKED_POSITION_MULTIPLIERS[i] ?? 0;
          if (itemWeights) {
            addWeights(scores, itemWeights, positionMultiplier);
          }
        }
        break;
      }
    }
  }

  return scores;
}

// ── Step 2: Anti-Inflation Checks ────────────────────────────────────────────

function checkInflation(
  responses: AssessmentResponse[],
  normalisedScores: LensScores
): InflationReport {
  const responseMap = new Map(
    responses.map((r) => [r.questionId, r.responseValue])
  );

  // ── Tension pair checks ──────────────────────────────────────────────────
  const tensionPairFlags: string[] = [];

  for (const pair of TENSION_PAIRS) {
    const valueA = responseMap.get(pair.questionA);
    const valueB = responseMap.get(pair.questionB);
    if (valueA === undefined || valueB === undefined) continue;

    const matchA =
      typeof pair.aspirationalA === "function"
        ? pair.aspirationalA(
            typeof valueA === "number" ? valueA : parseFloat(String(valueA))
          )
        : String(valueA) === pair.aspirationalA;

    const matchB =
      typeof pair.aspirationalB === "function"
        ? pair.aspirationalB(
            typeof valueB === "number" ? valueB : parseFloat(String(valueB))
          )
        : String(valueB) === pair.aspirationalB;

    if (matchA && matchB) {
      tensionPairFlags.push(pair.description);
    }
  }

  // ── Lower lens dismissal check ──────────────────────────────────────────
  const lowerSum = LOWER_LENS_DISMISSAL.lenses.reduce(
    (sum, lens) => sum + normalisedScores[lens],
    0
  );
  // Average the lower lens scores (3 lenses)
  const lowerAvg = lowerSum / LOWER_LENS_DISMISSAL.lenses.length;
  const lowerLensDismissal = lowerAvg < LOWER_LENS_DISMISSAL.threshold;

  // ── Variance check ─────────────────────────────────────────────────────
  const scoreValues = LENS_SLUGS.map((l) => normalisedScores[l]);
  const stdDev = standardDeviation(scoreValues);
  const lowVariance = stdDev < VARIANCE_THRESHOLD;

  return {
    tensionPairFlags,
    lowerLensDismissal,
    lowVariance,
    isInflated:
      tensionPairFlags.length > 0 || lowerLensDismissal || lowVariance,
  };
}

// ── Step 3: Determine Confidence Level ───────────────────────────────────────

function determineConfidence(inflation: InflationReport): ConfidenceLevel {
  // Count the number of active inflation signals
  let flags = 0;
  if (inflation.tensionPairFlags.length > 0) flags++;
  if (inflation.lowerLensDismissal) flags++;
  if (inflation.lowVariance) flags++;

  if (flags >= 2) return "low";
  if (flags === 1) return "medium";
  return "high";
}

// ── Step 4: Assemble Portrait ────────────────────────────────────────────────

function selectLenses(
  normalisedScores: LensScores
): { primary: LensSlug; secondary: LensSlug } {
  // Sort lenses by score descending
  const sorted = [...LENS_SLUGS].sort(
    (a, b) => normalisedScores[b] - normalisedScores[a]
  );
  return {
    primary: sorted[0],
    secondary: sorted[1],
  };
}

// ── Public API ───────────────────────────────────────────────────────────────

/**
 * Score an assessment and return the portrait result.
 *
 * This is the only function that should be called from route handlers.
 * It encapsulates the entire scoring pipeline.
 *
 * @param responses - Raw response array from the client
 * @returns AssessmentResult portrait (never raw scores)
 */
export function scoreAssessment(
  responses: AssessmentResponse[]
): AssessmentResult {
  // 1. Calculate raw scores
  const rawScores = calculateRawScores(responses);

  // 2. Normalise to 0–1
  const normalisedScores = normalise(rawScores);

  // 3. Run anti-inflation checks
  const inflation = checkInflation(responses, normalisedScores);

  // 4. Determine primary and secondary lenses
  const { primary, secondary } = selectLenses(normalisedScores);

  // 5. Look up portrait data for the primary lens
  const portrait = PORTRAITS[primary];

  // 6. Determine confidence level
  const confidenceLevel = determineConfidence(inflation);

  return {
    primaryLens: primary,
    secondaryLens: secondary,
    shadowFlags: portrait.shadowFlags,
    growthOrientation: portrait.growthOrientation,
    confidenceLevel,
    inflationFlag: inflation.isInflated,
  };
}
