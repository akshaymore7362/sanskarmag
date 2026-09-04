"use client";

import Image from "next/image";
import Link from "next/link";
import { User, ArrowRight } from "lucide-react";
import type { Article } from "@/types";

interface Props {
  article: Article;
  index: number;
}

export function BlogArticleRow({ article, index }: Props) {
  const indexStr = String(index + 1).padStart(2, "0");

  return (
    <article
      className="blog-article-row"
      style={{
        padding: "16px 0",
        borderBottom: "1px solid #E5E7EB",
        position: "relative",
      }}
    >
      {/* 1. Gold Number Index Callout */}
      <div
        className="font-serif"
        style={{
          fontSize: "26px",
          fontWeight: 800,
          color: "#C5A059",
          opacity: 0.95,
        }}
      >
        {indexStr}
      </div>

      {/* 2. Article Image Thumbnail */}
      <Link href={`/blogs/${article.slug}`}>
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
          {article.image ? (
            <Image src={article.image} alt={article.title} fill className="object-cover" unoptimized />
          ) : (
            <div style={{ height: "100%", display: "grid", placeItems: "center", background: "#0A192F", color: "#C5A059", fontWeight: 800, fontSize: "14px" }}>
              TSW
            </div>
          )}
        </div>
      </Link>

      {/* 3. Center Content Details */}
      <div>
        <span
          style={{
            fontSize: "10px",
            fontWeight: 800,
            letterSpacing: "1.2px",
            textTransform: "uppercase",
            color: "#0A192F",
            display: "block",
            marginBottom: "3px",
          }}
        >
          {article.category || "ARTICLE"}
        </span>

        <h3
          className="font-serif"
          style={{
            fontSize: "18px",
            fontWeight: 800,
            color: "#0A192F",
            margin: "0 0 4px",
            lineHeight: 1.25,
          }}
        >
          <Link href={`/blogs/${article.slug}`} style={{ color: "#0A192F", textDecoration: "none" }}>
            {article.title}
          </Link>
        </h3>

        <p
          style={{
            fontSize: "12px",
            color: "#6B7280",
            lineHeight: 1.45,
            margin: "0 0 8px",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {article.description || "In-depth executive analysis exploring key industry dynamics, leadership strategy, and market growth."}
        </p>

        {/* Meta Author & Publication Date Row */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: "#4B5563" }}>
          <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: "#E5E7EB", display: "grid", placeItems: "center", color: "#0A192F" }}>
            <User size={10} />
          </div>
          <span style={{ fontWeight: 600, color: "#4B5563" }}>{article.author || "Editorial Board"}</span>
          <span>•</span>
          <span>{article.date || "May 20, 2024"}</span>
        </div>
      </div>

      {/* 4. Read Time Vertical Badge (Bold 5 on top, MIN READ below) */}
      <div style={{ textAlign: "right" }}>
        <div style={{ fontSize: "20px", fontWeight: 900, color: "#0A192F", lineHeight: 1 }}>
          {article.readTime ? article.readTime.replace(/[^0-9]/g, "") || "5" : "5"}
        </div>
        <div style={{ fontSize: "8px", fontWeight: 800, color: "#94A3B8", letterSpacing: "0.8px", textTransform: "uppercase", marginTop: "2px" }}>
          MIN READ
        </div>
      </div>
    </article>
  );
}
