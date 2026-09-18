"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Clock, User, Bookmark } from "lucide-react";
import { articleService } from "@/services/articleService";
import { industryService } from "@/services/industryService";
import type { Article } from "@/types";

export function LatestArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch live published articles from Sanity
    articleService
      .fetchSanityArticles()
      .then((items) => {
        if (items && items.length > 0) {
          setArticles(items);
        }
      })
      .finally(() => setIsLoading(false));

    // Fetch live industry categories from Sanity
    industryService.fetchSanityIndustries().then((inds) => {
      if (inds && inds.length > 0) {
        const names = ["All", ...inds.map((i) => i.name)];
        setCategories(Array.from(new Set(names)));
      }
    });
  }, []);

  // Filter articles by active category selection
  const filteredArticles = useMemo(() => {
    if (activeCategory === "All") return articles;
    const catLower = activeCategory.toLowerCase();
    return articles.filter((art) => {
      const artCat = (art.category || "").toLowerCase();
      const indSlug = (art.industrySlug || "").toLowerCase();
      return artCat.includes(catLower) || indSlug.includes(catLower) || catLower.includes(indSlug);
    });
  }, [articles, activeCategory]);

  const leadArticle = filteredArticles[0] || articles[0];
  const sideArticles = filteredArticles.slice(1, 6);

  if (isLoading && articles.length === 0) {
    return (
      <section className="latest-showcase-section" aria-label="Latest Articles Editorial Showcase">
        <div className="showcase-container">
          <div className="showcase-header">
            <div className="showcase-title-wrap">
              <span className="showcase-eyebrow">
                <Sparkles size={13} className="sparkle-icon" />
                CURATED NEWSROOM
              </span>
              <h2 className="showcase-title">Latest Articles & Intelligence</h2>
            </div>
          </div>
          <div className="showcase-grid">
            <div className="skeleton-pulse" style={{ width: "100%", aspectRatio: "16 / 10", borderRadius: 10 }} />
            <div className="side-story-feed">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} style={{ display: "flex", gap: 12 }}>
                  <div className="skeleton-pulse" style={{ width: 86, height: 68, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div className="skeleton-pulse" style={{ width: "70%", height: 12, marginBottom: 8 }} />
                    <div className="skeleton-pulse" style={{ width: "95%", height: 14 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!isLoading && articles.length === 0) return null;

  return (
    <section className="latest-showcase-section" aria-label="Latest Articles Editorial Showcase">
      <div className="showcase-container">
        {/* Section Header with Category Tabs */}
        <div className="showcase-header">
          <div className="showcase-title-wrap">
            <span className="showcase-eyebrow">
              <Sparkles size={13} className="sparkle-icon" />
              CURATED NEWSROOM
            </span>
            <h2 className="showcase-title">Latest Articles & Intelligence</h2>
          </div>

          <div className="showcase-category-tabs" role="tablist">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={activeCategory === cat}
                className={`showcase-tab ${activeCategory === cat ? "active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Main Editorial Grid: Asymmetric High-Impact Layout */}
        <div className="showcase-grid">
          {/* Left Column: Lead Showcase Article */}
          {leadArticle && (
            <article className="lead-showcase-card">
              <div className="lead-media-wrap">
                {leadArticle.image && (
                  <Image
                    src={leadArticle.image}
                    alt={leadArticle.imageAlt || leadArticle.title}
                    fill
                    className="lead-media-img"
                    unoptimized
                  />
                )}
                <div className="lead-media-overlay" />
                <div className="lead-badge-strip">
                  <span className="gold-pill">{leadArticle.category || "Editorial Focus"}</span>
                  <span className="time-pill">
                    <Clock size={12} />
                    {leadArticle.readTime}
                  </span>
                </div>
              </div>

              <div className="lead-content">
                <h3 className="lead-headline">
                  <Link href={`/articles/${leadArticle.slug}`}>
                    {leadArticle.title}
                  </Link>
                </h3>

                <p className="lead-excerpt">{leadArticle.description}</p>

                <div className="lead-meta-footer">
                  <div className="lead-author">
                    <User size={14} className="author-icon" />
                    <span>{leadArticle.author}</span>
                    <span className="meta-dot">•</span>
                    <span>{leadArticle.date}</span>
                  </div>

                  <Link href={`/articles/${leadArticle.slug}`} className="lead-action-btn">
                    <span>Read Story</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </article>
          )}

          {/* Right Column: Numbered Editorial Story Feed */}
          <div className="side-story-feed">
            {sideArticles.map((story, idx) => (
              <article key={story.id || story.slug || String(idx)} className="side-story-item">
                <span className="story-number">{String(idx + 1).padStart(2, "0")}</span>

                <div className="story-body">
                  <div className="story-meta-top">
                    <span className="story-category-tag">{story.category}</span>
                    <span className="story-date-tag">{story.date}</span>
                  </div>

                  <h4 className="story-headline">
                    <Link href={`/articles/${story.slug}`}>
                      {story.title}
                    </Link>
                  </h4>

                  <div className="story-sub-meta">
                    <span>By {story.author}</span>
                    <span className="meta-dot">•</span>
                    <span>{story.readTime}</span>
                  </div>
                </div>

                {story.image && (
                  <Link href={`/articles/${story.slug}`} className="story-thumb-wrap">
                    <Image
                      src={story.image}
                      alt={story.title}
                      width={86}
                      height={68}
                      className="story-thumb-img"
                      unoptimized
                    />
                  </Link>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
