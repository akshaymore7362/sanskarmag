import Image from "next/image";
import Link from "next/link";
import { articleService } from "@/services/articleService";

export function TrendingSidebar() {
  return (
    <aside className="editorial-sidebar">
      <h2>Trending Now</h2>
      {articleService.trending().map((article, index) => (
        <Link href={`/articles/${article.slug}`} key={article.slug} className="sidebar-story">
          <Image src={article.image} alt={article.imageAlt || article.title} width={82} height={58} style={{ width: 82, height: 58 }} />
          <span>{String(index + 1).padStart(2, "0")}</span>
          <div>
            <h3>{article.title}</h3>
            <p>{article.date}</p>
          </div>
        </Link>
      ))}
      <div className="sidebar-newsletter">
        <p className="gold-label">Newsletter</p>
        <h3>Executive Briefing</h3>
        <p>Weekly ideas, people and signals shaping business.</p>
        <Link href="/newsletter">Subscribe</Link>
      </div>
    </aside>
  );
}
