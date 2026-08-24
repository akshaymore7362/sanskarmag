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
        className="magazine-four-col-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: "24px",
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
                borderRadius: "12px",
                overflow: "hidden",
                border: "1px solid #E5E2D9",
                background: "#0F131F",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
                transition: "all 0.3s ease",
                display: "flex",
                flexDirection: "column",
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
                  background: "#151027",
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
                          background: "linear-gradient(135deg, #1A102F 0%, #0F131F 100%)",
                        }}
                      >
                        <div className="font-serif" style={{ fontSize: "16px", fontWeight: 900, color: "#D49A24" }}>
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
                          background: "linear-gradient(135deg, #1A102F 0%, #0F131F 100%)",
                        }}
                      >
                        <div className="font-serif" style={{ fontSize: "16px", fontWeight: 900, color: "#D49A24" }}>
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
                    background: "rgba(15, 19, 31, 0.75)",
                    backdropFilter: "blur(4px)",
                    border: "1px solid rgba(212, 154, 36, 0.4)",
                    color: "#D49A24",
                    fontSize: "9px",
                    fontWeight: 800,
                    padding: "3px 7px",
                    borderRadius: "4px",
                    letterSpacing: "0.5px",
                  }}
                >
                  {item.issue || "EDITION"}
                </div>
              </div>

              {/* Bottom Info Overlay Card */}
              <div
                style={{
                  background: "linear-gradient(180deg, #1C0F16 0%, #120A0E 100%)",
                  borderTop: "1px solid rgba(212, 154, 36, 0.2)",
                  padding: "14px 14px 12px",
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
                      fontSize: "15px",
                      fontWeight: 800,
                      color: "#FFFFFF",
                      margin: "0 0 2px",
                      lineHeight: 1.25,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {isExternalPdf ? (
                      <a href={targetUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#FFFFFF", textDecoration: "none" }}>
                        {item.title}
                      </a>
                    ) : (
                      <Link href={targetUrl} style={{ color: "#FFFFFF", textDecoration: "none" }}>
                        {item.title}
                      </Link>
                    )}
                  </h3>

                  {/* Role / Subtitle */}
                  <div
                    style={{
                      fontSize: "11px",
                      color: "rgba(255, 255, 255, 0.7)",
                      lineHeight: 1.3,
                      marginBottom: "10px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
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
                    paddingTop: "8px",
                    borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                  }}
                >
                  {isExternalPdf ? (
                    <a
                      href={targetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: "11px",
                        fontWeight: 800,
                        color: "#D49A24",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        textDecoration: "none",
                      }}
                    >
                      <span>Read PDF Edition</span>
                      <ExternalLink size={12} />
                    </a>
                  ) : (
                    <Link
                      href={targetUrl}
                      style={{
                        fontSize: "11px",
                        fontWeight: 800,
                        color: "#D49A24",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        textDecoration: "none",
                      }}
                    >
                      <span>Read Edition</span>
                      <ArrowRight size={12} />
                    </Link>
                  )}

                  <button
                    type="button"
                    onClick={(e) => toggleBookmark(item.slug, e)}
                    style={{
                      background: "none",
                      border: "none",
                      color: isBookmarked ? "#D49A24" : "rgba(255, 255, 255, 0.4)",
                      cursor: "pointer",
                      padding: "2px",
                    }}
                    aria-label="Bookmark edition"
                  >
                    <Bookmark size={13} fill={isBookmarked ? "#D49A24" : "none"} />
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
              border: "1px solid #E5E2D9",
              borderRadius: "20px",
              fontSize: "13px",
              fontWeight: 700,
              color: "#17151C",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
              transition: "all 0.2s ease",
            }}
          >
            <span>Load More Editions</span>
            <RefreshCw size={14} style={{ color: "#D49A24" }} />
          </button>
        </div>
      )}
    </section>
  );
}
