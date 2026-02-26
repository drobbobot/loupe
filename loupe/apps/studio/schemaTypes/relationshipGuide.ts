// Sanity schema: relationshipGuide
// Matches architecture.md §5 and prd.md §4.4 "The Two-Lens Tool"
//
// Priority combinations that need FULL authored content at launch (prd.md §4.4):
//   Blue/Orange, Orange/Green, Blue/Green, Red/Blue,
//   Orange/Orange, Green/Green, Blue/Blue, Purple/Blue
// All other combinations get template-generated content.

import { defineField, defineType } from "sanity";

export const relationshipGuide = defineType({
  name: "relationshipGuide",
  title: "Relationship Guide",
  type: "document",
  fields: [
    // ── Lens pair ────────────────────────────────────────────────────────
    defineField({
      name: "lensA",
      title: "Lens A",
      type: "reference",
      to: [{ type: "lens" }],
      description:
        "By convention, order alphabetically (Blue before Orange). The query normalises this.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "lensB",
      title: "Lens B",
      type: "reference",
      to: [{ type: "lens" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "quality",
      title: "Content quality",
      type: "string",
      description:
        "Full = individually authored. Template = generated from framework logic and flagged as lighter.",
      options: {
        list: [
          { title: "Full (authored)", value: "full" },
          { title: "Template (generated)", value: "template" },
        ],
        layout: "radio",
      },
      initialValue: "template",
      validation: (Rule) => Rule.required(),
    }),

    // ── Core content (prd.md §4.4 guide structure) ───────────────────────
    defineField({
      name: "dynamicSummary",
      title: "Dynamic summary",
      type: "array",
      of: [{ type: "block" }],
      description:
        "What typically happens when these two lenses are in relationship. The characteristic shape of their interactions.",
    }),
    defineField({
      name: "lensANeeds",
      title: "What Lens A needs from Lens B",
      type: "array",
      of: [{ type: "block" }],
      description: "Stated in terms Lens B can act on. Not blame-assignment.",
    }),
    defineField({
      name: "lensBNeeds",
      title: "What Lens B needs from Lens A",
      type: "array",
      of: [{ type: "block" }],
      description: "Symmetric — both people's needs are named.",
    }),
    defineField({
      name: "frictionPoints",
      title: "Where it typically breaks down",
      type: "array",
      of: [{ type: "block" }],
      description:
        "The predictable friction points. What each person interprets as bad faith when it is actually lens logic.",
    }),
    defineField({
      name: "genuineConnection",
      title: "What genuine connection looks like",
      type: "array",
      of: [{ type: "block" }],
      description:
        "Not just 'avoid these friction points' — what the relationship can become when both people understand the dynamic.",
    }),

    // ── Scenario variants (prd.md §4.4) ─────────────────────────────────
    defineField({
      name: "scenarioClose",
      title: "Scenario: Close relationship",
      type: "array",
      of: [{ type: "block" }],
      description:
        "Partner, family member, close friend. Adjusts examples and language for this context. Leave blank to use core content.",
    }),
    defineField({
      name: "scenarioWork",
      title: "Scenario: Working relationship",
      type: "array",
      of: [{ type: "block" }],
      description: "Colleague, manager, report.",
    }),
    defineField({
      name: "scenarioCivic",
      title: "Scenario: Civic life",
      type: "array",
      of: [{ type: "block" }],
      description: "Neighbour, community, political context.",
    }),
  ],

  preview: {
    select: {
      lensA: "lensA.displayName",
      lensB: "lensB.displayName",
      quality: "quality",
    },
    prepare({ lensA, lensB, quality }) {
      return {
        title: `${lensA ?? "?"} × ${lensB ?? "?"}`,
        subtitle: quality === "full" ? "Fully authored" : "Template",
      };
    },
  },
});
