// ─────────────────────────────────────────────────────────────────────────────
// /lenses/[slug] — Individual lens profile page
//
// Server Component that fetches a single lens from Sanity (or seed fallback),
// sets the lens colour theme, and renders the full profile.
//
// Auth is NOT required — browsable by all users.
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLensProfile } from "@/lib/sanity/queries";
import { getSeedLens, type LensProfile } from "@/lib/lens-data";
import { LENS_SLUGS, LENS_COLORS, type LensSlug } from "@loupe/types";
import { LensProfilePage } from "./lens-profile-page";

interface Props {
  params: Promise<{ slug: string }>;
}

// Generate static params for all 8 lenses
export async function generateStaticParams() {
  return LENS_SLUGS.map((slug) => ({ slug }));
}

// Dynamic metadata per lens
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const seedLens = getSeedLens(slug);
  const displayName = seedLens?.displayName ?? slug;
  const description =
    seedLens?.metaDescription ??
    `Explore the ${displayName} lens in Spiral Dynamics.`;

  return {
    title: `${displayName} Lens`,
    description,
  };
}

export default async function LensSlugPage({ params }: Props) {
  const { slug } = await params;

  // Validate slug
  if (!LENS_SLUGS.includes(slug as LensSlug)) {
    notFound();
  }

  // ── Fetch lens data ────────────────────────────────────────────────────
  let lens: LensProfile | null = null;

  try {
    const sanityLens = await getLensProfile(slug as LensSlug);
    if (sanityLens) {
      // Map Sanity portable text to plain strings for the client component
      // In production, we'd use PortableText renderer — for now, flatten
      lens = {
        slug: sanityLens.slug,
        order: sanityLens.order ?? 0,
        colourHex: sanityLens.colourHex,
        displayName: sanityLens.displayName,
        tagline: sanityLens.tagline,
        group: sanityLens.group,
        inwardOutward: sanityLens.inwardOutward,
        fromTheInside: flattenPortableText(sanityLens.fromTheInside),
        valuesAndWhy: flattenPortableText(sanityLens.valuesAndWhy),
        healthyExpression: flattenPortableText(sanityLens.healthyExpression),
        shadowExpression: flattenPortableText(sanityLens.shadowExpression),
        inTheWild: sanityLens.inTheWild ?? [],
        howToConnect: flattenPortableText(sanityLens.howToConnect),
        depthLayer: flattenPortableText(sanityLens.depthLayer),
        metaDescription: sanityLens.metaDescription ?? "",
      };
    }
  } catch {
    // Sanity fetch failed — fall through to seed data
  }

  // Fallback to seed data
  if (!lens) {
    const seedLens = getSeedLens(slug);
    if (!seedLens) notFound();
    lens = seedLens!;
  }

  return <LensProfilePage lens={lens} />;
}

// ── Helpers ────────────────────────────────────────────────────────────────

/**
 * Flatten Sanity Portable Text blocks to a plain string.
 * In a production setup, we'd use @portabletext/react for rich rendering.
 * This is a simple fallback for the seed/development phase.
 */
function flattenPortableText(blocks: unknown): string {
  if (!blocks) return "";
  if (typeof blocks === "string") return blocks;
  if (!Array.isArray(blocks)) return "";

  return blocks
    .map((block: Record<string, unknown>) => {
      if (block._type === "block" && Array.isArray(block.children)) {
        return block.children
          .map((child: Record<string, unknown>) => child.text ?? "")
          .join("");
      }
      return "";
    })
    .filter(Boolean)
    .join("\n\n");
}
