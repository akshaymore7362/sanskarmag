"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { articleService } from "@/services/articleService";
import type { Article } from "@/types";

export function FeaturedStories() {
  const [feature, setFeature] = useState<Article | null>(null);

  useEffect(() => {
    articleService.fetchSanityArticles().then((items) => {
      if (items && items.length > 0) {
        const featuredItems = items.filter((a: any) => a.featured || a.homePlacement?.featured);
        setFeature(featuredItems[0] || items[0]);
      }
    });
  }, []);

  if (!feature) return null;

  return (
    <section className="section">
      <div className="section-label">Editor's Pick</div>
      <div className="featured-strip">
        <div className="featured-strip-img">
          {feature.image && (
            <Image
              src={feature.image}
              alt={feature.title}
              width={600}
              height={420}
              className="featured-strip-src"
              unoptimized
            />
          )}
        </div>
        <div className="featured-strip-content">
          <div>
            <span className="tag tag-leadership">{feature.category || "Leadership"}</span>
          </div>
          <h2 className="featured-strip-headline">
            <Link href={`/blogs/${feature.slug}`}>{feature.title}</Link>
          </h2>
          <p className="featured-strip-excerpt">{feature.description}</p>
          <div className="hero-meta">
            <span>{feature.author}</span>
            <span className="card-meta-dot" />
            <span>{feature.date}</span>
            <span className="card-meta-dot" />
            <span>{feature.readTime}</span>
          </div>
          <div style={{ marginTop: "24px" }}>
            <Link href={`/blogs/${feature.slug}`} className="btn btn-primary">
              Read Story →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
