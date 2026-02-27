"use client";

// ─────────────────────────────────────────────────────────────────────────────
// InTheWildCards — Horizontal card stack for "In the wild" examples
//
// Design notes (prd.md §4.2):
//   - 3-5 rapid real-world examples
//   - Card format, scannable horizontally
//   - Each card: title + 1-3 sentence description
//   - Left/right arrows for users without horizontal scroll
// ─────────────────────────────────────────────────────────────────────────────

import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

interface InTheWildCardsProps {
  examples: Array<{ title: string; body: string }>;
}

export function InTheWildCards({ examples }: InTheWildCardsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  function scroll(direction: "left" | "right") {
    const el = scrollRef.current;
    if (!el) return;
    const distance = 272; // card width (256) + gap (16)
    el.scrollBy({
      left: direction === "left" ? -distance : distance,
      behavior: "smooth",
    });
  }

  if (!examples || examples.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-lg font-medium text-warm-900">
          In the wild
        </h3>

        {/* Navigation arrows */}
        <div className="flex gap-1.5">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-warm-200/80 bg-white/80 text-warm-500 transition-all hover:bg-white hover:text-warm-700 disabled:opacity-30 disabled:hover:bg-white/80 disabled:hover:text-warm-500"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8.5 3L4.5 7L8.5 11" />
            </svg>
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            aria-label="Scroll right"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-warm-200/80 bg-white/80 text-warm-500 transition-all hover:bg-white hover:text-warm-700 disabled:opacity-30 disabled:hover:bg-white/80 disabled:hover:text-warm-500"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5.5 3L9.5 7L5.5 11" />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="-mx-6 flex gap-3 overflow-x-auto px-6 pb-2 scrollbar-hide"
      >
        {examples.map((example, index) => (
          <motion.div
            key={example.title}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.08 }}
            className="w-64 shrink-0 rounded-xl border-2 border-warm-200 bg-white p-4"
          >
            <h4 className="text-sm font-semibold text-warm-800">
              {example.title}
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-warm-500">
              {example.body}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
