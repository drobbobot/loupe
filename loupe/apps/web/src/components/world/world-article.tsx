"use client";

// ─────────────────────────────────────────────────────────────────────────────
// WorldArticle — Full article display for "The World Right Now"
//
// Design (prd.md §4.5, §8):
//   - Pull-out quotes, section headers, scannable structure
//   - Max 300-word sections before a break
//   - Serif for editorial body (design.md §3.3)
//   - Lens tags, read time, date
//   - Related articles at bottom
//
// Register: Kinfolk / Are.na — calm, high-typographic intelligence
// ─────────────────────────────────────────────────────────────────────────────

import Link from "next/link";
import { motion } from "framer-motion";
import type { SeedArticle, ArticleSection } from "@/lib/world-data";
import type { LensSlug } from "@loupe/types";

interface RelatedArticle {
  slug: string;
  title: string;
  excerpt: string;
  readTimeMins: number;
  lenses: Array<{ slug: LensSlug; displayName: string; colourHex: string }>;
}

interface WorldArticleProps {
  article: SeedArticle;
  related: RelatedArticle[];
}

export function WorldArticle({ article, related }: WorldArticleProps) {
  const date = new Date(article.publishedAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Use the first lens colour as accent
  const accentColor = article.lenses[0]?.colourHex ?? "#6B4E9B";

  return (
    <main className="pb-24">
      {/* ── Back link ──────────────────────────────────────────────────── */}
      <div className="px-6 pt-4">
        <Link
          href="/world"
          className="inline-flex items-center gap-1.5 text-sm text-warm-400 transition-colors hover:text-warm-600"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M8.5 3L4.5 7L8.5 11" />
          </svg>
          The World Right Now
        </Link>
      </div>

      {/* ── Article header ────────────────────────────────────────────── */}
      <motion.header
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mx-auto max-w-lg px-6 pt-6"
      >
        {/* Lens tags */}
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {article.lenses.map((lens) => (
            <Link
              key={lens.slug}
              href={`/lenses/${lens.slug}`}
              className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider transition-opacity hover:opacity-80"
              style={{
                backgroundColor: lens.colourHex + "15",
                color: lens.colourHex,
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: lens.colourHex }}
              />
              {lens.displayName}
            </Link>
          ))}
        </div>

        {/* Title */}
        <h1 className="font-serif text-3xl font-medium leading-tight tracking-tight text-warm-900">
          {article.title}
        </h1>

        {/* Meta */}
        <div className="mt-3 flex items-center gap-3 text-xs text-warm-400">
          <span>{date}</span>
          <span>·</span>
          <span>{article.readTimeMins} min read</span>
        </div>

        {/* Accent divider */}
        <div
          className="mt-6 h-0.5 w-12 rounded-full"
          style={{ backgroundColor: accentColor }}
        />
      </motion.header>

      {/* ── Article body ──────────────────────────────────────────────── */}
      <motion.article
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mx-auto max-w-lg px-6 pt-6"
      >
        {article.body.map((section, index) => (
          <BodySection
            key={index}
            section={section}
            accentColor={accentColor}
            index={index}
          />
        ))}
      </motion.article>

      {/* ── Related articles ──────────────────────────────────────────── */}
      {related.length > 0 && (
        <div className="mx-auto max-w-lg px-6 pt-10">
          <div
            className="mb-4 h-px w-full"
            style={{ backgroundColor: accentColor + "20" }}
          />
          <h2 className="font-serif text-lg font-medium text-warm-900">
            Continue reading
          </h2>
          <div className="mt-4 space-y-4">
            {related.map((rel) => (
              <Link
                key={rel.slug}
                href={`/world/${rel.slug}`}
                className="group block rounded-xl border border-warm-200/60 bg-white/50 p-4 transition-colors hover:bg-white/80"
              >
                <div className="mb-1.5 flex gap-1">
                  {rel.lenses.slice(0, 2).map((lens) => (
                    <span
                      key={lens.slug}
                      className="inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider"
                      style={{
                        backgroundColor: lens.colourHex + "12",
                        color: lens.colourHex,
                      }}
                    >
                      <span
                        className="h-1 w-1 rounded-full"
                        style={{ backgroundColor: lens.colourHex }}
                      />
                      {lens.displayName}
                    </span>
                  ))}
                  <span className="ml-auto text-[10px] text-warm-400">
                    {rel.readTimeMins} min
                  </span>
                </div>
                <h3 className="font-serif text-sm font-medium text-warm-800 transition-colors group-hover:text-warm-600">
                  {rel.title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-warm-500 line-clamp-2">
                  {rel.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

// ── Body section renderer ──────────────────────────────────────────────────

function BodySection({
  section,
  accentColor,
  index,
}: {
  section: ArticleSection;
  accentColor: string;
  index: number;
}) {
  switch (section.type) {
    case "heading":
      return (
        <h2 className="mb-3 mt-8 font-serif text-xl font-medium text-warm-900">
          {section.text}
        </h2>
      );

    case "pullquote":
      return (
        <blockquote className="my-8 border-l-2 py-1 pl-5" style={{ borderColor: accentColor }}>
          <p
            className="font-serif text-base font-medium italic leading-relaxed"
            style={{ color: accentColor }}
          >
            {section.text}
          </p>
        </blockquote>
      );

    case "paragraph":
    default:
      return (
        <p className="mb-4 font-serif text-base leading-[1.8] text-warm-700">
          {section.text}
        </p>
      );
  }
}
