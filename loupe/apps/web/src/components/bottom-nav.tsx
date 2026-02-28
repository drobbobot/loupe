"use client";

// ─────────────────────────────────────────────────────────────────────────────
// BottomNav — Persistent bottom tab bar
//
// Design notes (design.md §4):
//   - Four tabs: Home, Lenses, Relationships, World
//   - Active tab uses lens colour
//   - Hides on scroll down, shows on scroll up (mobile feel)
// ─────────────────────────────────────────────────────────────────────────────

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  {
    label: "Home",
    href: "/",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 8.5L11 2L19 8.5V18C19 18.5304 18.7893 19.0391 18.4142 19.4142C18.0391 19.7893 17.5304 20 17 20H5C4.46957 20 3.96086 19.7893 3.58579 19.4142C3.21071 19.0391 3 18.5304 3 18V8.5Z" />
        <path d="M8 20V12H14V20" />
      </svg>
    ),
  },
  {
    label: "Lenses",
    href: "/lenses",
    // Spiral/helix icon
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M11 11 C11 9 13 8 14.5 9 C16 10 16 12.5 14 13.5 C12 14.5 9.5 13.5 9 11.5 C8.5 9 10 6.5 12.5 6 C16 5 19 7.5 19 11 C19 15.5 15.5 18.5 11 19 C6 19.5 3 15.5 3 11 C3 5.5 7.5 2 13 2" />
      </svg>
    ),
  },
  {
    label: "Relationships",
    href: "/relationships",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="11" r="5" />
        <circle cx="15" cy="11" r="5" />
      </svg>
    ),
  },
  {
    label: "World",
    href: "/world",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="9" />
        <path d="M2 11H20" />
        <path d="M11 2C13.5 4.73 14.9 7.8 14.9 11C14.9 14.2 13.5 17.27 11 20C8.5 17.27 7.1 14.2 7.1 11C7.1 7.8 8.5 4.73 11 2Z" />
      </svg>
    ),
  },
];

export function BottomNav() {
  const pathname = usePathname();

  // Don't show on assessment flow
  if (pathname?.startsWith("/assessment")) return null;

  return (
    <nav aria-label="Main navigation" className="fixed inset-x-0 bottom-0 z-40 border-t border-warm-200/60 bg-cream/95 backdrop-blur-sm safe-area-pb">
      <div className="mx-auto flex h-16 max-w-lg items-center justify-around px-2">
        {TABS.map((tab) => {
          const isActive =
            tab.href === "/"
              ? pathname === "/"
              : pathname?.startsWith(tab.href);

          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-current={isActive ? "page" : undefined}
              className={`flex flex-col items-center gap-0.5 rounded-lg px-3 py-1.5 transition-colors ${
                isActive
                  ? "text-lens"
                  : "text-warm-400 hover:text-warm-600"
              }`}
            >
              <span aria-hidden="true">{tab.icon}</span>
              <span className="text-2xs font-medium">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
