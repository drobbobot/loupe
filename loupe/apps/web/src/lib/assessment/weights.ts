// ─────────────────────────────────────────────────────────────────────────────
// Loupe — Assessment Scoring Weights
//
// ██████████████████████████████████████████████████████████████████████████████
// ██  SERVER-SIDE ONLY — NEVER import this file from client components.     ██
// ██  This file contains the scoring algorithm's secret sauce.              ██
// ██  Weights, lens mappings, and anti-inflation logic are confidential.    ██
// ██████████████████████████████████████████████████████████████████████████████
//
// Architecture:
//   Each question maps responses → partial scores for one or more of 8 lenses.
//   Slider questions interpolate between two poles (low=0, high=100).
//   MC/Binary questions map each option value to lens weights.
//   Ranked questions apply position multipliers to base weights.
//
// Weight scale: 0–3
//   3 = strong primary signal for this lens
//   2 = moderate signal
//   1 = weak / secondary signal
//   0 = no signal (omitted from map)
// ─────────────────────────────────────────────────────────────────────────────

import type { LensSlug } from "@loupe/types";

// ── Types ────────────────────────────────────────────────────────────────────

/** Partial weight map — only lenses with non-zero weight are included */
type LensWeights = Partial<Record<LensSlug, number>>;

/** Slider weight: interpolates between low (value=0) and high (value=100) poles */
interface SliderWeight {
  type: "slider";
  low: LensWeights;
  high: LensWeights;
}

/** Choice weight: maps each option value to lens weights */
interface ChoiceWeight {
  type: "choice";
  options: Record<string, LensWeights>;
}

/** Ranked weight: base weights per item, multiplied by position factor */
interface RankedWeight {
  type: "ranked";
  items: Record<string, LensWeights>;
}

export type QuestionWeight = SliderWeight | ChoiceWeight | RankedWeight;

// ── Position multipliers for ranked questions ────────────────────────────────
// 1st place = full weight, 4th place = no weight
export const RANKED_POSITION_MULTIPLIERS = [1.0, 0.67, 0.33, 0.0];

// ── Weight Map ───────────────────────────────────────────────────────────────
// Key = question ID (matches Sanity assessmentQuestion.id)

export const WEIGHTS: Record<string, QuestionWeight> = {
  // ━━ SECTION 1: How you navigate the everyday ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  q001: {
    // "When you wake up with nothing planned..."
    // Low: productive → Orange/Blue    High: follow the day → Yellow/Turquoise
    type: "slider",
    low: { orange: 2, blue: 2 },
    high: { yellow: 2, turquoise: 1, green: 1 },
  },

  q002: {
    // "At a gathering where you don't know many people..."
    type: "choice",
    options: {
      a: { green: 3, purple: 1 },         // check in on someone
      b: { red: 2, orange: 2 },           // find the interesting/in-charge person
      c: { purple: 3 },                   // stay near people you came with
      d: { yellow: 3, turquoise: 1 },     // observe first
    },
  },

  q003: {
    // "Friend asks for honest opinion on decision already made..."
    // TENSION PAIR with q018
    type: "choice",
    options: {
      a: { red: 2, orange: 1 },           // honesty > comfort
      b: { green: 2, purple: 2 },         // relationship > rightness
    },
  },

  q004: {
    // "How much do daily rituals and routines matter..."
    // Low: barely → Yellow/Red    High: essential → Blue/Purple/Beige
    type: "slider",
    low: { yellow: 2, red: 1 },
    high: { blue: 2, purple: 2, beige: 2 },
  },

  q005: {
    // "Team project going off track..."
    type: "choice",
    options: {
      a: { red: 3 },                      // take charge
      b: { blue: 3 },                     // clear process
      c: { green: 3 },                    // everyone's voice
      d: { yellow: 3 },                   // bigger picture
    },
  },

  q006: {
    // "When you achieve something, what matters more?"
    // TENSION PAIR with q019
    type: "choice",
    options: {
      a: { orange: 3, red: 1 },           // recognition & success
      b: { blue: 2, green: 1 },           // integrity
    },
  },

  q007: {
    // "Order these by how much they contribute to security..."
    type: "ranked",
    items: {
      resources: { beige: 3, orange: 2 },       // money & resources
      people: { purple: 3, green: 1 },           // people who care
      rules: { blue: 3 },                        // rules & expectations
      capability: { red: 2, yellow: 2 },         // capability & self-reliance
    },
  },

  // ━━ SECTION 2: What you reach for ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  q008: {
    // "Free weekend, you're most drawn to..."
    type: "choice",
    options: {
      a: { orange: 2, red: 2 },                 // competitive activity
      b: { beige: 2, turquoise: 2 },            // nature / restorative
      c: { green: 2, purple: 2 },               // community event
      d: { yellow: 2, orange: 1 },              // learning something new
    },
  },

  q009: {
    // "Someone breaking a rule, first reaction..."
    // TENSION PAIR with q030
    // Low: rules should be followed → Blue    High: depends on rule → Yellow/Red
    type: "slider",
    low: { blue: 3 },
    high: { yellow: 2, red: 2 },
  },

  q010: {
    // "Two roles at same salary..."
    type: "choice",
    options: {
      a: { orange: 2, blue: 2 },                // clear ladder
      b: { yellow: 2, green: 2 },               // creative freedom
    },
  },

  q011: {
    // "What makes you feel truly alive?"
    type: "choice",
    options: {
      a: { red: 2, beige: 2 },                  // pushing past limits
      b: { orange: 2, green: 1 },               // creating something
      c: { purple: 2, green: 2 },               // deep connection
      d: { yellow: 2, turquoise: 2 },           // clarity about how things fit
    },
  },

  q012: {
    // "Comfortable with no clear authority..."
    // Low: uncomfortable → Blue/Red    High: comfortable → Green/Yellow
    type: "slider",
    low: { blue: 2, red: 2 },
    high: { green: 2, yellow: 2 },
  },

  q013: {
    // "Important decision — logic or intuition?"
    type: "choice",
    options: {
      a: { orange: 2, blue: 2 },                // logic & evidence
      b: { beige: 2, purple: 1, turquoise: 2 }, // intuition & body
    },
  },

  q014: {
    // "How important that traditions are maintained..."
    // LOWER LENS WARMTH QUESTION — describes tradition warmly
    // Low: not important → Orange/Yellow    High: very → Purple/Blue
    type: "slider",
    low: { orange: 2, yellow: 1 },
    high: { purple: 3, blue: 2 },
  },

  // ━━ SECTION 3: How you connect with others ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  q015: {
    // "Someone close going through hard time..."
    // TENSION PAIR with q026
    type: "choice",
    options: {
      a: { orange: 2, blue: 1 },                // practical solutions
      b: { green: 2, purple: 2 },               // be present
    },
  },

  q016: {
    // "How important to 'win' an argument?"
    // Low: find common ground → Green    High: stand ground → Red
    type: "slider",
    low: { green: 3 },
    high: { red: 3 },
  },

  q017: {
    // "Friend pulling away from group..."
    type: "choice",
    options: {
      a: { purple: 3 },                         // loyalty — show up
      b: { yellow: 3 },                         // give space
      c: { red: 2, orange: 1 },                 // bring it up directly
      d: { green: 3 },                          // we should look out for each other
    },
  },

  q018: {
    // "Leading — member underperforming..."
    // TENSION PAIR with q003
    type: "choice",
    options: {
      a: { red: 2, orange: 2 },                 // direct, honest conversation
      b: { green: 2, purple: 2 },               // understand what's going on
    },
  },

  q019: {
    // "Value being seen as successful..."
    // TENSION PAIR with q006
    // Low: define success for myself → Yellow/Turquoise    High: recognition → Orange
    type: "slider",
    low: { yellow: 2, turquoise: 1 },
    high: { orange: 3 },
  },

  q020: {
    // "At a family gathering..."
    // LOWER LENS WARMTH QUESTION — describes Purple gathering warmly
    type: "choice",
    options: {
      a: { purple: 3 },                         // familiar warmth, rituals
      b: { red: 2, blue: 1 },                   // take charge
      c: { orange: 2, yellow: 1 },              // interesting conversation
      d: { green: 3 },                          // include quiet people
    },
  },

  q021: {
    // "Some conflicts can't be resolved, only held..."
    // Low: every conflict has a solution → Orange/Blue
    // High: some tensions are part of life → Yellow/Turquoise
    type: "slider",
    low: { orange: 2, blue: 1 },
    high: { yellow: 3, turquoise: 2 },
  },

  // ━━ SECTION 4: When the ground shifts ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  q022: {
    // "Crisis — first instinct..."
    // Low: take decisive action → Red/Beige    High: slow down → Yellow/Blue
    type: "slider",
    low: { red: 2, beige: 2 },
    high: { yellow: 2, blue: 2 },
  },

  q023: {
    // "Friend betrays trust — gut reaction..."
    type: "choice",
    options: {
      a: { red: 3 },                            // anger — crossed a line
      b: { purple: 2, green: 2 },               // hurt — need to grieve
    },
  },

  q024: {
    // "Institution acting unethically..."
    type: "choice",
    options: {
      a: { blue: 3 },                           // personally betrayed
      b: { orange: 2, yellow: 2 },              // fix from inside
      c: { red: 3 },                            // lose faith / don't trust
      d: { green: 2, turquoise: 2 },            // symptom of something larger
    },
  },

  q025: {
    // "Physically unsafe — affects thinking?"
    // LOWER LENS WARMTH QUESTION — validates bodily intelligence
    // Low: barely → Orange/Yellow    High: body takes over → Beige
    type: "slider",
    low: { orange: 1, yellow: 1 },
    high: { beige: 3 },
  },

  q026: {
    // "Under stress, you're more likely to..."
    // TENSION PAIR with q015
    type: "choice",
    options: {
      a: { red: 2, orange: 2 },                 // push through
      b: { purple: 2, green: 2 },               // seek connection
    },
  },

  q027: {
    // "Something fails publicly — first thought..."
    type: "choice",
    options: {
      a: { orange: 3 },                         // learn from it
      b: { yellow: 2, turquoise: 2 },           // I know who I am
      c: { purple: 3 },                         // need my people
      d: { blue: 2, red: 1 },                   // accountability
    },
  },

  q028: {
    // "Sudden change disrupts plans..."
    type: "choice",
    options: {
      a: { orange: 2, red: 2 },                 // excited — opportunities
      b: { blue: 2, beige: 2 },                 // anxious — need to understand
    },
  },

  // ━━ SECTION 5: What calls you forward ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  q029: {
    // "Lasting contribution to the world..."
    type: "choice",
    options: {
      a: { purple: 2, beige: 1, turquoise: 1 }, // protecting what's sacred
      b: { blue: 2, green: 2 },                 // fair system for everyone
      c: { orange: 2, red: 2 },                 // extraordinary achievement
      d: { yellow: 3 },                         // help people see connections
    },
  },

  q030: {
    // "Is there a 'right way' to live?"
    // TENSION PAIR with q009
    // Low: no single right way → Yellow/Green    High: universal principles → Blue
    type: "slider",
    low: { yellow: 2, green: 2 },
    high: { blue: 3 },
  },

  q031: {
    // "Future of humanity..."
    type: "choice",
    options: {
      a: { green: 2, turquoise: 2 },            // hopeful — work together
      b: { orange: 2, red: 2 },                 // pragmatic — individual drive
    },
  },

  q032: {
    // "Deepest sense of meaning..."
    type: "choice",
    options: {
      a: { beige: 2, turquoise: 2 },            // physical connection to nature
      b: { purple: 3 },                         // bonds with closest people
      c: { blue: 3 },                           // lived by principles
      d: { yellow: 3 },                         // how systems connect
    },
  },

  q033: {
    // "Suffering of strangers — affects you?"
    // Low: focus on what's near → Beige/Purple    High: deeply → Green/Turquoise
    type: "slider",
    low: { beige: 1, purple: 1, red: 1 },
    high: { green: 3, turquoise: 3 },
  },

  q034: {
    // "Order by resonance with deepest self..."
    type: "ranked",
    items: {
      body_wisdom: { beige: 2, turquoise: 2 },    // intelligence in nature/body
      bonds: { purple: 3 },                        // bonds between people
      excellence: { orange: 3 },                   // individual excellence
      system: { blue: 2, yellow: 2 },              // getting the system right
    },
  },

  q035: {
    // "Freedom or belonging?"
    type: "choice",
    options: {
      a: { red: 2, orange: 1, yellow: 2 },        // freedom
      b: { purple: 2, green: 2, turquoise: 1 },   // belonging
    },
  },
};

// ── Tension Pairs (anti-inflation) ──────────────────────────────────────────
// Each pair tests the same dimension from opposite directions.
// If the user picks the "aspirational" (higher-lens) answer on BOTH sides,
// the result confidence is downgraded and inflation is flagged.

export interface TensionPair {
  questionA: string;
  questionB: string;
  /** Response values that, when both chosen, indicate inflation */
  aspirationalA: string | ((v: number) => boolean);
  aspirationalB: string | ((v: number) => boolean);
  description: string;
}

export const TENSION_PAIRS: TensionPair[] = [
  {
    // q003: honesty vs. gentleness ↔ q018: direct vs. understanding
    // If user claims both "honesty matters more" AND "try to understand" → inflated green
    questionA: "q003",
    questionB: "q018",
    aspirationalA: "b", // gentle (green-leaning)
    aspirationalB: "b", // understand (green-leaning)
    description: "Claims both radical honesty AND deep empathy orientation",
  },
  {
    // q006: recognition vs. integrity ↔ q019: external validation slider
    // If user claims integrity matters more AND low external validation → inflated integrity signal
    questionA: "q006",
    questionB: "q019",
    aspirationalA: "b",                  // integrity (blue/green)
    aspirationalB: (v: number) => v < 25, // very low validation (yellow/turquoise)
    description: "Claims integrity over recognition but also claims very low need for validation",
  },
  {
    // q009: rules ↔ q030: right way to live
    // If user claims both "rules should be followed" AND "no single right way" → contradictory
    questionA: "q009",
    questionB: "q030",
    aspirationalA: (v: number) => v > 75,  // rules need breaking (yellow)
    aspirationalB: (v: number) => v < 25,  // no single right way (yellow/green)
    description: "Claims both rule-breaking AND contextual morality (potential Yellow inflation)",
  },
  {
    // q015: solutions vs. presence ↔ q026: push through vs. seek connection
    // If user claims both "be present" AND "push through" → contradictory
    questionA: "q015",
    questionB: "q026",
    aspirationalA: "b", // be present (green)
    aspirationalB: "a", // push through (red/orange)
    description: "Claims deep empathetic presence but also grit/push-through under stress",
  },
];

// ── Lower Lens Dismissal Thresholds ─────────────────────────────────────────
// If the combined normalised score for Beige + Purple + Red is below this
// threshold, AND the user answered with high certainty (fast response times
// or extreme slider values), the result is flagged.

export const LOWER_LENS_DISMISSAL = {
  /** Lenses to check */
  lenses: ["beige", "purple", "red"] as LensSlug[],
  /** Combined normalised score below this = potential dismissal */
  threshold: 0.15,
  /** Questions that specifically test lower-lens warmth (q014, q025, q020a) */
  warmthQuestions: ["q014", "q025", "q020"],
};

// ── Variance Threshold ──────────────────────────────────────────────────────
// Standard deviation of normalised lens scores below this value suggests
// low engagement or confused/random answering.

export const VARIANCE_THRESHOLD = 0.06;
