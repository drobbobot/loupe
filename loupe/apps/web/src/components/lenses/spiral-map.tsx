"use client";

// ─────────────────────────────────────────────────────────────────────────────
// SpiralMap — True outward-spiral visualisation (matching Figma design)
//
// Design features:
//   - True expanding spiral path: nodes grow from Beige (smallest, center)
//     to Turquoise (largest, outer edge)
//   - Glassmorphic double-ellipse nodes with backdrop blur and depth shadow
//   - Animated spiral path draw + looping "traveling light" flow overlay
//   - Centre dashed line separating Internal / External
//   - Full-screen immersive SVG between NavHeader and BottomNav
//
// The spiral path and node coordinates are extracted directly from the
// Figma design (Frame 93.svg) for pixel-accurate reproduction.
// ─────────────────────────────────────────────────────────────────────────────

import { motion } from "framer-motion";
import Link from "next/link";
import { LENS_COLORS, type LensSlug } from "@loupe/types";

interface SpiralMapProps {
  primaryLens?: LensSlug | null;
  secondaryLens?: LensSlug | null;
}

// ── Layout ──────────────────────────────────────────────────────────────────

const VIEW_W = 1032;
const VIEW_H = 1178;

// The true outward spiral path — extracted from the Figma design (Frame 93.svg)
const SPIRAL_PATH =
  "M474 583.5C464.086 546.5 522.5 526 558.5 567C594.5 608 566.5 724.5 444.5 699C322 655.5 340 506 414 462.5C510 384.5 724.5 454.5 685 663.5C650.738 872.729 259.349 886.41 237.5 592.5C228.291 311.869 557.841 234.468 707.5 378C857.159 521.532 834.381 726.745 707.5 850C549.435 1007.55 218.16 937.313 146.5 713.5C64.6075 499.056 182.006 252.028 439 201.5C787.5 155 974.5 479.5 926 691.5C877.5 903.5 704.5 1121.5 314.5 1036";

// Node positions and sizes from the Figma design — extracted from the ellipse
// elements in Frame 93.svg. Each node has a shadow ellipse (offset +shadowDy)
// and a main ellipse. Nodes grow progressively from Beige (center) outward.
const NODE_LAYOUT: Record<
  LensSlug,
  { cx: number; cy: number; rx: number; ry: number; shadowDy: number }
> = {
  beige:     { cx: 474, cy: 582.843, rx: 20,     ry: 19.843, shadowDy: 2.314 },
  purple:    { cx: 562, cy: 646.611, rx: 24,     ry: 23.811, shadowDy: 2.778 },
  red:       { cx: 370, cy: 518.333, rx: 28.8,   ry: 28.573, shadowDy: 3.334 },
  blue:      { cx: 666, cy: 710,     rx: 34.56,  ry: 34.288, shadowDy: 4.0   },
  orange:    { cx: 250, cy: 477.6,   rx: 41.472, ry: 41.146, shadowDy: 4.8   },
  green:     { cx: 786, cy: 725.12,  rx: 49.764, ry: 49.372, shadowDy: 5.76  },
  yellow:    { cx: 114, cy: 476.544, rx: 59.718, ry: 59.248, shadowDy: 6.912 },
  turquoise: { cx: 922, cy: 699.852, rx: 71.664, ry: 71.1,   shadowDy: 8.295 },
};

const LENSES_ORDERED: LensSlug[] = [
  "beige", "purple", "red", "blue", "orange", "green", "yellow", "turquoise",
];

// ── Component ───────────────────────────────────────────────────────────────

export function SpiralMap({ primaryLens, secondaryLens }: SpiralMapProps) {
  return (
    <div className="h-full w-full">
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className="h-full w-full"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Spiral map of the eight developmental lenses"
      >
        {/* ── Defs ───────────────────────────────────────────────── */}
        <defs>
          {LENSES_ORDERED.map((slug) => {
            const c = LENS_COLORS[slug];
            const node = NODE_LAYOUT[slug];
            return (
              <g key={`defs-${slug}`}>
                {/* Stroke gradient: lens color → white → lens color (Figma pattern) */}
                <linearGradient id={`stroke-${slug}`} x1="0.3" y1="0" x2="0.7" y2="1">
                  <stop offset="0%" stopColor={c.DEFAULT} />
                  <stop offset="50%" stopColor="#FFFFFF" />
                  <stop offset="71.15%" stopColor={c.DEFAULT} />
                </linearGradient>

                {/* Drop shadow filter — scaled to node size */}
                <filter
                  id={`shadow-${slug}`}
                  x="-30%" y="-30%"
                  width="160%" height="180%"
                  colorInterpolationFilters="sRGB"
                >
                  <feDropShadow
                    dx="0"
                    dy={node.shadowDy}
                    stdDeviation={node.rx * 0.4}
                    floodColor="#000000"
                    floodOpacity="0.08"
                  />
                </filter>
              </g>
            );
          })}
        </defs>

        {/* ── Centre dashed line ──────────────────────────────────── */}
        <line
          x1={VIEW_W / 2}
          y1={143.5}
          x2={VIEW_W / 2}
          y2={1122}
          stroke="#D6D0C7"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="5 20"
          opacity="0.4"
        />

        {/* ── Spiral path ─────────────────────────────────────────── */}
        <motion.path
          d={SPIRAL_PATH}
          fill="none"
          stroke="#D6D0C7"
          strokeWidth={2.65}
          strokeLinecap="round"
          opacity={0.5}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
        />

        {/* ── Looping flow animation overlays ──────────────────────── */}
        <motion.path
          d={SPIRAL_PATH}
          fill="none"
          stroke="white"
          strokeWidth={3}
          strokeLinecap="round"
          strokeDasharray="12 64"
          opacity={0.25}
          animate={{ strokeDashoffset: [0, -76] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />
        <motion.path
          d={SPIRAL_PATH}
          fill="none"
          stroke="#D6D0C7"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeDasharray="4 96"
          opacity={0.4}
          animate={{ strokeDashoffset: [0, -100] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />

        {/* ── Direction labels at bottom ───────────────────────────── */}
        <text
          x={435}
          y={1098}
          fill="#B8B0A5"
          fontSize="13"
          fontFamily="system-ui, sans-serif"
          letterSpacing="0.12em"
        >
          EXTERNAL
        </text>
        <text
          x={540}
          y={1098}
          fill="#B8B0A5"
          fontSize="13"
          fontFamily="system-ui, sans-serif"
          letterSpacing="0.12em"
        >
          INTERNAL
        </text>

        {/* ── Lens Nodes ─────────────────────────────────────────── */}
        {LENSES_ORDERED.map((slug, index) => {
          const node = NODE_LAYOUT[slug];
          const color = LENS_COLORS[slug];
          const isPrimary = primaryLens === slug;
          const isSecondary = secondaryLens === slug;

          // Scale up primary/secondary slightly
          const scale = isPrimary ? 1.12 : isSecondary ? 1.05 : 1;
          const rx = node.rx * scale;
          const ry = node.ry * scale;

          // Blur radius proportional to node size (from Figma)
          const blur = Math.max(4, rx * 0.2);

          // Minimum touch target — invisible hit area for small inner nodes
          const minHitR = 44;
          const hitRx = Math.max(rx + 4, minHitR);
          const hitRy = Math.max(ry + 4, minHitR);

          // Stroke width proportional to node size
          const strokeW = Math.max(1, rx * 0.05);

          return (
            <Link key={slug} href={`/lenses/${slug}`}>
              <motion.g
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 0.8 + index * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{ transformOrigin: `${node.cx}px ${node.cy}px` }}
              >
                {/* Pulse ring for primary lens */}
                {isPrimary && (
                  <ellipse
                    cx={node.cx}
                    cy={node.cy}
                    rx={rx * 1.3}
                    ry={ry * 1.3}
                    fill="none"
                    stroke={color.DEFAULT}
                    strokeWidth={Math.max(1.5, rx * 0.04)}
                    opacity={0.25}
                    className="animate-lens-pulse"
                  />
                )}

                {/* Invisible hit area for touch targets */}
                <ellipse
                  cx={node.cx}
                  cy={node.cy}
                  rx={hitRx}
                  ry={hitRy}
                  fill="transparent"
                  style={{ cursor: "pointer" }}
                />

                {/* ── Shadow ellipse (offset down by shadowDy) ──────── */}
                <foreignObject
                  x={node.cx - rx - 2}
                  y={node.cy + node.shadowDy - ry - 2}
                  width={(rx + 2) * 2}
                  height={(ry + 2) * 2}
                >
                  <div
                    // @ts-expect-error xmlns required for foreignObject HTML
                    xmlns="http://www.w3.org/1999/xhtml"
                    style={{
                      width: "100%",
                      height: "100%",
                      backdropFilter: `blur(${blur}px)`,
                      WebkitBackdropFilter: `blur(${blur}px)`,
                      clipPath: "ellipse(50% 50% at 50% 50%)",
                    }}
                  />
                </foreignObject>
                <ellipse
                  cx={node.cx}
                  cy={node.cy + node.shadowDy}
                  rx={rx}
                  ry={ry}
                  fill={color.DEFAULT}
                  fillOpacity="0.4"
                  stroke={`url(#stroke-${slug})`}
                  strokeWidth={strokeW}
                  strokeOpacity="0.2"
                />

                {/* ── Main ellipse (glassmorphic) ──────────────────── */}
                <foreignObject
                  x={node.cx - rx - 2}
                  y={node.cy - ry - 2}
                  width={(rx + 2) * 2}
                  height={(ry + 2) * 2}
                >
                  <div
                    // @ts-expect-error xmlns required for foreignObject HTML
                    xmlns="http://www.w3.org/1999/xhtml"
                    style={{
                      width: "100%",
                      height: "100%",
                      backdropFilter: `blur(${blur}px)`,
                      WebkitBackdropFilter: `blur(${blur}px)`,
                      clipPath: "ellipse(50% 50% at 50% 50%)",
                    }}
                  />
                </foreignObject>
                <motion.ellipse
                  cx={node.cx}
                  cy={node.cy}
                  rx={rx}
                  ry={ry}
                  fill={color.DEFAULT}
                  fillOpacity="0.4"
                  stroke={`url(#stroke-${slug})`}
                  strokeWidth={strokeW}
                  strokeOpacity="0.2"
                  filter={`url(#shadow-${slug})`}
                  style={{ cursor: "pointer" }}
                  whileHover={{ scaleX: 1.08, scaleY: 1.08 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />

                {/* "You" badge for primary lens */}
                {isPrimary && (
                  <g>
                    <rect
                      x={node.cx - rx * 0.45}
                      y={node.cy + ry + rx * 0.15}
                      width={rx * 0.9}
                      height={Math.max(14, rx * 0.35)}
                      rx={Math.max(7, rx * 0.175)}
                      fill={color.DEFAULT}
                    />
                    <text
                      x={node.cx}
                      y={node.cy + ry + rx * 0.15 + Math.max(14, rx * 0.35) * 0.72}
                      textAnchor="middle"
                      fill="white"
                      fontSize={Math.max(7, rx * 0.17)}
                      fontFamily="system-ui, sans-serif"
                      fontWeight="600"
                      style={{ pointerEvents: "none" }}
                    >
                      You
                    </text>
                  </g>
                )}

                {/* Secondary marker dot */}
                {isSecondary && (
                  <circle
                    cx={node.cx + rx * 0.8}
                    cy={node.cy - ry * 0.8}
                    r={Math.max(5, rx * 0.14)}
                    fill={color.DEFAULT}
                    stroke="white"
                    strokeWidth={1.5}
                  />
                )}
              </motion.g>
            </Link>
          );
        })}
      </svg>
    </div>
  );
}
