"use client";

// ─────────────────────────────────────────────────────────────────────────────
// LensGem — Interactive 3-D tiltable gem for a given lens colour
//
// Usage:
//   <LensGem slug="orange" size={140} />
//
// Responds to mouse and touch: tilts in 3D, shifts the refraction shimmer,
// rotates a conic rim highlight to simulate glass-edge light.
// ─────────────────────────────────────────────────────────────────────────────

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { LENS_COLORS, type LensSlug } from "@loupe/types";

interface LensGemProps {
  slug: LensSlug;
  size?: number;
  /** Disable hover / touch interactivity (e.g. when used decoratively) */
  static?: boolean;
  /** Slow continuous Y-axis spin to hint at interactivity */
  spin?: boolean;
}

export function LensGem({ slug, size = 140, static: isStatic = false, spin = false }: LensGemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [shimmer, setShimmer] = useState({ x: 38, y: 32 });
  const [active, setActive] = useState(false);

  const colors = LENS_COLORS[slug];

  function getPos(clientX: number, clientY: number) {
    if (!ref.current) return { rx: 0, ry: 0, px: 50, py: 50 };
    const rect = ref.current.getBoundingClientRect();
    return {
      rx: (clientX - (rect.left + rect.width / 2)) / (rect.width / 2),
      ry: (clientY - (rect.top + rect.height / 2)) / (rect.height / 2),
      px: ((clientX - rect.left) / rect.width) * 100,
      py: ((clientY - rect.top) / rect.height) * 100,
    };
  }

  const maxTilt = active ? 28 : 16;

  const interactiveHandlers = isStatic
    ? {}
    : {
        onMouseMove: (e: React.MouseEvent) => {
          const { rx, ry, px, py } = getPos(e.clientX, e.clientY);
          setTilt({ x: ry * -maxTilt, y: rx * maxTilt });
          setShimmer({ x: px, y: py });
        },
        onMouseLeave: () => {
          setTilt({ x: 0, y: 0 });
          setActive(false);
        },
        onMouseDown: () => setActive(true),
        onMouseUp: () => setActive(false),
        onTouchMove: (e: React.TouchEvent) => {
          const t = e.touches[0];
          const { rx, ry, px, py } = getPos(t.clientX, t.clientY);
          setTilt({ x: ry * -24, y: rx * 24 });
          setShimmer({ x: px, y: py });
        },
        onTouchEnd: () => {
          setTilt({ x: 0, y: 0 });
        },
      };

  return (
    <div
      ref={ref}
      style={{
        width: size,
        height: size,
        perspective: size * 5,
        touchAction: "none",
        cursor: isStatic ? "default" : active ? "grabbing" : "grab",
        flexShrink: 0,
      }}
      {...interactiveHandlers}
    >
      <motion.div
        animate={
          spin && tilt.x === 0 && tilt.y === 0
            ? { rotateY: [0, 360] }
            : { rotateX: tilt.x, rotateY: tilt.y }
        }
        transition={
          spin && tilt.x === 0 && tilt.y === 0
            ? { rotateY: { duration: 6, repeat: Infinity, ease: "linear" } }
            : { type: "spring", stiffness: active ? 280 : 140, damping: active ? 14 : 22 }
        }
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          transformStyle: "preserve-3d",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Base colour */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: `radial-gradient(circle at 40% 35%, ${colors.bg} 0%, ${colors.DEFAULT} 100%)`,
            boxShadow: `0 16px 48px ${colors.DEFAULT}55, 0 2px 8px rgba(0,0,0,0.08), inset 0 1px 1px rgba(255,255,255,0.35)`,
          }}
        />

        {/* Refraction shimmer — tracks pointer */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: `radial-gradient(circle at ${shimmer.x}% ${shimmer.y}%, rgba(255,255,255,0.68) 0%, rgba(255,255,255,0.18) 38%, transparent 65%)`,
            mixBlendMode: "overlay",
            pointerEvents: "none",
            transition: active ? "none" : "background 0.12s ease",
          }}
        />

        {/* Conic rim — rotates with shimmer to simulate glass edge light */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: `conic-gradient(from ${shimmer.x * 3.6}deg at 50% 50%, rgba(255,255,255,0.04), rgba(255,255,255,0.22) 28%, rgba(255,255,255,0.04) 55%, rgba(255,255,255,0.18) 78%, rgba(255,255,255,0.04))`,
            border: "1.5px solid rgba(255,255,255,0.32)",
            pointerEvents: "none",
            transition: active ? "none" : "background 0.18s ease",
          }}
        />

        {/* Counter-shadow — depth on the opposite face */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: `radial-gradient(circle at ${100 - shimmer.x}% ${100 - shimmer.y}%, rgba(0,0,0,0.14) 20%, transparent 65%)`,
            pointerEvents: "none",
          }}
        />
      </motion.div>
    </div>
  );
}
