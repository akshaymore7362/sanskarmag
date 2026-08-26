"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { articleService } from "@/services/articleService";
import type { Article } from "@/types";

export function LeadershipLens() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    articleService.fetchLeadershipLensArticles().then((items) => {
      if (items && items.length > 0) {
        setArticles(items);
      } else {
        articleService.fetchSanityArticles().then((all) => {
          setArticles(all.length > 6 ? all.slice(6) : all);
        });
      }
    });
  }, []);

  if (articles.length === 0) return null;

  const featureStory = articles[0];
  const numberedGrid = articles.slice(1, 5); // 01, 02, 03, 04

  return (
    <div className="tsw-band tsw-band--paper">
      <section className="tsw-band-inner">
        <div className="tsw-head">
          <div>
            <span className="tsw-kicker">C-Suite Views</span>
            <h2 className="tsw-title">Leadership Lens</h2>
          </div>
          <p className="tsw-lede">
            Ideas, decisions and perspectives from the people shaping tomorrow.
          </p>
        </div>

        {featureStory && (
          <div className="tsw-feature-row">
            <div className="tsw-feature-img" style={{ height: "340px" }}>
              {featureStory.image && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={featureStory.image} alt={featureStory.title} />
              )}
            </div>
            <div className="tsw-feature-body">
              <span className="tsw-feature-meta">
                {featureStory.category || "Global Strategy"} <span>· {featureStory.date}</span>
              </span>
              <h3><Link href={`/blogs/${featureStory.slug}`}>{featureStory.title}</Link></h3>
              {featureStory.description && <p>{featureStory.description}</p>}
              <span className="tsw-feature-meta"><span>By {featureStory.author} · {featureStory.readTime}</span></span>
              <Link href={`/blogs/${featureStory.slug}`} className="tsw-link" style={{ marginTop: "4px" }}>
                Read full story <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        )}

        {numberedGrid.length > 0 && (
          <>
            <div className="tsw-numbered">
              {numberedGrid.map((item, idx) => (
                <div key={item.slug || String(idx)} className="tsw-numbered-item">
                  <span className="tsw-numbered-num">{String(idx + 1).padStart(2, "0")}</span>
                  <span className="tsw-eyebrow-sm">{item.category || "Perspective"} · {item.date}</span>
                  <h4><Link href={`/blogs/${item.slug}`}>{item.title}</Link></h4>
                  {item.description && <p>{item.description}</p>}
                </div>
              ))}
            </div>
            <div className="tsw-section-foot">
              <Link href="/blogs" className="tsw-link">
                Explore leadership perspectives <ArrowRight size={14} />
              </Link>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
