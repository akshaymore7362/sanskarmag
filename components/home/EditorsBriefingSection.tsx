import Image from "next/image";
import Link from "next/link";
import { articleService } from "@/services/articleService";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function EditorsBriefingSection() {
  const picks = articleService.all().slice(22, 30);

  return (
    <section className="editors-briefing section-light">
      <SectionHeading title="Editor's Briefing" linkText="Read The Brief" />
      <div className="briefing-grid">
        {picks.map((article, index) => (
          <article key={article.slug} className={index === 0 ? "briefing-lead-card" : ""}>
            <Link href={`/articles/${article.slug}`} className="briefing-image">
              <Image src={article.image} alt={article.imageAlt} fill className="object-cover" />
            </Link>
            <div>
              <p>{article.category}</p>
              <h3><Link href={`/articles/${article.slug}`}>{article.title}</Link></h3>
              <small>{article.description}</small>
              <span>{article.date} | {article.readTime}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
