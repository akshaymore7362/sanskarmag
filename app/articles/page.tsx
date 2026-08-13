import type { Metadata } from "next";
import Link from "next/link";
import { ArticleCard } from "@/components/editorial/ArticleCard";
import { FilterPills } from "@/components/editorial/FilterPills";
import { PageIntro } from "@/components/editorial/PageIntro";
import { TrendingSidebar } from "@/components/editorial/TrendingSidebar";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { articleService } from "@/services/articleService";

export const metadata: Metadata = {
  title: "Stories | Momentum Magazine",
  description: "Ideas, people and trends shaping the future of business.",
};

export default function ArticlesPage() {
  const [featured, ...articles] = articleService.all();

  return (
    <main className="site-shell inner-shell">
      <PageIntro title="Stories" intro="Ideas, people and trends shaping the future of business." eyebrow="Editorial Library" />
      <FilterPills items={["All", "Technology", "Business", "Finance", "Leadership", "Startups", "Healthcare", "Real Estate", "Innovation"]} />
      <section className="listing-layout">
        <div>
          <ArticleCard article={featured} dark />
          <div className="article-grid">
            {articles.slice(0, 12).map((article) => <ArticleCard article={article} key={article.slug} />)}
          </div>
          <div className="load-more"><Link href="#">Load More Stories</Link></div>
        </div>
        <TrendingSidebar />
      </section>
      <NewsletterSection />
    </main>
  );
}
