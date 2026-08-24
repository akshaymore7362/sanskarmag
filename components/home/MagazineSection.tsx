"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, ExternalLink } from "lucide-react";
import { magazineService } from "@/services/magazineService";
import type { MagazineIssue } from "@/types";

export function MagazineSection() {
  const [issues, setIssues] = useState<MagazineIssue[]>([]);

  useEffect(() => {
    magazineService.fetchSanityMagazines().then((data) => {
      if (data && data.length > 0) {
        setIssues(data.slice(0, 4));
      } else {
        setIssues(magazineService.all().slice(0, 4));
      }
    });
  }, []);

  if (issues.length === 0) return null;

  return (
    <section style={{ width: "100%", maxWidth: "1280px", margin: "0 auto", padding: "28px 20px" }}>
      {/* Header Row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          borderBottom: "2px solid #ffdea5",
          paddingBottom: "14px",
          marginBottom: "32px",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div>
          <span style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "2px", color: "#775a19", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>
            PRINT &amp; DIGITAL EDITIONS
          </span>
          <h2 className="font-serif" style={{ fontSize: "clamp(18px, 2vw, 24px)", fontWeight: 800, color: "#191c1d", margin: 0 }}>
            Latest Magazine Issues
          </h2>
        </div>

        <Link
          href="/magazines"
          style={{
            fontSize: "12px",
            fontWeight: 800,
            letterSpacing: "1px",
            color: "#775a19",
            textTransform: "uppercase",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <span>View All Issues</span>
          <ArrowRight size={16} />
        </Link>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px" }}>
        {issues.map((issue, idx) => {
          const isFeatured = idx === 2;
          const targetUrl = issue.pdfUrl ? issue.pdfUrl : `/magazines/${issue.slug}`;
          const isExternalPdf = Boolean(issue.pdfUrl && (issue.pdfUrl.startsWith("http://") || issue.pdfUrl.startsWith("https://")));

          return (
            <div
              key={issue.id || issue.slug || String(idx)}
              style={{
                background: "#ffffff",
                border: isFeatured ? "2px solid #775a19" : "1px solid #e1e3e4",
                borderRadius: "10px",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                position: "relative",
              }}
            >
              {isExternalPdf ? (
                <a
                  href={targetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ width: "100%", textDecoration: "none" }}
                >
                  <div style={{ position: "relative", width: "100%", height: "300px", marginBottom: "16px", borderRadius: "6px", overflow: "hidden", background: "#0a192f" }}>
                    {issue.cover ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={issue.cover}
                        alt={issue.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    ) : (
                      <div style={{ width: "100%", height: "100%", color: "#fed488", display: "grid", placeItems: "center", fontWeight: 700, fontSize: "14px" }}>
                        {issue.title}
                      </div>
                    )}
                  </div>
                </a>
              ) : (
                <Link href={targetUrl} style={{ width: "100%", textDecoration: "none" }}>
                  <div style={{ position: "relative", width: "100%", height: "300px", marginBottom: "16px", borderRadius: "6px", overflow: "hidden", background: "#0a192f" }}>
                    {issue.cover ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={issue.cover}
                        alt={issue.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    ) : (
                      <div style={{ width: "100%", height: "100%", color: "#fed488", display: "grid", placeItems: "center", fontWeight: 700, fontSize: "14px" }}>
                        {issue.title}
                      </div>
                    )}
                  </div>
                </Link>
              )}

              <div style={{ fontSize: "11px", fontWeight: 800, color: "#775a19", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "6px" }}>
                {issue.issue || `Edition ${idx + 1}`} - {issue.date || "2026"}
              </div>

              <h4 className="font-serif" style={{ fontSize: "15px", fontWeight: 800, color: "#191c1d", margin: "0 0 12px", lineHeight: 1.35, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                {isExternalPdf ? (
                  <a href={targetUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#191c1d", textDecoration: "none" }}>
                    {issue.title}
                  </a>
                ) : (
                  <Link href={targetUrl} style={{ color: "#191c1d", textDecoration: "none" }}>
                    {issue.title}
                  </Link>
                )}
              </h4>

              {isExternalPdf ? (
                <a
                  href={targetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: "#0a192f",
                    color: "#fed488",
                    fontSize: "11px",
                    fontWeight: 800,
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    padding: "8px 16px",
                    borderRadius: "5px",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    marginTop: "auto",
                  }}
                >
                  <BookOpen size={13} /> Read PDF Edition <ExternalLink size={12} />
                </a>
              ) : (
                <Link
                  href={targetUrl}
                  style={{
                    background: "#0a192f",
                    color: "#fed488",
                    fontSize: "11px",
                    fontWeight: 800,
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    padding: "8px 16px",
                    borderRadius: "5px",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    marginTop: "auto",
                  }}
                >
                  <BookOpen size={13} /> Read PDF Edition
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
