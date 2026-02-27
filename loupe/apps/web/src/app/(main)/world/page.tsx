// ─────────────────────────────────────────────────────────────────────────────
// The World Right Now — Article feed
//
// Server Component that fetches seed articles (Sanity fallback) and renders
// the WorldFeed client component with lens-based filtering.
//
// PRD §4.5: Long-form lens-grounded cultural analysis. Filtering by lens
// or recency. 2 free pieces visible; rest behind subscription (deferred).
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { WorldFeed } from "@/components/world/world-feed";
import { getSeedArticles } from "@/lib/world-data";
import type { LensSlug } from "@loupe/types";

export const metadata: Metadata = {
  title: "The World Right Now",
  description:
    "Lens-grounded analysis of the cultural moment. Not hot takes — genuine understanding through Spiral Dynamics.",
  openGraph: {
    title: "The World Right Now | Loupe",
    description:
      "Lens-grounded analysis of the cultural moment through Spiral Dynamics.",
  },
};

export default async function WorldPage() {
  // Get user's primary lens for personalised filtering
  let userPrimaryLens: LensSlug | null = null;

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { data: result } = await supabase
        .from("assessment_results")
        .select("primary_lens")
        .eq("user_id", user.id)
        .order("completed_at", { ascending: false })
        .limit(1)
        .single();

      if (result) {
        userPrimaryLens = result.primary_lens as LensSlug;
      }
    }
  } catch {
    // Auth or DB errors — continue without personalisation
  }

  // Fetch all seed articles
  const articles = getSeedArticles();

  // Map to feed-compatible shape
  const feedArticles = articles.map((a) => ({
    slug: a.slug,
    title: a.title,
    publishedAt: a.publishedAt,
    excerpt: a.excerpt,
    readTimeMins: a.readTimeMins,
    lenses: a.lenses,
  }));

  return (
    <WorldFeed
      articles={feedArticles}
      userPrimaryLens={userPrimaryLens}
    />
  );
}
