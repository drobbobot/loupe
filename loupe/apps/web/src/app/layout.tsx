import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Loupe — See the world through every lens",
    template: "%s | Loupe",
  },
  description:
    "Understand yourself and the people around you through Spiral Dynamics — a framework for human worldviews. Take the assessment, discover your lens.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "https://loupe.app"
  ),
  openGraph: {
    type: "website",
    siteName: "Loupe",
    title: "Loupe — See the world through every lens",
    description:
      "Understand yourself and the people around you through Spiral Dynamics.",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Prevents font scaling in landscape on iOS
  maximumScale: 1,
  userScalable: false,
  // Sets the theme colour — overridden per-lens post-assessment
  themeColor: "#FAF8F5",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        data-lens is set on <body> after assessment to activate
        the lens colour environment (see globals.css and lib/lens-theme.ts).
        Defaults to no lens (neutral palette) until assessment is complete.
      */}
      <body className="min-h-screen bg-cream text-warm-900 antialiased">
        {children}
      </body>
    </html>
  );
}
