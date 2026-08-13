import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/editorial/ArticleCard";
import { events } from "@/data/events";
import { leaders } from "@/data/leaders";
import { startups } from "@/data/startups";
import { articleService } from "@/services/articleService";
import { industryService } from "@/services/industryService";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return industryService.all().map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const industry = industryService.bySlug(slug);
  if (!industry) return {};
  return { title: `${industry.name} | Momentum Magazine`, description: industry.overview };
}

export default async function IndustryDetailPage({ params }: Props) {
  const { slug } = await params;
  const industry = industryService.bySlug(slug);
  if (!industry) notFound();
  const stories = articleService.byIndustry(industry.slug);
  const sectorLeaders = leaders.filter((leader) => leader.industrySlug === industry.slug).slice(0, 4);
  const sectorStartups = startups.filter((startup) => startup.sector.toLowerCase().includes(industry.name.toLowerCase()) || startup.image.includes(industry.slug)).slice(0, 3);

  return (
    <main className="site-shell inner-shell">
      <section className="industry-hero">
        <Image src={industry.image} alt={industry.imageAlt} fill className="object-cover" />
        <div>
          <p className="gold-label">{industry.descriptor}</p>
          <h1>{industry.name}</h1>
          <p>{industry.overview}</p>
        </div>
      </section>
      <section className="signal-band">
        <h2>Market Signal</h2>
        <p>{industry.marketSignal}</p>
      </section>
      <section className="related-section">
        <h2>Latest {industry.name} Stories</h2>
        <div className="article-grid article-grid-four">
          {(stories.length ? stories : articleService.latest().slice(0, 4)).map((article) => <ArticleCard article={article} compact key={article.slug} />)}
        </div>
      </section>
      <section className="three-column-feature">
        <div>
          <h2>Industry Leaders</h2>
          {sectorLeaders.map((leader) => <Link href={`/leaders/${leader.slug}`} key={leader.slug}>{leader.name}<span>{leader.role}, {leader.company}</span></Link>)}
        </div>
        <div>
          <h2>Related Startups</h2>
          {(sectorStartups.length ? sectorStartups : startups.slice(0, 3)).map((startup) => <Link href="/startups" key={startup.slug}>{startup.name}<span>{startup.sector} | {startup.stage}</span></Link>)}
        </div>
        <div>
          <h2>Events</h2>
          {events.slice(0, 3).map((event) => <Link href={`/events/${event.slug}`} key={event.slug}>{event.title}<span>{event.date}</span></Link>)}
        </div>
      </section>
    </main>
  );
}
