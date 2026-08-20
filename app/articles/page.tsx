"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { PageIntro } from "@/components/editorial/PageIntro";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { articleService } from "@/services/articleService";
import type { Article } from "@/types";

export default function ArticlesPage() {
  const [articleList, setArticleList] = useState<Article[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    articleService.fetchSanityArticles().then((items) => {
      if (items && items.length > 0) {
        setArticleList(items);
      }
    });
  }, []);

  const categories = ["All", "Technology", "Business", "Finance", "Leadership", "Startups", "Healthcare", "Real Estate"];
  
  const filtered = activeCategory === "All" 
    ? articleList 
    : articleList.filter((a) => a.category?.toLowerCase() === activeCategory.toLowerCase());

  const featured = filtered[0];
  const sideArticles = filtered.slice(1, 4);
  const latestGrid = filtered.slice(4);

  return (
    <main className="articles-page site-shell inner-shell" style={{ background: "#F7F5F0", minHeight: "100vh", paddingBottom: "60px" }}>
      <PageIntro
        title="Articles & Stories"
        intro="Field reporting, executive interviews, technological breakthroughs and economic insights."
        eyebrow="Editorial Desk"
      />

      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Navigation Category Bar */}
        <div style={{ display: "flex", gap: "20px", borderBottom: "2px solid #E5E2D9", marginBottom: "28px", overflowX: "auto" }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: "10px 0",
                fontSize: "14px",
                fontWeight: 700,
                color: activeCategory === cat ? "#17151C" : "#77727D",
                borderBottom: activeCategory === cat ? "3px solid #D49A24" : "none",
                marginBottom: "-2px",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Section (Dark Card + Side List) */}
        {featured && (
          <section style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: "28px", marginBottom: "40px" }}>
            <div style={{ background: "#0F131F", border: "1px solid rgba(255, 255, 255, 0.12)", borderRadius: "16px", padding: "28px", color: "#FFFFFF", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              {featured.image && (
                <div style={{ position: "relative", height: "240px", borderRadius: "10px", overflow: "hidden", marginBottom: "18px" }}>
                  <Image src={featured.image} alt={featured.title} fill className="object-cover" unoptimized />
                </div>
              )}
              <div>
                <span className="hero-gold-pill-sm" style={{ background: "#D49A24", color: "#080A10", padding: "3px 8px", borderRadius: "4px", fontSize: "10px", fontWeight: 800 }}>FEATURED</span>
                <h2 className="font-serif" style={{ fontSize: "26px", fontWeight: 800, color: "#FFFFFF", margin: "10px 0 8px", lineHeight: 1.25 }}>
                  <Link href={`/blogs/${featured.slug}`}>{featured.title}</Link>
                </h2>
                <p style={{ color: "#94A3B8", fontSize: "14px", lineHeight: 1.5, marginBottom: "16px" }}>{featured.description}</p>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "#94A3B8" }}>
                  <span>{featured.author}</span>
                  <span>•</span>
                  <span><Clock size={12} /> {featured.readTime}</span>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {sideArticles.map((item, idx) => (
                <div key={item.slug || String(idx)} style={{ background: "#FFFFFF", border: "1px solid #E5E2D9", borderRadius: "12px", padding: "14px", display: "flex", gap: "14px", alignItems: "center" }}>
                  {item.image && (
                    <div style={{ position: "relative", width: "80px", height: "64px", borderRadius: "8px", overflow: "hidden", flexShrink: 0 }}>
                      <Image src={item.image} alt={item.title} fill className="object-cover" unoptimized />
                    </div>
                  )}
                  <div>
                    <h4 className="font-serif" style={{ fontSize: "14px", fontWeight: 700, color: "#17151C", lineHeight: 1.35, margin: "0 0 4px" }}>
                      <Link href={`/blogs/${item.slug}`}>{item.title}</Link>
                    </h4>
                    <span style={{ fontSize: "11px", color: "#77727D" }}>{item.readTime}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 3-Column White Grid */}
        <section style={{ marginBottom: "48px" }}>
          <div className="section-header-row" style={{ marginBottom: "20px" }}>
            <h2 className="font-serif" style={{ fontSize: "24px", fontWeight: 800, color: "#17151C" }}>Latest Articles</h2>
            <Link href="/blogs" style={{ fontSize: "13px", fontWeight: 700, color: "#D49A24", display: "inline-flex", alignItems: "center", gap: "4px" }}>
              View All <ArrowRight size={14} />
            </Link>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "24px" }}>
            {(latestGrid.length > 0 ? latestGrid : articleList).map((article, idx) => (
              <article key={article.slug || String(idx)} style={{ background: "#FFFFFF", border: "1px solid #E5E2D9", borderRadius: "14px", padding: "18px", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
                {article.image && (
                  <div style={{ position: "relative", height: "160px", borderRadius: "8px", overflow: "hidden", marginBottom: "12px" }}>
                    <Image src={article.image} alt={article.title} fill className="object-cover" unoptimized />
                  </div>
                )}
                <span style={{ fontSize: "10px", fontWeight: 800, letterSpacing: "1px", textTransform: "uppercase", color: "#7C3AED" }}>{article.category || "Article"}</span>
                <h3 className="font-serif" style={{ fontSize: "17px", fontWeight: 800, color: "#17151C", margin: "6px 0 8px", lineHeight: 1.3 }}>
                  <Link href={`/blogs/${article.slug}`}>{article.title}</Link>
                </h3>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: "#77727D" }}>
                  <Clock size={12} />
                  <span>{article.readTime}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Newsletter Section */}
        <NewsletterSection />
      </div>
    </main>
  );
}
