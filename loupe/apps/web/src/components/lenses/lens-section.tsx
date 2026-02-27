"use client";

// ─────────────────────────────────────────────────────────────────────────────
// LensSection — Expandable content section on a lens profile
//
// Design notes (design.md §5.3):
//   - Surface: scannable heading + first few lines
//   - Depth trigger: tactile expand to reveal full content
//   - Spring animation, clear open/closed states
//   - Not a standard accordion — feels physical
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LensSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  /** Optional visual variant for special sections */
  variant?: "default" | "highlight" | "depth";
}

export function LensSection({
  title,
  children,
  defaultOpen = false,
  variant = "default",
}: LensSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const containerClasses = {
    default: "border-warm-200 bg-white",
    highlight: "border-lens/20 bg-lens-tinted",
    depth: "border-warm-300 bg-warm-50",
  };

  const labelClasses = {
    default: "",
    highlight: "",
    depth: "text-warm-500",
  };

  return (
    <div
      className={`overflow-hidden rounded-2xl border-2 transition-colors duration-300 ${containerClasses[variant]}`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-5 py-4 text-left"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          {variant === "depth" && (
            <span className="text-xs uppercase tracking-widest text-warm-400">
              Go deeper
            </span>
          )}
          <h3
            className={`font-serif text-lg font-medium text-warm-900 ${labelClasses[variant]}`}
          >
            {title}
          </h3>
        </div>

        {/* Toggle icon — rotates on open */}
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-warm-100 text-warm-500"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M3 5.5L7 9.5L11 5.5" />
          </svg>
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { type: "spring", stiffness: 200, damping: 30 },
              opacity: { duration: 0.2 },
            }}
          >
            <div className="px-5 pb-5">
              <div className="prose-editorial text-warm-700">{children}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
