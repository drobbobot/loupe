// ─────────────────────────────────────────────────────────────────────────────
// Share Quote Extraction — Selects 3 resonant quotes from profile data
//
// PRD §4.1 sharing design direction:
//   - "Lead with a line, not a type"
//   - Quote should be a specific, resonant sentence from the profile
//   - Users choose from 2-3 options (feels personal and chosen)
//
// Strategy: Extract the strongest opening sentences from different profile
// sections so the user has variety in tone (reflective, relational, forward).
// ─────────────────────────────────────────────────────────────────────────────

import type { ProfileData } from "@/lib/profile-data";

export interface ShareQuote {
  text: string;
  source: string; // e.g. "Centre of gravity", "Relationships", "Growth"
}

/**
 * Extract 3 shareable quotes from the profile data.
 * Each quote comes from a different section for variety.
 */
export function extractShareQuotes(profile: ProfileData): ShareQuote[] {
  const quotes: ShareQuote[] = [];

  // 1. Opening sentence from centre of gravity (the most personal)
  const cogSentence = extractFirstSentence(profile.centreOfGravity);
  if (cogSentence) {
    quotes.push({
      text: cogSentence,
      source: "Centre of gravity",
    });
  }

  // 2. Opening sentence from relationships (the most relatable)
  const relSentence = extractFirstSentence(profile.howYouShowUp.inRelationships);
  if (relSentence) {
    quotes.push({
      text: relSentence,
      source: "Relationships",
    });
  }

  // 3. Opening sentence from growth orientation (the most forward-looking)
  const growthSentence = extractFirstSentence(profile.whatsAhead.growthOrientation);
  if (growthSentence) {
    quotes.push({
      text: growthSentence,
      source: "Growth",
    });
  }

  return quotes;
}

/**
 * Extract the first complete sentence from a paragraph.
 * Handles "You tend to..." style content gracefully.
 */
function extractFirstSentence(text: string): string | null {
  if (!text) return null;

  // Split on sentence-ending punctuation followed by a space or end
  const match = text.match(/^(.+?[.!?])(?:\s|$)/);
  if (match) {
    const sentence = match[1].trim();
    // Skip very short sentences (likely fragments)
    if (sentence.length > 30) return sentence;
  }

  // Fallback: take first 120 chars and truncate at last word
  const truncated = text.slice(0, 120);
  const lastSpace = truncated.lastIndexOf(" ");
  if (lastSpace > 30) {
    return truncated.slice(0, lastSpace) + "…";
  }

  return null;
}
