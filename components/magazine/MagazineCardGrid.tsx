import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bookmark, Sparkles, ExternalLink, Calendar } from "lucide-react";
import type { MagazineIssue } from "@/types";

interface Props {
  issues: MagazineIssue[];
}

export function MagazineCardGrid({ issues }: Props) {
  const [bookmarkedSlugs, setBookmarkedSlugs] = useState<Record<string, boolean>>({});

  const toggleBookmark = (slug: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setBookmarkedSlugs((prev) => ({ ...prev, [slug]: !prev[slug] }));
  };

  // Group issues Year-Wise
  const groupedByYear = useMemo(() => {
    const map = new Map<string, MagazineIssue[]>();
    issues.forEach((issue) => {
      const yr = issue.year || (issue.date ? issue.date.match(/\b(19\d{2}|20\d{2})\b/)?.[1] : "2026") || "2026";
      if (!map.has(yr)) {
        map.set(yr, []);
      }
      map.get(yr)!.push(issue);
    });

    // Sort year keys descending (2026, 2025, 2024...)
    const sortedYears = Array.from(map.keys()).sort((a, b) => Number(b) - Number(a));

    return sortedYears.map((yr) => {
      const yearIssues = map.get(yr)!;
      // Sort issues within each year sequence-wise (Edition 01, 02, 03...)
      yearIssues.sort((a, b) => (a.sequenceNum || 1) - (b.sequenceNum || 1));
      return {
        year: yr,
        items: yearIssues,
      };
    });
  }, [issues]);

  if (issues.length === 0) {
    return (
      <section style={{ width: "100%", maxWidth: "1440px", margin: "0 auto", padding: "40px 6vw", textAlign: "center" }}>
        <div style={{ padding: "40px 20px", background: "#FFFFFF", borderRadius: "16px", border: "1px solid #CBD5E1" }}>
          <Calendar size={32} style={{ color: "#C5A059", marginBottom: "12px" }} />
          <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#0A192F", margin: "0 0 6px" }}>No Magazines Found</h3>
          <p style={{ fontSize: "13px", color: "#64748B", margin: 0 }}>Try clearing search or switching publication year filters.</p>
        </div>
      </section>
    );
  }

  return (
    <section style={{ width: "100%", maxWidth: "1440px", margin: "0 auto", padding: "0 6vw 60px" }}>
      {groupedByYear.map(({ year, items }) => (
        <div key={year} style={{ marginBottom: "50px" }}>
          {/* Year Section Title Banner */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "24px",
              paddingBottom: "12px",
              borderBottom: "2px solid #0A192F",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span
                style={{
                  background: "#0A192F",
                  color: "#FFFFFF",
                  padding: "4px 10px",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontWeight: 900,
                  letterSpacing: "1px",
                }}
              >
                {year}
              </span>
              <h2
                className="font-serif"
                style={{
                  fontSize: "24px",
                  fontWeight: 900,
                  color: "#0A192F",
                  margin: 0,
                  lineHeight: 1.2,
                }}
              >
                {year} Executive Editions
              </h2>
            </div>

            <span
              style={{
                fontSize: "12px",
                fontWeight: 800,
                color: "#C5A059",
                background: "#FCFAF6",
                border: "1px solid #DDD5CC",
                padding: "4px 12px",
                borderRadius: "20px",
              }}
            >
              {items.length} {items.length === 1 ? "Edition" : "Editions"}
            </span>
          </div>

          {/* 4-Column Grid for this Year's Sequence */}
          <div
            className="magazine-four-col-grid grid-responsive-4"
            style={{
              display: "grid",
              gap: "24px",
            }}
          >
            {items.map((item, idx) => {
              const isBookmarked = bookmarkedSlugs[item.slug];
              const targetUrl = item.pdfUrl ? item.pdfUrl : `/magazines/${item.slug}`;
              const isExternalPdf = Boolean(item.pdfUrl && (item.pdfUrl.startsWith("http://") || item.pdfUrl.startsWith("https://")));

              return (
                <div
                  key={item.slug || String(idx)}
                  style={{
                    position: "relative",
                    background: "#FFFFFF",
                    border: "1px solid #E2E8F0",
                    borderRadius: "16px",
                    padding: "16px",
                    boxShadow: "0 4px 18px rgba(10, 25, 47, 0.04)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
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

                {/* Top Year & Edition Sequence Badge Overlay */}
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    left: "10px",
                    background: "rgba(10, 25, 47, 0.92)",
                    backdropFilter: "blur(6px)",
                    color: "#FFFFFF",
                    fontSize: "10px",
                    fontWeight: 900,
                    padding: "5px 10px",
                    borderRadius: "6px",
                    letterSpacing: "0.5px",
                    border: "1px solid rgba(197, 160, 89, 0.4)",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                  }}
                >
                  <span style={{ color: "#D4B475" }}>{item.year || "2026"}</span>
                  <span>&bull;</span>
                  <span>{item.issue || "EDITION"}</span>
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
      </div>
    ))}
    </section>
  );
}
