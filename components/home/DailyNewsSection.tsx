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
  image: string;
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
    const interval = setInterval(loadLiveNews, 60000); // Auto-refresh news every minute
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
        margin: "24px auto",
        padding: "24px 18px",
        background: "#FFFFFF",
        border: "1px solid #E2DCD0",
        borderRadius: "16px",
        boxShadow: "0 6px 24px rgba(0, 0, 0, 0.03)",
      }}
    >
      {/* Newspaper Press Masthead Header */}
      <div
        style={{
          borderBottom: "3px double #101722",
          paddingBottom: "12px",
          marginBottom: "20px",
        }}
      >
        {/* Top Press Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #E2DCD0",
            paddingBottom: "6px",
            marginBottom: "10px",
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
                padding: "3px 8px",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <RefreshCw size={11} className={loading ? "animate-spin" : ""} style={{ color: "#8B1029" }} />
              <span>Refresh News</span>
            </button>
          </div>
        </div>

        {/* Newspaper Main Section Title */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "8px" }}>
          <h2 className="font-serif" style={{ fontSize: "clamp(22px, 2.4vw, 30px)", fontWeight: 900, color: "#101722", margin: 0, letterSpacing: "-0.5px" }}>
            Daily Live News &amp; Market Intelligence
          </h2>

          <span style={{ fontSize: "11px", fontWeight: 800, color: "#8B1029", letterSpacing: "1px", textTransform: "uppercase", display: "inline-flex", alignItems: "center", gap: "4px" }}>
            <Newspaper size={14} /> EXCLUSIVE WORLD REPORT
          </span>
        </div>
      </div>

      {/* 3-Column Compact Newspaper Layout */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px", alignItems: "stretch" }}>
        {/* COLUMN 1: Lead Front Page Story Card with Bigger Image */}
        {leadStory && (
          <div
            style={{
              background: "#FBF9F5",
              border: "1px solid #E5E2D9",
              borderRadius: "12px",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
            }}
          >
            <div>
              {/* Lead News Story Image (Bigger 220px Height) */}
              <div style={{ position: "relative", width: "100%", height: "220px", borderRadius: "10px", overflow: "hidden", marginBottom: "14px", background: "#0A0D16" }}>
                {leadStory.image ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={leadStory.image} alt={leadStory.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <div style={{ height: "100%", display: "grid", placeItems: "center", color: "#8B1029", fontWeight: 900, fontSize: "18px" }}>
                    DAILY LIVE NEWS
                  </div>
                )}
                <div style={{ position: "absolute", top: "10px", left: "10px", background: "#8B1029", color: "#FFFFFF", fontSize: "10px", fontWeight: 900, padding: "4px 10px", borderRadius: "4px", letterSpacing: "1px", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "4px" }}>
                  <Flame size={12} /> LEAD STORY
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                <span style={{ fontSize: "10px", fontWeight: 800, color: "#8B1029", letterSpacing: "1px", textTransform: "uppercase" }}>
                  {leadStory.category} &bull; <span style={{ color: "#77727D" }}>{leadStory.source}</span>
                </span>

                <span style={{ fontSize: "10px", fontWeight: 800, color: "#8B1029", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                  <Clock size={11} /> {leadStory.time}
                </span>
              </div>

              <h3
                className="font-serif"
                style={{
                  fontSize: "19px",
                  fontWeight: 900,
                  lineHeight: 1.25,
                  color: "#101722",
                  margin: "0 0 8px",
                }}
              >
                {leadStory.title}
              </h3>

              <p style={{ fontSize: "13px", color: "#555259", lineHeight: 1.55, margin: "0 0 16px" }}>
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
                padding: "10px 16px",
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

        {/* COLUMN 2: Secondary Front Page Column Stories with Full-Height Images & Rich Snippets */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {secondaryStories.map((item, idx) => (
            <div
              key={item.id || String(idx)}
              style={{
                background: "#FFFFFF",
                border: "1px solid #E5E2D9",
                borderRadius: "12px",
                padding: "14px",
                display: "flex",
                gap: "14px",
                alignItems: "stretch",
                boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
                flex: 1,
              }}
            >
              {/* Full-Height Thumbnail Photo (140px width) */}
              <div style={{ position: "relative", width: "140px", minHeight: "130px", borderRadius: "8px", overflow: "hidden", flexShrink: 0, background: "#0A0D16" }}>
                {item.image ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={item.image} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <div style={{ height: "100%", display: "grid", placeItems: "center", color: "#8B1029", fontWeight: 800, fontSize: "14px" }}>
                    NEWS
                  </div>
                )}
              </div>

              <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                    <span style={{ fontSize: "9px", fontWeight: 900, color: "#8B1029", letterSpacing: "1px", textTransform: "uppercase" }}>
                      {item.category}
                    </span>
                    <span style={{ fontSize: "10px", fontWeight: 700, color: "#77727D" }}>{item.time}</span>
                  </div>

                  <h4
                    className="font-serif"
                    style={{
                      fontSize: "15px",
                      fontWeight: 900,
                      color: "#101722",
                      margin: "0 0 6px",
                      lineHeight: 1.3,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {item.title}
                  </h4>

                  {/* Rich Text Snippet Content to fill empty space */}
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#555259",
                      lineHeight: 1.45,
                      margin: "0 0 8px",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {item.snippet}
                  </p>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "4px", borderTop: "1px solid #F0ECE1" }}>
                  <span style={{ fontSize: "10px", fontWeight: 800, color: "#101722" }}>{item.source}</span>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: "10px", fontWeight: 800, color: "#8B1029", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "3px" }}
                  >
                    <span>Read Coverage</span>
                    <ArrowRight size={11} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* COLUMN 3: Live Real-Time Press Wire List with Bigger Thumbnails (72px x 65px) */}
        <div style={{ background: "#FBF9F5", border: "1px solid #E5E2D9", borderRadius: "12px", padding: "14px", display: "flex", flexDirection: "column", gap: "10px" }}>
          <div style={{ fontSize: "10px", fontWeight: 900, letterSpacing: "2px", color: "#8B1029", textTransform: "uppercase", borderBottom: "1px solid #E2DCD0", paddingBottom: "6px" }}>
            REAL-TIME PRESS WIRE
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px", flex: 1, justifyContent: "space-between" }}>
            {wireHeadlines.map((wire, wIdx) => (
              <a
                key={wire.id || String(wIdx)}
                href={wire.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                  textDecoration: "none",
                  paddingBottom: wIdx < wireHeadlines.length - 1 ? "8px" : "0",
                  borderBottom: wIdx < wireHeadlines.length - 1 ? "1px dashed #E5E2D9" : "none",
                }}
              >
                {/* Bigger Wire Thumbnail (72px x 65px) */}
                <div style={{ position: "relative", width: "72px", height: "65px", borderRadius: "6px", overflow: "hidden", flexShrink: 0, background: "#0A0D16" }}>
                  {wire.image ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={wire.image} alt={wire.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <div style={{ height: "100%", display: "grid", placeItems: "center", color: "#8B1029", fontWeight: 800, fontSize: "11px" }}>
                      WIRE
                    </div>
                  )}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2px" }}>
                    <span style={{ fontSize: "9px", fontWeight: 800, color: "#77727D", textTransform: "uppercase" }}>{wire.source}</span>
                    <span style={{ fontSize: "9px", fontWeight: 800, color: "#8B1029" }}>{wire.time}</span>
                  </div>

                  <div
                    className="font-serif"
                    style={{
                      fontSize: "12px",
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
