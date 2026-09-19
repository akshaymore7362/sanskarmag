
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { articleService } from "@/services/articleService";
import type { Article } from "@/types";

export function LatestIndustryIntelligence() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    articleService
      .fetchSanityArticles()
      .then((items) => {
        if (items && items.length > 0) setArticles(items.slice(0, 5));
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (!isLoading && articles.length === 0) return null;

  return (
    <div>
      <div style={{ marginBottom: "16px", paddingBottom: "10px", borderBottom: "2px solid #102A43", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 className="font-serif" style={{ fontSize: "20px", fontWeight: 800, color: "#102A43", margin: 0 }}>
          Latest Industry Intelligence
        </h2>
        <Link href="/blogs" style={{ fontSize: "12px", fontWeight: 700, color: "#102A43", textDecoration: "none" }}>
          View All Articles →
        </Link>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {isLoading && articles.length === 0 &&
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} style={{ padding: "16px 0", borderBottom: "1px solid #E5E7EB" }} className="latest-intelligence-row">
              <div className="skeleton-pulse" style={{ width: "100%", aspectRatio: "16 / 10", borderRadius: "8px" }} />
              <div>
                <div className="skeleton-pulse" style={{ width: "30%", height: 10, marginBottom: 8 }} />
                <div className="skeleton-pulse" style={{ width: "80%", height: 16, marginBottom: 8 }} />
                <div className="skeleton-pulse" style={{ width: "50%", height: 12 }} />
              </div>
            </div>
          ))}

        {articles.map((item, idx) => (
          <article
            key={item.slug || String(idx)}
            className="latest-intelligence-row"
            style={{
              padding: "16px 0",
              borderBottom: "1px solid #E5E7EB",
            }}
          >
            {/* Thumbnail */}
            <Link href={`/blogs/${item.slug}`}>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "16 / 10",
                  borderRadius: "8px",
                  overflow: "hidden",
                  background: "#0B1E30",
                  border: "1px solid #E5E7EB",
                }}
              >
                <Image src={item.image} alt={item.title} fill className="object-cover" unoptimized />
              </div>
            </Link>

            {/* Details */}
            <div>
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 800,
                  letterSpacing: "1.2px",
                  textTransform: "uppercase",
                  color: "#102A43",
                  display: "block",
                  marginBottom: "3px",
                }}
              >
                {item.category}
              </span>

              <h3
                className="font-serif"
                style={{
                  fontSize: "16px",
                  fontWeight: 800,
                  color: "#102A43",
                  margin: "0 0 4px",
                  lineHeight: 1.25,
                }}
              >
                <Link href={`/blogs/${item.slug}`} style={{ color: "#102A43", textDecoration: "none" }}>
                  {item.title}
                </Link>
              </h3>

              <p
                style={{
                  fontSize: "12px",
                  color: "#6B7280",
                  lineHeight: 1.45,
                  margin: "0 0 6px",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {item.description}
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: "#4B5563" }}>
                <span>{item.date}</span>
                <span>•</span>
                <span><Clock size={11} style={{ display: "inline", marginRight: "3px" }} />{item.readTime}</span>
              </div>
            </div>

            {/* Arrow */}
            <div style={{ textAlign: "right" }}>
              <Link
                href={`/blogs/${item.slug}`}
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background: "rgba(80, 7, 28, 0.06)",
                  display: "grid",
                  placeItems: "center",
                  color: "#102A43",
                  textDecoration: "none",
                }}
              >
                <ArrowRight size={14} />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
