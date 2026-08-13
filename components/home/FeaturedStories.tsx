import Image from "next/image";
import { Play } from "lucide-react";
import { articleService } from "@/services/articleService";
import { trending } from "@/data/trending";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function FeaturedStories() {
  const feature = articleService.featured();
  const secondary = articleService.secondary();

  return (
    <section className="featured section-light">
      <div className="feature-left">
        <SectionHeading title="Featured Stories" linkText="View All Stories" />
        <article className="feature-card">
          <Image src={feature.image} alt="" fill className="object-cover" />
          <div>
            <p className="gold-label">{feature.category}</p>
            <h2>{feature.title}</h2>
            <p>{feature.description}</p>
            <strong>By {feature.author}</strong>
            <small>{feature.date} | {feature.readTime}</small>
          </div>
          <button aria-label="Play story"><Play size={16} fill="currentColor" /></button>
        </article>
      </div>
      <div className="secondary-stories">
        {secondary.map((story) => (
          <article key={story.id}>
            <Image src={story.image} alt="" width={106} height={82} style={{ width: 106, height: 82 }} />
            <div>
              <p>{story.category}</p>
              <h3>{story.title}</h3>
              <small>{story.date} | {story.readTime}</small>
            </div>
          </article>
        ))}
      </div>
      <aside className="trending">
        <SectionHeading title="Trending Now" linkText="View All" />
        {trending.map((item, index) => (
          <article key={item}>
            <Image src={`/images/articles/trend-${index + 1}.svg`} alt="" width={130} height={78} style={{ width: 130, height: 78 }} />
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{item}</h3>
          </article>
        ))}
      </aside>
    </section>
  );
}
