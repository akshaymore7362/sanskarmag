import Image from "next/image";
import Link from "next/link";
import { articles } from "@/data/articles";
import { events } from "@/data/events";
import { industries } from "@/data/industries";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function GlobalDeskSection() {
  const [lead, ...signals] = articles.slice(8, 16);
  const regions = ["North America", "Europe", "Middle East", "Asia Pacific"].map((region, index) => ({
    region,
    industry: industries[index],
  }));

  return (
    <section className="global-desk section-light">
      <SectionHeading title="Global Desk" linkText="Explore Signals" />
      <div className="global-desk-grid">
        <article className="global-lead">
          <Image src={lead.image} alt={lead.imageAlt} fill className="object-cover" />
          <div>
            <p>{lead.category}</p>
            <h3><Link href={`/articles/${lead.slug}`}>{lead.title}</Link></h3>
            <small>{lead.description}</small>
          </div>
        </article>
        <div className="signal-ledger">
          {signals.slice(0, 6).map((article, index) => (
            <Link href={`/articles/${article.slug}`} key={article.slug}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{article.title}</strong>
              <small>{article.category} | {article.date}</small>
            </Link>
          ))}
        </div>
        <div className="region-panel">
          <h3>Regional Watch</h3>
          {regions.map(({ region, industry }) => (
            <Link href={`/industries/${industry.slug}`} key={region}>
              <Image src={industry.image} alt={industry.imageAlt} width={92} height={62} style={{ width: 92, height: 62 }} />
              <div><span>{region}</span><p>{industry.marketSignal}</p></div>
            </Link>
          ))}
        </div>
        <div className="agenda-panel">
          <h3>Editorial Agenda</h3>
          {events.slice(0, 4).map((event) => (
            <Link href={`/events/${event.slug}`} key={event.slug}>
              <Image src={event.image} alt={event.imageAlt} width={92} height={62} style={{ width: 92, height: 62 }} />
              <div><strong>{event.day} {event.month}</strong><span>{event.title}</span><small>{event.location}</small></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
