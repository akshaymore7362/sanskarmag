"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import { PageIntro } from "@/components/editorial/PageIntro";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { articleService } from "@/services/articleService";
import { insights as staticInsights } from "@/data/insights";
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
  const [insightList, setInsightList] = useState<Article[]>(staticInsights);

  useEffect(() => {
    articleService.fetchSanityInsights().then((items) => {
      if (items && items.length > 0) {
        setInsightList(items);
      }
    });
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

      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
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
                color: selectedCategory === cat ? "#0A192F" : "#4B5563",
                borderBottom: selectedCategory === cat ? "3px solid #C5A059" : "none",
                marginBottom: "-2px",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Insight */}
        {featured && (
          <section style={{ marginBottom: "40px" }}>
            <div style={{ background: "#0A192F", border: "1px solid rgba(255, 255, 255, 0.12)", borderRadius: "20px", overflow: "hidden", display: "grid", gridTemplateColumns: "1.2fr 1fr" }}>
              <div style={{ padding: "40px", color: "#FFFFFF", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <span className="hero-gold-pill-sm" style={{ background: "#C5A059", color: "#050C18", padding: "3px 8px", borderRadius: "4px", fontSize: "10px", fontWeight: 800, width: "fit-content", marginBottom: "12px" }}>
                  FEATURED INSIGHT
                </span>
                <h2 className="font-serif" style={{ fontSize: "32px", fontWeight: 900, color: "#FFFFFF", marginBottom: "14px", lineHeight: 1.2 }}>
                  <Link href={`/blogs/${featured.slug}`}>{featured.title}</Link>
                </h2>
                <p style={{ color: "#94A3B8", fontSize: "15px", lineHeight: 1.6, marginBottom: "24px" }}>
                  {featured.description}
                </p>
                <Link href={`/blogs/${featured.slug}`} className="btn btn-gold-gradient" style={{ width: "fit-content" }}>
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
            <h2 className="font-serif" style={{ fontSize: "24px", fontWeight: 800, color: "#0A192F" }}>More Strategic Essays</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "24px" }}>
            {(items.length > 0 ? items : filteredInsights).map((article, idx) => (
              <article key={article.slug || String(idx)} style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "14px", padding: "18px", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
                {article.image && (
                  <div style={{ position: "relative", height: "160px", borderRadius: "8px", overflow: "hidden", marginBottom: "12px" }}>
                    <Image src={article.image} alt={article.title} fill className="object-cover" unoptimized />
                  </div>
                )}
                <span style={{ fontSize: "10px", fontWeight: 800, letterSpacing: "1px", textTransform: "uppercase", color: "#7C3AED" }}>{article.category || "Insight"}</span>
                <h3 className="font-serif" style={{ fontSize: "17px", fontWeight: 800, color: "#0A192F", margin: "6px 0 8px", lineHeight: 1.3 }}>
                  <Link href={`/blogs/${article.slug}`}>{article.title}</Link>
                </h3>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: "#4B5563" }}>
                  <Clock size={12} />
                  <span>{article.readTime}</span>
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
