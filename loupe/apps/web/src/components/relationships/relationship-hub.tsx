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
import { LensGem } from "@/components/ui/lens-gem";

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
      <div className="mx-auto mt-8 w-full max-w-md flex-1 space-y-8">
        {/* My Lens */}
        <div>
          <label id="my-lens-label" className="mb-3 block text-center text-xs font-medium uppercase tracking-wider text-warm-400">
            {userPrimaryLens ? "Your lens" : "First lens"}
          </label>
          <div className="flex flex-wrap justify-center gap-3" role="radiogroup" aria-labelledby="my-lens-label">
            {ALL_LENSES.map(({ slug, name }) => {
              const colors = LENS_COLORS[slug];
              const selected = myLens === slug;
              const isYou = userPrimaryLens === slug;
              return (
                <button
                  key={slug}
                  onClick={() => setMyLens(slug)}
                  role="radio"
                  aria-checked={selected}
                  aria-label={name + (isYou ? " (you)" : "")}
                  className="relative transition-all"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    backgroundColor: colors.DEFAULT,
                    opacity: selected ? 1 : 0.35,
                    transform: selected ? "scale(1.18)" : "scale(1)",
                    boxShadow: selected ? `0 0 0 3px white, 0 0 0 5px ${colors.DEFAULT}` : "none",
                  }}
                >
                  {isYou && !selected && (
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-warm-900 text-[8px] font-bold text-cream"
                    >
                      ·
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Their Lens */}
        <div>
          <label id="their-lens-label" className="mb-3 block text-center text-xs font-medium uppercase tracking-wider text-warm-400">
            {userPrimaryLens ? "Their lens" : "Second lens"}
          </label>
          <div className="flex flex-wrap justify-center gap-3" role="radiogroup" aria-labelledby="their-lens-label">
            {ALL_LENSES.map(({ slug, name }) => {
              const colors = LENS_COLORS[slug];
              const selected = theirLens === slug;
              return (
                <button
                  key={slug}
                  onClick={() => setTheirLens(slug)}
                  role="radio"
                  aria-checked={selected}
                  aria-label={name}
                  className="transition-all"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    backgroundColor: colors.DEFAULT,
                    opacity: selected ? 1 : 0.35,
                    transform: selected ? "scale(1.18)" : "scale(1)",
                    boxShadow: selected ? `0 0 0 3px white, 0 0 0 5px ${colors.DEFAULT}` : "none",
                  }}
                />
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
            >
              <PairPreview myLens={myLens} theirLens={theirLens} />
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

// ── Pair preview — two overlapping gems with a gradient fade between colours ──

function PairPreview({ myLens, theirLens }: { myLens: LensSlug; theirLens: LensSlug }) {
  const colA = LENS_COLORS[myLens].DEFAULT;
  const colB = LENS_COLORS[theirLens].DEFAULT;
  const nameA = ALL_LENSES.find((l) => l.slug === myLens)?.name ?? myLens;
  const nameB = ALL_LENSES.find((l) => l.slug === theirLens)?.name ?? theirLens;

  // Gem size and overlap amount
  const gemSize = 72;
  const overlap = gemSize * 0.28; // ~28% overlap

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Gradient pill behind the gems */}
      <div
        className="relative flex items-center justify-center rounded-2xl px-6 py-5"
        style={{
          background: `linear-gradient(135deg, ${colA}18 0%, ${colB}18 100%)`,
          border: `1px solid rgba(255,255,255,0.5)`,
        }}
      >
        {/* Two gems, second shifted left to overlap */}
        <div className="flex items-center" style={{ gap: -overlap }}>
          <div style={{ zIndex: 2 }}>
            <LensGem slug={myLens} size={gemSize} />
          </div>
          <div style={{ zIndex: 1, marginLeft: -overlap }}>
            <LensGem slug={theirLens} size={gemSize} />
          </div>
        </div>
      </div>

      {/* Names */}
      <p className="text-sm font-medium text-warm-700">
        {nameA}
        <span className="mx-1.5 text-warm-300">&amp;</span>
        {nameB}
      </p>
    </div>
  );
}
