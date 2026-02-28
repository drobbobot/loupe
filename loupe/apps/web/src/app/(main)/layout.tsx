// Main app layout — includes the persistent nav header and bottom navigation.
// All product pages live in this route group.
// Auth pages use their own (auth) layout without the header.

import { NavHeader } from "@/components/nav-header";
import { BottomNav } from "@/components/bottom-nav";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavHeader />
      {children}
      <SiteCredits />
      <BottomNav />
    </>
  );
}

function SiteCredits() {
  return (
    <footer className="mx-auto max-w-lg px-6 pb-4 pt-16">
      <p className="text-center text-xs leading-relaxed text-warm-300">
        Spiral Dynamics was developed from the foundational research of{" "}
        <a
          href="https://en.wikipedia.org/wiki/Clare_W._Graves"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 transition-colors hover:text-warm-500"
        >
          Clare Graves
        </a>
        , and expanded by{" "}
        <a
          href="https://www.spiraldynamics.org"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 transition-colors hover:text-warm-500"
        >
          Don Beck &amp; Chris Cowan
        </a>
        . The language and framing throughout Loupe draws from{" "}
        <a
          href="https://robbell.com/portfolio/me-we-everybody/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 transition-colors hover:text-warm-500"
        >
          Rob &amp; Trace Bell&apos;s <em>Me, We, Everybody</em>
        </a>
        .
      </p>
    </footer>
  );
}
