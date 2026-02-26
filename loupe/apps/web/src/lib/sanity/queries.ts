// Sanity GROQ queries
// All content fetching goes through these typed query functions.
// Cache TTLs match architecture.md §7.3:
//   Lens profiles + assessment copy: 1 hour
//   Articles: 10 minutes

import { sanityClient } from "./client";
import type { LensSlug } from "@loupe/types";

// ── Lens queries ─────────────────────────────────────────────────────────────

export async function getLensProfile(slug: LensSlug) {
  return sanityClient.fetch(
    `*[_type == "lens" && slug == $slug][0]{
      slug,
      colourHex,
      displayName,
      tagline,
      group,
      inwardOutward,
      fromTheInside,
      valuesAndWhy,
      healthyExpression,
      shadowExpression,
      inTheWild,
      howToConnect,
      depthLayer,
      metaDescription
    }`,
    { slug },
    { next: { revalidate: 3600 } } // 1 hour
  );
}

export async function getAllLenses() {
  return sanityClient.fetch(
    `*[_type == "lens"] | order(order asc) {
      slug,
      colourHex,
      displayName,
      tagline,
      group,
      inwardOutward
    }`,
    {},
    { next: { revalidate: 3600 } }
  );
}

// ── Relationship guide queries ────────────────────────────────────────────────

export async function getRelationshipGuide(lensA: LensSlug, lensB: LensSlug) {
  // Normalise order so Blue/Green == Green/Blue
  const [a, b] = [lensA, lensB].sort();
  return sanityClient.fetch(
    `*[_type == "relationshipGuide" && lensA->slug == $a && lensB->slug == $b][0]{
      quality,
      dynamicSummary,
      lensANeeds,
      lensBNeeds,
      frictionPoints,
      genuineConnection,
      scenarioClose,
      scenarioWork,
      scenarioCivic
    }`,
    { a, b },
    { next: { revalidate: 3600 } }
  );
}

// ── Article queries ───────────────────────────────────────────────────────────

export async function getArticles({
  lens,
  limit = 10,
}: {
  lens?: LensSlug;
  limit?: number;
} = {}) {
  const filter = lens
    ? `*[_type == "article" && $lens in lenses[]->slug]`
    : `*[_type == "article"]`;

  return sanityClient.fetch(
    `${filter} | order(publishedAt desc) [0...$limit] {
      title,
      "slug": slug.current,
      publishedAt,
      excerpt,
      readTimeMins,
      "lenses": lenses[]->{ slug, displayName, colourHex }
    }`,
    { lens, limit },
    { next: { revalidate: 600 } } // 10 minutes
  );
}

export async function getArticle(slug: string) {
  return sanityClient.fetch(
    `*[_type == "article" && slug.current == $slug][0]{
      title,
      "slug": slug.current,
      publishedAt,
      excerpt,
      readTimeMins,
      body,
      "lenses": lenses[]->{ slug, displayName, colourHex },
      "related": related[]->{ title, "slug": slug.current, excerpt, readTimeMins }
    }`,
    { slug },
    { next: { revalidate: 600 } }
  );
}

// ── Assessment question queries ───────────────────────────────────────────────

export async function getAssessmentQuestions() {
  return sanityClient.fetch(
    `*[_type == "assessmentQuestion"] | order(section asc, order asc) {
      id,
      section,
      questionText,
      inputType,
      options
      // Note: weights and lens mappings are NOT in Sanity — they live in
      // server-side scoring constants (src/lib/assessment/weights.ts)
    }`,
    {},
    { next: { revalidate: 3600 } }
  );
}
