"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { articleService } from "@/services/articleService";
import type { Article } from "@/types";

export function IntelligenceBrief() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    articleService.fetchIntelligenceBriefArticles().then((items) => {
      if (items && items.length > 0) {
        setArticles(items);
      } else {
        articleService.fetchSanityArticles().then((all) => setArticles(all));
      }
    });
  }, []);

  if (articles.length === 0) return null;

  // Editorial Mapping from Sanity Content
  const mainFeature = articles[0];
  const secondFeature = articles[1];
  const sidebarBriefing = articles[2];
  const numberedList = articles.slice(3, 7); // 01, 02, 03, 04

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section
      style={{
        width: "100%",
        background: "transparent",
        color: "#101722",
        padding: "28px 20px",
        borderTop: "1px solid #E2DCD0",
        borderBottom: "1px solid #E2DCD0",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Section Header */}
        <div style={{ borderBottom: "2px solid #101722", paddingBottom: "10px", marginBottom: "20px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <div>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 800,
                  letterSpacing: "2px",
                  color: "#8B1029",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: "4px",
                }}
              >
                EXECUTIVE INSIGHTS
              </span>
              <h2
                className="font-serif"
                style={{
                  fontSize: "clamp(18px, 2vw, 24px)",
                  fontWeight: 800,
                  color: "#101722",
                  margin: 0,
                  lineHeight: 1.1,
                }}
              >
                The Intelligence Brief
              </h2>
            </div>

            <p style={{ fontSize: "13px", color: "#77736D", margin: 0, fontWeight: 500 }}>
              What matters now across business, technology, markets and the global economy.
            </p>
          </div>
        </div>

        {/* Main Content Area: Left/Center 2 Stories + Right Briefing Column */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "32px",
            alignItems: "start",
            marginBottom: "40px",
          }}
        >
          {/* LEFT STORY BLOCK */}
          {mainFeature && (
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "250px",
                  borderRadius: "4px",
                  overflow: "hidden",
                  background: "#101722",
                }}
              >
                {mainFeature.image ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={mainFeature.image}
                    alt={mainFeature.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <div
                    style={{
                      height: "100%",
                      display: "grid",
                      placeItems: "center",
                      color: "#B69A5A",
                      fontWeight: 800,
                      fontSize: "18px",
                      padding: "20px",
                      textAlign: "center",
                    }}
                  >
                    {mainFeature.title}
                  </div>
                )}
              </div>

              <div>
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 800,
                    color: "#8B1029",
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: "4px",
                  }}
                >
                  {mainFeature.category || "STRATEGY"}
                </span>

                <h3
                  className="font-serif"
                  style={{
                    fontSize: "20px",
                    fontWeight: 900,
                    color: "#101722",
                    margin: "0 0 8px",
                    lineHeight: 1.3,
                  }}
                >
                  <Link href={`/blogs/${mainFeature.slug}`} style={{ color: "#101722", textDecoration: "none" }}>
                    {mainFeature.title}
                  </Link>
                </h3>

                {mainFeature.description && (
                  <p
                    style={{
                      fontSize: "13px",
                      color: "#44474d",
                      lineHeight: 1.5,
                      margin: "0 0 10px",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {mainFeature.description}
                  </p>
                )}

                <div style={{ fontSize: "11px", color: "#77736D", fontWeight: 600 }}>
                  <span>{mainFeature.author}</span> &bull; <span>{mainFeature.date}</span>
                </div>
              </div>
            </div>
          )}

          {/* SECOND STORY BLOCK */}
          {secondFeature && (
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "250px",
                  borderRadius: "4px",
                  overflow: "hidden",
                  background: "#101722",
                }}
              >
                {secondFeature.image ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={secondFeature.image}
                    alt={secondFeature.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <div
                    style={{
                      height: "100%",
                      display: "grid",
                      placeItems: "center",
                      color: "#B69A5A",
                      fontWeight: 800,
                      fontSize: "18px",
                      padding: "20px",
                      textAlign: "center",
                    }}
                  >
                    {secondFeature.title}
                  </div>
                )}
              </div>

              <div>
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 800,
                    color: "#8B1029",
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: "4px",
                  }}
                >
                  {secondFeature.category || "GLOBAL MARKETS"}
                </span>

                <h3
                  className="font-serif"
                  style={{
                    fontSize: "20px",
                    fontWeight: 900,
                    color: "#101722",
                    margin: "0 0 8px",
                    lineHeight: 1.3,
                  }}
                >
                  <Link href={`/blogs/${secondFeature.slug}`} style={{ color: "#101722", textDecoration: "none" }}>
                    {secondFeature.title}
                  </Link>
                </h3>

                {secondFeature.description && (
                  <p
                    style={{
                      fontSize: "13px",
                      color: "#44474d",
                      lineHeight: 1.5,
                      margin: "0 0 10px",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {secondFeature.description}
                  </p>
                )}

                <div style={{ fontSize: "11px", color: "#77736D", fontWeight: 600 }}>
                  <span>{secondFeature.author}</span> &bull; <span>{secondFeature.date}</span>
                </div>
              </div>
            </div>
          )}

          {/* RIGHT COLUMN: Featured Briefing Box & Newsletter */}
          <div
            style={{
              background: "#EBE6DC",
              border: "1px solid #DCD5C8",
              borderRadius: "6px",
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            {sidebarBriefing && (
              <div style={{ borderBottom: "1px solid #DCD5C8", paddingBottom: "20px" }}>
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 800,
                    color: "#8B1029",
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: "6px",
                  }}
                >
                  INTELLIGENCE BRIEFING
                </span>

                <h4
                  className="font-serif"
                  style={{
                    fontSize: "18px",
                    fontWeight: 900,
                    color: "#101722",
                    margin: "0 0 8px",
                    lineHeight: 1.35,
                  }}
                >
                  <Link href={`/blogs/${sidebarBriefing.slug}`} style={{ color: "#101722", textDecoration: "none" }}>
                    {sidebarBriefing.title}
                  </Link>
                </h4>

                {sidebarBriefing.description && (
                  <p style={{ fontSize: "12px", color: "#555860", lineHeight: 1.5, margin: "0 0 12px" }}>
                    {sidebarBriefing.description}
                  </p>
                )}

                <Link
                  href={`/blogs/${sidebarBriefing.slug}`}
                  style={{
                    fontSize: "11px",
                    fontWeight: 800,
                    color: "#8B1029",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <span>Read Briefing</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            )}

            {/* Newsletter Subscription Area */}
            <div>
              <div style={{ fontSize: "13px", fontWeight: 800, color: "#101722", marginBottom: "4px" }}>
                Stay Informed in Strategy
              </div>
              <p style={{ fontSize: "11px", color: "#77736D", lineHeight: 1.4, margin: "0 0 12px" }}>
                Receive exclusive C-suite market briefings delivered weekly.
              </p>

              {subscribed ? (
                <div style={{ fontSize: "12px", fontWeight: 700, color: "#8B1029", background: "#E2DACD", padding: "10px 12px", borderRadius: "4px" }}>
                  ✓ Subscription confirmed. Welcome to The Intelligence Brief.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} style={{ display: "flex", gap: "6px" }}>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      flex: 1,
                      padding: "8px 12px",
                      fontSize: "12px",
                      border: "1px solid #CCC4B6",
                      borderRadius: "4px",
                      background: "#ffffff",
                      outline: "none",
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      background: "#8B1029",
                      color: "#ffffff",
                      border: "none",
                      padding: "8px 14px",
                      borderRadius: "4px",
                      fontSize: "11px",
                      fontWeight: 800,
                      letterSpacing: "1px",
                      cursor: "pointer",
                    }}
                  >
                    JOIN
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* BOTTOM ROW: Numbered Editorial Story List (01, 02, 03, 04...) */}
        {numberedList.length > 0 && (
          <div style={{ borderTop: "1px solid #101722", paddingTop: "28px" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "28px",
              }}
            >
              {numberedList.map((story, idx) => (
                <div
                  key={story.slug || String(idx)}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    borderBottom: "1px solid #DCD5C8",
                    paddingBottom: "20px",
                  }}
                >
                  <div
                    className="font-serif"
                    style={{
                      fontSize: "32px",
                      fontWeight: 300,
                      color: "#8B1029",
                      lineHeight: 1,
                    }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </div>

                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: 800,
                      color: "#8B1029",
                      letterSpacing: "1.5px",
                      textTransform: "uppercase",
                    }}
                  >
                    {story.category || "INTELLIGENCE"}
                  </span>

                  <h4
                    className="font-serif"
                    style={{
                      fontSize: "16px",
                      fontWeight: 800,
                      color: "#101722",
                      margin: 0,
                      lineHeight: 1.35,
                    }}
                  >
                    <Link href={`/blogs/${story.slug}`} style={{ color: "#101722", textDecoration: "none" }}>
                      {story.title}
                    </Link>
                  </h4>

                  {story.description && (
                    <p
                      style={{
                        fontSize: "12px",
                        color: "#555860",
                        lineHeight: 1.45,
                        margin: 0,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {story.description}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
              <Link
                href="/blogs"
                style={{
                  fontSize: "11px",
                  fontWeight: 800,
                  color: "#8B1029",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <span>View All Intelligence Briefings</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
