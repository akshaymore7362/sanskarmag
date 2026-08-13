import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/types";

type Props = {
  article: Article;
  compact?: boolean;
  dark?: boolean;
};

export function ArticleCard({ article, compact = false, dark = false }: Props) {
  return (
    <article className={`article-card ${compact ? "article-card-compact" : ""} ${dark ? "article-card-dark" : ""}`}>
      <Link href={`/articles/${article.slug}`} className="article-card-image">
        <Image src={article.image} alt={article.imageAlt} fill className="object-cover" />
      </Link>
      <div>
        <p>{article.category}</p>
        <h3><Link href={`/articles/${article.slug}`}>{article.title}</Link></h3>
        {!compact && <small>{article.description}</small>}
        <span>{article.date} | {article.readTime}</span>
      </div>
    </article>
  );
}
