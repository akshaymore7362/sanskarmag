import type { Metadata } from "next";
import { ArticleCard } from "@/components/editorial/ArticleCard";
import { FilterPills } from "@/components/editorial/FilterPills";
import { PageIntro } from "@/components/editorial/PageIntro";
import { insights } from "@/data/insights";

export const metadata: Metadata = {
  title: "Insights | Momentum Magazine",
  description: "Opinion, analysis, strategy, culture and research from Momentum Magazine.",
};

export default function InsightsPage() {
  const [main, ...items] = insights;

  return (
    <main className="site-shell inner-shell">
      <PageIntro title="Insights" intro="Opinion, analysis and strategic essays for leaders who need sharper judgment." eyebrow="Voices & Analysis" />
      <FilterPills items={["Opinion", "Analysis", "Strategy", "Culture", "Research"]} />
      <section className="listing-layout insights-listing">
        <ArticleCard article={main} dark />
        <div className="article-grid">
          {items.map((article) => <ArticleCard article={article} key={article.slug} />)}
        </div>
      </section>
    </main>
  );
}
