"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { articleService } from "@/services/articleService";
import type { Article } from "@/types";

export function IntelligenceBrief() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    articleService.fetchIntelligenceBriefArticles().then((items) => {
      if (items && items.length > 0) {
        setArticles(items);
      } else {
        articleService.fetchSanityArticles().then((all) => setArticles(all));
      }
    });
  }, []);

  if (articles.length === 0) return null;

  // Editorial Mapping from Sanity Content
  const mainFeature = articles[0];
  const secondFeature = articles[1];
  const sidebarBriefing = articles[2];
  const numberedList = articles.slice(3, 7); // 01, 02, 03, 04

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section className="tsw-section">
      <div className="tsw-head">
        <div>
          <span className="tsw-kicker">Executive Insights</span>
          <h2 className="tsw-title">The Intelligence Brief</h2>
        </div>
        <p className="tsw-lede">
          What matters now across business, technology, markets and the global economy.
        </p>
      </div>

      <div className="tsw-feature-row stack3">
        {mainFeature && (
          <div className="tsw-feature-body">
            <div className="tsw-feature-img">
              {mainFeature.image && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={mainFeature.image} alt={mainFeature.title} />
              )}
            </div>
            <span className="tsw-feature-meta">{mainFeature.category || "Strategy"}</span>
            <h3><Link href={`/blogs/${mainFeature.slug}`}>{mainFeature.title}</Link></h3>
            {mainFeature.description && <p>{mainFeature.description}</p>}
            <span className="tsw-feature-meta"><span>{mainFeature.author} · {mainFeature.date}</span></span>
          </div>
        )}

        {secondFeature && (
          <div className="tsw-feature-body">
            <div className="tsw-feature-img">
              {secondFeature.image && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={secondFeature.image} alt={secondFeature.title} />
              )}
            </div>
            <span className="tsw-feature-meta">{secondFeature.category || "Global Markets"}</span>
            <h3><Link href={`/blogs/${secondFeature.slug}`}>{secondFeature.title}</Link></h3>
            {secondFeature.description && <p>{secondFeature.description}</p>}
            <span className="tsw-feature-meta"><span>{secondFeature.author} · {secondFeature.date}</span></span>
          </div>
        )}

        <aside className="tsw-brief-aside">
          {sidebarBriefing && (
            <div className="tsw-brief-divider">
              <span className="tsw-eyebrow-sm">Intelligence Briefing</span>
              <h4><Link href={`/blogs/${sidebarBriefing.slug}`}>{sidebarBriefing.title}</Link></h4>
              {sidebarBriefing.description && <p>{sidebarBriefing.description}</p>}
              <Link href={`/blogs/${sidebarBriefing.slug}`} className="tsw-link">
                Read briefing <ArrowRight size={13} />
              </Link>
            </div>
          )}
          <div>
            <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--ink)", marginBottom: "4px" }}>
              Stay informed in strategy
            </div>
            <p style={{ fontSize: "11.5px", color: "var(--ink-soft)", lineHeight: 1.45, margin: "0 0 12px" }}>
              Exclusive C-suite market briefings, delivered weekly.
            </p>
            {subscribed ? (
              <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--accent)" }}>
                ✓ Subscription confirmed. Welcome to The Intelligence Brief.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="tsw-brief-form">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit">Join</button>
              </form>
            )}
          </div>
        </aside>
      </div>

      {numberedList.length > 0 && (
        <>
          <div className="tsw-numbered">
            {numberedList.map((story, idx) => (
              <div key={story.slug || String(idx)} className="tsw-numbered-item">
                <span className="tsw-numbered-num">{String(idx + 1).padStart(2, "0")}</span>
                <span className="tsw-eyebrow-sm">{story.category || "Intelligence"}</span>
                <h4><Link href={`/blogs/${story.slug}`}>{story.title}</Link></h4>
                {story.description && <p>{story.description}</p>}
              </div>
            ))}
          </div>
          <div className="tsw-section-foot">
            <Link href="/blogs" className="tsw-link">
              View all intelligence briefings <ArrowRight size={14} />
            </Link>
          </div>
        </>
      )}
    </section>
  );
}
