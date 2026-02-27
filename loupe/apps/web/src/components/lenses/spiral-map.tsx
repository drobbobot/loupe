"use client";

// ─────────────────────────────────────────────────────────────────────────────
// SpiralMap — Full-screen 3D glassmorphic helix visualisation
//
// Design features:
//   - Full-screen immersive SVG between NavHeader and BottomNav
//   - Glassmorphic ellipse nodes with backdrop blur, gradient fills, drop shadows
//   - 3D perspective: nodes + path narrower at top (Beige), wider at bottom (Turquoise)
//   - Internal/external direction indicators (left = inward, right = outward)
//   - Background depth with radial gradient vignette
//   - Segmented path with tapered stroke width for 3D helix illusion
//   - Framer Motion: sequential path draw + staggered node entrance
//
// Implementation:
//   - Pure SVG + React (no D3)
//   - foreignObject + backdrop-filter for glassmorphic blur
//   - Framer Motion for all animations
//   - Responsive: viewBox scales to fill container
// ─────────────────────────────────────────────────────────────────────────────

import { motion } from "framer-motion";
import Link from "next/link";
import { LENS_COLORS, type LensSlug } from "@loupe/types";

interface SpiralMapProps {
  primaryLens?: LensSlug | null;
  secondaryLens?: LensSlug | null;
}

// ── Layout ──────────────────────────────────────────────────────────────────

const VIEW_W = 420;
const VIEW_H = 720;
const PAD_X = 50;
const PAD_Y = 60;

// Each node: normalized x/y (0→1), base ellipse radii, perspective scale
const NODE_LAYOUT: Record<
  LensSlug,
  { x: number; y: number; rx: number; ry: number; scale: number }
> = {
  beige:     { x: 0.34, y: 0.04, rx: 40, ry: 17, scale: 0.58 },
  purple:    { x: 0.69, y: 0.15, rx: 42, ry: 18, scale: 0.65 },
  red:       { x: 0.28, y: 0.26, rx: 45, ry: 19, scale: 0.72 },
  blue:      { x: 0.74, y: 0.37, rx: 48, ry: 20, scale: 0.78 },
  orange:    { x: 0.25, y: 0.48, rx: 50, ry: 21, scale: 0.84 },
  green:     { x: 0.76, y: 0.59, rx: 53, ry: 22, scale: 0.90 },
  yellow:    { x: 0.50, y: 0.73, rx: 56, ry: 24, scale: 0.95 },
  turquoise: { x: 0.50, y: 0.89, rx: 60, ry: 26, scale: 1.00 },
};

const LENS_NAMES: Record<LensSlug, string> = {
  beige: "Beige", purple: "Purple", red: "Red", blue: "Blue",
  orange: "Orange", green: "Green", yellow: "Yellow", turquoise: "Turquoise",
};

const LENSES_ORDERED: LensSlug[] = [
  "beige", "purple", "red", "blue", "orange", "green", "yellow", "turquoise",
];

// Me / We / Everybody zone bands
const GROUP_ZONES = [
  { label: "Me",        y1: 0,    y2: 0.33 },
  { label: "We",        y1: 0.33, y2: 0.55 },
  { label: "Everybody", y1: 0.55, y2: 1.0  },
];

// ── Helpers ─────────────────────────────────────────────────────────────────

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function toSVG(nx: number, ny: number) {
  return {
    x: PAD_X + nx * (VIEW_W - PAD_X * 2),
    y: PAD_Y + ny * (VIEW_H - PAD_Y * 2),
  };
}

// ── Component ───────────────────────────────────────────────────────────────

export function SpiralMap({ primaryLens, secondaryLens }: SpiralMapProps) {
  // Pre-compute node positions and sizes
  const nodes = LENSES_ORDERED.map((slug) => {
    const layout = NODE_LAYOUT[slug];
    const pos = toSVG(layout.x, layout.y);
    const rx = layout.rx * layout.scale;
    const ry = layout.ry * layout.scale;
    return { slug, pos, rx, ry, scale: layout.scale };
  });

  // Build path segments between consecutive nodes
  const segments: Array<{
    d: string;
    strokeW: number;
    highlightW: number;
  }> = [];

  for (let i = 0; i < nodes.length - 1; i++) {
    const a = nodes[i];
    const b = nodes[i + 1];
    // Control point: biased toward the "from" node's x for smooth S-curves
    const cpx = (a.pos.x * 0.6 + b.pos.x * 0.4);
    const cpy = (a.pos.y + b.pos.y) / 2;
    const d = `M ${a.pos.x} ${a.pos.y} Q ${cpx} ${cpy}, ${b.pos.x} ${b.pos.y}`;
    const t = (a.pos.y + b.pos.y) / 2 / VIEW_H;
    segments.push({
      d,
      strokeW: lerp(1.5, 5.5, t),
      highlightW: lerp(0.5, 2, t),
    });
  }

  const centerX = VIEW_W / 2;

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
          {/* Background radial gradient — subtle vignette for depth */}
          <radialGradient id="bg-depth" cx="0.5" cy="0.55" r="0.65" fx="0.5" fy="0.5">
            <stop offset="0%" stopColor="#FAF8F5" stopOpacity="1" />
            <stop offset="70%" stopColor="#F5F1EB" stopOpacity="1" />
            <stop offset="100%" stopColor="#EDE8DF" stopOpacity="1" />
          </radialGradient>

          {/* Per-lens defs: fill gradient, stroke gradient, drop shadow */}
          {LENSES_ORDERED.map((slug) => {
            const c = LENS_COLORS[slug];
            return (
              <g key={`defs-${slug}`}>
                {/* Fill: lens color at 30% → dark shade at 40% */}
                <linearGradient id={`fill-${slug}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={c.DEFAULT} stopOpacity="0.30" />
                  <stop offset="100%" stopColor={c.text} stopOpacity="0.40" />
                </linearGradient>

                {/* Stroke: lens color → white → dark */}
                <linearGradient id={`stroke-${slug}`} x1="0.3" y1="0" x2="0.7" y2="1">
                  <stop offset="0%" stopColor={c.DEFAULT} />
                  <stop offset="50%" stopColor="#FFFFFF" />
                  <stop offset="71%" stopColor={c.text} />
                </linearGradient>

                {/* Drop shadow */}
                <filter
                  id={`shadow-${slug}`}
                  x="-25%" y="-30%"
                  width="150%" height="180%"
                  colorInterpolationFilters="sRGB"
                >
                  <feDropShadow
                    dx="0" dy="3"
                    stdDeviation="6"
                    floodColor="#000000"
                    floodOpacity="0.08"
                  />
                </filter>
              </g>
            );
          })}
        </defs>

        {/* Background is handled by CSS radial gradient on parent container */}

        {/* Zone bands with soft fills */}
        {GROUP_ZONES.map((zone, i) => {
          const y1 = zone.y1 * VIEW_H;
          const y2 = zone.y2 * VIEW_H;
          return (
            <g key={zone.label}>
              {/* Subtle alternating background tone */}
              {i === 1 && (
                <rect
                  x={0} y={y1}
                  width={VIEW_W} height={y2 - y1}
                  fill="#F5F1EB"
                  opacity={0.35}
                />
              )}
              {/* Zone divider line */}
              {zone.y1 > 0 && (
                <line
                  x1={PAD_X + 20} y1={y1}
                  x2={VIEW_W - PAD_X - 20} y2={y1}
                  stroke="#D6D0C7"
                  strokeWidth="0.5"
                  opacity="0.35"
                />
              )}
              {/* Zone label — right edge */}
              <text
                x={VIEW_W - 12}
                y={y1 + 16}
                textAnchor="end"
                fill="#B8B0A5"
                fontSize="8"
                fontFamily="system-ui, sans-serif"
                letterSpacing="0.12em"
                opacity="0.6"
              >
                {zone.label.toUpperCase()}
              </text>
            </g>
          );
        })}

        {/* Centre axis — dashed vertical line */}
        <line
          x1={centerX} y1={PAD_Y - 10}
          x2={centerX} y2={VIEW_H - PAD_Y + 10}
          stroke="#D6D0C7"
          strokeWidth="0.8"
          strokeDasharray="3 8"
          opacity="0.25"
        />

        {/* Direction labels */}
        <text
          x={PAD_X + 12}
          y={PAD_Y - 16}
          fill="#B8B0A5"
          fontSize="8.5"
          fontFamily="system-ui, sans-serif"
          letterSpacing="0.15em"
          opacity="0.5"
        >
          INTERNAL
        </text>
        <text
          x={VIEW_W - PAD_X - 12}
          y={PAD_Y - 16}
          textAnchor="end"
          fill="#B8B0A5"
          fontSize="8.5"
          fontFamily="system-ui, sans-serif"
          letterSpacing="0.15em"
          opacity="0.5"
        >
          EXTERNAL
        </text>

        {/* Small directional arrows beside labels */}
        <path
          d={`M ${PAD_X + 8} ${PAD_Y - 20} l -5 3 l 5 3`}
          fill="none" stroke="#B8B0A5" strokeWidth="1" opacity="0.4"
          strokeLinecap="round" strokeLinejoin="round"
        />
        <path
          d={`M ${VIEW_W - PAD_X - 8} ${PAD_Y - 20} l 5 3 l -5 3`}
          fill="none" stroke="#B8B0A5" strokeWidth="1" opacity="0.4"
          strokeLinecap="round" strokeLinejoin="round"
        />

        {/* ── 3D Spiral Path (segmented, tapered) ─────────────── */}
        {segments.map((seg, i) => (
          <g key={`seg-${i}`}>
            {/* Main stroke — warm muted, width tapers with perspective */}
            <motion.path
              d={seg.d}
              fill="none"
              stroke="#D6D0C7"
              strokeWidth={seg.strokeW}
              strokeLinecap="round"
              opacity={0.3}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 0.35,
                delay: 0.3 + i * 0.15,
                ease: "easeOut",
              }}
            />
            {/* Highlight stroke — white, narrow, 3D rim */}
            <motion.path
              d={seg.d}
              fill="none"
              stroke="white"
              strokeWidth={seg.highlightW}
              strokeLinecap="round"
              opacity={0.5}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 0.35,
                delay: 0.35 + i * 0.15,
                ease: "easeOut",
              }}
            />
          </g>
        ))}

        {/* ── Lens Nodes ─────────────────────────────────────────── */}
        {nodes.map(({ slug, pos, rx, ry }, index) => {
          const color = LENS_COLORS[slug];
          const isPrimary = primaryLens === slug;
          const isSecondary = secondaryLens === slug;

          // Slightly enlarge primary/secondary
          const finalRx = isPrimary ? rx * 1.15 : isSecondary ? rx * 1.05 : rx;
          const finalRy = isPrimary ? ry * 1.15 : isSecondary ? ry * 1.05 : ry;

          // Font size scales with node size
          const fontSize = Math.round(8 + (finalRx / 60) * 5);

          return (
            <Link key={slug} href={`/lenses/${slug}`}>
              <motion.g
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.45,
                  delay: 0.5 + index * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
              >
                {/* Pulse ring for primary lens */}
                {isPrimary && (
                  <ellipse
                    cx={pos.x}
                    cy={pos.y}
                    rx={finalRx + 8}
                    ry={finalRy + 5}
                    fill="none"
                    stroke={color.DEFAULT}
                    strokeWidth={1.5}
                    opacity={0.25}
                    className="animate-lens-pulse"
                  />
                )}

                {/* Backdrop blur layer — glassmorphic effect */}
                <foreignObject
                  x={pos.x - finalRx - 2}
                  y={pos.y - finalRy - 2}
                  width={(finalRx + 2) * 2}
                  height={(finalRy + 2) * 2}
                >
                  <div
                    // @ts-expect-error xmlns required for foreignObject HTML
                    xmlns="http://www.w3.org/1999/xhtml"
                    style={{
                      width: "100%",
                      height: "100%",
                      backdropFilter: "blur(12px)",
                      WebkitBackdropFilter: "blur(12px)",
                      clipPath: "ellipse(50% 50% at 50% 50%)",
                    }}
                  />
                </foreignObject>

                {/* Main ellipse: gradient fill + gradient stroke + drop shadow */}
                <motion.ellipse
                  cx={pos.x}
                  cy={pos.y}
                  rx={finalRx}
                  ry={finalRy}
                  fill={`url(#fill-${slug})`}
                  stroke={`url(#stroke-${slug})`}
                  strokeWidth={1}
                  strokeOpacity={0.2}
                  filter={`url(#shadow-${slug})`}
                  style={{ cursor: "pointer" }}
                  whileHover={{ scaleX: 1.08, scaleY: 1.08 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />

                {/* Lens name — centred on ellipse */}
                <text
                  x={pos.x}
                  y={pos.y + 1}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={color.text}
                  fontSize={fontSize}
                  fontFamily="system-ui, sans-serif"
                  fontWeight={isPrimary ? "600" : "500"}
                  style={{ pointerEvents: "none" }}
                  opacity={isPrimary ? 1 : 0.85}
                >
                  {LENS_NAMES[slug]}
                </text>

                {/* "You" badge below primary lens */}
                {isPrimary && (
                  <g>
                    <rect
                      x={pos.x - 15}
                      y={pos.y + finalRy + 5}
                      width={30}
                      height={14}
                      rx={7}
                      fill={color.DEFAULT}
                    />
                    <text
                      x={pos.x}
                      y={pos.y + finalRy + 13}
                      textAnchor="middle"
                      fill="white"
                      fontSize="7"
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
                    cx={pos.x + finalRx - 2}
                    cy={pos.y - finalRy + 2}
                    r={5}
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
