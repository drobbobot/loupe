"use client";

// ─────────────────────────────────────────────────────────────────────────────
// LensProfileContent — Full content layout for a lens profile page
//
// Renders all content sections from the lens data (seed or Sanity).
// Sections are expandable with the first two open by default.
// ─────────────────────────────────────────────────────────────────────────────

import { motion } from "framer-motion";
import { LensSection } from "./lens-section";
import { InTheWildCards } from "./in-the-wild-cards";
import type { LensProfile } from "@/lib/lens-data";

interface LensProfileContentProps {
  lens: LensProfile;
}

export function LensProfileContent({ lens }: LensProfileContentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.4 }}
      className="mx-auto max-w-2xl space-y-4 px-6 pb-32 pt-8"
    >
      {/* From the inside — open by default */}
      <LensSection title="From the inside" defaultOpen>
        <div className="space-y-4">
          {lens.fromTheInside.split("\n\n").map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </LensSection>

      {/* Values and why — open by default */}
      <LensSection title="What this lens values and why" defaultOpen>
        <p>{lens.valuesAndWhy}</p>
      </LensSection>

      {/* Healthy expression */}
      <LensSection title="Healthy expression">
        <div className="space-y-4">
          {lens.healthyExpression.split("\n\n").map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </LensSection>

      {/* Shadow expression */}
      <LensSection title="Shadow expression">
        <div className="space-y-4">
          {lens.shadowExpression.split("\n\n").map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </LensSection>

      {/* In the wild — horizontal cards */}
      <InTheWildCards examples={lens.inTheWild} />

      {/* How to connect — highlighted variant */}
      <LensSection title="How to connect" variant="highlight">
        <p>{lens.howToConnect}</p>
      </LensSection>

      {/* Depth layer — collapsed by default, distinct style */}
      <LensSection title="Depth layer" variant="depth">
        <div className="space-y-4">
          {lens.depthLayer.split("\n\n").map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </LensSection>
    </motion.div>
  );
}
