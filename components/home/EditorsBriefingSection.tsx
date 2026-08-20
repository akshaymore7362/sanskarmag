"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { articleService } from "@/services/articleService";
import type { Article } from "@/types";

export function EditorsBriefingSection() {
  const [picks, setPicks] = useState<Article[]>([]);

  useEffect(() => {
    articleService.fetchSanityArticles().then((items) => {
      if (items && items.length > 0) {
        setPicks(items.slice(0, 6));
      }
    });
  }, []);

  if (picks.length === 0) return null;

  return (
    <section className="section">
      <div className="section-label">Trending Now</div>
      <div className="trending-grid">
        {picks.map((article, index) => {
          const tagClass =
            index % 6 === 0
              ? "tag-strategy"
              : index % 6 === 1
              ? "tag-marketing"
              : index % 6 === 2
              ? "tag-tech"
              : index % 6 === 3
              ? "tag-leadership"
              : index % 6 === 4
              ? "tag-finance"
              : "tag-startups";

          return (
            <article key={article.slug || String(index)} className="card card-medium">
              {article.image && (
                <div className="card-img">
                  <Image src={article.image} alt={article.title} width={400} height={220} unoptimized />
                </div>
              )}
              <span className={`tag ${tagClass}`}>{article.category}</span>
              <h3 className="card-title">
                <Link href={`/articles/${article.slug}`}>{article.title}</Link>
              </h3>
              <div className="card-meta">
                <span>{article.author}</span>
                <span className="card-meta-dot" />
                <span>{article.readTime}</span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
