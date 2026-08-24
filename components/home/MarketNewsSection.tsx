"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, TrendingUp } from "lucide-react";
import { articleService } from "@/services/articleService";
import type { Article } from "@/types";

export function MarketNewsSection() {
  const [stories, setStories] = useState<Article[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    articleService.fetchSanityArticles().then((items) => {
      if (items && items.length > 0) {
        setStories(items.slice(0, 4));
      } else {
        setStories(articleService.all().slice(0, 4));
      }
    });
  }, []);

  // Continuous 2-second Auto-Slide Timer
  useEffect(() => {
    if (stories.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % Math.min(stories.length, 3));
    }, 2000);
    return () => clearInterval(interval);
  }, [stories.length]);

  if (stories.length === 0) return null;

  const lead = stories[activeIndex % stories.length];
  const sideList = stories.slice(0, 3);

  return (
    <section style={{ width: "100%", maxWidth: "1280px", margin: "16px auto", padding: "24px 20px", background: "#f3f4f5", borderRadius: "12px", minHeight: "510px" }}>
      {/* Header Row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          borderBottom: "2px solid #ffdea5",
          paddingBottom: "10px",
          marginBottom: "16px",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div>
          <span style={{ fontSize: "10px", fontWeight: 800, letterSpacing: "2px", color: "#775a19", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>
            BUSINESS INTELLIGENCE &amp; MARKET DYNAMICS
          </span>
          <h2 className="font-serif" style={{ fontSize: "clamp(22px, 2.5vw, 32px)", fontWeight: 900, color: "#191c1d", margin: 0 }}>
            Market News &amp; Economic Dynamics
          </h2>
        </div>

        <Link
          href="/blogs"
          style={{
            fontSize: "11px",
            fontWeight: 800,
            letterSpacing: "1px",
            color: "#775a19",
            textTransform: "uppercase",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <span>View All Intelligence</span>
          <ArrowRight size={15} />
        </Link>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: "20px", alignItems: "flex-start" }}>
        {/* LEFT COLUMN: Auto-Sliding Market Feature (Fixed Bounds = ZERO Shifting) */}
        {lead && (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", height: "420px", overflow: "hidden" }}>
            <div style={{ position: "relative", width: "100%", height: "260px", borderRadius: "10px", overflow: "hidden", background: "#0a192f", flexShrink: 0 }}>
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
                  top: "12px",
                  left: "12px",
                  background: "#0a192f",
                  color: "#ffffff",
                  padding: "5px 12px",
                  fontSize: "10px",
                  fontWeight: 800,
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                }}
              >
                <TrendingUp size={13} style={{ color: "#fed488" }} />
                <span>{lead.category || "STOCK MARKET"}</span>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "11px", fontWeight: 700, color: "#75777e", marginBottom: "4px" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <Calendar size={13} /> Jun 15, 2026
                </span>
                <span>•</span>
                <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <Clock size={13} /> {lead.readTime || "5 min read"}
                </span>
              </div>

              <h3 className="font-serif" style={{ fontSize: "19px", fontWeight: 900, color: "#191c1d", margin: "0 0 4px", lineHeight: 1.3, height: "50px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                <Link href={`/blogs/${lead.slug}`} style={{ color: "#191c1d", textDecoration: "none" }}>{lead.title}</Link>
              </h3>

              <p style={{ fontSize: "13px", color: "#44474d", lineHeight: 1.45, margin: "0 0 8px", height: "38px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                {lead.description}
              </p>

              <Link
                href={`/blogs/${lead.slug}`}
                style={{
                  fontSize: "11px",
                  fontWeight: 800,
                  letterSpacing: "1px",
                  color: "#0a192f",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  marginTop: "auto",
                }}
              >
                <span>Read Market Coverage</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        )}

        {/* RIGHT COLUMN: 3 Side Items (Strictly Top-Aligned = ZERO Upper Empty Gap!) */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", justifyContent: "flex-start", marginTop: 0, paddingTop: 0 }}>
          {sideList.map((item, idx) => {
            const isActive = idx === activeIndex;
            return (
              <div
                key={item.slug || String(idx)}
                onClick={() => setActiveIndex(idx)}
                style={{
                  display: "flex",
                  gap: "12px",
                  padding: "10px",
                  background: "#ffffff",
                  borderRadius: "8px",
                  border: "1px solid #e1e3e4",
                  borderLeft: isActive ? "4px solid #775a19" : "1px solid #e1e3e4",
                  cursor: "pointer",
                  alignItems: "center",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.02)",
                  transition: "all 0.25s ease",
                  height: "128px",
                }}
              >
                <div style={{ position: "relative", width: "95px", height: "108px", borderRadius: "6px", overflow: "hidden", flexShrink: 0, background: "#e7e8e9" }}>
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

                <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between", padding: "2px 0" }}>
                  <span style={{ fontSize: "9px", fontWeight: 800, color: "#775a19", letterSpacing: "1px", textTransform: "uppercase", display: "block" }}>
                    {item.category || "MARKET INTELLIGENCE"}
                  </span>

                  <h4 className="font-serif" style={{ fontSize: "13px", fontWeight: 700, color: "#191c1d", margin: "2px 0", lineHeight: 1.3, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", height: "34px" }}>
                    <Link href={`/blogs/${item.slug}`} style={{ color: "#191c1d", textDecoration: "none" }}>{item.title}</Link>
                  </h4>

                  <span style={{ fontSize: "10px", color: "#75777e", fontWeight: 600, display: "flex", alignItems: "center", gap: "3px", marginTop: "auto" }}>
                    <Clock size={11} /> {item.readTime || "5 min read"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
