"use client";

import { useEffect, useState } from "react";
import { Newspaper, ExternalLink, ArrowRight, RefreshCw, Flame, Clock } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  source: string;
  link: string;
  time: string;
  date: string;
  category: string;
  snippet: string;
}

export function DailyNewsSection() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadLiveNews() {
    setLoading(true);
    try {
      const res = await fetch("/api/news");
      if (res.ok) {
        const data = await res.json();
        if (data.news && data.news.length > 0) {
          setNews(data.news);
        }
      }
    } catch {
      // Retain fallback state
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadLiveNews();
    const interval = setInterval(loadLiveNews, 120000); // Auto-refresh news every 2 minutes
    return () => clearInterval(interval);
  }, []);

  if (news.length === 0 && !loading) return null;

  const leadStory = news[0];
  const secondaryStories = news.slice(1, 3);
  const wireHeadlines = news.slice(3, 7);

  const currentDateStr = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).toUpperCase();

  return (
    <section
      style={{
        width: "100%",
        maxWidth: "1280px",
        margin: "32px auto",
        padding: "36px 20px",
        background: "#FFFFFF",
        border: "1px solid #E2DCD0",
        borderRadius: "20px",
        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.04)",
      }}
    >
      {/* Newspaper Press Masthead Header */}
      <div
        style={{
          borderBottom: "3px double #101722",
          paddingBottom: "16px",
          marginBottom: "28px",
        }}
      >
        {/* Top Press Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #E2DCD0",
            paddingBottom: "8px",
            marginBottom: "12px",
            fontSize: "10px",
            fontWeight: 800,
            letterSpacing: "2px",
            color: "#77727D",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ color: "#8B1029", fontWeight: 900 }}>DAILY EDITION</span>
            <span>&bull;</span>
            <span>{currentDateStr}</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span
              style={{
                fontSize: "10px",
                fontWeight: 800,
                color: "#22C55E",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span className="live-dot" /> REAL-TIME PRESS WIRE
            </span>

            <button
              type="button"
              onClick={loadLiveNews}
              disabled={loading}
              style={{
                fontSize: "10px",
                fontWeight: 800,
                letterSpacing: "1px",
                color: "#101722",
                textTransform: "uppercase",
                background: "#F7F5F0",
                border: "1px solid #E2DCD0",
                borderRadius: "4px",
                padding: "4px 10px",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <RefreshCw size={11} className={loading ? "animate-spin" : ""} style={{ color: "#8B1029" }} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Newspaper Main Section Title */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "10px" }}>
          <h2 className="font-serif" style={{ fontSize: "clamp(24px, 2.6vw, 34px)", fontWeight: 900, color: "#101722", margin: 0, letterSpacing: "-0.5px" }}>
            Daily Live News &amp; Market Intelligence
          </h2>

          <span style={{ fontSize: "11px", fontWeight: 800, color: "#8B1029", letterSpacing: "1px", textTransform: "uppercase", display: "inline-flex", alignItems: "center", gap: "4px" }}>
            <Newspaper size={14} /> EXCLUSIVE WORLD REPORT
          </span>
        </div>
      </div>

      {/* 3-Column Authentic Newspaper Layout */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "28px", alignItems: "stretch" }}>
        {/* COLUMN 1: Lead Front Page Story */}
        {leadStory && (
          <div
            style={{
              background: "#FBF9F5",
              border: "1px solid #E5E2D9",
              borderRadius: "14px",
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "0 4px 14px rgba(0,0,0,0.03)",
            }}
          >
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 900,
                    color: "#FFFFFF",
                    background: "#8B1029",
                    padding: "3px 10px",
                    borderRadius: "4px",
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <Flame size={12} /> LEAD STORY
                </span>

                <span style={{ fontSize: "11px", fontWeight: 800, color: "#8B1029", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                  <Clock size={12} /> {leadStory.time}
                </span>
              </div>

              <div style={{ fontSize: "11px", fontWeight: 800, color: "#8B1029", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "6px" }}>
                {leadStory.category} &bull; <span style={{ color: "#77727D" }}>{leadStory.source}</span>
              </div>

              <h3
                className="font-serif"
                style={{
                  fontSize: "22px",
                  fontWeight: 900,
                  lineHeight: 1.25,
                  color: "#101722",
                  margin: "0 0 12px",
                }}
              >
                {leadStory.title}
              </h3>

              <p style={{ fontSize: "13px", color: "#555259", lineHeight: 1.6, margin: "0 0 20px" }}>
                {leadStory.snippet}
              </p>
            </div>

            <a
              href={leadStory.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "#101722",
                color: "#FFFFFF",
                fontSize: "11px",
                fontWeight: 900,
                letterSpacing: "1px",
                textTransform: "uppercase",
                padding: "10px 18px",
                borderRadius: "8px",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                transition: "all 0.2s ease",
              }}
            >
              <span>Read Full Front-Page Story</span>
              <ExternalLink size={13} style={{ color: "#8B1029" }} />
            </a>
          </div>
        )}

        {/* COLUMN 2: Secondary Front Page Columns */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", justifyContent: "space-between" }}>
          {secondaryStories.map((item, idx) => (
            <div
              key={item.id || String(idx)}
              style={{
                background: "#FFFFFF",
                border: "1px solid #E5E2D9",
                borderRadius: "12px",
                padding: "18px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "10px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "9px", fontWeight: 800, color: "#8B1029", letterSpacing: "1px", textTransform: "uppercase" }}>
                  {item.category}
                </span>

                <span style={{ fontSize: "10px", fontWeight: 700, color: "#77727D" }}>
                  {item.time}
                </span>
              </div>

              <h4
                className="font-serif"
                style={{
                  fontSize: "16px",
                  fontWeight: 900,
                  color: "#101722",
                  margin: 0,
                  lineHeight: 1.3,
                }}
              >
                {item.title}
              </h4>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "4px" }}>
                <span style={{ fontSize: "11px", fontWeight: 700, color: "#555259" }}>{item.source}</span>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: "11px", fontWeight: 800, color: "#8B1029", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "3px" }}
                >
                  <span>Read</span>
                  <ArrowRight size={12} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* COLUMN 3: Live Real-Time Press Wire List */}
        <div style={{ background: "#FBF9F5", border: "1px solid #E5E2D9", borderRadius: "14px", padding: "20px", display: "flex", flexDirection: "column", gap: "14px" }}>
          <div style={{ fontSize: "10px", fontWeight: 900, letterSpacing: "2px", color: "#8B1029", textTransform: "uppercase", borderBottom: "1px solid #E2DCD0", paddingBottom: "8px" }}>
            REAL-TIME PRESS WIRE
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px", flex: 1, justifyContent: "space-around" }}>
            {wireHeadlines.map((wire, wIdx) => (
              <a
                key={wire.id || String(wIdx)}
                href={wire.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "flex-start",
                  textDecoration: "none",
                  paddingBottom: wIdx < wireHeadlines.length - 1 ? "12px" : "0",
                  borderBottom: wIdx < wireHeadlines.length - 1 ? "1px dashed #E5E2D9" : "none",
                }}
              >
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 900,
                    color: "#8B1029",
                    background: "rgba(139, 16, 41, 0.08)",
                    padding: "3px 7px",
                    borderRadius: "4px",
                    flexShrink: 0,
                    marginTop: "2px",
                  }}
                >
                  {wire.time}
                </span>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "9px", fontWeight: 800, color: "#77727D", textTransform: "uppercase", marginBottom: "2px" }}>
                    {wire.source}
                  </div>
                  <div
                    className="font-serif"
                    style={{
                      fontSize: "13px",
                      fontWeight: 800,
                      color: "#101722",
                      lineHeight: 1.3,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {wire.title}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
