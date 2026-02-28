"use client";

// ─────────────────────────────────────────────────────────────────────────────
// RelationshipGuide — Full guide display for a lens pair
//
// Sections:
//   1. Hero with both lens colours
//   2. The Dynamic (summary)
//   3. What Each Lens Needs
//   4. Where It Breaks Down (friction)
//   5. What's Possible (genuine connection)
//   6. Scenarios (close / work / civic tabs)
//
// Template-quality guides get a subtle caveat banner.
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import type { LensSlug } from "@loupe/types";
import type { RelationshipSeed } from "@/lib/relationship-data";
import { LensGem } from "@/components/ui/lens-gem";

interface LensInfo {
  slug: LensSlug;
  name: string;
  colors: { DEFAULT: string; bg: string; text: string };
}

interface RelationshipGuideProps {
  guide: RelationshipSeed;
  infoA: LensInfo;
  infoB: LensInfo;
  myLens: LensSlug | null;
}

type Scenario = "close" | "work" | "civic";

const SCENARIO_META: Record<Scenario, { label: string; icon: React.ReactNode }> = {
  close: {
    label: "Close",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 14S2 10 2 6.5C2 4.01 4.01 2 6.5 2C7.4 2 8.24 2.32 8.9 2.84L8 3.5L7.1 2.84C7.76 2.32 8.6 2 9.5 2C11.99 2 14 4.01 14 6.5C14 10 8 14 8 14Z" />
      </svg>
    ),
  },
  work: {
    label: "Work",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="12" height="9" rx="1" />
        <path d="M5 5V3.5C5 2.67 5.67 2 6.5 2H9.5C10.33 2 11 2.67 11 3.5V5" />
      </svg>
    ),
  },
  civic: {
    label: "Civic",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 1L14 5V7H2V5L8 1Z" />
        <path d="M3 7V13" /><path d="M6 7V13" /><path d="M10 7V13" /><path d="M13 7V13" />
        <path d="M1 13H15" />
      </svg>
    ),
  },
};

export function RelationshipGuide({
  guide,
  infoA,
  infoB,
  myLens,
}: RelationshipGuideProps) {
  const [scenario, setScenario] = useState<Scenario>("close");

  const scenarioContent: Record<Scenario, string> = {
    close: guide.scenarioClose,
    work: guide.scenarioWork,
    civic: guide.scenarioCivic,
  };

  const isSameLens = guide.lensA === guide.lensB;

  return (
    <main className="pb-24">
      {/* ── Hero — overlapping LensGems with gradient band ────────────── */}
      <div className="relative overflow-hidden pb-4">
        {/* Gradient colour band behind the gems */}
        <div
          className="absolute inset-x-0 top-0 h-56"
          style={{
            background: `linear-gradient(135deg, ${infoA.colors.DEFAULT}18 0%, ${infoB.colors.DEFAULT}18 100%)`,
          }}
        />

        {/* LensGem pair — overlapping Venn-style */}
        <div className="relative flex flex-col items-center pt-8">
          <div className="flex items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <LensGem slug={infoA.slug} size={120} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ marginLeft: -32 }}
            >
              <LensGem slug={infoB.slug} size={120} />
            </motion.div>
          </div>

          <h1 className="mt-4 font-serif text-2xl font-medium text-warm-900">
            {isSameLens
              ? `Two ${infoA.name} Lenses`
              : `${infoA.name} & ${infoB.name}`}
          </h1>
          {myLens && (
            <p className="mt-1 text-xs text-warm-400">
              You are {infoA.slug === myLens ? infoA.name : infoB.name}
            </p>
          )}
        </div>
      </div>

      {/* Template quality caveat */}
      {guide.quality === "template" && (
        <div className="mx-6 mt-4 rounded-xl border border-warm-200/60 bg-warm-100/50 px-4 py-3 text-center text-xs leading-relaxed text-warm-500">
          This guide is generated from Spiral Dynamics framework logic.
          Priority relationship guides receive deeper, individually authored content.
        </div>
      )}

      {/* ── Back link ──────────────────────────────────────────────────── */}
      <div className="px-6 pt-4">
        <Link
          href="/relationships"
          className="inline-flex items-center gap-1.5 text-sm text-warm-400 transition-colors hover:text-warm-600"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8.5 3L4.5 7L8.5 11" />
          </svg>
          All relationships
        </Link>
      </div>

      <div className="mx-auto max-w-lg px-6">
        {/* ── The Dynamic ────────────────────────────────────────────── */}
        <Section title="The Dynamic" delay={0.1}>
          <p className="text-sm leading-relaxed text-warm-700">
            {guide.dynamicSummary}
          </p>
        </Section>

        {/* ── What Each Needs ────────────────────────────────────────── */}
        <Section title="What Each Lens Needs" delay={0.2}>
          <NeedsCard
            lensName={infoA.name}
            color={infoA.colors.DEFAULT}
            bgColor={infoA.colors.bg}
            content={guide.lensANeeds}
            isMyLens={myLens === infoA.slug}
          />
          <NeedsCard
            lensName={isSameLens ? `The other ${infoB.name}` : infoB.name}
            color={infoB.colors.DEFAULT}
            bgColor={infoB.colors.bg}
            content={guide.lensBNeeds}
            isMyLens={myLens === infoB.slug && !isSameLens}
          />
        </Section>

        {/* ── Friction ───────────────────────────────────────────────── */}
        <Section title="Where It Breaks Down" delay={0.3}>
          <div className="rounded-xl border border-warm-200/60 bg-white/50 p-4">
            <p className="text-sm leading-relaxed text-warm-700">
              {guide.frictionPoints}
            </p>
          </div>
        </Section>

        {/* ── Genuine Connection ──────────────────────────────────────── */}
        <Section title="What's Possible" delay={0.4}>
          <div className="rounded-xl border border-warm-200/40 p-4" style={{ backgroundColor: `${infoA.colors.bg}80` }}>
            <p className="text-sm leading-relaxed text-warm-700">
              {guide.genuineConnection}
            </p>
          </div>
        </Section>

        {/* ── Scenarios ──────────────────────────────────────────────── */}
        <Section title="In Context" delay={0.5}>
          {/* Scenario tabs */}
          <div className="mb-4 flex gap-1 rounded-full border border-warm-200/60 bg-white/60 p-0.5">
            {(["close", "work", "civic"] as Scenario[]).map((s) => {
              const meta = SCENARIO_META[s];
              const active = scenario === s;
              return (
                <button
                  key={s}
                  onClick={() => setScenario(s)}
                  className={`relative flex flex-1 items-center justify-center gap-1.5 rounded-full px-3 py-2 text-xs font-medium transition-all ${
                    active
                      ? "bg-warm-900 text-warm-50"
                      : "text-warm-500 hover:text-warm-700"
                  }`}
                >
                  {meta.icon}
                  {meta.label}
                </button>
              );
            })}
          </div>

          {/* Scenario content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={scenario}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="rounded-xl border border-warm-200/40 bg-white/40 p-4"
            >
              <p className="text-sm leading-relaxed text-warm-700">
                {scenarioContent[scenario]}
              </p>
            </motion.div>
          </AnimatePresence>
        </Section>

        {/* ── Lens links ─────────────────────────────────────────────── */}
        <div className="mt-8 flex gap-3">
          <Link
            href={`/lenses/${infoA.slug}`}
            className="flex-1 rounded-xl border border-warm-200/60 bg-white/50 px-4 py-3 text-center text-sm font-medium transition-colors hover:bg-white/80"
            style={{ color: infoA.colors.text }}
          >
            Explore {infoA.name}
          </Link>
          {!isSameLens && (
            <Link
              href={`/lenses/${infoB.slug}`}
              className="flex-1 rounded-xl border border-warm-200/60 bg-white/50 px-4 py-3 text-center text-sm font-medium transition-colors hover:bg-white/80"
              style={{ color: infoB.colors.text }}
            >
              Explore {infoB.name}
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}

// ── Section wrapper ─────────────────────────────────────────────────────────

function Section({
  title,
  delay,
  children,
}: {
  title: string;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      className="mt-8"
    >
      <h2 className="mb-3 font-serif text-lg font-medium text-warm-900">
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </motion.section>
  );
}

// ── Needs card ──────────────────────────────────────────────────────────────

function NeedsCard({
  lensName,
  color,
  bgColor,
  content,
  isMyLens,
}: {
  lensName: string;
  color: string;
  bgColor: string;
  content: string;
  isMyLens: boolean;
}) {
  return (
    <div
      className="rounded-xl border p-4"
      style={{
        borderColor: color + "20",
        backgroundColor: bgColor + "60",
      }}
    >
      <div className="mb-2 flex items-center gap-2">
        <div
          className="h-3 w-3 rounded-full"
          style={{ backgroundColor: color }}
        />
        <span className="text-xs font-semibold" style={{ color }}>
          What {lensName} needs
          {isMyLens && <span className="ml-1 text-warm-400">(you)</span>}
        </span>
      </div>
      <p className="text-sm leading-relaxed text-warm-700">{content}</p>
    </div>
  );
}

// ── Lens dot ────────────────────────────────────────────────────────────────

function LensDot({ color, name }: { color: string; name: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="h-10 w-10 rounded-full shadow-md"
        style={{ backgroundColor: color }}
      />
      <span className="text-xs font-medium text-warm-600">{name}</span>
    </div>
  );
}
