// ─────────────────────────────────────────────────────────────────────────────
// Profile Data — Assembles the "Your Profile" view from assessment result + lens content
//
// This file bridges:
//   - AssessmentResult (from scoring engine / Supabase)
//   - LensProfile (from Sanity / seed data)
//   - LensPortrait (shadow flags + growth orientation)
//
// The Profile uses second-person voice ("You tend to...") whereas the Lens
// Library uses first-person ("I am tuned to..."). This helper provides
// second-person editorial content for each section.
//
// Voice guidelines (prd.md §3, design.md §2):
//   - Second person, compassionate, never clinical
//   - "Lenses, not levels" — no hierarchy implied
//   - Shadow descriptions are honest but never shaming
//   - Growth orientation is descriptive, not prescriptive
// ─────────────────────────────────────────────────────────────────────────────

import type { AssessmentResult, LensSlug, ConfidenceLevel } from "@loupe/types";
import { LENS_COLORS, LENS_GROUPS } from "@loupe/types";
import type { LensProfile } from "@/lib/lens-data";
import type { LensPortrait } from "@/lib/assessment/portraits";

// ── Profile data shape ──────────────────────────────────────────────────────

export interface ProfileData {
  primaryLens: LensSlug;
  secondaryLens: LensSlug;
  displayName: string;
  secondaryDisplayName: string;
  tagline: string;
  group: "me" | "we" | "everybody";
  colours: { DEFAULT: string; bg: string; text: string };
  secondaryColours: { DEFAULT: string; bg: string; text: string };

  // Centre of Gravity header
  centreOfGravity: string;

  // How You Show Up — 3 context panels
  howYouShowUp: {
    atWork: string;
    inRelationships: string;
    underStress: string;
  };

  // Your Shadow
  shadow: {
    intro: string;
    tendencies: string[];
    triggers: string[];
  };

  // What's Ahead
  whatsAhead: {
    growthOrientation: string;
    secondaryNote: string;
  };

  // Your Lens in the World
  lensInTheWorld: string;

  // Caveats
  confidenceLevel: ConfidenceLevel;
  inflationFlag: boolean;
  confidenceNote: string | null;
  inflationNote: string | null;
}

// ── Display name lookup ─────────────────────────────────────────────────────

const LENS_DISPLAY_NAMES: Record<LensSlug, string> = {
  beige: "Beige",
  purple: "Purple",
  red: "Red",
  blue: "Blue",
  orange: "Orange",
  green: "Green",
  yellow: "Yellow",
  turquoise: "Turquoise",
};

// ── Second-person "How You Show Up" content ─────────────────────────────────
// Each lens has three context panels: at work, in relationships, under stress.
// These are second-person editorial rewrites of the lens library content.

const HOW_YOU_SHOW_UP: Record<LensSlug, { atWork: string; inRelationships: string; underStress: string }> = {
  beige: {
    atWork:
      "You bring a grounding presence to any team. While others get lost in abstractions, you notice what's actually happening in the room — the energy levels, the unspoken tension, whether people have eaten. You're the one who says 'let's take a break' when everyone else is pushing through. Your practical intelligence keeps things real.",
    inRelationships:
      "You show love through physical care — making sure someone has eaten, checking if they're warm enough, noticing when their body language shifts. You may struggle to express feelings in words, but the people close to you know they're safe with you. You're most connected when you're sharing a physical experience: cooking together, walking, being in nature.",
    underStress:
      "When the pressure builds, you go quiet. Your world narrows to what's immediate and physical. You may withdraw from people, not out of coldness but because your nervous system is telling you to conserve energy and protect yourself. The signals you normally read so well become overwhelming, and you need space to recalibrate.",
  },
  purple: {
    atWork:
      "You're the culture-keeper. You remember birthdays, maintain rituals, and sense when the team's spirit is flagging. You build loyalty naturally — people feel they belong when you're around. You may resist changes that threaten the group's identity, but your instinct to protect what binds people together is genuinely valuable.",
    inRelationships:
      "Your relationships are your world. You invest deeply in your inner circle and show up with fierce loyalty. Traditions matter to you — the Sunday dinners, the annual trips, the inside jokes that only your people understand. You create a sense of home wherever your tribe gathers.",
    underStress:
      "When stressed, you pull inward toward your closest people and may become suspicious of outsiders. The circle tightens. You might defer to a trusted authority figure rather than trust your own judgment, or cling to familiar routines even when they're not serving you. The fear underneath is always the same: being cast out.",
  },
  red: {
    atWork:
      "You bring energy, decisiveness, and a willingness to take risks that others won't. You're not afraid to challenge the status quo or call out what's not working. You move fast, trust your gut, and inspire others with your confidence. In a crisis, you're often the first to act while everyone else is still deliberating.",
    inRelationships:
      "You love intensely and protectively. You're generous with the people you care about — big gestures, fierce defence, unwavering presence. You need relationships that can handle your full intensity without trying to tame it. You respect people who stand their ground with you.",
    underStress:
      "Under pressure, your intensity can become aggression. You may bulldoze through conversations, interpret normal boundaries as challenges, or make impulsive decisions you later regret. The feeling driving it is usually a deep need not to be controlled or diminished — but the expression can push away the people you need most.",
  },
  blue: {
    atWork:
      "You bring structure, reliability, and moral clarity. When chaos hits, you're the steady one — the person who has a process, follows through on commitments, and holds others to their word. You build systems that people can trust. Your teams may not always find you fun, but they always feel safe.",
    inRelationships:
      "You love through duty, consistency, and sacrifice. You show up — every time, on time, no excuses. Your relationships have clear expectations and deep commitment. You may struggle to express tender emotions, but your actions speak: you built this, you maintain this, you will not abandon this.",
    underStress:
      "When stressed, you double down on rules and control. Flexibility disappears. You may become rigid, judgmental, or silently resentful of people who seem to get away with less effort. The world feels like it's losing its moral centre, and you try to hold it together by gripping tighter — which often pushes people away.",
  },
  orange: {
    atWork:
      "You're the strategist, the optimizer, the one who sees how to make things better and can't rest until you do. You set ambitious goals and consistently hit them. You bring innovation, competitive energy, and an infectious belief that problems are just puzzles waiting to be solved. People follow your lead because you deliver results.",
    inRelationships:
      "You bring generosity, ambition, and a desire to build something great together. You express love through action — solving problems, creating opportunities, pushing your partner to be their best. You may need to learn that sometimes people don't want solutions, they want to be heard.",
    underStress:
      "Under pressure, you accelerate. You work harder, optimise more, and may start treating everything — including relationships — as problems to be solved. Vulnerability feels like weakness. You might avoid difficult emotions by staying busy, telling yourself you'll deal with feelings 'later' — a later that rarely comes.",
  },
  green: {
    atWork:
      "You create spaces where people feel genuinely heard. You champion inclusivity, consensus, and the idea that every perspective has value. You notice who's been left out of the conversation and make room for them. Your teams may move more slowly, but everyone owns the outcome because everyone helped shape it.",
    inRelationships:
      "You love through empathy, presence, and deep listening. You want to know the whole person — their wounds, their dreams, what makes them feel unseen. You create emotional safety naturally. You may over-give and under-ask, assuming that if you just love hard enough, the relationship will find balance on its own.",
    underStress:
      "When stressed, you may avoid conflict until resentment builds, then express it as moral disappointment rather than honest frustration. You might become judgmental of people who 'should know better,' or exhaust yourself trying to hold space for everyone. The painful irony: your commitment to openness can become its own kind of rigidity.",
  },
  yellow: {
    atWork:
      "You see the whole system. While others argue about which approach is right, you're mapping how all the approaches fit together. You bring clarity to complex situations and can hold multiple, contradictory truths without anxiety. You're the person who says 'it depends' — and then actually explains what it depends on.",
    inRelationships:
      "You bring curiosity, independence, and an unusual ability to see your partner clearly — including the parts they hide from themselves. You love through understanding, not just feeling. You may need more autonomy than most people are comfortable giving, and your analytical nature can sometimes feel like distance.",
    underStress:
      "Under pressure, you retreat into your head. You observe rather than participate, analyse rather than feel, and may develop a quiet superiority toward people who seem stuck in narrower perspectives. The risk is becoming the person who understands everything but connects with no one.",
  },
  turquoise: {
    atWork:
      "You bring a rare combination of big-picture vision and intuitive sensitivity. You sense patterns that others can't articulate yet. You're drawn to work that serves something larger than any individual or organization. Your presence often has a calming, integrating effect on teams — even when you're not actively leading.",
    inRelationships:
      "You love with a quiet depth that can be hard to explain. You feel connected not just to your partner but to the larger web of life that includes them. Your relationships are spiritual as much as personal. You may struggle with the mundane mechanics of daily partnership — not because you don't care, but because your attention naturally floats toward the universal.",
    underStress:
      "When stressed, you may use holistic language to avoid the messy, human work of direct confrontation. You might float above conflict, offering perspective from a distance when what's needed is raw, present engagement. Others may experience your calm as inaccessibility — the lights are on, but nobody seems home.",
  },
};

// ── Centre of Gravity descriptions ──────────────────────────────────────────
// Second-person opening summary of the user's primary lens

const CENTRE_OF_GRAVITY: Record<LensSlug, string> = {
  beige:
    "Your centre of gravity sits with the body and the senses. Before you process ideas, you process the physical world — safety, comfort, presence. This isn't simplicity; it's a profound attunement to what's real and immediate that most people have learned to override.",
  purple:
    "Your centre of gravity sits with belonging. You experience the world through the bonds you share with your people — the rituals, the stories, the unspoken agreements that make a group feel like home. This isn't dependence; it's a deep knowing that we were never meant to navigate life alone.",
  red:
    "Your centre of gravity sits with power and self-expression. You move through the world with an urgency to make your mark, to be seen, to act rather than wait. This isn't recklessness; it's a fierce aliveness that refuses to be diminished by anyone else's expectations.",
  blue:
    "Your centre of gravity sits with principle and purpose. You navigate the world through a framework of right and wrong, duty and meaning. This isn't rigidity; it's a deep need for the world to make sense — and a willingness to hold yourself to the standards you believe in.",
  orange:
    "Your centre of gravity sits with achievement and possibility. You see the world as a landscape of problems to solve and goals to reach. This isn't shallow ambition; it's a genuine belief that things can always be better, and that you have the capacity to make them so.",
  green:
    "Your centre of gravity sits with connection and fairness. You feel the world through other people's experiences, and you're drawn to spaces where every voice is genuinely valued. This isn't naivety; it's a courageous insistence that empathy isn't weakness — it's intelligence.",
  yellow:
    "Your centre of gravity sits with integration and understanding. You see patterns where others see contradictions, and you move between perspectives with an ease that can feel unsettling to people who need things to be simpler. This isn't detachment; it's a genuine fascination with how everything fits together.",
  turquoise:
    "Your centre of gravity sits with wholeness. You sense the interconnection of living systems in a way that's difficult to articulate but impossible to unfeel. This isn't mysticism; it's an expanded awareness that includes both the analytical and the intuitive, the personal and the universal.",
};

// ── Lens in the World descriptions ──────────────────────────────────────────
// How this lens shows up in the broader cultural moment

const LENS_IN_THE_WORLD: Record<LensSlug, string> = {
  beige:
    "In a world that's increasingly digital and abstract, your grounding in the physical is more valuable than you might think. You remind people that before we can change the world, we need to feel safe in our bodies. The rising interest in somatic therapy, nervous system regulation, and trauma-informed care reflects a culture slowly remembering what you've always known.",
  purple:
    "In an era of atomised individuals and eroding institutions, your instinct for tribe and ritual is a form of cultural medicine. You understand something that hyper-individualist cultures are just beginning to rediscover: that belonging is not a luxury but a biological and spiritual need. The hunger for community, ceremony, and shared meaning is growing — and you've been tending that fire all along.",
  red:
    "In a culture that often rewards compliance and punishes bold self-expression, your energy is both disruptive and necessary. You challenge the systems that need challenging. The cultural conversation around authenticity, boundary-setting, and refusing to shrink yourself has Red's fingerprints all over it.",
  blue:
    "In a world that can feel chaotic and values-free, your commitment to structure and meaning is genuinely stabilising. Institutions are struggling, trust is eroding, and the need for people who care about integrity and follow-through has never been greater. You're not old-fashioned — you're holding something the world desperately needs.",
  orange:
    "You live at the centre of the modern world's self-image: innovation, meritocracy, progress. Your lens built much of what works about contemporary life. The tension you may feel is between the genuine value of achievement and the growing awareness that optimising everything doesn't necessarily lead to a life worth living.",
  green:
    "Your lens is having a cultural moment. The push for inclusion, equity, emotional intelligence, and sustainability reflects Green values entering the mainstream. The tension you carry is between the genuine importance of these values and the risk that enforcing openness can become its own form of closure.",
  yellow:
    "You're often ahead of the conversations happening around you, which can be lonely. Your ability to hold complexity, see systems, and integrate competing truths is increasingly needed in a polarised world — but it's not always welcomed. People may find your perspective disorienting because it refuses to take a simple side.",
  turquoise:
    "You sense a wholeness that most cultural systems aren't yet designed to support. Your way of seeing — ecological, intuitive, non-dualistic — is reflected in emerging conversations about planetary consciousness, indigenous wisdom, and the limits of purely rational frameworks. The challenge is staying engaged with the messy, particular world rather than floating above it.",
};

// ── Secondary lens note ─────────────────────────────────────────────────────

function getSecondaryNote(primary: LensSlug, secondary: LensSlug): string {
  const primaryName = LENS_DISPLAY_NAMES[primary];
  const secondaryName = LENS_DISPLAY_NAMES[secondary];
  const primaryGroup = LENS_GROUPS[primary];
  const secondaryGroup = LENS_GROUPS[secondary];

  if (primaryGroup === secondaryGroup) {
    return `Your secondary lens is ${secondaryName}, which sits in the same developmental neighbourhood as ${primaryName}. This suggests a strong, concentrated worldview — you know deeply what matters to you. The growth invitation is to explore what the lenses further along the spiral might illuminate.`;
  }

  return `Your secondary lens is ${secondaryName}, which brings a different quality to the way you see the world. Where ${primaryName} leads with ${primaryGroup === "me" ? "individual" : primaryGroup === "we" ? "collective" : "integrative"} energy, ${secondaryName} adds a ${secondaryGroup === "me" ? "personal" : secondaryGroup === "we" ? "structural" : "holistic"} dimension. This combination gives you range — and sometimes inner tension.`;
}

// ── Confidence / inflation notes ────────────────────────────────────────────

function getConfidenceNote(level: ConfidenceLevel): string | null {
  switch (level) {
    case "high":
      return null; // No caveat needed
    case "medium":
      return "Your responses showed some interesting complexity. This profile captures your primary pattern, but you might find that your lens shifts depending on the context you're in. Consider retaking the assessment in a few months to see how your perspective evolves.";
    case "low":
      return "Your responses suggest you're in a dynamic place — your worldview may be actively shifting, or you might draw heavily from several lenses depending on the situation. This profile highlights your strongest pattern, but treat it as a starting point rather than a definitive map. Retaking the assessment later may reveal a clearer picture.";
  }
}

function getInflationNote(inflationFlag: boolean): string | null {
  if (!inflationFlag) return null;
  return "The assessment detected some patterns that can indicate a preference for how we'd like to see ourselves rather than how we typically operate. This is completely natural — most people aspire to be more complex than their default patterns. The profile below reflects the lens where your responses were most consistent and grounded.";
}

// ── Main assembler ──────────────────────────────────────────────────────────

export function assembleProfile(
  result: AssessmentResult,
  primaryLens: LensProfile,
  secondaryLens: LensProfile,
  portrait: LensPortrait
): ProfileData {
  const primary = result.primaryLens;
  const secondary = result.secondaryLens;

  return {
    primaryLens: primary,
    secondaryLens: secondary,
    displayName: primaryLens.displayName,
    secondaryDisplayName: secondaryLens.displayName,
    tagline: primaryLens.tagline,
    group: primaryLens.group,
    colours: LENS_COLORS[primary],
    secondaryColours: LENS_COLORS[secondary],

    centreOfGravity: CENTRE_OF_GRAVITY[primary],

    howYouShowUp: HOW_YOU_SHOW_UP[primary],

    shadow: {
      intro: `Every lens has a shadow — the patterns that emerge when you're contracted, stressed, or operating on autopilot. These aren't character flaws; they're the natural consequence of your strengths being pushed too far. Recognising your shadow isn't about shame — it's about having a choice.`,
      tendencies: portrait.shadowFlags.tendencies,
      triggers: portrait.shadowFlags.triggers,
    },

    whatsAhead: {
      growthOrientation: portrait.growthOrientation,
      secondaryNote: getSecondaryNote(primary, secondary),
    },

    lensInTheWorld: LENS_IN_THE_WORLD[primary],

    confidenceLevel: result.confidenceLevel,
    inflationFlag: result.inflationFlag,
    confidenceNote: getConfidenceNote(result.confidenceLevel),
    inflationNote: getInflationNote(result.inflationFlag),
  };
}
