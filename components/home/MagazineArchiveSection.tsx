import Image from "next/image";
import Link from "next/link";
import { MagazineCover } from "@/components/editorial/MagazineCover";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { articleService } from "@/services/articleService";
import { magazineService } from "@/services/magazineService";

export function MagazineArchiveSection() {
  const issue = magazineService.current();
  const issueStories = issue.stories
    .map((story) => articleService.bySlug(story.articleSlug))
    .filter((article): article is NonNullable<typeof article> => Boolean(article))
    .slice(0, 4);

  return (
    <section className="home-archive section-light">
      <SectionHeading title="From The Magazine" linkText="Open Current Issue" />
      <div className="magazine-package">
        <aside className="magazine-package-cover">
          <MagazineCover issue={issue} decorative />
          <Link href={`/magazine/${issue.slug}`}>Read The Full Issue</Link>
        </aside>
        <div className="magazine-package-main">
          <p className="gold-label">{issue.issue} | {issue.date}</p>
          <h3>{issue.title}</h3>
          <p>{issue.description}</p>
          <div className="magazine-toc-preview">
            {issue.stories.slice(0, 6).map((story) => (
              <Link href={`/articles/${story.articleSlug}`} key={story.id}>
                <span>{String(story.page).padStart(2, "0")}</span>
                <strong>{story.title}</strong>
                <small>{story.category} | {story.author}</small>
              </Link>
            ))}
          </div>
        </div>
        <div className="magazine-story-stack">
          {issueStories.map((article) => (
            <Link href={`/articles/${article.slug}`} key={article.slug}>
              <Image src={article.image} alt={article.imageAlt} width={130} height={88} style={{ width: 130, height: 88 }} />
              <div>
                <p>{article.category}</p>
                <h4>{article.title}</h4>
                <small>{article.date} | {article.readTime}</small>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
