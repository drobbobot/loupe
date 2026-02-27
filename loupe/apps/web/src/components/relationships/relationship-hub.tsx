"use client";

// ─────────────────────────────────────────────────────────────────────────────
// RelationshipHub — Lens pair picker
//
// Two-step selector: pick "My lens" and "Their lens", then navigate to the
// dynamic detail page. If the user has an assessment result, their primary
// lens is pre-selected as "My lens."
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { LENS_COLORS, type LensSlug } from "@loupe/types";

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

interface RelationshipHubProps {
  userPrimaryLens: LensSlug | null;
  userSecondaryLens: LensSlug | null;
}

export function RelationshipHub({
  userPrimaryLens,
  userSecondaryLens,
}: RelationshipHubProps) {
  const router = useRouter();
  const [myLens, setMyLens] = useState<LensSlug | null>(userPrimaryLens);
  const [theirLens, setTheirLens] = useState<LensSlug | null>(null);

  function handleExplore() {
    if (!myLens || !theirLens) return;
    // Canonical URL: alphabetically sorted pair
    const [a, b] = [myLens, theirLens].sort();
    router.push(`/relationships/${a}-${b}?my=${myLens}`);
  }

  const canExplore = myLens && theirLens;

  return (
    <main
      className="flex flex-col px-6"
      style={{ height: "calc(100dvh - 3.5rem - 4rem)" }}
    >
      {/* Header */}
      <div className="pt-6 text-center">
        <h1 className="font-serif text-2xl font-medium text-warm-900">
          Navigating Relationships
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-warm-500">
          Pick two lenses to explore how they see each other — where they
          connect, where they clash, and how to bridge the gap.
        </p>
      </div>

      {/* Selector */}
      <div className="mx-auto mt-8 w-full max-w-md flex-1 space-y-6">
        {/* My Lens */}
        <div>
          <label id="my-lens-label" className="mb-2 block text-xs font-medium uppercase tracking-wider text-warm-400">
            {userPrimaryLens ? "Your lens" : "First lens"}
          </label>
          <div className="flex flex-wrap gap-2" role="radiogroup" aria-labelledby="my-lens-label">
            {ALL_LENSES.map(({ slug, name }) => {
              const colors = LENS_COLORS[slug];
              const selected = myLens === slug;
              return (
                <button
                  key={slug}
                  onClick={() => setMyLens(slug)}
                  role="radio"
                  aria-checked={selected}
                  className="relative rounded-full px-4 py-2 text-sm font-medium transition-all"
                  style={{
                    backgroundColor: selected ? colors.DEFAULT : "transparent",
                    color: selected ? "#FFFDF9" : colors.text,
                    border: `1.5px solid ${selected ? colors.DEFAULT : colors.DEFAULT + "40"}`,
                    transform: selected ? "scale(1.05)" : "scale(1)",
                  }}
                >
                  {name}
                  {userPrimaryLens === slug && !selected && (
                    <span aria-hidden="true" className="ml-1 text-xs text-warm-400">(you)</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Their Lens */}
        <div>
          <label id="their-lens-label" className="mb-2 block text-xs font-medium uppercase tracking-wider text-warm-400">
            {userPrimaryLens ? "Their lens" : "Second lens"}
          </label>
          <div className="flex flex-wrap gap-2" role="radiogroup" aria-labelledby="their-lens-label">
            {ALL_LENSES.map(({ slug, name }) => {
              const colors = LENS_COLORS[slug];
              const selected = theirLens === slug;
              return (
                <button
                  key={slug}
                  onClick={() => setTheirLens(slug)}
                  role="radio"
                  aria-checked={selected}
                  className="relative rounded-full px-4 py-2 text-sm font-medium transition-all"
                  style={{
                    backgroundColor: selected ? colors.DEFAULT : "transparent",
                    color: selected ? "#FFFDF9" : colors.text,
                    border: `1.5px solid ${selected ? colors.DEFAULT : colors.DEFAULT + "40"}`,
                    transform: selected ? "scale(1.05)" : "scale(1)",
                  }}
                >
                  {name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected pair preview */}
        <AnimatePresence>
          {myLens && theirLens && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="flex items-center justify-center gap-3 rounded-2xl border border-warm-200/60 bg-white/60 px-5 py-4 backdrop-blur-sm"
            >
              <PairDot slug={myLens} />
              <span className="text-xs font-medium text-warm-400">×</span>
              <PairDot slug={theirLens} />
              <span className="ml-2 text-sm font-medium text-warm-700">
                {ALL_LENSES.find((l) => l.slug === myLens)?.name}
                {" & "}
                {ALL_LENSES.find((l) => l.slug === theirLens)?.name}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* CTA */}
      <div className="pb-6 pt-4 text-center">
        <button
          onClick={handleExplore}
          disabled={!canExplore}
          className="inline-flex items-center justify-center rounded-full bg-warm-900 px-8 py-3.5 text-sm font-medium text-cream transition-all hover:bg-warm-800 active:scale-[0.98] disabled:opacity-30 disabled:hover:bg-warm-900"
        >
          Explore this dynamic
        </button>
      </div>
    </main>
  );
}

// ── Small pair dot ──────────────────────────────────────────────────────────

function PairDot({ slug }: { slug: LensSlug }) {
  const colors = LENS_COLORS[slug];
  return (
    <div
      className="h-5 w-5 rounded-full shadow-sm"
      style={{ backgroundColor: colors.DEFAULT }}
    />
  );
}
