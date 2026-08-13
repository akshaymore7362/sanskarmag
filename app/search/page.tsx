import type { Metadata } from "next";
import Link from "next/link";
import { ArticleCard } from "@/components/editorial/ArticleCard";
import { FilterPills } from "@/components/editorial/FilterPills";
import { PageIntro } from "@/components/editorial/PageIntro";
import { searchService } from "@/services/searchService";

type Props = {
  searchParams: Promise<{ q?: string }>;
};

export const metadata: Metadata = {
  title: "Search | Momentum Magazine",
  description: "Search Momentum Magazine stories, leaders, industries, startups, events and issues.",
};

export default async function SearchPage({ searchParams }: Props) {
  const query = (await searchParams).q ?? "";
  const results = searchService.results(query);

  return (
    <main className="site-shell inner-shell">
      <PageIntro title="Search" intro="Find stories, leaders, industries, startups, events and magazine issues." eyebrow="Discovery" />
      <form className="search-strip">
        <input name="q" defaultValue={query} placeholder="Search Momentum Magazine" />
        <button>Search</button>
      </form>
      <FilterPills items={["Articles", "Leaders", "Industries", "Startups", "Events", "Magazine"]} />
      <section className="related-section">
        <h2>Article Results</h2>
        <div className="article-grid article-grid-four">
          {results.articles.map((article) => <ArticleCard article={article} compact key={article.slug} />)}
        </div>
      </section>
      <section className="search-results-grid">
        <div><h2>Leaders</h2>{results.leaders.map((item) => <Link href={`/leaders/${item.slug}`} key={item.slug}>{item.name}<span>{item.role}, {item.company}</span></Link>)}</div>
        <div><h2>Industries</h2>{results.industries.map((item) => <Link href={`/industries/${item.slug}`} key={item.slug}>{item.name}<span>{item.descriptor}</span></Link>)}</div>
        <div><h2>Startups</h2>{results.startups.map((item) => <Link href="/startups" key={item.slug}>{item.name}<span>{item.sector}, {item.stage}</span></Link>)}</div>
        <div><h2>Events</h2>{results.events.map((item) => <Link href={`/events/${item.slug}`} key={item.slug}>{item.title}<span>{item.date}</span></Link>)}</div>
      </section>
    </main>
  );
}
