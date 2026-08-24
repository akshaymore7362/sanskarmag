"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { articleService } from "@/services/articleService";
import type { Article } from "@/types";

export function LeadershipLens() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    articleService.fetchLeadershipLensArticles().then((items) => {
      if (items && items.length > 0) {
        setArticles(items);
      } else {
        articleService.fetchSanityArticles().then((all) => {
          setArticles(all.length > 6 ? all.slice(6) : all);
        });
      }
    });
  }, []);

  if (articles.length === 0) return null;

  const featureStory = articles[0];
  const numberedGrid = articles.slice(1, 5); // 01, 02, 03, 04

  return (
    <section
      style={{
        width: "100%",
        background: "transparent",
        color: "#101722",
        padding: "28px 20px",
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
                C-SUITE VIEWS
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
                Leadership Lens
              </h2>
            </div>

            <p style={{ fontSize: "13px", color: "#77736D", margin: 0, fontWeight: 500 }}>
              Ideas, decisions and perspectives from the people shaping tomorrow.
            </p>
          </div>
        </div>

        {/* Main Feature Row */}
        {featureStory && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "40px",
              alignItems: "center",
              marginBottom: "48px",
            }}
          >
            {/* Left: Large Wide Editorial Feature Image */}
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "320px",
                borderRadius: "4px",
                overflow: "hidden",
                background: "#101722",
              }}
            >
              {featureStory.image ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={featureStory.image}
                  alt={featureStory.title}
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
                    fontSize: "22px",
                    padding: "20px",
                    textAlign: "center",
                  }}
                >
                  {featureStory.title}
                </div>
              )}
            </div>

            {/* Right: Editorial Headline & Content */}
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 800,
                  color: "#8B1029",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                }}
              >
                {featureStory.category || "GLOBAL STRATEGY"} &bull; {featureStory.date}
              </span>

              <h3
                className="font-serif"
                style={{
                  fontSize: "clamp(22px, 2.5vw, 32px)",
                  fontWeight: 900,
                  color: "#101722",
                  margin: 0,
                  lineHeight: 1.2,
                }}
              >
                <Link href={`/blogs/${featureStory.slug}`} style={{ color: "#101722", textDecoration: "none" }}>
                  {featureStory.title}
                </Link>
              </h3>

              {featureStory.description && (
                <p style={{ fontSize: "14px", color: "#44474d", lineHeight: 1.6, margin: 0 }}>
                  {featureStory.description}
                </p>
              )}

              <div style={{ fontSize: "12px", color: "#77736D", fontWeight: 600 }}>
                <span>By {featureStory.author}</span> &bull; <span>{featureStory.readTime}</span>
              </div>

              <div style={{ marginTop: "8px" }}>
                <Link
                  href={`/blogs/${featureStory.slug}`}
                  style={{
                    fontSize: "12px",
                    fontWeight: 800,
                    color: "#8B1029",
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <span>Read Full Story</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Numbered Editorial Grid Below Feature (01, 02, 03, 04 across 4 Columns) */}
        {numberedGrid.length > 0 && (
          <div style={{ borderTop: "1px solid #101722", paddingTop: "32px" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "32px",
              }}
            >
              {numberedGrid.map((item, idx) => (
                <div
                  key={item.slug || String(idx)}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    borderTop: "1px solid #DCD5C8",
                    paddingTop: "16px",
                  }}
                >
                  <div
                    className="font-serif"
                    style={{
                      fontSize: "36px",
                      fontWeight: 300,
                      color: "#8B1029",
                      lineHeight: 1,
                    }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </div>

                  <div style={{ fontSize: "10px", fontWeight: 800, color: "#8B1029", letterSpacing: "1.5px", textTransform: "uppercase" }}>
                    {item.category || "PERSPECTIVE"} &bull; {item.date}
                  </div>

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
                    <Link href={`/blogs/${item.slug}`} style={{ color: "#101722", textDecoration: "none" }}>
                      {item.title}
                    </Link>
                  </h4>

                  {item.description && (
                    <p
                      style={{
                        fontSize: "12px",
                        color: "#555860",
                        lineHeight: 1.45,
                        margin: 0,
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {item.description}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "28px" }}>
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
                <span>Explore Leadership Perspectives</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
