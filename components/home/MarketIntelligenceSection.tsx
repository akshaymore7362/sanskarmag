import Image from "next/image";
import Link from "next/link";
import { articleService } from "@/services/articleService";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function MarketIntelligenceSection() {
  const reports = articleService.all().slice(14, 22);
  const [lead, ...items] = reports;

  return (
    <section className="market-intel section-light">
      <SectionHeading title="Market Intelligence" linkText="View Reports" />
      <div className="market-intel-grid">
        <article className="market-lead">
          <Image src={lead.image} alt={lead.imageAlt} fill className="object-cover" />
          <div>
            <p>{lead.category}</p>
            <h3><Link href={`/articles/${lead.slug}`}>{lead.title}</Link></h3>
            <small>{lead.description}</small>
          </div>
        </article>
        <div className="market-brief-list">
          {items.map((article, index) => (
            <Link href={`/articles/${article.slug}`} key={article.slug}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <Image src={article.image} alt={article.imageAlt} width={118} height={78} style={{ width: 118, height: 78 }} />
              <div>
                <p>{article.category}</p>
                <h3>{article.title}</h3>
                <small>{article.date} | {article.readTime}</small>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
