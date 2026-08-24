"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { articleService } from "@/services/articleService";
import type { Article } from "@/types";

export function TheBriefingSection() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    articleService.fetchSanityArticles().then((items) => {
      if (items && items.length > 0) {
        setArticles(items);
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
        background: "#F9F8F5",
        color: "#191c1d",
        padding: "56px 20px",
        borderTop: "1px solid #EAE6DF",
        borderBottom: "1px solid #EAE6DF",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Section Header */}
        <div style={{ borderBottom: "2px solid #191c1d", paddingBottom: "12px", marginBottom: "32px" }}>
          <span
            style={{
              fontSize: "11px",
              fontWeight: 800,
              letterSpacing: "2px",
              color: "#701528",
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
              fontSize: "clamp(28px, 3.2vw, 42px)",
              fontWeight: 900,
              color: "#0a192f",
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            The Briefing
          </h2>
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
                  background: "#0a192f",
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
                      color: "#fed488",
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
                    color: "#701528",
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
                    color: "#0a192f",
                    margin: "0 0 8px",
                    lineHeight: 1.3,
                  }}
                >
                  <Link href={`/blogs/${mainFeature.slug}`} style={{ color: "#0a192f", textDecoration: "none" }}>
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

                <div style={{ fontSize: "11px", color: "#75777e", fontWeight: 600 }}>
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
                  background: "#0a192f",
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
                      color: "#fed488",
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
                    color: "#701528",
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
                    color: "#0a192f",
                    margin: "0 0 8px",
                    lineHeight: 1.3,
                  }}
                >
                  <Link href={`/blogs/${secondFeature.slug}`} style={{ color: "#0a192f", textDecoration: "none" }}>
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

                <div style={{ fontSize: "11px", color: "#75777e", fontWeight: 600 }}>
                  <span>{secondFeature.author}</span> &bull; <span>{secondFeature.date}</span>
                </div>
              </div>
            </div>
          )}

          {/* RIGHT COLUMN: Featured Briefing Box & Newsletter */}
          <div
            style={{
              background: "#F3F0E8",
              border: "1px solid #E2DCD0",
              borderRadius: "6px",
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            {sidebarBriefing && (
              <div style={{ borderBottom: "1px solid #E2DCD0", paddingBottom: "20px" }}>
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 800,
                    color: "#701528",
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: "6px",
                  }}
                >
                  EXECUTIVE BRIEFING
                </span>

                <h4
                  className="font-serif"
                  style={{
                    fontSize: "18px",
                    fontWeight: 900,
                    color: "#0a192f",
                    margin: "0 0 8px",
                    lineHeight: 1.35,
                  }}
                >
                  <Link href={`/blogs/${sidebarBriefing.slug}`} style={{ color: "#0a192f", textDecoration: "none" }}>
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
                    color: "#701528",
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
              <div style={{ fontSize: "13px", fontWeight: 800, color: "#0a192f", marginBottom: "4px" }}>
                Stay Informed in Strategy
              </div>
              <p style={{ fontSize: "11px", color: "#666972", lineHeight: 1.4, margin: "0 0 12px" }}>
                Receive exclusive C-suite market briefings delivered weekly.
              </p>

              {subscribed ? (
                <div style={{ fontSize: "12px", fontWeight: 700, color: "#701528", background: "#EAE0D5", padding: "10px 12px", borderRadius: "4px" }}>
                  ✓ Subscription confirmed. Welcome to The Briefing.
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
                      border: "1px solid #D0C9BE",
                      borderRadius: "4px",
                      background: "#ffffff",
                      outline: "none",
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      background: "#701528",
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
          <div style={{ borderTop: "1px solid #191c1d", paddingTop: "28px" }}>
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
                    borderBottom: "1px solid #E5E0D8",
                    paddingBottom: "20px",
                  }}
                >
                  <div
                    className="font-serif"
                    style={{
                      fontSize: "28px",
                      fontWeight: 300,
                      color: "#701528",
                      lineHeight: 1,
                    }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </div>

                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: 800,
                      color: "#701528",
                      letterSpacing: "1.5px",
                      textTransform: "uppercase",
                    }}
                  >
                    {story.category || "INSIGHT"}
                  </span>

                  <h4
                    className="font-serif"
                    style={{
                      fontSize: "16px",
                      fontWeight: 800,
                      color: "#0a192f",
                      margin: 0,
                      lineHeight: 1.35,
                    }}
                  >
                    <Link href={`/blogs/${story.slug}`} style={{ color: "#0a192f", textDecoration: "none" }}>
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
                  color: "#701528",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <span>View All Briefings</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
