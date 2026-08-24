"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, ArrowUpRight } from "lucide-react";
import { articleService } from "@/services/articleService";
import type { Article } from "@/types";

export function MasterTalksSection() {
  const [talks, setTalks] = useState<Article[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    articleService.fetchSanityArticles().then((items) => {
      if (items && items.length > 0) {
        setTalks(items.slice(0, 3));
      } else {
        setTalks(articleService.all().slice(0, 3));
      }
    });
  }, []);

  // Continuous Auto-Slide Timer (cycles episode tab every 3 seconds)
  useEffect(() => {
    if (talks.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % talks.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [talks.length]);

  if (talks.length === 0) return null;

  const currentTalk = talks[activeIndex % talks.length];

  return (
    <section style={{ width: "100%", background: "#f3f4f5", borderTop: "1px solid #e1e3e4", borderBottom: "1px solid #e1e3e4", padding: "28px 20px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", background: "#ffffff", padding: "28px", borderRadius: "12px", border: "1px solid #e1e3e4", boxShadow: "0 4px 16px rgba(0,0,0,0.02)", minHeight: "410px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: "28px", alignItems: "center" }}>
          {/* LEFT COLUMN: Text & Episode Selector */}
          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <div>
              <span style={{ fontSize: "10px", fontWeight: 800, letterSpacing: "2px", color: "#775a19", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>
                EXECUTIVE BROADCAST
              </span>

              <h2 className="font-serif" style={{ fontSize: "clamp(18px, 2vw, 24px)", fontWeight: 800, color: "#191c1d", margin: "0 0 10px", lineHeight: 1.15 }}>
                Master Talks &amp;<br />Interviews
              </h2>

              <p style={{ fontSize: "14px", color: "#44474d", lineHeight: 1.55, margin: "0 0 16px" }}>
                Exclusive unscripted conversations with global CEOs, visionary founders, and market leaders shaping the future of global enterprise and capital.
              </p>

              <Link
                href="/blogs"
                style={{
                  fontSize: "11px",
                  fontWeight: 800,
                  letterSpacing: "1px",
                  color: "#0a192f",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  borderBottom: "2px solid #0a192f",
                  paddingBottom: "2px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <span>Discover the Conversations</span>
                <ArrowUpRight size={15} />
              </Link>
            </div>

            {/* Episode Selector Tabs */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {talks.map((talk, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <div
                    key={talk.slug || String(idx)}
                    onClick={() => setActiveIndex(idx)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "10px 12px",
                      background: isActive ? "#f8f9fa" : "#ffffff",
                      border: "1px solid #e1e3e4",
                      borderLeft: isActive ? "4px solid #775a19" : "1px solid #e1e3e4",
                      borderRadius: "6px",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <span style={{ fontSize: "10px", fontWeight: 800, color: isActive ? "#775a19" : "#75777e", flexShrink: 0 }}>
                      0{idx + 1}
                    </span>
                    <span className="font-serif" style={{ fontSize: "12px", fontWeight: 700, color: "#191c1d", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {talk.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: Video Thumbnail Card (Fixed Bounds = ZERO Shifting) */}
          <div style={{ position: "relative", width: "100%", height: "360px", borderRadius: "10px", overflow: "hidden", background: "#070910", boxShadow: "0 12px 32px rgba(0,0,0,0.18)" }}>
            {currentTalk?.image && (
              <Image
                src={currentTalk.image}
                alt={currentTalk.title}
                fill
                className="object-cover"
                unoptimized
                priority
              />
            )}

            {/* Gradient Overlay */}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(7, 9, 16, 0.92) 0%, rgba(7, 9, 16, 0.25) 60%, transparent 100%)", zIndex: 2 }} />

            {/* Central Translucent Play Button */}
            <Link
              href={`/blogs/${currentTalk?.slug}`}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 10,
                textDecoration: "none",
              }}
              aria-label={`Play ${currentTalk?.title}`}
            >
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  background: "rgba(255, 255, 255, 0.25)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.4)",
                  display: "grid",
                  placeItems: "center",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
                }}
              >
                <Play size={28} style={{ color: "#ffffff", fill: "#ffffff", marginLeft: "2px" }} />
              </div>
            </Link>

            {/* Bottom Info Overlay */}
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px", zIndex: 10, color: "#ffffff" }}>
              <span style={{ fontSize: "10px", fontWeight: 800, letterSpacing: "1.5px", color: "#fed488", textTransform: "uppercase", display: "block", marginBottom: "2px" }}>
                MASTER TALK // 00{activeIndex + 1}
              </span>

              <h3 className="font-serif" style={{ fontSize: "19px", fontWeight: 900, lineHeight: 1.25, color: "#ffffff", margin: "0 0 8px", height: "48px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                <Link href={`/blogs/${currentTalk?.slug}`} style={{ color: "#ffffff", textDecoration: "none" }}>{currentTalk?.title}</Link>
              </h3>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                <span style={{ fontSize: "9px", fontWeight: 800, letterSpacing: "1px", color: "rgba(255,255,255,0.75)", textTransform: "uppercase" }}>
                  {currentTalk?.author || "EDITORIAL BOARD"} &bull; CEO &bull; FOUNDER &bull; VISIONARY
                </span>

                <Link
                  href={`/blogs/${currentTalk?.slug}`}
                  style={{
                    fontSize: "10px",
                    fontWeight: 800,
                    letterSpacing: "1px",
                    color: "#fed488",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <span>WATCH INTERVIEW</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
