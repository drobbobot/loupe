// Sanity schema: assessmentQuestion
// Matches architecture.md §5 and prd.md §4.1
//
// SECURITY NOTE:
//   Only question copy and input configuration live here.
//   Scoring weights and lens dimension mappings are NEVER in Sanity.
//   They live server-side in apps/web/src/lib/assessment/weights.ts
//   The `id` field here must match the key in the weights constant.

import { defineField, defineType } from "sanity";

export const assessmentQuestion = defineType({
  name: "assessmentQuestion",
  title: "Assessment Question",
  type: "document",
  fields: [
    defineField({
      name: "id",
      title: "Question ID",
      type: "string",
      description:
        "Stable identifier used in assessment responses and scoring weights. Never change after launch. Format: q001 (original) or d001 (deep-only).",
      validation: (Rule) =>
        Rule.required().regex(/^[qd]\d{3}$/, {
          name: "question ID format",
          invert: false,
        }),
    }),
    defineField({
      name: "section",
      title: "Section (1–6)",
      type: "number",
      description:
        "Which section of the assessment this question belongs to. Quick quiz: 3 sections. Deep: 6 domain-based sections.",
      validation: (Rule) => Rule.required().integer().min(1).max(6),
    }),
    defineField({
      name: "order",
      title: "Order within section",
      type: "number",
      description: "Display order within the section.",
      validation: (Rule) => Rule.required().integer().min(1),
    }),
    defineField({
      name: "questionText",
      title: "Question text",
      type: "text",
      description:
        "The question as shown to the user. Should be situational and indirect — describes a scenario or reaction, not a direct self-report of values.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "inputType",
      title: "Input type",
      type: "string",
      description:
        "How the user responds. No two consecutive questions should use the same type (prd.md §4.1 Input Variety).",
      options: {
        list: [
          {
            title: "Slider (gradient response)",
            value: "slider",
          },
          {
            title: "Multiple choice (scenario-based, 3–4 options)",
            value: "multiple_choice",
          },
          {
            title: "Binary (two options, instinctive response)",
            value: "binary",
          },
          {
            title: "Ranked (drag-to-order — use sparingly)",
            value: "ranked",
          },
          {
            title: "Image selection (two images — reduces language bias)",
            value: "image",
          },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),

    // ── Options (for multiple_choice and binary) ─────────────────────────
    defineField({
      name: "options",
      title: "Options",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "value",
              type: "string",
              title: "Value (sent to server)",
              description: "Stable identifier, never changes after launch.",
            },
            {
              name: "label",
              type: "string",
              title: "Label (shown to user)",
            },
          ],
        },
      ],
      description:
        "Required for multiple_choice and binary types. For binary, exactly 2 options. For multiple_choice, 3–4 options — all written so there is no obvious 'right' answer.",
      hidden: ({ document }) =>
        !["multiple_choice", "binary"].includes(
          document?.inputType as string
        ),
    }),

    // ── Slider configuration ─────────────────────────────────────────────
    defineField({
      name: "sliderConfig",
      title: "Slider configuration",
      type: "object",
      fields: [
        {
          name: "labelMin",
          type: "string",
          title: "Min label (left pole)",
          description: "Label for the minimum value.",
        },
        {
          name: "labelMax",
          type: "string",
          title: "Max label (right pole)",
          description: "Label for the maximum value.",
        },
      ],
      description: "Required for slider type. Both poles should be revealing.",
      hidden: ({ document }) => document?.inputType !== "slider",
    }),

    // ── Life domain ─────────────────────────────────────────────────────
    defineField({
      name: "domain",
      title: "Life domain",
      type: "string",
      description:
        "Which life domain this question maps to. Used for per-domain scoring in the deep assessment.",
      options: {
        list: [
          { title: "Work & Ambition", value: "work" },
          { title: "Relationships & Intimacy", value: "relationships" },
          { title: "Politics & Society", value: "politics" },
          { title: "Conflict & Stress", value: "conflict" },
          { title: "Meaning & Purpose", value: "meaning" },
          { title: "Change & Uncertainty", value: "change" },
        ],
        layout: "dropdown",
      },
      validation: (Rule) => Rule.required(),
    }),

    // ── Assessment tier ───────────────────────────────────────────────────
    defineField({
      name: "tier",
      title: "Assessment tier",
      type: "string",
      description:
        'Which assessment tier(s) use this question. "both" means used in quick quiz AND deep assessment. "deep" means deep assessment only.',
      options: {
        list: [
          { title: "Both (Quick + Deep)", value: "both" },
          { title: "Deep only", value: "deep" },
        ],
        layout: "radio",
      },
      initialValue: "deep",
      validation: (Rule) => Rule.required(),
    }),

    // ── Section transition copy ──────────────────────────────────────────
    defineField({
      name: "sectionTransition",
      title: "Section transition (first question of section only)",
      type: "text",
      description:
        'The copy shown on the full-screen interstitial before this section. E.g. "You\'ve told us how you relate to others. Now we want to understand what you value when things get hard." Leave blank for non-first questions.',
    }),
  ],

  preview: {
    select: {
      id: "id",
      section: "section",
      order: "order",
      questionText: "questionText",
      inputType: "inputType",
      domain: "domain",
      tier: "tier",
    },
    prepare({ id, section, order, questionText, inputType, domain, tier }) {
      const tierBadge = tier === "both" ? "Q+D" : "D";
      return {
        title: `${id} — ${questionText?.slice(0, 60) ?? ""}${(questionText?.length ?? 0) > 60 ? "…" : ""}`,
        subtitle: `[${tierBadge}] ${domain ?? "?"} · Section ${section}, Q${order} — ${inputType}`,
      };
    },
  },

  orderings: [
    {
      title: "Section & order",
      name: "sectionOrder",
      by: [
        { field: "section", direction: "asc" },
        { field: "order", direction: "asc" },
      ],
    },
  ],
});
