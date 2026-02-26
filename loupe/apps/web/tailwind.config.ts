import type { Config } from "tailwindcss";

// ─────────────────────────────────────────────────────────────────────────────
// Loupe Design System — Tailwind Configuration
//
// This file encodes the full visual identity from design.md.
//
// TYPOGRAPHY NOTE:
//   Placeholder fonts are Lora (serif) + Plus Jakarta Sans (sans-serif).
//   Production fonts are Tiempos Text + Söhne (Klim Type Foundry).
//   Swap by updating the font-face declarations in globals.css and the
//   fontFamily values below. CSS variables --font-serif and --font-sans
//   are the single source of truth.
//
// LENS COLOURS:
//   Exact hex values are approximate — the design.md states these are for
//   a designer to finalise through iteration. These are production-quality
//   starting points. Adjust via the `lens` key in the theme extension.
// ─────────────────────────────────────────────────────────────────────────────

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      // ── Typography ──────────────────────────────────────────────────────
      fontFamily: {
        // Swap Lora → Tiempos Text, Plus Jakarta Sans → Söhne when licensed
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },

      // ── Neutral palette (warm, no blue-shift) ───────────────────────────
      // Reference: Claude's UI palette. Feels like quality paper, not a screen.
      colors: {
        cream: "#FAF8F5",
        warm: {
          50: "#FAF8F5",
          100: "#F5F1EB",
          200: "#EDE8DF",
          300: "#D6D0C7",
          400: "#B8B0A5",
          500: "#9C9287",
          600: "#7C7268",
          700: "#5C544C",
          800: "#3C3630",
          900: "#1C1710",
          950: "#0E0B08",
        },

        // ── Lens colours ──────────────────────────────────────────────────
        // Each lens has: DEFAULT (primary), bg (tinted background), text (on dark bg)
        // Tints are used for content-heavy screens; full saturation for statement screens.
        lens: {
          beige: {
            DEFAULT: "#C4A882",  // warm sand / stone
            bg: "#F5EFE6",       // tinted background (low saturation)
            text: "#6B5A42",     // text colour for use on beige bg
          },
          purple: {
            DEFAULT: "#6B4E9B",  // deep violet, warm
            bg: "#EDE5F7",
            text: "#3D2A60",
          },
          red: {
            DEFAULT: "#C0392B",  // vital red / vermillion
            bg: "#FAE8E6",
            text: "#7A2318",
          },
          blue: {
            DEFAULT: "#1E3A6E",  // deep, confident institutional blue
            bg: "#E0E8F5",
            text: "#122247",
          },
          orange: {
            DEFAULT: "#C4622D",  // warm amber / burnt orange
            bg: "#FAE9DE",
            text: "#7A3B18",
          },
          green: {
            DEFAULT: "#3D7A52",  // natural, open green
            bg: "#E0F0E8",
            text: "#224532",
          },
          yellow: {
            DEFAULT: "#B89A28",  // clear, luminous yellow — WCAG AA requires care here
            bg: "#FAF0D0",
            text: "#6B5A10",
          },
          turquoise: {
            DEFAULT: "#1A6B7A",  // deep teal / ocean
            bg: "#D8EFF2",
            text: "#0E424C",
          },
        },
      },

      // ── Spacing & sizing ─────────────────────────────────────────────────
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "88": "22rem",
        "112": "28rem",
        "128": "32rem",
      },

      // ── Border radius ────────────────────────────────────────────────────
      borderRadius: {
        "4xl": "2rem",
      },

      // ── Typography scale ─────────────────────────────────────────────────
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "1rem" }],
        // Assessment UI text — legible at small sizes on mobile
        ui: ["0.8125rem", { lineHeight: "1.375rem" }],
        // Lens profile section body
        editorial: ["1.0625rem", { lineHeight: "1.75rem" }],
        // Result reveal lens name
        display: ["3.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-lg": ["5rem", { lineHeight: "1.0", letterSpacing: "-0.03em" }],
      },

      // ── Line heights ─────────────────────────────────────────────────────
      lineHeight: {
        // Body text must never go below 1.5 (design.md §3.3)
        relaxed: "1.65",
        editorial: "1.75",
      },

      // ── Animations ───────────────────────────────────────────────────────
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        // Slow pulse for the user's spiral map node
        "lens-pulse": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.06)" },
        },
        // Colour flood for the result reveal screen
        "colour-flood": {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.4s ease-out both",
        "fade-up": "fade-up 0.5s ease-out both",
        "lens-pulse": "lens-pulse 3s ease-in-out infinite",
        "colour-flood": "colour-flood 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
      },

      // ── Backdrop blur ────────────────────────────────────────────────────
      backdropBlur: {
        xs: "2px",
      },

      // ── Max widths for editorial content ────────────────────────────────
      maxWidth: {
        // Long-form reading width — World Right Now, lens profiles
        prose: "68ch",
        // Assessment question — shorter for focus
        question: "52ch",
      },
    },
  },
  plugins: [],
};

export default config;
