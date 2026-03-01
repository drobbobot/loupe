"use client";

// ─────────────────────────────────────────────────────────────────────────────
// DomainMap — Hexagonal radar-style visual showing lens activation per domain
//
// Shows how the user's dominant lens shifts across 6 life domains.
// Each domain vertex shows a coloured dot for the dominant lens and a smaller
// dot for the secondary lens. Clicking a domain expands the narrative.
//
// Design notes:
//   - Warm minimal aesthetic, no gridlines or axis labels
//   - Lens colours used for domain dots
//   - Domain labels sit outside the hex
//   - Narrative expands inline on tap/click
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type {
  DeepAssessmentResult,
  DomainLensProfile,
  LifeDomain,
  LensSlug,
} from "@loupe/types";
import { LENS_COLORS, DOMAIN_LABELS, LIFE_DOMAINS } from "@loupe/types";

interface DomainMapProps {
  result: DeepAssessmentResult;
}

// Hex vertex positions (6 domains arranged in a hexagon)
// Centre at (150, 150), radius 110
const HEX_RADIUS = 110;
const CX = 150;
const CY = 150;

function hexVertex(index: number, radius: number = HEX_RADIUS): [number, number] {
  // Start from top (-90°), go clockwise
  const angle = (Math.PI / 3) * index - Math.PI / 2;
  return [
    CX + radius * Math.cos(angle),
    CY + radius * Math.sin(angle),
  ];
}

// Label positions — slightly further out
type TextAnchor = "start" | "middle" | "end";

function labelPos(index: number): { x: number; y: number; anchor: TextAnchor } {
  const [x, y] = hexVertex(index, HEX_RADIUS + 30);
  // Determine text-anchor based on position
  const angle = (Math.PI / 3) * index - Math.PI / 2;
  const normAngle = ((angle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
  let anchor: TextAnchor = "middle";
  if (normAngle > Math.PI * 0.1 && normAngle < Math.PI * 0.9) anchor = "start";
  if (normAngle > Math.PI * 1.1 && normAngle < Math.PI * 1.9) anchor = "end";
  return { x, y, anchor };
}

const LENS_NAMES: Record<LensSlug, string> = {
  beige: "Beige",
  purple: "Purple",
  red: "Red",
  blue: "Blue",
  orange: "Orange",
  green: "Green",
  yellow: "Yellow",
  turquoise: "Turquoise",
};

export function DomainMap({ result }: DomainMapProps) {
  const [expanded, setExpanded] = useState<LifeDomain | null>(null);

  const profileMap = new Map<LifeDomain, DomainLensProfile>();
  for (const p of result.domainProfiles) {
    profileMap.set(p.domain, p);
  }

  // Build hex path
  const hexPoints = LIFE_DOMAINS.map((_, i) => hexVertex(i));
  const hexPath = hexPoints.map(([x, y]) => `${x},${y}`).join(" ");

  return (
    <section className="mx-auto max-w-2xl px-6 py-10">
      <h2 className="font-serif text-2xl font-medium text-warm-900">
        Your lens across life
      </h2>
      <p className="mt-2 text-sm text-warm-500 leading-relaxed">
        Your lens isn&rsquo;t fixed &mdash; it shifts depending on context.
        Tap a domain to see how you show up there.
      </p>

      {/* SVG hex map */}
      <div className="mx-auto mt-8 max-w-xs">
        <svg viewBox="0 0 300 300" className="w-full">
          {/* Hex outline */}
          <polygon
            points={hexPath}
            fill="none"
            stroke="var(--color-warm-200, #E8E2DA)"
            strokeWidth="1"
          />

          {/* Connecting lines from centre to each vertex */}
          {hexPoints.map(([x, y], i) => (
            <line
              key={`line-${i}`}
              x1={CX}
              y1={CY}
              x2={x}
              y2={y}
              stroke="var(--color-warm-200, #E8E2DA)"
              strokeWidth="0.5"
            />
          ))}

          {/* Domain dots + labels */}
          {LIFE_DOMAINS.map((domain, i) => {
            const profile = profileMap.get(domain);
            if (!profile) return null;

            const [vx, vy] = hexVertex(i);
            const lbl = labelPos(i);
            const dominantColor = LENS_COLORS[profile.dominantLens].DEFAULT;
            const secondaryColor = LENS_COLORS[profile.secondaryLens].DEFAULT;
            const isExpanded = expanded === domain;

            return (
              <g
                key={domain}
                onClick={() => setExpanded(isExpanded ? null : domain)}
                className="cursor-pointer"
                role="button"
                tabIndex={0}
                aria-label={`${DOMAIN_LABELS[domain]}: ${LENS_NAMES[profile.dominantLens]}`}
              >
                {/* Secondary lens ring */}
                <circle
                  cx={vx}
                  cy={vy}
                  r={isExpanded ? 16 : 13}
                  fill={secondaryColor}
                  opacity={0.25}
                />
                {/* Dominant lens dot */}
                <circle
                  cx={vx}
                  cy={vy}
                  r={isExpanded ? 11 : 8}
                  fill={dominantColor}
                />
                {/* Domain label */}
                <text
                  x={lbl.x}
                  y={lbl.y}
                  textAnchor={lbl.anchor}
                  className="text-[9px] fill-warm-500"
                  dominantBaseline="central"
                >
                  {DOMAIN_LABELS[domain].split(" & ")[0]}
                </text>
              </g>
            );
          })}

          {/* Centre dot — centre of gravity */}
          <circle
            cx={CX}
            cy={CY}
            r={6}
            fill={LENS_COLORS[result.centreOfGravity].DEFAULT}
          />
          <text
            x={CX}
            y={CY + 16}
            textAnchor="middle"
            className="text-[8px] fill-warm-400"
          >
            centre
          </text>
        </svg>
      </div>

      {/* Expanded domain narrative */}
      <AnimatePresence mode="wait">
        {expanded && (
          <motion.div
            key={expanded}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6 overflow-hidden"
          >
            <div className="rounded-xl border border-warm-200 bg-warm-50/50 p-5">
              <div className="flex items-center gap-3">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{
                    backgroundColor:
                      LENS_COLORS[
                        profileMap.get(expanded)?.dominantLens ?? "blue"
                      ].DEFAULT,
                  }}
                />
                <h3 className="text-sm font-medium text-warm-900">
                  {DOMAIN_LABELS[expanded]}
                </h3>
                <span className="text-xs text-warm-400">
                  {LENS_NAMES[
                    profileMap.get(expanded)?.dominantLens ?? "blue"
                  ]}{" "}
                  lens
                </span>
              </div>
              <p className="mt-3 text-sm text-warm-600 leading-relaxed">
                {result.domainNarratives[expanded]}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
