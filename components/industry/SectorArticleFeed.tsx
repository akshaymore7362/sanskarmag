"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, User, ChevronDown } from "lucide-react";
import type { Article } from "@/types";

interface Props {
  industryName: string;
  topics: string[];
  articles: Article[];
}

export function SectorArticleFeed({ industryName, topics, articles }: Props) {
  const [activeTopic, setActiveTopic] = useState("All Intelligence");
  const [visibleCount, setVisibleCount] = useState(5);

  const categoryList = ["All Intelligence", ...topics];

  const filteredArticles = useMemo(() => {
    if (activeTopic === "All Intelligence") return articles;
    return articles.filter((art) => {
      const cat = art.category || "";
      const title = art.title || "";
      const desc = art.description || "";
      const q = activeTopic.toLowerCase();
      return (
        cat.toLowerCase().includes(q) ||
        title.toLowerCase().includes(q) ||
        desc.toLowerCase().includes(q)
      );
    });
  }, [articles, activeTopic]);

  const visibleArticles = filteredArticles.slice(0, visibleCount);

  return (
    <section style={{ width: "100%", maxWidth: "1280px", margin: "0 auto 36px", padding: "0 6vw" }}>
      {/* SECTION HEADER & INTERACTIVE TOPIC FILTER BAR */}
      <div style={{ marginBottom: "20px", paddingBottom: "12px", borderBottom: "2px solid #0A192F", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <span style={{ fontSize: "10px", fontWeight: 800, color: "#C5A059", letterSpacing: "1.5px", textTransform: "uppercase" }}>
            EXECUTIVE INTELLIGENCE STREAM
          </span>
          <h3 className="font-serif" style={{ fontSize: "24px", fontWeight: 900, color: "#0A192F", margin: "2px 0 0" }}>
            Latest {industryName} Briefings ({filteredArticles.length})
          </h3>
        </div>

        {/* Interactive Topic Filter Pills */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
          {categoryList.map((topic) => {
            const isActive = activeTopic === topic;
            return (
              <button
                key={topic}
                type="button"
                onClick={() => {
                  setActiveTopic(topic);
                  setVisibleCount(5);
                }}
                style={{
                  padding: "6px 14px",
                  borderRadius: "20px",
                  fontSize: "11px",
                  fontWeight: 700,
                  border: isActive ? "1px solid #0A192F" : "1px solid #E5E7EB",
                  background: isActive ? "#0A192F" : "#FFFFFF",
                  color: isActive ? "#FFFFFF" : "#4B5563",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: isActive ? "0 2px 8px rgba(80, 7, 28, 0.2)" : "none",
                }}
              >
                {topic}
              </button>
            );
          })}
        </div>
      </div>

      {/* RICH EDITORIAL ARTICLE ROSTER (WITH THUMBNAILS & DETAILS) */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {visibleArticles.map((art, aIdx) => (
          <article
            key={art.slug || String(aIdx)}
            className="article-feed-row"
            style={{
              padding: "16px",
              background: "#FFFFFF",
              border: "1px solid #E5E7EB",
              borderRadius: "12px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.02)",
              transition: "all 0.2s ease",
            }}
          >
            {/* Left Thumbnail Image */}
            <Link href={`/blogs/${art.slug}`}>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "16 / 10",
                  borderRadius: "8px",
                  overflow: "hidden",
                  background: "#050C18",
                  border: "1px solid #E5E7EB",
                }}
              >
                {art.image ? (
                  <Image src={art.image} alt={art.title} fill className="object-cover" unoptimized />
                ) : (
                  <div style={{ height: "100%", display: "grid", placeItems: "center", background: "#0A192F", color: "#C5A059", fontWeight: 800, fontSize: "12px" }}>
                    TSW
                  </div>
                )}
              </div>
            </Link>

            {/* Center Content */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                <span style={{ fontSize: "9px", fontWeight: 800, letterSpacing: "1.2px", textTransform: "uppercase", color: "#0A192F", background: "rgba(80, 7, 28, 0.06)", padding: "2px 8px", borderRadius: "4px" }}>
                  {art.category || industryName.toUpperCase()}
                </span>
                <span style={{ fontSize: "11px", color: "#94A3B8" }}>{art.date || "May 2026"}</span>
              </div>

              <h4
                className="font-serif"
                style={{
                  fontSize: "18px",
                  fontWeight: 800,
                  color: "#0A192F",
                  margin: "0 0 6px",
                  lineHeight: 1.3,
                }}
              >
                <Link href={`/blogs/${art.slug}`} style={{ color: "#0A192F", textDecoration: "none" }}>
                  {art.title}
                </Link>
              </h4>

              <p
                style={{
                  fontSize: "12px",
                  color: "#6B7280",
                  lineHeight: 1.5,
                  margin: "0 0 8px",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {art.description || `Executive briefing on key technological, clinical and economic developments across the ${industryName} sector.`}
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "11px", color: "#4B5563" }}>
                <div style={{ width: "16px", height: "16px", borderRadius: "50%", background: "#E5E7EB", display: "grid", placeItems: "center", color: "#0A192F" }}>
                  <User size={9} />
                </div>
                <span style={{ fontWeight: 600, color: "#4B5563" }}>{art.author || "Editorial Board"}</span>
                <span>•</span>
                <span><Clock size={10} style={{ display: "inline", marginRight: "3px" }} />{art.readTime || "5 min read"}</span>
              </div>
            </div>

            {/* Right Action Button */}
            <div style={{ textAlign: "right", display: "flex", justifyContent: "flex-end" }}>
              <Link
                href={`/blogs/${art.slug}`}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "rgba(80, 7, 28, 0.06)",
                  border: "1px solid rgba(80, 7, 28, 0.15)",
                  display: "grid",
                  placeItems: "center",
                  color: "#0A192F",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
              >
                <ArrowRight size={15} />
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* LOAD MORE BUTTON */}
      {visibleCount < filteredArticles.length && (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "24px" }}>
          <button
            type="button"
            onClick={() => setVisibleCount((prev) => prev + 5)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "10px 24px",
              background: "#FFFFFF",
              border: "2px solid #0A192F",
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: 800,
              color: "#0A192F",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(80, 7, 28, 0.05)",
              transition: "all 0.2s ease",
            }}
          >
            <span>Load More Briefings ({filteredArticles.length - visibleCount} remaining)</span>
            <ChevronDown size={14} style={{ color: "#C5A059" }} />
          </button>
        </div>
      )}
    </section>
  );
}
