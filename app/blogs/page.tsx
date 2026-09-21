"use client";

import { useEffect, useState, useMemo } from "react";
import { BlogHeroBanner } from "@/components/blog/BlogHeroBanner";
import { BlogFilterBar } from "@/components/blog/BlogFilterBar";
import { BlogArticleRow } from "@/components/blog/BlogArticleRow";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import { BlogValueStrip } from "@/components/blog/BlogValueStrip";
import { articleService } from "@/services/articleService";
import type { Article } from "@/types";

const categoryTabs = ["All Articles", "Technology", "Business", "Leadership", "Economy", "Healthcare", "Legal", "Lifestyle"];

export default function BlogsPage() {
  const [sanityArticles, setSanityArticles] = useState<Article[]>([]);
  const [activeCategory, setActiveCategory] = useState("All Articles");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    articleService
      .fetchSanityArticles()
      .then((items) => {
        if (items && items.length > 0) {
          setSanityArticles(items);
        }
      })
      .finally(() => setIsLoading(false));
  }, []);

  // ONLY authentic Sanity published articles uploaded by user
  const allArticlesList = useMemo(() => {
    return sanityArticles;
  }, [sanityArticles]);

  // Filter by category & search query
  const filteredArticles = useMemo(() => {
    return allArticlesList.filter((art) => {
      const matchesCategory =
        activeCategory === "All Articles" ||
        (art.category && art.category.toLowerCase().includes(activeCategory.toLowerCase())) ||
        (art.title && art.title.toLowerCase().includes(activeCategory.toLowerCase())) ||
        (art.description && art.description.toLowerCase().includes(activeCategory.toLowerCase()));

      const matchesSearch =
        !searchQuery.trim() ||
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (art.description && art.description.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [allArticlesList, activeCategory, searchQuery]);

  const visibleArticles = filteredArticles.slice(0, visibleCount);

  return (
    <main style={{ background: "var(--editorial-ivory, #F7F5EF)", minHeight: "100vh", paddingBottom: "24px" }}>
      {/* 1. Hero Banner */}
      <BlogHeroBanner />

      {/* 2. Category Filter & Search Bar */}
      <BlogFilterBar
        categories={categoryTabs}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* 3. Main 2-Column Feed Layout */}
      <div
        className="grid-sidebar-layout"
        style={{
          width: "100%",
          maxWidth: "100%",
          margin: "0 auto",
          padding: "0 clamp(16px, 2.5vw, 40px) 24px",
        }}
      >
        {/* Left Column: Numbered Editorial Article Feed */}
        <div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {isLoading && visibleArticles.length === 0
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} style={{ display: "flex", gap: 16, padding: "16px 0", borderBottom: "1px solid #E5E7EB" }}>
                    <div className="skeleton-pulse" style={{ width: 140, height: 100, flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div className="skeleton-pulse" style={{ width: "30%", height: 12, marginBottom: 10 }} />
                      <div className="skeleton-pulse" style={{ width: "85%", height: 18, marginBottom: 10 }} />
                      <div className="skeleton-pulse" style={{ width: "50%", height: 12 }} />
                    </div>
                  </div>
                ))
              : visibleArticles.map((article, idx) => (
                  <BlogArticleRow key={article.slug || String(idx)} article={article} index={idx} />
                ))}
          </div>

          {/* Load More Button */}
          {visibleCount < filteredArticles.length && (
            <div style={{ display: "flex", justifyContent: "center", marginTop: "24px" }}>
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => prev + 6)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "9px 24px",
                  background: "#FFFFFF",
                  border: "2px solid #102A43",
                  borderRadius: "20px",
                  fontSize: "12px",
                  fontWeight: 800,
                  color: "#102A43",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                <span>Load More Articles</span>
                <span style={{ color: "#102A43", fontWeight: 900 }}>↓</span>
              </button>
            </div>
          )}
        </div>

        {/* Right Sidebar Column */}
        <BlogSidebar trendingArticles={allArticlesList} />
      </div>

      {/* 4. Bottom Featured Value Strip */}
      <BlogValueStrip />
    </main>
  );
}
