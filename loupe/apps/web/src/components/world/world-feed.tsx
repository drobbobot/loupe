"use client";

// ─────────────────────────────────────────────────────────────────────────────
// WorldFeed — Article listing with lens-based filtering
//
// Design (prd.md §4.5):
//   - Filter by lens or browse by recency
//   - Each card: title + excerpt + lens tags + read time
//   - Grounded, editorial aesthetic (design.md: Kinfolk / Are.na register)
//
// If the user has a primary lens, "Relevant to you" is the default filter.
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { LENS_COLORS, type LensSlug } from "@loupe/types";

interface FeedArticle {
  slug: string;
  title: string;
  publishedAt: string;
  excerpt: string;
  readTimeMins: number;
  lenses: Array<{ slug: LensSlug; displayName: string; colourHex: string }>;
}

interface WorldFeedProps {
  articles: FeedArticle[];
  userPrimaryLens: LensSlug | null;
}

const ALL_LENSES: Array<{ slug: LensSlug; name: string }> = [
  { slug: "beige", name: "Beige" },
  { slug: "purple", name: "Purple" },
  { slug: "red", name: "Red" },
  { slug: "blue", name: "Blue" },
  { slug: "orange", name: "Orange" },
  { slug: "green", name: "Green" },
  { slug: "yellow", name: "Yellow" },
  { slug: "turquoise", name: "Turquoise" },
];

export function WorldFeed({ articles, userPrimaryLens }: WorldFeedProps) {
  const [activeLens, setActiveLens] = useState<LensSlug | null>(null);

  const filtered = activeLens
    ? articles.filter((a) => a.lenses.some((l) => l.slug === activeLens))
    : articles;

  return (
    <main className="pb-24">
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="px-6 pt-6 text-center">
        <h1 className="font-serif text-2xl font-medium text-warm-900">
          The World Right Now
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-warm-500">
          Lens-grounded analysis of the cultural moment. Not hot takes —
          genuine understanding.
        </p>
      </div>

      {/* ── Lens filters ────────────────────────────────────────────────── */}
      <div className="mt-5 px-6" role="group" aria-label="Filter articles by lens">
        <div className="flex flex-wrap justify-center gap-1.5">
          <FilterPill
            label="All"
            active={activeLens === null}
            onClick={() => setActiveLens(null)}
          />
          {ALL_LENSES.map(({ slug, name }) => {
            const colors = LENS_COLORS[slug];
            const active = activeLens === slug;
            return (
              <button
                key={slug}
                onClick={() => setActiveLens(active ? null : slug)}
                aria-pressed={active}
                className="rounded-full px-3 py-1.5 text-xs font-medium transition-all"
                style={{
                  backgroundColor: active ? colors.DEFAULT : "transparent",
                  color: active ? "#FFFDF9" : colors.text,
                  border: `1.5px solid ${active ? colors.DEFAULT : colors.DEFAULT + "30"}`,
                }}
              >
                {name}
                {userPrimaryLens === slug && !active && (
                  <span aria-hidden="true" className="ml-0.5 text-warm-400"> ·</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Article list ─────────────────────────────────────────────────── */}
      <div className="mx-auto mt-6 max-w-lg px-6" aria-live="polite">
        {filtered.length === 0 ? (
          <p className="py-12 text-center text-sm text-warm-400">
            No articles for this lens yet. Check back soon.
          </p>
        ) : (
          filtered.map((article, index) => (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.04 }}
            >
              <ArticleCard article={article} />
            </motion.div>
          ))
        )}
      </div>
    </main>
  );
}

// ── Filter pill ────────────────────────────────────────────────────────────

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
        active
          ? "bg-warm-900 text-cream"
          : "border border-warm-200/60 text-warm-500 hover:text-warm-700"
      }`}
      style={!active ? { borderWidth: "1.5px" } : undefined}
    >
      {label}
    </button>
  );
}

// ── Article card ──────────────────────────────────────────────────────────

function ArticleCard({ article }: { article: FeedArticle }) {
  const date = new Date(article.publishedAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });

  return (
    <Link
      href={`/world/${article.slug}`}
      className="group block border-b border-warm-200/40 py-5 first:pt-0 last:border-b-0"
    >
      {/* Lens tags */}
      <div className="mb-2 flex items-center gap-2">
        <div className="flex gap-1">
          {article.lenses.map((lens) => (
            <span
              key={lens.slug}
              className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
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
            </span>
          ))}
        </div>
        <span className="text-[10px] text-warm-300">·</span>
        <span className="text-[10px] text-warm-400">
          {date}
        </span>
        <span className="text-[10px] text-warm-300">·</span>
        <span className="text-[10px] text-warm-400">
          {article.readTimeMins} min
        </span>
      </div>

      {/* Title */}
      <h2 className="font-serif text-lg font-medium leading-snug text-warm-900 transition-colors group-hover:text-warm-700">
        {article.title}
      </h2>

      {/* Excerpt */}
      <p className="mt-1.5 text-sm leading-relaxed text-warm-500">
        {article.excerpt}
      </p>

      {/* Read arrow */}
      <div className="mt-3 flex items-center gap-1 text-xs font-medium text-warm-400 transition-colors group-hover:text-warm-600">
        Read
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4.5 2.5L8 6L4.5 9.5" />
        </svg>
      </div>
    </Link>
  );
}
