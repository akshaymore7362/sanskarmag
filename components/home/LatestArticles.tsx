import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { articleService } from "@/services/articleService";

export function LatestArticles() {
  return (
    <section className="latest section-light">
      <SectionHeading title="Latest Articles" linkText="View All Articles" />
      <div>
        {articleService.latest().map((article) => (
          <article key={article.id}>
            <Image src={article.image} alt="" width={220} height={145} style={{ width: "100%", height: "auto" }} />
            <p>{article.category}</p>
            <h3>{article.title}</h3>
            <small>{article.date} | {article.readTime}</small>
          </article>
        ))}
      </div>
    </section>
  );
}
