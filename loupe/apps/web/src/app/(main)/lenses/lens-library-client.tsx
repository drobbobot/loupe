"use client";

// ─────────────────────────────────────────────────────────────────────────────
// LensLibraryClient — Client component for the /lenses page
//
// Spiral view: full-screen immersive 3D spiral map between nav bars
// List view: grouped lens cards (Me / We / Everybody)
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SpiralMap } from "@/components/lenses/spiral-map";
import { LensCard } from "@/components/lenses/lens-card";
import type { LensSlug } from "@loupe/types";

interface LensLibraryClientProps {
  lenses: Array<{
    slug: LensSlug;
    colourHex: string;
    displayName: string;
    tagline: string;
    group: "me" | "we" | "everybody";
    inwardOutward: "inward" | "outward" | "integrating";
  }>;
  primaryLens: LensSlug | null;
  secondaryLens: LensSlug | null;
  groupIntros: Record<string, { title: string; description: string }>;
}

type ViewMode = "spiral" | "list";

export function LensLibraryClient({
  lenses,
  primaryLens,
  secondaryLens,
  groupIntros,
}: LensLibraryClientProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("spiral");

  // Group lenses for list view
  const groups = [
    { key: "me", lenses: lenses.filter((l) => l.group === "me") },
    { key: "we", lenses: lenses.filter((l) => l.group === "we") },
    { key: "everybody", lenses: lenses.filter((l) => l.group === "everybody") },
  ];

  // Shared toggle component
  const viewToggle = (
    <div className="flex rounded-full border border-warm-200/80 bg-cream/90 p-0.5 backdrop-blur-sm">
      <button
        onClick={() => setViewMode("spiral")}
        className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
          viewMode === "spiral"
            ? "bg-warm-900 text-warm-50"
            : "text-warm-500 hover:text-warm-700"
        }`}
      >
        Spiral
      </button>
      <button
        onClick={() => setViewMode("list")}
        className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
          viewMode === "list"
            ? "bg-warm-900 text-warm-50"
            : "text-warm-500 hover:text-warm-700"
        }`}
      >
        List
      </button>
    </div>
  );

  return (
    <main>
      <AnimatePresence mode="wait">
        {viewMode === "spiral" ? (
          <motion.div
            key="spiral"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative overflow-hidden"
            style={{
              height: "calc(100dvh - 3.5rem - 4rem)",
              background: "radial-gradient(ellipse 65% 55% at 50% 55%, #FAF8F5 0%, #F5F1EB 70%, #EDE8DF 100%)",
            }}
          >
            {/* Floating toggle overlay */}
            <div className="absolute left-1/2 top-3 z-10 -translate-x-1/2">
              {viewToggle}
            </div>

            {/* Full-screen spiral */}
            <SpiralMap
              primaryLens={primaryLens}
              secondaryLens={secondaryLens}
            />
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="pb-24 pt-4"
          >
            {/* Page header — only in list view */}
            <div className="px-6 text-center">
              <h1 className="font-serif text-2xl font-medium text-warm-900">
                The Lenses
              </h1>
              <p className="mt-2 text-sm text-warm-500">
                Eight ways of seeing the world. None better, all real.
              </p>
            </div>

            {/* Toggle */}
            <div className="mt-5 flex justify-center">{viewToggle}</div>

            {/* Grouped list */}
            <div className="mx-auto mt-6 max-w-lg space-y-8 px-6">
              {groups.map((group) => {
                const intro = groupIntros[group.key];
                return (
                  <div key={group.key}>
                    <div className="mb-3">
                      <h2 className="font-serif text-lg font-medium text-warm-800">
                        {intro?.title}
                      </h2>
                      <p className="mt-0.5 text-sm text-warm-400">
                        {intro?.description}
                      </p>
                    </div>
                    <div className="space-y-2">
                      {group.lenses.map((lens, index) => (
                        <LensCard
                          key={lens.slug}
                          slug={lens.slug}
                          displayName={lens.displayName}
                          tagline={lens.tagline}
                          group={lens.group}
                          isPrimary={primaryLens === lens.slug}
                          isSecondary={secondaryLens === lens.slug}
                          index={index}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
