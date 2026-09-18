"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import { PageIntro } from "@/components/editorial/PageIntro";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { articleService } from "@/services/articleService";
import type { Article } from "@/types";

const filterCategories = ["All", "Opinion", "Analysis", "Strategy", "Culture", "Research"];

function matchesCategory(article: Article, category: string): boolean {
  if (!article) return false;
  if (category.toLowerCase() === "all") return true;
  const cat = category.toLowerCase();
  const artCat = (article.category || "").toLowerCase();
  const format = (article.contentType || "").toLowerCase();
  const title = (article.title || "").toLowerCase();
  const desc = (article.description || "").toLowerCase();

  if (cat === "opinion") {
    return format === "opinion" || artCat === "leadership" || artCat === "culture" || artCat === "cover story" || title.includes("bold") || desc.includes("mindset");
  }
  if (cat === "analysis") {
    return format === "analysis" || artCat === "technology" || artCat === "finance" || artCat === "economy" || artCat === "healthcare";
  }
  if (cat === "strategy") {
    return artCat === "business" || artCat === "startups" || artCat === "leadership";
  }
  if (cat === "culture") {
    return artCat === "culture" || artCat === "leadership" || desc.includes("culture") || desc.includes("work");
  }
  if (cat === "research") {
    return artCat === "technology" || artCat === "healthcare" || artCat === "economy" || title.includes("data") || title.includes("quantum");
  }
  return artCat.includes(cat) || format.includes(cat);
}

type Props = {
  initialCategory?: string;
};

export function InsightsView({ initialCategory = "All" }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [insightList, setInsightList] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    articleService
      .fetchSanityInsights()
      .then((items) => {
        if (items && items.length > 0) {
          setInsightList(items);
        }
      })
      .finally(() => setIsLoading(false));
  }, []);

  const filteredInsights = useMemo(() => {
    return insightList.filter((art) => matchesCategory(art, selectedCategory));
  }, [insightList, selectedCategory]);

  const featured = filteredInsights[0];
  const items = filteredInsights.slice(1);

  return (
    <main className="insights-page site-shell inner-shell" style={{ background: "#F3F4F6", minHeight: "100vh", paddingBottom: "60px" }}>
      <PageIntro
        title="Insights"
        intro="Opinion, analysis and strategic essays for leaders who need sharper judgment."
        eyebrow="Voices & Analysis"
      />

      <div style={{ width: "100%", maxWidth: "100%", margin: "0 auto" }}>
        {/* Navigation Category Bar */}
        <div style={{ display: "flex", gap: "20px", borderBottom: "2px solid #E5E7EB", marginBottom: "28px", overflowX: "auto" }}>
          {filterCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: "10px 0",
                fontSize: "14px",
                fontWeight: 700,
                color: selectedCategory === cat ? "#102A43" : "#4B5563",
                borderBottom: selectedCategory === cat ? "3px solid #102A43" : "none",
                marginBottom: "-2px",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Loading Skeleton */}
        {isLoading && insightList.length === 0 && (
          <section style={{ marginBottom: "40px" }}>
            <div className="skeleton-pulse" style={{ width: "100%", height: 340, borderRadius: 20, marginBottom: 24 }} />
            <div className="latest-articles-grid">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i}>
                  <div className="skeleton-pulse" style={{ width: "100%", height: 230, borderRadius: 18, marginBottom: 10 }} />
                  <div className="skeleton-pulse" style={{ width: "80%", height: 16 }} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Featured Insight */}
        {featured && (
          <section style={{ marginBottom: "40px" }}>
            <div className="featured-split-grid" style={{ background: "#102A43", border: "1px solid rgba(255, 255, 255, 0.12)", borderRadius: "20px", overflow: "hidden", gap: 0 }}>
              <div style={{ padding: "40px", color: "#FFFFFF", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <span className="hero-gold-pill-sm" style={{ background: "#102A43", color: "#F7F5EF", padding: "3px 8px", borderRadius: "4px", fontSize: "10px", fontWeight: 800, width: "fit-content", marginBottom: "12px" }}>
                  FEATURED INSIGHT
                </span>
                <h2 className="font-serif" style={{ fontSize: "32px", fontWeight: 900, color: "#FFFFFF", marginBottom: "14px", lineHeight: 1.2 }}>
                  <Link href={`/blogs/${featured.slug}`}>{featured.title}</Link>
                </h2>
                <p style={{ color: "#94A3B8", fontSize: "15px", lineHeight: 1.6, marginBottom: "24px" }}>
                  {featured.description}
                </p>
                <Link href={`/blogs/${featured.slug}`} className="btn btn-blue-gradient" style={{ width: "fit-content" }}>
                  <span>Read Insight</span>
                  <ArrowRight size={16} />
                </Link>
              </div>

              {featured.image && (
                <div style={{ position: "relative", minHeight: "340px" }}>
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              )}
            </div>
          </section>
        )}

        {/* 3-Column White Grid */}
        <section style={{ marginBottom: "48px" }}>
          <div className="section-header-row" style={{ marginBottom: "20px" }}>
            <h2 className="font-serif" style={{ fontSize: "24px", fontWeight: 800, color: "#102A43" }}>More Strategic Essays</h2>
          </div>

          <div className="latest-articles-grid">
            {(items.length > 0 ? items : filteredInsights).map((article, idx) => (
              <article
                key={article.slug || String(idx)}
                className="tsw-card essay-card"
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E5E7EB",
                  borderRadius: "18px",
                  overflow: "hidden",
                  boxShadow: "0 6px 22px rgba(16, 42, 67, 0.08)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {article.image && (
                  <div className="essay-card-media" style={{ position: "relative", height: "230px", overflow: "hidden" }}>
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover essay-card-img"
                      unoptimized
                      style={{ transition: "transform 0.5s ease" }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(180deg, rgba(16,42,67,0) 50%, rgba(16,42,67,0.6) 100%)",
                      }}
                    />
                    <span
                      style={{
                        position: "absolute",
                        top: "14px",
                        left: "14px",
                        fontSize: "10px",
                        fontWeight: 800,
                        letterSpacing: "1px",
                        textTransform: "uppercase",
                        color: "#FFFFFF",
                        background: "rgba(16, 42, 67, 0.85)",
                        padding: "5px 12px",
                        borderRadius: "20px",
                      }}
                    >
                      {article.category || "Insight"}
                    </span>
                  </div>
                )}
                <div style={{ padding: "22px", display: "flex", flexDirection: "column", flex: 1 }}>
                  {!article.image && (
                    <span style={{ fontSize: "10px", fontWeight: 800, letterSpacing: "1px", textTransform: "uppercase", color: "#7C3AED", marginBottom: "6px" }}>{article.category || "Insight"}</span>
                  )}
                  <h3 className="font-serif" style={{ fontSize: "18px", fontWeight: 800, color: "#102A43", margin: "0 0 12px", lineHeight: 1.35 }}>
                    <Link href={`/blogs/${article.slug}`}>{article.title}</Link>
                  </h3>
                  <div
                    style={{
                      marginTop: "auto",
                      paddingTop: "14px",
                      borderTop: "1px solid #F1F5F9",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "10px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: "#4B5563", fontWeight: 600 }}>
                      <Clock size={12} />
                      <span>{article.readTime}</span>
                    </div>
                    <Link
                      href={`/blogs/${article.slug}`}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                        fontSize: "11px",
                        fontWeight: 800,
                        letterSpacing: "0.5px",
                        textTransform: "uppercase",
                        color: "#102A43",
                        textDecoration: "none",
                      }}
                    >
                      Read Essay
                      <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Newsletter Component */}
        <NewsletterSection />
      </div>
    </main>
  );
}
