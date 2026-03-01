// ─────────────────────────────────────────────────────────────────────────────
// Loupe — Assessment Scoring Engine
//
// ██████████████████████████████████████████████████████████████████████████████
// ██  SERVER-SIDE ONLY — NEVER import this file from client components.     ██
// ██████████████████████████████████████████████████████████████████████████████
//
// Two scoring paths:
//   scoreQuickAssessment()  → 12-question Quick Quiz → primary + secondary lens
//   scoreDeepAssessment()   → 60-question Deep       → full portrait with domain map
//
// Shared pipeline:
//   1. Client submits raw responses: [{questionId, responseValue, inputType}]
//   2. This engine maps responses → lens dimension scores via WEIGHTS
//   3. Anti-inflation checks run (tension pairs, lower lens dismissal, variance)
//   4. Portrait is assembled: primary, secondary, shadow, growth, confidence
//   5. (Deep only) Per-domain profiles, stress regression, active lens ranking
//   6. Only portrait data is returned — NEVER raw scores
// ─────────────────────────────────────────────────────────────────────────────

import type {
  LensSlug,
  LifeDomain,
  AssessmentResponse,
  AssessmentResult,
  DeepAssessmentResult,
  DomainLensProfile,
  ConfidenceLevel,
} from "@loupe/types";
import { LENS_SLUGS, LIFE_DOMAINS } from "@loupe/types";
import {
  WEIGHTS,
  RANKED_POSITION_MULTIPLIERS,
  TENSION_PAIRS,
  LOWER_LENS_DISMISSAL,
  VARIANCE_THRESHOLD,
} from "./weights";
import { PORTRAITS, DOMAIN_NARRATIVES, STRESS_NARRATIVES } from "./portraits";
import { getQuestionDomainMap } from "./question-bank";

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

/** Get the spiral position index of a lens (beige=0, turquoise=7) */
function spiralPosition(lens: LensSlug): number {
  return LENS_SLUGS.indexOf(lens);
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

// ── Step 1b: Calculate Per-Domain Raw Scores (Deep only) ─────────────────────

function calculateDomainRawScores(
  responses: AssessmentResponse[]
): Record<LifeDomain, LensScores> {
  const domainMap = getQuestionDomainMap();
  const domainScores: Record<LifeDomain, LensScores> = {} as Record<LifeDomain, LensScores>;

  for (const domain of LIFE_DOMAINS) {
    domainScores[domain] = emptyScores();
  }

  for (const response of responses) {
    const domain = domainMap[response.questionId];
    const weight = WEIGHTS[response.questionId];
    if (!domain || !weight) continue;

    const scores = domainScores[domain];

    switch (weight.type) {
      case "slider": {
        const value =
          typeof response.responseValue === "number"
            ? response.responseValue
            : parseFloat(String(response.responseValue));
        if (isNaN(value)) break;
        const t = Math.max(0, Math.min(100, value)) / 100;
        addWeights(scores, weight.low, 1 - t);
        addWeights(scores, weight.high, t);
        break;
      }
      case "choice": {
        const selected = String(response.responseValue);
        const optionWeights = weight.options[selected];
        if (optionWeights) addWeights(scores, optionWeights);
        break;
      }
      case "ranked": {
        const ranking = response.responseValue;
        if (!Array.isArray(ranking)) break;
        for (let i = 0; i < ranking.length; i++) {
          const itemValue = String(ranking[i]);
          const itemWeights = weight.items[itemValue];
          const positionMultiplier = RANKED_POSITION_MULTIPLIERS[i] ?? 0;
          if (itemWeights) addWeights(scores, itemWeights, positionMultiplier);
        }
        break;
      }
    }
  }

  return domainScores;
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

// ── Step 4: Select Primary & Secondary Lenses ────────────────────────────────

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

// ── Step 5: Domain Profiles (Deep only) ──────────────────────────────────────

function buildDomainProfiles(
  domainRawScores: Record<LifeDomain, LensScores>
): DomainLensProfile[] {
  return LIFE_DOMAINS.map((domain) => {
    const normalised = normalise(domainRawScores[domain]);
    const sorted = [...LENS_SLUGS].sort(
      (a, b) => normalised[b] - normalised[a]
    );
    return {
      domain,
      dominantLens: sorted[0],
      secondaryLens: sorted[1],
      scores: normalised,
    };
  });
}

// ── Step 6: Stress Regression Detection (Deep only) ──────────────────────────

function detectStressRegression(
  centreOfGravity: LensSlug,
  domainProfiles: DomainLensProfile[]
): LensSlug | null {
  const conflictProfile = domainProfiles.find((p) => p.domain === "conflict");
  if (!conflictProfile) return null;

  const conflictLens = conflictProfile.dominantLens;
  const centrePos = spiralPosition(centreOfGravity);
  const conflictPos = spiralPosition(conflictLens);

  // Regression = conflict-domain dominant lens is 2+ positions below centre of gravity
  if (centrePos - conflictPos >= 2) {
    return conflictLens;
  }

  return null;
}

// ── Step 7: Calculate Centre of Gravity (Deep only) ──────────────────────────

function calculateCentreOfGravity(
  domainProfiles: DomainLensProfile[]
): LensSlug {
  // Weighted sum across all domains.
  // Work and relationships weighted slightly higher (people spend most time there).
  const domainWeights: Record<LifeDomain, number> = {
    work: 1.2,
    relationships: 1.2,
    politics: 0.9,
    conflict: 1.0,
    meaning: 1.0,
    change: 0.9,
  };

  const aggregated = emptyScores();
  let totalWeight = 0;

  for (const profile of domainProfiles) {
    const w = domainWeights[profile.domain];
    totalWeight += w;
    for (const lens of LENS_SLUGS) {
      aggregated[lens] += profile.scores[lens] * w;
    }
  }

  // Average
  for (const lens of LENS_SLUGS) {
    aggregated[lens] /= totalWeight;
  }

  const sorted = [...LENS_SLUGS].sort(
    (a, b) => aggregated[b] - aggregated[a]
  );
  return sorted[0];
}

// ── Step 8: Rank Active Lenses (Deep only) ───────────────────────────────────

function rankActiveLenses(
  normalisedScores: LensScores
): Array<{ lens: LensSlug; strength: number }> {
  return [...LENS_SLUGS]
    .map((lens) => ({ lens, strength: normalisedScores[lens] }))
    .sort((a, b) => b.strength - a.strength);
}

// ── Step 9: Per-Domain Confidence (Deep only) ────────────────────────────────

function calculateDomainConfidence(
  domainProfiles: DomainLensProfile[],
  responses: AssessmentResponse[]
): Partial<Record<LifeDomain, ConfidenceLevel>> {
  const domainMap = getQuestionDomainMap();
  const result: Partial<Record<LifeDomain, ConfidenceLevel>> = {};

  for (const profile of domainProfiles) {
    // Count how many questions this domain had
    const domainResponses = responses.filter(
      (r) => domainMap[r.questionId] === profile.domain
    );

    // Fewer questions = lower confidence
    if (domainResponses.length < 4) {
      result[profile.domain] = "low";
    } else if (domainResponses.length < 7) {
      // Check score variance within domain
      const scores = Object.values(profile.scores);
      const stdDev = standardDeviation(scores);
      result[profile.domain] = stdDev < VARIANCE_THRESHOLD ? "low" : "medium";
    } else {
      const scores = Object.values(profile.scores);
      const stdDev = standardDeviation(scores);
      result[profile.domain] = stdDev < VARIANCE_THRESHOLD ? "medium" : "high";
    }
  }

  return result;
}

// ── Public API ───────────────────────────────────────────────────────────────

/**
 * Score the Quick Quiz (12 questions) and return a basic portrait.
 */
export function scoreQuickAssessment(
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
    tier: "quick",
    primaryLens: primary,
    secondaryLens: secondary,
    shadowFlags: portrait.shadowFlags,
    growthOrientation: portrait.growthOrientation,
    confidenceLevel,
    inflationFlag: inflation.isInflated,
  };
}

/**
 * Score the Deep Assessment (60 questions) and return the full portrait
 * with domain map, stress regression, and active lens ranking.
 */
export function scoreDeepAssessment(
  responses: AssessmentResponse[]
): DeepAssessmentResult {
  // 1. Calculate overall raw scores
  const rawScores = calculateRawScores(responses);
  const normalisedScores = normalise(rawScores);

  // 2. Calculate per-domain scores
  const domainRawScores = calculateDomainRawScores(responses);
  const domainProfiles = buildDomainProfiles(domainRawScores);

  // 3. Determine centre of gravity from domain profiles
  const centreOfGravity = calculateCentreOfGravity(domainProfiles);

  // 4. Run anti-inflation checks
  const inflation = checkInflation(responses, normalisedScores);
  const confidenceLevel = determineConfidence(inflation);

  // 5. Select primary and secondary from overall scores
  const { primary, secondary } = selectLenses(normalisedScores);

  // 6. Look up portrait data
  const portrait = PORTRAITS[centreOfGravity];

  // 7. Detect stress regression
  const stressRegression = detectStressRegression(centreOfGravity, domainProfiles);

  // 8. Rank all active lenses
  const activeLenses = rankActiveLenses(normalisedScores);

  // 9. Per-domain confidence
  const confidenceByDomain = calculateDomainConfidence(domainProfiles, responses);

  // 10. Assemble domain narratives
  const domainNarratives = {} as Record<LifeDomain, string>;
  for (const profile of domainProfiles) {
    const narratives = DOMAIN_NARRATIVES[profile.dominantLens];
    domainNarratives[profile.domain] = narratives?.[profile.domain] ??
      `In this area of your life, you tend to see through a ${profile.dominantLens} lens.`;
  }

  // 11. Stress narrative
  const stressNarrative = stressRegression
    ? STRESS_NARRATIVES[stressRegression] ?? null
    : null;

  return {
    tier: "deep",
    primaryLens: primary,
    secondaryLens: secondary,
    centreOfGravity,
    domainProfiles,
    stressRegression,
    activeLenses,
    confidenceByDomain,
    domainNarratives,
    stressNarrative,
    shadowFlags: portrait.shadowFlags,
    growthOrientation: portrait.growthOrientation,
    confidenceLevel,
    inflationFlag: inflation.isInflated,
  };
}

/**
 * Legacy compat — redirects to scoreQuickAssessment.
 * @deprecated Use scoreQuickAssessment or scoreDeepAssessment directly.
 */
export function scoreAssessment(
  responses: AssessmentResponse[]
): AssessmentResult {
  return scoreQuickAssessment(responses);
}
