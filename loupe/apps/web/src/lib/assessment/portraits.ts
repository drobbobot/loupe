// ─────────────────────────────────────────────────────────────────────────────
// Loupe — Lens Portrait Data
//
// ██████████████████████████████████████████████████████████████████████████████
// ██  SERVER-SIDE ONLY — NEVER import this file from client components.     ██
// ██████████████████████████████████████████████████████████████████████████████
//
// Each lens has:
//   - shadowFlags: specific behavioural patterns when contracted/stressed
//   - growthOrientation: what the "next" lens offers (descriptive, not prescriptive)
//
// Tone guidance (prd.md §3, design.md §2):
//   - Second person, compassionate
//   - "Lenses, not levels" — no hierarchy implied
//   - Shadow descriptions are honest but never shaming
//   - Growth orientation is descriptive, not prescriptive ("sees X" not "should X")
// ─────────────────────────────────────────────────────────────────────────────

import type { LensSlug } from "@loupe/types";

export interface LensPortrait {
  shadowFlags: {
    tendencies: string[];
    triggers: string[];
  };
  growthOrientation: string;
}

export const PORTRAITS: Record<LensSlug, LensPortrait> = {
  beige: {
    shadowFlags: {
      tendencies: [
        "Withdrawing from the world when overwhelmed, shutting down rather than reaching out",
        "Focusing so heavily on physical comfort and safety that relationships and growth fall away",
        "Difficulty trusting that the ground beneath you is stable enough to take risks",
      ],
      triggers: [
        "Feeling physically unsafe or unwell",
        "Environments that feel chaotic, unpredictable, or too fast-paced",
        "Having basic needs (sleep, food, shelter, rest) go unmet for too long",
      ],
    },
    growthOrientation:
      "Purple sees something you sometimes miss: that safety isn\u2019t only found in self-sufficiency \u2014 it\u2019s also found in belonging. The people around you can be part of the ground you stand on, not just bystanders to your survival.",
  },

  purple: {
    shadowFlags: {
      tendencies: [
        "Holding so tightly to your group that outsiders feel unwelcome or even threatening",
        "Deferring to tradition or authority figures when your own instincts say otherwise",
        "Feeling lost or unmoored when separated from the people and rituals that define you",
      ],
      triggers: [
        "Rejection or exclusion from your inner circle",
        "Having cherished traditions or group norms challenged",
        "Feeling like you have to navigate something entirely alone",
      ],
    },
    growthOrientation:
      "Red sees something you sometimes miss: that your own voice matters as much as the group\u2019s. Loyalty doesn\u2019t require losing yourself \u2014 the people who truly love you want to hear what you actually think, not what keeps the peace.",
  },

  red: {
    shadowFlags: {
      tendencies: [
        "Dominating conversations and decisions, leaving little room for others to contribute",
        "Interpreting normal boundaries as personal challenges or power plays",
        "Acting on impulse and dealing with the fallout later, treating speed as a virtue even when it costs you",
      ],
      triggers: [
        "Feeling controlled, constrained, or told what to do",
        "Perceived disrespect or being ignored",
        "Environments that reward compliance over initiative",
      ],
    },
    growthOrientation:
      "Blue sees something you sometimes miss: that structure isn\u2019t a cage \u2014 it\u2019s a container. Some of your boldest energy gets wasted on battles that don\u2019t need fighting. The right framework can actually amplify your power rather than limit it.",
  },

  blue: {
    shadowFlags: {
      tendencies: [
        "Rigidity \u2014 doubling down on the rules even when the situation clearly calls for an exception",
        "Judging others harshly for not meeting your standards, even when those standards were never theirs",
        "Shouldering duty to the point of martyrdom, then resenting those who seem to live more freely",
      ],
      triggers: [
        "Moral ambiguity or situations with no clear right answer",
        "People who don\u2019t follow through on commitments or seem to lack discipline",
        "Feeling that the institutions you believe in are failing or corrupt",
      ],
    },
    growthOrientation:
      "Orange sees something you sometimes miss: that the rules you\u2019ve built your life around were made by people \u2014 and people can improve them. Innovation isn\u2019t disloyalty. Sometimes the most principled thing you can do is question a principle.",
  },

  orange: {
    shadowFlags: {
      tendencies: [
        "Reducing people and experiences to metrics \u2014 optimising life until the meaning drains out",
        "Moving so fast toward the next goal that you miss what\u2019s already here",
        "Treating vulnerability as weakness and connection as distraction from achievement",
      ],
      triggers: [
        "Failure, especially public failure",
        "Feeling inefficient, stuck, or unproductive",
        "Environments that don\u2019t recognise or reward competence",
      ],
    },
    growthOrientation:
      "Green sees something you sometimes miss: that not everything worth doing shows up on a scoreboard. The relationships you\u2019ve been calling \u2018networking\u2019 might actually be the point, not the means. Slowing down isn\u2019t losing \u2014 it\u2019s listening.",
  },

  green: {
    shadowFlags: {
      tendencies: [
        "Valuing inclusion so highly that you struggle to make decisions or hold anyone accountable",
        "Judging others for being judgmental \u2014 enforcing openness with the same rigidity you critique",
        "Avoiding conflict until resentment builds, then expressing it as moral disappointment rather than honest frustration",
      ],
      triggers: [
        "Perceived hierarchy, exclusion, or unfairness",
        "People who seem indifferent to how their actions affect others",
        "Being asked to choose efficiency over empathy",
      ],
    },
    growthOrientation:
      "Yellow sees something you sometimes miss: that holding space for every perspective doesn\u2019t mean all perspectives carry equal weight in every situation. Integration isn\u2019t about erasing difference \u2014 it\u2019s about understanding what each lens actually does well, and using that understanding to act.",
  },

  yellow: {
    shadowFlags: {
      tendencies: [
        "Analysing from a distance instead of participating \u2014 becoming the observer who never commits",
        "Feeling quietly superior to people who haven\u2019t \u2018seen the whole picture\u2019",
        "Valuing autonomy so much that you struggle with genuine interdependence",
      ],
      triggers: [
        "Being forced into a single framework or ideology",
        "People who insist their lens is the only valid one",
        "Environments that demand loyalty to a group position over independent thinking",
      ],
    },
    growthOrientation:
      "Turquoise sees something you sometimes miss: that understanding the system isn\u2019t the same as being part of it. Your maps of the world are elegant, but at some point the map has to dissolve into the territory. Connection isn\u2019t a concept to be integrated \u2014 it\u2019s an experience to be lived.",
  },

  turquoise: {
    shadowFlags: {
      tendencies: [
        "Spiritual bypassing \u2014 using holistic language to avoid the messy, human work of direct confrontation",
        "Feeling so attuned to the big picture that everyday practical details seem beneath your attention",
        "A quiet detachment that others experience as inaccessibility, even when you feel deeply connected",
      ],
      triggers: [
        "Environments that are aggressively materialistic or reductive",
        "People who dismiss intuitive or non-rational knowing",
        "Being asked to reduce complex, living systems to simple metrics or categories",
      ],
    },
    growthOrientation:
      "The spiral doesn\u2019t end. Turquoise holds the widest lens available right now, but its growth edge is re-engaging with the particular \u2014 finding the universal in the mundane, bringing holistic awareness into the smallest interactions, and resisting the temptation to float above it all.",
  },
};
