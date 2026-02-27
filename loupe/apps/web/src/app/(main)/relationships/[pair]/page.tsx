// ─────────────────────────────────────────────────────────────────────────────
// Relationship Detail — Guide for a specific lens pair
//
// URL format: /relationships/blue-orange?my=orange
// The pair slug is always alphabetically sorted.
// The ?my= query param indicates which lens is "mine" for perspective framing.
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RelationshipGuide } from "@/components/relationships/relationship-guide";
import { getRelationship, getLensDisplayInfo } from "@/lib/relationship-data";
import type { LensSlug } from "@loupe/types";

const VALID_SLUGS = new Set<string>([
  "beige", "purple", "red", "blue", "orange", "green", "yellow", "turquoise",
]);

interface PageProps {
  params: Promise<{ pair: string }>;
  searchParams: Promise<{ my?: string }>;
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { pair } = await params;
  const parts = pair.split("-");
  if (parts.length !== 2) return { title: "Relationship not found" };

  const nameA = capitalize(parts[0]);
  const nameB = capitalize(parts[1]);

  return {
    title: `${nameA} & ${nameB} Relationship`,
    description: `How ${nameA} and ${nameB} lenses relate, connect, and navigate their differences. A Spiral Dynamics relationship guide.`,
  };
}

export default async function RelationshipDetailPage({
  params,
  searchParams,
}: PageProps) {
  const { pair } = await params;
  const { my: myLensParam } = await searchParams;

  // Parse pair slug: "blue-orange" → ["blue", "orange"]
  const parts = pair.split("-");
  if (parts.length !== 2 || !VALID_SLUGS.has(parts[0]) || !VALID_SLUGS.has(parts[1])) {
    notFound();
  }

  const [lensA, lensB] = parts as [LensSlug, LensSlug];
  const guide = getRelationship(lensA, lensB);
  const infoA = getLensDisplayInfo(lensA);
  const infoB = getLensDisplayInfo(lensB);

  // Determine which lens is "mine" for perspective framing
  const myLens: LensSlug | null =
    myLensParam && VALID_SLUGS.has(myLensParam) ? (myLensParam as LensSlug) : null;

  return (
    <RelationshipGuide
      guide={guide}
      infoA={infoA}
      infoB={infoB}
      myLens={myLens}
    />
  );
}
