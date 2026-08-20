"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { articleService } from "@/services/articleService";
import type { Article } from "@/types";

export function MarketIntelligenceSection() {
  const [reports, setReports] = useState<Article[]>([]);

  useEffect(() => {
    articleService.fetchSanityArticles().then((items) => {
      if (items && items.length > 0) {
        setReports(items.slice(0, 6));
      }
    });
  }, []);

  if (reports.length === 0) return null;

  const lead = reports[0];
  const sideItems = reports.slice(1, 5);

  return (
    <section className="section">
      <div className="section-label">Market Intelligence</div>
      <div className="market-intel-grid">
        {/* Left Column: Main Lead Report */}
        {lead && (
          <div className="card card-large">
            <div className="card-img" style={{ height: "360px", borderRadius: "12px", overflow: "hidden", position: "relative", marginBottom: "20px" }}>
              {lead.image && (
                <Image
                  src={lead.image}
                  alt={lead.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              )}
            </div>
            <span className="tag tag-finance">{lead.category || "Market Analysis"}</span>
            <h3 className="card-title" style={{ fontFamily: "var(--serif)", fontSize: "28px", fontWeight: 800, margin: "12px 0", lineHeight: 1.2 }}>
              <Link href={`/articles/${lead.slug}`}>{lead.title}</Link>
            </h3>
            <p style={{ color: "var(--text-grey)", fontSize: "16px", lineHeight: 1.6, marginBottom: "16px" }}>
              {lead.description}
            </p>
            <div className="card-meta">
              <span>{lead.author}</span>
              <span className="card-meta-dot" />
              <span>{lead.date}</span>
              <span className="card-meta-dot" />
              <span>{lead.readTime}</span>
            </div>
          </div>
        )}

        {/* Right Column: Stacked Compact Reports */}
        <div style={{ borderLeft: "1px solid var(--border-grey)", paddingLeft: "48px", display: "flex", flexDirection: "column" }}>
          {sideItems.map((article, index) => (
            <article className="card-compact" key={article.slug || String(index)}>
              {article.image && (
                <div className="card-img">
                  <Image src={article.image} alt={article.title} width={90} height={70} unoptimized />
                </div>
              )}
              <div>
                <span className="tag tag-tech">{article.category}</span>
                <div className="card-title">
                  <Link href={`/articles/${article.slug}`}>{article.title}</Link>
                </div>
                <div className="card-meta">
                  <span>{article.readTime}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
