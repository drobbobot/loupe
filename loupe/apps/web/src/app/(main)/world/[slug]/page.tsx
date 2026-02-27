// ─────────────────────────────────────────────────────────────────────────────
// Article Detail — Individual "World Right Now" piece
//
// Server Component that loads the seed article by slug and renders
// the WorldArticle client component.
//
// PRD §4.5: 800–1,500 words. Pull-out quotes, section headers,
// scannable structure. Max 300-word sections.
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WorldArticle } from "@/components/world/world-article";
import { getSeedArticle, getSeedArticles } from "@/lib/world-data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getSeedArticle(slug);

  if (!article) {
    return { title: "Article not found" };
  }

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: `${article.title} | Loupe`,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedAt,
    },
  };
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = getSeedArticle(slug);

  if (!article) {
    notFound();
  }

  // Resolve related articles
  const allArticles = getSeedArticles();
  const related = article.related
    .map((relSlug) => allArticles.find((a) => a.slug === relSlug))
    .filter(Boolean)
    .map((a) => ({
      slug: a!.slug,
      title: a!.title,
      excerpt: a!.excerpt,
      readTimeMins: a!.readTimeMins,
      lenses: a!.lenses,
    }));

  return <WorldArticle article={article} related={related} />;
}
