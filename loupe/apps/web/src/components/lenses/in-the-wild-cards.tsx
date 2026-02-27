"use client";

// ─────────────────────────────────────────────────────────────────────────────
// InTheWildCards — Horizontal card stack for "In the wild" examples
//
// Design notes (prd.md §4.2):
//   - 3-5 rapid real-world examples
//   - Card format, scannable horizontally
//   - Each card: title + 1-3 sentence description
// ─────────────────────────────────────────────────────────────────────────────

import { motion } from "framer-motion";

interface InTheWildCardsProps {
  examples: Array<{ title: string; body: string }>;
}

export function InTheWildCards({ examples }: InTheWildCardsProps) {
  if (!examples || examples.length === 0) return null;

  return (
    <div className="space-y-3">
      <h3 className="font-serif text-lg font-medium text-warm-900">
        In the wild
      </h3>

      <div className="-mx-6 flex gap-3 overflow-x-auto px-6 pb-2 scrollbar-hide">
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
