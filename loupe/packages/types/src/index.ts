// ─────────────────────────────────────────────────────────────────────────────
// @loupe/types — Shared TypeScript types
//
// This package is the single source of truth for all domain types across:
//   - apps/web (Next.js)
//   - apps/mobile (React Native / Expo — Phase 2)
//
// Naming follows the product docs exactly:
//   - Lens slug names match Sanity slugs and Supabase enum values
//   - Assessment result shape matches the server-side scoring output
//   - Subscription statuses match Stripe webhook event data
// ─────────────────────────────────────────────────────────────────────────────

// ── Lens ─────────────────────────────────────────────────────────────────────

export type LensSlug =
  | "beige"
  | "purple"
  | "red"
  | "blue"
  | "orange"
  | "green"
  | "yellow"
  | "turquoise";

// Self / Community / Systems developmental groupings (design.md §4.2, prd.md §4.2)
export type LensGroup = "me" | "we" | "everybody";

// Each lens alternates between inward and outward focus along the spiral arc
// (prd.md §4.2 visual map requirements)
export type InwardOutward = "inward" | "outward" | "integrating";

// Ordered array of all lens slugs — used for spiral map layout and iteration
export const LENS_SLUGS: LensSlug[] = [
  "beige",
  "purple",
  "red",
  "blue",
  "orange",
  "green",
  "yellow",
  "turquoise",
];

// Lens group assignments
export const LENS_GROUPS: Record<LensSlug, LensGroup> = {
  beige: "me",
  purple: "me",
  red: "me",
  blue: "we",
  orange: "we",
  green: "everybody",
  yellow: "everybody",
  turquoise: "everybody",
};

// Inward/outward character — used for spiral map node positioning (prd.md §4.2)
export const LENS_DIRECTION: Record<LensSlug, InwardOutward> = {
  beige: "inward",
  purple: "outward",
  red: "inward",
  blue: "outward",
  orange: "inward",
  green: "outward",
  yellow: "integrating",
  turquoise: "integrating",
};

// Human-readable direction labels for LENS_DIRECTION values
const DIRECTION_LABEL: Record<InwardOutward, string> = {
  inward:      "Internal",
  outward:     "External",
  integrating: "Integrating",
};

// Human-readable group labels for LensGroup values
const GROUP_LABEL: Record<LensGroup, string> = {
  me:        "Self",
  we:        "Community",
  everybody: "Systems",
};

// Derived "Focus" display string — combines direction and group.
// Format: "Internal · Self", "External · Community", "Integrating · Systems", etc.
// Use this wherever a lens needs a consistent Focus metadata line.
export const LENS_FOCUS: Record<LensSlug, string> = Object.fromEntries(
  (Object.keys(LENS_DIRECTION) as LensSlug[]).map((slug) => [
    slug,
    `${DIRECTION_LABEL[LENS_DIRECTION[slug]]} · ${GROUP_LABEL[LENS_GROUPS[slug]]}`,
  ])
) as Record<LensSlug, string>;

// Canonical lens tags — shown as subtext beneath the lens name in the UI
// Source: research/podcast-content-notes.md, informed by Rob & Trace Bell's language
export const LENS_TAGS: Record<LensSlug, string[]> = {
  beige:     ["Survival", "Instinct", "Primal"],
  purple:    ["Magic", "Tribe", "Ancestral"],
  red:       ["Power", "Impulse", "Dominance"],
  blue:      ["Order", "Duty", "Tradition"],
  orange:    ["Achievement", "Rational", "Progress"],
  green:     ["Pluralism", "Empathy", "Justice"],
  yellow:    ["Integration", "Systems", "Fluidity"],
  turquoise: ["Holistic", "Global", "Flow"],
};

// Canonical lens colours (mirrors tailwind.config.ts — keep in sync)
export const LENS_COLORS: Record<LensSlug, { DEFAULT: string; bg: string; text: string }> = {
  beige:     { DEFAULT: "#C4A882", bg: "#F5EFE6", text: "#6B5A42" },
  purple:    { DEFAULT: "#6B4E9B", bg: "#EDE5F7", text: "#3D2A60" },
  red:       { DEFAULT: "#C0392B", bg: "#FAE8E6", text: "#7A2318" },
  blue:      { DEFAULT: "#1E3A6E", bg: "#E0E8F5", text: "#122247" },
  orange:    { DEFAULT: "#C4622D", bg: "#FAE9DE", text: "#7A3B18" },
  green:     { DEFAULT: "#3D7A52", bg: "#E0F0E8", text: "#224532" },
  yellow:    { DEFAULT: "#B89A28", bg: "#FAF0D0", text: "#6B5A10" },
  turquoise: { DEFAULT: "#1A6B7A", bg: "#D8EFF2", text: "#0E424C" },
};

// ── Assessment ────────────────────────────────────────────────────────────────

// Life domains — the 6 contexts the deep assessment maps across
export type LifeDomain =
  | "work"
  | "relationships"
  | "politics"
  | "conflict"
  | "meaning"
  | "change";

export const LIFE_DOMAINS: LifeDomain[] = [
  "work",
  "relationships",
  "politics",
  "conflict",
  "meaning",
  "change",
];

export const DOMAIN_LABELS: Record<LifeDomain, string> = {
  work:          "Work & Ambition",
  relationships: "Relationships & Intimacy",
  politics:      "Politics & Society",
  conflict:      "Conflict & Stress",
  meaning:       "Meaning & Purpose",
  change:        "Change & Uncertainty",
};

export const DOMAIN_ICONS: Record<LifeDomain, string> = {
  work:          "briefcase",
  relationships: "heart",
  politics:      "landmark",
  conflict:      "shield",
  meaning:       "compass",
  change:        "wind",
};

// Assessment tier — quick quiz vs full deep assessment
export type AssessmentTier = "quick" | "deep";

export type InputType =
  | "slider"
  | "multiple_choice"
  | "binary"
  | "ranked"
  | "image";

export interface AssessmentQuestion {
  id: string;
  section: number;
  questionText: string;
  inputType: InputType;
  // Options for multiple_choice and binary input types
  options?: Array<{ value: string; label: string }>;
  // Slider pole labels (for slider input type only)
  sliderConfig?: { labelMin: string; labelMax: string };
  // Transition copy shown before this section (first question of section only)
  sectionTransition?: string;
  // Life domain this question maps to (deep assessment uses this for per-domain scoring)
  domain?: LifeDomain;
  // Which assessment tier(s) use this question
  tier?: AssessmentTier | "both";
  // Note: weights and lens mappings are NOT here.
  // They live server-side in apps/web/src/lib/assessment/weights.ts
}

// What the client sends to POST /api/assessment/submit
export interface AssessmentResponse {
  questionId: string;
  responseValue: number | string | string[];
  inputType: InputType;
}

// Internal confidence level — not shown to user, used for portrait caveats
export type ConfidenceLevel = "high" | "medium" | "low";

// ── Assessment Results ──────────────────────────────────────────────────────

// Base result shape — shared across both tiers
export interface AssessmentResult {
  tier: AssessmentTier;
  primaryLens: LensSlug;
  secondaryLens: LensSlug;
  shadowFlags: {
    tendencies: string[];   // specific behavioural patterns
    triggers: string[];     // what activates the shadow
  };
  growthOrientation: string; // what the next lens sees that this one misses
  confidenceLevel: ConfidenceLevel;
  inflationFlag: boolean;
}

// Per-domain lens breakdown (deep assessment only)
export interface DomainLensProfile {
  domain: LifeDomain;
  dominantLens: LensSlug;
  secondaryLens: LensSlug;
  /** Normalised 0–1 scores per lens within this domain */
  scores: Record<LensSlug, number>;
}

// Extended result from the deep assessment
export interface DeepAssessmentResult extends AssessmentResult {
  tier: "deep";
  /** Overall centre of gravity across all domains */
  centreOfGravity: LensSlug;
  /** Per-domain lens profiles */
  domainProfiles: DomainLensProfile[];
  /** Lens they tend to drop to under stress (null if no regression detected) */
  stressRegression: LensSlug | null;
  /** All 8 lenses ranked by overall activation strength */
  activeLenses: Array<{ lens: LensSlug; strength: number }>;
  /** Per-domain confidence levels */
  confidenceByDomain: Partial<Record<LifeDomain, ConfidenceLevel>>;
  /** Domain-specific narrative descriptions */
  domainNarratives: Record<LifeDomain, string>;
  /** Stress regression narrative (null if no regression) */
  stressNarrative: string | null;
}

// Type guard for deep results
export function isDeepResult(result: AssessmentResult): result is DeepAssessmentResult {
  return result.tier === "deep";
}

// Stored in DB — extends AssessmentResult with metadata
export interface StoredAssessmentResult {
  id: string;
  userId: string;
  completedAt: string;
  result: AssessmentResult;             // the scored portrait (quick or deep)
  responses: AssessmentResponse[];      // raw responses stored for potential re-scoring
}

// ── User ──────────────────────────────────────────────────────────────────────

export type SubscriptionStatus = "free" | "trial" | "active" | "cancelled";

export interface User {
  id: string;
  email: string;
  createdAt: string;
  subscriptionStatus: SubscriptionStatus;
  trialStartedAt: string | null;
  trialEndsAt: string | null;
  stripeCustomerId: string | null;
}

// ── Relationships ─────────────────────────────────────────────────────────────

export type Scenario = "close" | "work" | "civic";

export interface RelationshipGuide {
  quality: "full" | "template";
  lensA: LensSlug;
  lensB: LensSlug;
  dynamicSummary: unknown;  // Sanity PortableText block
  lensANeeds: unknown;
  lensBNeeds: unknown;
  frictionPoints: unknown;
  genuineConnection: unknown;
  scenarioClose?: unknown;
  scenarioWork?: unknown;
  scenarioCivic?: unknown;
}

// ── Content (Sanity) ──────────────────────────────────────────────────────────

// Minimal lens reference used in article tags, relationship selectors, etc.
export interface LensReference {
  slug: LensSlug;
  displayName: string;
  colourHex: string;
}

export interface ArticlePreview {
  title: string;
  slug: string;
  publishedAt: string;
  excerpt: string;
  readTimeMins: number;
  lenses: LensReference[];
}

// ── Sharing cards ─────────────────────────────────────────────────────────────

export interface ShareCardData {
  userId: string;
  primaryLens: LensSlug;
  selectedQuote: string;
}
