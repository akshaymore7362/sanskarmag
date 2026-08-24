"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { articleService } from "@/services/articleService";
import type { Article } from "@/types";

export function BusinessBulletinSection() {
  const [stories, setStories] = useState<Article[]>([]);

  useEffect(() => {
    articleService.fetchSanityArticles().then((items) => {
      if (items && items.length > 0) {
        setStories(items.slice(0, 5));
      } else {
        setStories(articleService.all().slice(0, 5));
      }
    });
  }, []);

  if (stories.length === 0) return null;

  const lead = stories[0];
  const sideList = stories.slice(1, 5);

  return (
    <section style={{ width: "100%", maxWidth: "1280px", margin: "0 auto", padding: "48px 24px" }}>
      {/* Header Row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          borderBottom: "2px solid #ffdea5",
          paddingBottom: "14px",
          marginBottom: "32px",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div>
          <span style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "2px", color: "#775a19", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>
            BUSINESS BULLETIN
          </span>
          <h2 className="font-serif" style={{ fontSize: "clamp(18px, 2vw, 24px)", fontWeight: 800, color: "#191c1d", margin: 0 }}>
            Enterprise &amp; Market Intelligence
          </h2>
        </div>

        <Link
          href="/blogs"
          style={{
            fontSize: "12px",
            fontWeight: 800,
            letterSpacing: "1px",
            color: "#775a19",
            textTransform: "uppercase",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <span>View All Stories</span>
          <ArrowRight size={16} />
        </Link>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "32px" }}>
        {/* LEFT COLUMN: Main Feature */}
        {lead && (
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e1e3e4",
              borderRadius: "8px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
            }}
          >
            <div style={{ position: "relative", width: "100%", height: "340px" }}>
              {lead.image && (
                <Image
                  src={lead.image}
                  alt={lead.title}
                  fill
                  className="object-cover"
                  unoptimized
                  priority
                />
              )}
              <div
                style={{
                  position: "absolute",
                  top: "16px",
                  left: "16px",
                  background: "#fed488",
                  color: "#0a192f",
                  padding: "4px 12px",
                  fontSize: "11px",
                  fontWeight: 800,
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  borderRadius: "4px",
                }}
              >
                {lead.category || "LEGAL"}
              </div>
            </div>

            <div style={{ padding: "24px", display: "flex", flexDirection: "column", flex: 1 }}>
              <h3 className="font-serif" style={{ fontSize: "24px", fontWeight: 800, color: "#191c1d", margin: "0 0 12px", lineHeight: 1.3 }}>
                <Link href={`/blogs/${lead.slug}`} style={{ color: "#191c1d", textDecoration: "none" }}>{lead.title}</Link>
              </h3>

              <p style={{ fontSize: "14px", color: "#44474d", lineHeight: 1.6, margin: "0 0 20px" }}>
                {lead.description}
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: "16px", fontSize: "12px", fontWeight: 700, color: "#75777e", textTransform: "uppercase", marginTop: "auto" }}>
                <span>By {lead.author || "Editorial Board"}</span>
                <span style={{ display: "flex", alignItems: "center", gap: "4px", color: "#775a19" }}>
                  <Clock size={14} /> {lead.readTime || "5 min read"}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* RIGHT COLUMN: Stacked Side Items */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {sideList.map((item, idx) => (
            <div
              key={item.slug || String(idx)}
              style={{
                display: "flex",
                gap: "16px",
                padding: "10px",
                borderBottom: "1px solid #edeeef",
                alignItems: "center",
                background: "#ffffff",
                borderRadius: "6px",
              }}
            >
              <div style={{ position: "relative", width: "90px", height: "80px", borderRadius: "6px", overflow: "hidden", flexShrink: 0, background: "#e7e8e9" }}>
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                )}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <span style={{ fontSize: "10px", fontWeight: 800, color: "#775a19", letterSpacing: "1px", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>
                  {item.category || "BUSINESS"}
                </span>

                <h4 className="font-serif" style={{ fontSize: "14px", fontWeight: 700, color: "#191c1d", margin: "0 0 6px", lineHeight: 1.35, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  <Link href={`/blogs/${item.slug}`} style={{ color: "#191c1d", textDecoration: "none" }}>{item.title}</Link>
                </h4>

                <span style={{ fontSize: "11px", color: "#75777e", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px" }}>
                  <Clock size={12} /> {item.readTime || "5 min read"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
