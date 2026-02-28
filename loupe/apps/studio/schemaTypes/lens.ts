// Sanity schema: lens
// Matches architecture.md §5 and prd.md §4.2 "Each Lens Profile Contains"
// All eight lens profiles are documents of this type.

import { defineField, defineType } from "sanity";

const LENS_SLUGS = [
  { title: "Beige", value: "beige" },
  { title: "Purple", value: "purple" },
  { title: "Red", value: "red" },
  { title: "Blue", value: "blue" },
  { title: "Orange", value: "orange" },
  { title: "Green", value: "green" },
  { title: "Yellow", value: "yellow" },
  { title: "Turquoise", value: "turquoise" },
];

export const lens = defineType({
  name: "lens",
  title: "Lens",
  type: "document",
  fields: [
    // ── Identity ────────────────────────────────────────────────────────
    defineField({
      name: "slug",
      title: "Lens slug",
      type: "string",
      description: "Lowercase identifier. Must match the canonical list.",
      options: { list: LENS_SLUGS },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Spiral order (1–8)",
      type: "number",
      description: "Position on the spiral arc. Beige = 1, Turquoise = 8.",
      validation: (Rule) => Rule.required().integer().min(1).max(8),
    }),
    defineField({
      name: "colourHex",
      title: "Colour (hex)",
      type: "string",
      description: "Primary colour for this lens, e.g. #C4622D",
      validation: (Rule) =>
        Rule.required().regex(/^#[0-9A-Fa-f]{6}$/, {
          name: "hex colour",
          invert: false,
        }),
    }),
    defineField({
      name: "displayName",
      title: "Display name",
      type: "string",
      description: 'e.g. "Beige" or "The Survival Lens"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description: "One evocative sentence that lands the feel of this lens.",
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: "group",
      title: "Group",
      type: "string",
      description: "Self / Community / Systems developmental grouping",
      options: {
        list: [
          { title: "Self (Beige, Purple, Red)", value: "me" },
          { title: "Community (Blue, Orange)", value: "we" },
          { title: "Systems (Green, Yellow, Turquoise)", value: "everybody" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "inwardOutward",
      title: "Inward / outward focus",
      type: "string",
      description:
        "The alternating character of the spiral arc. Affects spiral map node positioning.",
      options: {
        list: [
          { title: "Inward", value: "inward" },
          { title: "Outward", value: "outward" },
          { title: "Integrating (Yellow + Turquoise)", value: "integrating" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    // ── Profile content sections (prd.md §4.2) ──────────────────────────
    defineField({
      name: "fromTheInside",
      title: "From the inside",
      type: "array",
      of: [{ type: "block" }],
      description:
        "First-person, present-tense portrait. 200–350 words. Goal: someone from this lens reads it and feels seen.",
    }),
    defineField({
      name: "valuesAndWhy",
      title: "What this lens values and why",
      type: "array",
      of: [{ type: "block" }],
      description: "Values written without apology or condescension. 100–200 words.",
    }),
    defineField({
      name: "healthyExpression",
      title: "Healthy expression",
      type: "array",
      of: [{ type: "block" }],
      description:
        "What this lens looks like when functioning well. Specific, vivid. 150–250 words.",
    }),
    defineField({
      name: "shadowExpression",
      title: "Shadow expression",
      type: "array",
      of: [{ type: "block" }],
      description:
        "What this lens looks like when frightened or overextended. Written with compassion — recognition tool, not a warning label. 150–250 words.",
    }),
    defineField({
      name: "inTheWild",
      title: "In the wild",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Example title" },
            { name: "body", type: "text", title: "Description (1–3 sentences)" },
          ],
        },
      ],
      description:
        "3–5 vivid real-world examples: politics, culture, archetypes, relationships, workplace.",
    }),
    defineField({
      name: "howToConnect",
      title: "How to connect",
      type: "array",
      of: [{ type: "block" }],
      description:
        "Practical guidance for genuine communication — not manipulation tactics. 150–200 words.",
    }),
    defineField({
      name: "growthPrompt",
      title: "What's opening up",
      type: "array",
      of: [{ type: "block" }],
      description:
        "Non-prescriptive description of what the next lens sees. Framed as an invitation, not a push. Warm, plain-spoken. 50–100 words.",
    }),
    defineField({
      name: "depthLayer",
      title: "Depth layer",
      type: "array",
      of: [{ type: "block" }],
      description:
        "More technical content for users who want to go deeper: Graves/Beck grounding, historical examples, Wilber framing. This is where vMEME terminology can appear.",
    }),

    // ── Tags ─────────────────────────────────────────────────────────────
    defineField({
      name: "tags",
      title: "Tags (1–3)",
      type: "array",
      of: [{ type: "string" }],
      description:
        "Short descriptor words shown as subtext beneath the lens name. E.g. 'Survival · Instinct · Primal'. Max 3.",
      validation: (Rule) => Rule.max(3),
      options: {
        layout: "tags",
      },
    }),

    // ── SEO ──────────────────────────────────────────────────────────────
    defineField({
      name: "metaDescription",
      title: "Meta description",
      type: "string",
      description: "For SEO. Max 160 characters.",
      validation: (Rule) => Rule.max(160),
    }),
  ],

  preview: {
    select: {
      title: "displayName",
      subtitle: "tagline",
    },
  },
  orderings: [
    {
      title: "Spiral order",
      name: "spiralOrder",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
