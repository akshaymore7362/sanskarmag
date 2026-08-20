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
      style={{
        display: "grid",
        gridTemplateColumns: "40px 220px 1fr 70px",
        gap: "20px",
        alignItems: "center",
        padding: "16px 0",
        borderBottom: "1px solid #EAE7DC",
        position: "relative",
      }}
    >
      {/* 1. Gold Number Index Callout */}
      <div
        className="font-serif"
        style={{
          fontSize: "26px",
          fontWeight: 800,
          color: "#D49A24",
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
            background: "#151027",
            border: "1px solid #E5E2D9",
          }}
        >
          {article.image ? (
            <Image src={article.image} alt={article.title} fill className="object-cover" unoptimized />
          ) : (
            <div style={{ height: "100%", display: "grid", placeItems: "center", background: "#50071C", color: "#D49A24", fontWeight: 800, fontSize: "14px" }}>
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
            color: "#50071C",
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
            color: "#17151C",
            margin: "0 0 4px",
            lineHeight: 1.25,
          }}
        >
          <Link href={`/blogs/${article.slug}`} style={{ color: "#17151C", textDecoration: "none" }}>
            {article.title}
          </Link>
        </h3>

        <p
          style={{
            fontSize: "12px",
            color: "#66606C",
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
        <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: "#77727D" }}>
          <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: "#E5E2D9", display: "grid", placeItems: "center", color: "#50071C" }}>
            <User size={10} />
          </div>
          <span style={{ fontWeight: 600, color: "#4A454E" }}>{article.author || "Editorial Board"}</span>
          <span>•</span>
          <span>{article.date || "May 20, 2024"}</span>
        </div>
      </div>

      {/* 4. Read Time Vertical Badge (Bold 5 on top, MIN READ below) */}
      <div style={{ textAlign: "right" }}>
        <div style={{ fontSize: "20px", fontWeight: 900, color: "#17151C", lineHeight: 1 }}>
          {article.readTime ? article.readTime.replace(/[^0-9]/g, "") || "5" : "5"}
        </div>
        <div style={{ fontSize: "8px", fontWeight: 800, color: "#94A3B8", letterSpacing: "0.8px", textTransform: "uppercase", marginTop: "2px" }}>
          MIN READ
        </div>
      </div>
    </article>
  );
}
