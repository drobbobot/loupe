"use client";

import { motion } from "framer-motion";
import { LENS_COLORS } from "@loupe/types";

// 8 Spiral Dynamics lens colors for cycling
const CYCLE_COLORS = [
  LENS_COLORS.beige.DEFAULT,
  LENS_COLORS.purple.DEFAULT,
  LENS_COLORS.red.DEFAULT,
  LENS_COLORS.blue.DEFAULT,
  LENS_COLORS.orange.DEFAULT,
  LENS_COLORS.green.DEFAULT,
  LENS_COLORS.yellow.DEFAULT,
  LENS_COLORS.turquoise.DEFAULT,
];

/** Convert hex to rgba string */
function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

// Build color keyframe arrays (with alpha for glassmorphic look)
const FILL_ALPHA = 0.45;
const colorsA = CYCLE_COLORS.map((c) => hexToRgba(c, FILL_ALPHA));
// Offset lens B by 4 so lenses always show contrasting colors
const colorsB = [...CYCLE_COLORS.slice(4), ...CYCLE_COLORS.slice(0, 4)].map(
  (c) => hexToRgba(c, FILL_ALPHA),
);

// Close the loop so the animation wraps seamlessly
colorsA.push(colorsA[0]);
colorsB.push(colorsB[0]);

// Border colors at lower opacity for the glassmorphic edge
const BORDER_ALPHA = 0.25;
const bordersA = CYCLE_COLORS.map((c) => hexToRgba(c, BORDER_ALPHA));
const bordersB = [...CYCLE_COLORS.slice(4), ...CYCLE_COLORS.slice(0, 4)].map(
  (c) => hexToRgba(c, BORDER_ALPHA),
);
bordersA.push(bordersA[0]);
bordersB.push(bordersB[0]);

const DEFAULT_COLOR = "#006E7C";

interface LoupeLogoProps {
  size?: number;
  animated?: boolean;
}

export function LoupeLogo({ size = 32, animated = false }: LoupeLogoProps) {
  // Lens dimensions relative to container — from Figma proportions
  // SVG viewBox 132×122, each ellipse ~74px diameter in a 132-wide box
  const lensSize = size * 0.56;

  // Offset between the two lens centers (from Figma: ~26px in 132-wide = ~20%)
  const offset = size * 0.2;

  // Shared lens styles
  const baseLensStyle = {
    position: "absolute" as const,
    width: lensSize,
    height: lensSize,
    borderRadius: "50%",
    backdropFilter: "blur(4px)",
    WebkitBackdropFilter: "blur(4px)",
    boxShadow: `0 ${size * 0.03}px ${size * 0.06}px rgba(0,0,0,0.08)`,
  };

  // Position: lens A top-left, lens B bottom-right (matching Figma overlap)
  const lensAPos = {
    top: 0,
    left: 0,
  };
  const lensBPos = {
    top: offset,
    left: offset,
  };

  if (!animated) {
    // Static mode — fixed teal color
    const staticFill = hexToRgba(DEFAULT_COLOR, FILL_ALPHA);
    const staticBorder = `1px solid ${hexToRgba(DEFAULT_COLOR, BORDER_ALPHA)}`;

    return (
      <div
        style={{
          position: "relative",
          width: size,
          height: size,
          flexShrink: 0,
        }}
      >
        {/* Back lens */}
        <div
          style={{
            ...baseLensStyle,
            ...lensBPos,
            backgroundColor: staticFill,
            border: staticBorder,
          }}
        />
        {/* Front lens */}
        <div
          style={{
            ...baseLensStyle,
            ...lensAPos,
            backgroundColor: staticFill,
            border: staticBorder,
          }}
        />
      </div>
    );
  }

  // Animated mode — orbital rotation + color cycling
  const ORBIT_DURATION = 20;
  const COLOR_DURATION = 24;

  return (
    <motion.div
      style={{
        position: "relative",
        width: size,
        height: size,
        flexShrink: 0,
      }}
      animate={{ rotate: [0, 360] }}
      transition={{
        rotate: {
          duration: ORBIT_DURATION,
          repeat: Infinity,
          ease: "linear",
        },
      }}
    >
      {/* Back lens */}
      <motion.div
        style={{
          ...baseLensStyle,
          ...lensBPos,
        }}
        animate={{
          backgroundColor: colorsB,
          borderColor: bordersB,
        }}
        transition={{
          backgroundColor: {
            duration: COLOR_DURATION,
            repeat: Infinity,
            ease: "linear",
          },
          borderColor: {
            duration: COLOR_DURATION,
            repeat: Infinity,
            ease: "linear",
          },
        }}
        className="border"
      />
      {/* Front lens */}
      <motion.div
        style={{
          ...baseLensStyle,
          ...lensAPos,
        }}
        animate={{
          backgroundColor: colorsA,
          borderColor: bordersA,
        }}
        transition={{
          backgroundColor: {
            duration: COLOR_DURATION,
            repeat: Infinity,
            ease: "linear",
          },
          borderColor: {
            duration: COLOR_DURATION,
            repeat: Infinity,
            ease: "linear",
          },
        }}
        className="border"
      />
    </motion.div>
  );
}
