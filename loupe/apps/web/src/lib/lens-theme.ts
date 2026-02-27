// ─────────────────────────────────────────────────────────────────────────────
// Lens Theme — helpers for the CSS custom property theming system
//
// The design system uses data-lens="<slug>" on a container to activate
// lens-specific CSS custom properties defined in globals.css.
//
// Usage:
//   - Server Component: pass data-lens to a container div
//   - Client Component: use setLensTheme() for dynamic updates
//   - Layout: use getLensFromUser() to derive theme from assessment result
// ─────────────────────────────────────────────────────────────────────────────

import { LENS_COLORS, type LensSlug } from "@loupe/types";

/**
 * Set the data-lens attribute on document.body.
 * Call from a Client Component (e.g. in a useEffect).
 */
export function setLensTheme(slug: LensSlug | null) {
  if (typeof document === "undefined") return;

  if (slug) {
    document.body.setAttribute("data-lens", slug);
  } else {
    document.body.removeAttribute("data-lens");
  }
}

/**
 * Remove the data-lens attribute (revert to neutral palette).
 */
export function clearLensTheme() {
  setLensTheme(null);
}

/**
 * Get inline style object for a specific lens.
 * Useful in Server Components where you can't use data attributes on body.
 */
export function getLensStyle(slug: LensSlug) {
  const colors = LENS_COLORS[slug];
  return {
    "--lens-color": colors.DEFAULT,
    "--lens-color-bg": colors.bg,
    "--lens-color-text": colors.text,
  } as React.CSSProperties;
}

/**
 * Get the data-lens attribute value for a container.
 * Use as: <div data-lens={slug} ...>
 */
export function getLensDataAttr(slug: LensSlug) {
  return { "data-lens": slug } as Record<string, string>;
}
