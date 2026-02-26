// Sanity schema: article
// The World Right Now — prd.md §4.5
// Long-form editorial pieces, 800–1,500 words, lens-grounded cultural analysis.

import { defineField, defineType } from "sanity";

export const article = defineType({
  name: "article",
  title: "Article (The World Right Now)",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "lenses",
      title: "Primary lens(es)",
      type: "array",
      of: [{ type: "reference", to: [{ type: "lens" }] }],
      description:
        "Which lenses are most centrally involved in this piece. Used for filtering.",
      validation: (Rule) => Rule.required().min(1).max(3),
    }),
    defineField({
      name: "readTimeMins",
      title: "Read time (minutes)",
      type: "number",
      validation: (Rule) => Rule.required().integer().min(1).max(30),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "string",
      description:
        "1–2 line lede shown in the feed. Max 160 characters. Opens with a specific phenomenon, not an abstraction.",
      validation: (Rule) => Rule.required().max(160),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "alt", type: "string", title: "Alt text" },
            { name: "caption", type: "string", title: "Caption" },
          ],
        },
      ],
      description:
        "800–1,500 words. Must include pull-out quotes, section headers, and scannable structure — no walls of text (prd.md §8 engagement requirements).",
    }),
    defineField({
      name: "related",
      title: "Related articles",
      type: "array",
      of: [{ type: "reference", to: [{ type: "article" }] }],
      validation: (Rule) => Rule.max(3),
    }),
  ],

  preview: {
    select: {
      title: "title",
      publishedAt: "publishedAt",
    },
    prepare({ title, publishedAt }) {
      const date = publishedAt
        ? new Date(publishedAt).toLocaleDateString("en-AU", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })
        : "Draft";
      return { title, subtitle: date };
    },
  },

  orderings: [
    {
      title: "Newest first",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
});
