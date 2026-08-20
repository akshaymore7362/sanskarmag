"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { articleService } from "@/services/articleService";
import type { Article } from "@/types";

export function InsightsSection() {
  const [insights, setInsights] = useState<Article[]>([]);

  useEffect(() => {
    articleService.fetchSanityInsights().then((items) => {
      if (items && items.length > 0) {
        setInsights(items.slice(0, 3));
      } else {
        articleService.fetchSanityArticles().then((all) => {
          setInsights(all.slice(0, 3));
        });
      }
    });
  }, []);

  if (insights.length === 0) return null;

  return (
    <section className="section">
      <div className="section-label">Voices & Insights</div>
      <div className="trending-grid">
        {insights.map((item, idx) => (
          <article key={item.slug || String(idx)} className="card card-medium">
            {item.image && (
              <div className="card-img">
                <Image src={item.image} alt={item.title} width={400} height={220} unoptimized />
              </div>
            )}
            <span className="tag tag-leadership">{item.category || "Insight"}</span>
            <h3 className="card-title">
              <Link href={`/articles/${item.slug}`}>{item.title}</Link>
            </h3>
            <div className="card-meta">
              <span>{item.author}</span>
              <span className="card-meta-dot" />
              <span>{item.readTime}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
