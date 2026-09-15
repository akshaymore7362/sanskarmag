import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bookmark, ExternalLink, Calendar } from "lucide-react";
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

    const sortedYears = Array.from(map.keys()).sort((a, b) => Number(b) - Number(a));

    // Do NOT re-sort issues within a year by `sequenceNum` — that field is often
    // guessed from numbers inside the title (e.g. "Top 10 CEOs" -> 10, "5 Most
    // Inspiring..." -> 5) and does not reflect upload order. `issues` already
    // arrives newest-upload-first from magazineService (Sanity `_createdAt desc`),
    // and `Array.forEach` above preserves that order per year group, so we just
    // use it as-is.
    return sortedYears.map((yr) => ({
      year: yr,
      items: map.get(yr)!,
    }));
  }, [issues]);

  if (issues.length === 0) {
    return (
      <section style={{ width: "100%", maxWidth: "100%", margin: "0 auto", padding: "40px clamp(16px, 2.5vw, 40px)", textAlign: "center" }}>
        <div style={{ padding: "40px 20px" }}>
          <Calendar size={32} style={{ color: "#102A43", marginBottom: "12px" }} />
          <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#102A43", margin: "0 0 6px" }}>No Magazines Found</h3>
          <p style={{ fontSize: "13px", color: "#64748B", margin: 0 }}>Try clearing search or switching publication year filters.</p>
        </div>
      </section>
    );
  }

  return (
    <section style={{ width: "100%", maxWidth: "100%", margin: "0 auto", padding: "0 clamp(16px, 2.5vw, 40px) 60px" }}>
      {groupedByYear.map(({ year, items }) => (
        <div key={year} style={{ marginBottom: "60px" }}>
          {/* Year Section Title Banner */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "32px",
              paddingBottom: "12px",
              borderBottom: "2px solid #102A43",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span
                style={{
                  background: "#102A43",
                  color: "#FFFFFF",
                  padding: "4px 12px",
                  borderRadius: "4px",
                  fontSize: "13px",
                  fontWeight: 900,
                  letterSpacing: "1px",
                }}
              >
                {year}
              </span>
              <h2
                className="font-serif"
                style={{
                  fontSize: "26px",
                  fontWeight: 900,
                  color: "#102A43",
                  margin: 0,
                  lineHeight: 1.2,
                }}
              >
                {year} Published Editions
              </h2>
            </div>

            <span
              style={{
                fontSize: "13px",
                fontWeight: 800,
                color: "#102A43",
                letterSpacing: "0.5px",
              }}
            >
              {items.length} {items.length === 1 ? "Edition" : "Editions"}
            </span>
          </div>

          {/* Clean Editorial Magazine Grid (No cards, no borders, spacious listing) */}
          <div
            className="grid-responsive-4"
            style={{
              display: "grid",
              gap: "36px 28px",
            }}
          >
            {items.map((item, idx) => {
              const isBookmarked = bookmarkedSlugs[item.slug];
              const targetUrl = item.pdfUrl ? item.pdfUrl : `/magazines/${item.slug}`;
              const isExternalPdf = Boolean(item.pdfUrl && (item.pdfUrl.startsWith("http://") || item.pdfUrl.startsWith("https://")));

              return (
                <article
                  key={item.slug || String(idx)}
                  style={{
                    background: "transparent",
                    border: "none",
                    borderRadius: "0",
                    padding: "0",
                    boxShadow: "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px",
                  }}
                >
                  {/* 1. Visually Independent Original Cover Image (NO text, NO badges, NO overlays) */}
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      aspectRatio: "8 / 10.5",
                      overflow: "hidden",
                      borderRadius: "8px",
                      boxShadow: "0 12px 30px rgba(10, 25, 47, 0.12)",
                      background: "#FCFAF6",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    }}
                  >
                    {isExternalPdf ? (
                      <a href={targetUrl} target="_blank" rel="noopener noreferrer" style={{ display: "block", width: "100%", height: "100%" }}>
                        {item.cover ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img
                            src={item.cover}
                            alt={item.title}
                            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                          />
                        ) : (
                          <div
                            style={{
                              height: "100%",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                              padding: "20px",
                              textAlign: "center",
                              background: "#102A43",
                            }}
                          >
                            <div className="font-serif" style={{ fontSize: "18px", fontWeight: 900, color: "#FFFFFF" }}>
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
                            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                          />
                        ) : (
                          <div
                            style={{
                              height: "100%",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                              padding: "20px",
                              textAlign: "center",
                              background: "#102A43",
                            }}
                          >
                            <div className="font-serif" style={{ fontSize: "18px", fontWeight: 900, color: "#FFFFFF" }}>
                              THE SUCCESS WORLD
                            </div>
                          </div>
                        )}
                      </Link>
                    )}
                  </div>

                  {/* 2. Separate Editorial Magazine Information Container */}
                  <div
                    style={{
                      background: "transparent",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      flex: 1,
                      padding: "4px 0 0",
                    }}
                  >
                    <div>
                      {/* Publication Date / Year Metadata Header */}
                      <div
                        style={{
                          fontSize: "11px",
                          fontWeight: 500,
                          color: "#102A43",
                          letterSpacing: "1px",
                          textTransform: "uppercase",
                          marginBottom: "6px",
                        }}
                      >
                        {item.date || item.year || year}
                      </div>

                      {/* Magazine Title */}
                      <h3
                        className="font-serif"
                        style={{
                          fontSize: "17px",
                          fontWeight: 400,
                          color: "#101722",
                          margin: "0 0 8px",
                          lineHeight: 1.35,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {isExternalPdf ? (
                          <a href={targetUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#101722", textDecoration: "none", fontWeight: 400 }}>
                            {item.title}
                          </a>
                        ) : (
                          <Link href={targetUrl} style={{ color: "#101722", textDecoration: "none", fontWeight: 400 }}>
                            {item.title}
                          </Link>
                        )}
                      </h3>

                      {/* Subtitle / Description */}
                      <p
                        style={{
                          fontSize: "13px",
                          fontWeight: 400,
                          color: "#55545A",
                          lineHeight: 1.5,
                          margin: "0 0 14px",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {item.subtitle || item.description || "Executive Digital Edition"}
                      </p>
                    </div>

                    {/* Action Row */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingTop: "8px",
                      }}
                    >
                      {isExternalPdf ? (
                        <a
                          href={targetUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            fontSize: "13px",
                            fontWeight: 500,
                            color: "#102A43",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            textDecoration: "none",
                          }}
                        >
                          <span>Read Edition</span>
                          <ExternalLink size={14} />
                        </a>
                      ) : (
                        <Link
                          href={targetUrl}
                          style={{
                            fontSize: "13px",
                            fontWeight: 500,
                            color: "#102A43",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            textDecoration: "none",
                          }}
                        >
                          <span>Read Edition</span>
                          <ArrowRight size={14} />
                        </Link>
                      )}

                      <button
                        type="button"
                        onClick={(e) => toggleBookmark(item.slug, e)}
                        style={{
                          background: "none",
                          border: "none",
                          color: isBookmarked ? "#102A43" : "#94A3B8",
                          cursor: "pointer",
                          padding: "4px",
                        }}
                        aria-label="Bookmark edition"
                      >
                        <Bookmark size={15} fill={isBookmarked ? "#102A43" : "none"} />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
}

