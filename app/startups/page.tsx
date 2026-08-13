import type { Metadata } from "next";
import Image from "next/image";
import { ArticleCard } from "@/components/editorial/ArticleCard";
import { PageIntro } from "@/components/editorial/PageIntro";
import { articles } from "@/data/articles";
import { startupService } from "@/services/startupService";

export const metadata: Metadata = {
  title: "Startups | Momentum Magazine",
  description: "Founder stories, startup analysis, funding and innovation coverage.",
};

export default function StartupsPage() {
  const startups = startupService.all();
  const startupStories = articles.filter((article) => article.category === "Startups").slice(0, 6);

  return (
    <main className="site-shell inner-shell">
      <PageIntro title="Startups" intro="Founders, funding, product development and the ideas moving from prototype to impact." eyebrow="Startup Desk" dark />
      <section className="startup-feature-grid">
        {startups.slice(0, 4).map((startup) => (
          <article key={startup.slug}>
            <Image src={startup.image} alt={startup.imageAlt} width={180} height={128} />
            <p className="gold-label">{startup.stage}</p>
            <h3>{startup.name}</h3>
            <small>{startup.summary}</small>
            <span>{startup.sector} | {startup.location}</span>
          </article>
        ))}
      </section>
      <section className="related-section">
        <h2>Founder Stories</h2>
        <div className="article-grid article-grid-four">
          {startupStories.map((article) => <ArticleCard article={article} compact key={article.slug} />)}
        </div>
      </section>
      <section className="startup-table">
        <h2>Startup Watchlist</h2>
        {startups.map((startup) => (
          <div key={startup.slug}>
            <strong>{startup.name}</strong>
            <span>{startup.sector}</span>
            <span>{startup.stage}</span>
            <span>{startup.founder}</span>
            <span>{startup.location}</span>
          </div>
        ))}
      </section>
    </main>
  );
}
