"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bookmark, RefreshCw, ExternalLink } from "lucide-react";
import type { MagazineIssue } from "@/types";

interface Props {
  issues: MagazineIssue[];
}

export function MagazineCardGrid({ issues }: Props) {
  const [visibleCount, setVisibleCount] = useState(18);
  const [bookmarkedSlugs, setBookmarkedSlugs] = useState<Record<string, boolean>>({});

  const toggleBookmark = (slug: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setBookmarkedSlugs((prev) => ({ ...prev, [slug]: !prev[slug] }));
  };

  const visibleIssues = issues.slice(0, visibleCount);

  return (
    <section style={{ width: "100%", maxWidth: "1440px", margin: "0 auto", padding: "0 6vw 60px" }}>
      {/* 4-Column Responsive Magazine Cards Grid */}
      <div
        className="magazine-four-col-grid grid-responsive-4"
        style={{
          marginBottom: "40px",
        }}
      >
        {visibleIssues.map((item, idx) => {
          const isBookmarked = bookmarkedSlugs[item.slug];
          const targetUrl = item.pdfUrl ? item.pdfUrl : `/magazines/${item.slug}`;
          const isExternalPdf = Boolean(item.pdfUrl && (item.pdfUrl.startsWith("http://") || item.pdfUrl.startsWith("https://")));

          return (
            <div
              key={item.slug || String(idx)}
              style={{
                position: "relative",
                background: "transparent",
                border: "none",
                boxShadow: "none",
                transition: "transform 0.3s ease",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
              }}
              className="magazine-grid-card"
            >
              {/* Cover Portrait Image */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "3 / 4",
                  overflow: "hidden",
                  borderRadius: "12px",
                  boxShadow: "0 8px 24px rgba(16, 23, 34, 0.12)",
                  background: "#FCFAF6",
                  border: "none",
                }}
              >
                {isExternalPdf ? (
                  <a href={targetUrl} target="_blank" rel="noopener noreferrer" style={{ display: "block", width: "100%", height: "100%" }}>
                    {item.cover ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={item.cover}
                        alt={item.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    ) : (
                      <div
                        style={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          padding: "16px",
                          textAlign: "center",
                          background: "#0A192F",
                        }}
                      >
                        <div className="font-serif" style={{ fontSize: "16px", fontWeight: 900, color: "#FFFFFF" }}>
                          THE SUCCESS WORLD
                        </div>
                      </div>
                    )}
                  </a>
                ) : (
                  <Link href={targetUrl} style={{ display: "block", width: "100%", height: "100%" }}>
                    {item.cover ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={item.cover}
                        alt={item.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    ) : (
                      <div
                        style={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          padding: "16px",
                          textAlign: "center",
                          background: "#0A192F",
                        }}
                      >
                        <div className="font-serif" style={{ fontSize: "16px", fontWeight: 900, color: "#FFFFFF" }}>
                          THE SUCCESS WORLD
                        </div>
                      </div>
                    )}
                  </Link>
                )}

                {/* Top Badge Overlay */}
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    left: "10px",
                    background: "rgba(10, 25, 47, 0.85)",
                    backdropFilter: "blur(4px)",
                    color: "#FFFFFF",
                    fontSize: "9px",
                    fontWeight: 800,
                    padding: "4px 8px",
                    borderRadius: "4px",
                    letterSpacing: "0.5px",
                  }}
                >
                  {item.issue || "EDITION"}
                </div>
              </div>

              {/* Downside Info Text Container (No border, clean spacing) */}
              <div
                style={{
                  background: "transparent",
                  border: "none",
                  padding: "0 2px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  flex: 1,
                }}
              >
                <div>
                  {/* Executive Leader Name */}
                  <h3
                    className="font-serif"
                    style={{
                      fontSize: "16px",
                      fontWeight: 800,
                      color: "#101722",
                      margin: "0 0 4px",
                      lineHeight: 1.3,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {isExternalPdf ? (
                      <a href={targetUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#101722", textDecoration: "none" }}>
                        {item.title}
                      </a>
                    ) : (
                      <Link href={targetUrl} style={{ color: "#101722", textDecoration: "none" }}>
                        {item.title}
                      </Link>
                    )}
                  </h3>

                  {/* Role / Subtitle */}
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#55545A",
                      lineHeight: 1.4,
                      marginBottom: "10px",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {item.subtitle || item.description || "Digital Magazine Edition"}
                  </div>
                </div>

                {/* Card Actions Row */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingTop: "6px",
                    borderTop: "none",
                  }}
                >
                  {isExternalPdf ? (
                    <a
                      href={targetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: "12px",
                        fontWeight: 800,
                        color: "#0A192F",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        textDecoration: "none",
                      }}
                    >
                      <span>Read PDF Edition</span>
                      <ExternalLink size={13} />
                    </a>
                  ) : (
                    <Link
                      href={targetUrl}
                      style={{
                        fontSize: "12px",
                        fontWeight: 800,
                        color: "#0A192F",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        textDecoration: "none",
                      }}
                    >
                      <span>Read Edition</span>
                      <ArrowRight size={13} />
                    </Link>
                  )}

                  <button
                    type="button"
                    onClick={(e) => toggleBookmark(item.slug, e)}
                    style={{
                      background: "none",
                      border: "none",
                      color: isBookmarked ? "#0A192F" : "#94A3B8",
                      cursor: "pointer",
                      padding: "2px",
                    }}
                    aria-label="Bookmark edition"
                  >
                    <Bookmark size={14} fill={isBookmarked ? "#0A192F" : "none"} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Load More Editions Button */}
      {visibleCount < issues.length && (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <button
            type="button"
            onClick={() => setVisibleCount((prev) => prev + 12)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 24px",
              background: "#FFFFFF",
              border: "1px solid #E5E7EB",
              borderRadius: "20px",
              fontSize: "13px",
              fontWeight: 700,
              color: "#0A192F",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
              transition: "all 0.2s ease",
            }}
          >
            <span>Load More Editions</span>
            <RefreshCw size={14} style={{ color: "#C5A059" }} />
          </button>
        </div>
      )}
    </section>
  );
}
