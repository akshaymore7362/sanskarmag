import Image from "next/image";
import { insights } from "@/data/insights";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function InsightsSection() {
  const [main, ...items] = insights;
  const visibleItems = items.slice(0, 10);
  return (
    <section className="insights section-light">
      <SectionHeading title="Voices & Insights" linkText="View All Insights" />
      <div className="insights-grid">
        <article className="opinion">
          <Image src={main.image} alt={main.imageAlt} fill className="object-cover" />
          <div><p>{main.category}</p><h3>{main.title}</h3><small>By {main.author}<br />{main.date} | {main.readTime}</small></div>
        </article>
        <div className="insight-list">
          {visibleItems.map((item) => (
            <article key={item.id}>
              <Image src={item.image} alt={item.imageAlt} width={82} height={64} style={{ width: 82, height: 64 }} />
              <div><p>{item.category}</p><h3>{item.title}</h3><small>{item.date}</small></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
