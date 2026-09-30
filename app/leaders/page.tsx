"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Crown, Globe, User, Briefcase, TrendingUp, Search } from "lucide-react";
import { PageIntro } from "@/components/editorial/PageIntro";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { leaderService } from "@/services/leaderService";
import type { Leader } from "@/types";
import { cleanStarPrimeText } from "@/lib/textUtils";

const badgeIcons = [Globe, User, Briefcase, TrendingUp];

export default function LeadersPage() {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    leaderService
      .fetchSanityLeaders()
      .then((data) => {
        if (data && data.length > 0) {
          const cleaned = data.map((l) => ({
            ...l,
            name: cleanStarPrimeText(l.name),
            role: cleanStarPrimeText(l.role),
            company: cleanStarPrimeText(l.company),
            bio: cleanStarPrimeText(l.bio),
          }));
          setLeaders(cleaned);
        }
      })
      .finally(() => setIsLoading(false));
  }, []);

  const filteredLeaders = useMemo(() => {
    if (!searchQuery.trim()) return leaders;
    const q = searchQuery.toLowerCase();
    return leaders.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        (l.role && l.role.toLowerCase().includes(q)) ||
        (l.company && l.company.toLowerCase().includes(q)) ||
        (l.bio && l.bio.toLowerCase().includes(q))
    );
  }, [leaders, searchQuery]);

  return (
    <main style={{ background: "var(--editorial-ivory, #F7F5EF)", minHeight: "100vh", paddingBottom: "80px" }}>
      <PageIntro
        title="Web Profiles Wall"
        intro="Discover the digital presence of our visionary leaders driving innovation and shaping the future."
        eyebrow="Executive Directory"
      />

      <div style={{ width: "100%", maxWidth: "100%", margin: "0 auto", padding: "0 clamp(16px, 2.5vw, 40px)", boxSizing: "border-box" }}>
        {/* Executive Directory Container */}
        <section
          style={{
            background: "#FFFFFF",
            border: "1px solid #E5E7EB",
            borderRadius: "24px",
            padding: "36px 32px 48px",
            marginBottom: "60px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.03)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Background Decorative Sapphire Wave */}
          <svg
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: "450px",
              height: "180px",
              opacity: 0.25,
              pointerEvents: "none",
              zIndex: 1,
            }}
            viewBox="0 0 450 180"
            fill="none"
          >
            <path d="M0,180 Q225,90 450,150 T900,100" stroke="#102A43" strokeWidth="1" fill="none" />
            <path d="M0,180 Q225,110 450,165 T900,120" stroke="#102A43" strokeWidth="1" fill="none" />
            <path d="M0,180 Q225,130 450,180 T900,140" stroke="#102A43" strokeWidth="1" fill="none" />
          </svg>

          {/* Section Header with Search Bar */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "36px",
              flexWrap: "wrap",
              gap: "20px",
              position: "relative",
              zIndex: 2,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 800,
                  letterSpacing: "2px",
                  color: "#102A43",
                  textTransform: "uppercase",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  marginBottom: "6px",
                }}
              >
                <Crown size={14} style={{ color: "#102A43" }} />
                EXECUTIVE DIRECTORY
              </div>
              <h2
                className="font-serif"
                style={{
                  fontSize: "32px",
                  fontWeight: 900,
                  color: "#102A43",
                  margin: 0,
                  lineHeight: 1.2,
                }}
              >
                All Web <span style={{ color: "#102A43" }}>Profiles</span> ({filteredLeaders.length})
              </h2>
            </div>

            {/* Quick Search */}
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "320px",
              }}
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search leader, role, or company..."
                style={{
                  width: "100%",
                  padding: "10px 38px 10px 16px",
                  background: "#F8FAFC",
                  border: "1px solid #CBD5E1",
                  borderRadius: "10px",
                  fontSize: "13px",
                  outline: "none",
                  color: "#102A43",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.02)",
                }}
              />
              <Search size={16} style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", color: "#94A3B8", pointerEvents: "none" }} />
            </div>
          </div>

          {/* Leaders Web Profiles Grid (Clean Rectangular Cards - No Circles) */}
          {isLoading && leaders.length === 0 ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "28px 24px" }}>
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} style={{ background: "#FFFFFF", borderRadius: "16px", border: "1px solid #E5E7EB", overflow: "hidden" }}>
                  <div className="skeleton-pulse" style={{ width: "100%", height: 320 }} />
                  <div style={{ padding: "20px" }}>
                    <div className="skeleton-pulse" style={{ width: "70%", height: 20, marginBottom: 10 }} />
                    <div className="skeleton-pulse" style={{ width: "50%", height: 14, marginBottom: 12 }} />
                    <div className="skeleton-pulse" style={{ width: "90%", height: 12 }} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "28px 24px",
              position: "relative",
              zIndex: 2,
            }}
          >
            {filteredLeaders.map((leader, idx) => {
              const IconComp = badgeIcons[idx % badgeIcons.length];

              return (
                <div
                  key={leader.slug || String(idx)}
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid #E2E8F0",
                    borderRadius: "16px",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "0 4px 18px rgba(10, 25, 47, 0.04)",
                    transition: "transform 0.25s ease, box-shadow 0.25s ease",
                  }}
                >
                  {/* Rectangular Executive Portrait Image Container - Full Uncropped View */}
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "360px",
                      background: "radial-gradient(circle at center, #1E293B 0%, #0F172A 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                      padding: "16px",
                      boxSizing: "border-box",
                    }}
                  >
                    {leader.image ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={leader.image}
                        alt={leader.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                          borderRadius: "8px",
                          filter: "drop-shadow(0 8px 24px rgba(0, 0, 0, 0.6))",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          height: "100%",
                          width: "100%",
                          display: "grid",
                          placeItems: "center",
                          color: "#FFFFFF",
                          fontWeight: 900,
                          fontSize: "64px",
                          background: "linear-gradient(135deg, #102A43 0%, #1E293B 100%)",
                        }}
                      >
                        {leader.name.charAt(0)}
                      </div>
                    )}

                    {/* Top-Right Category Badge */}
                    <div
                      style={{
                        position: "absolute",
                        top: "12px",
                        right: "12px",
                        background: "rgba(10, 25, 47, 0.88)",
                        backdropFilter: "blur(8px)",
                        color: "#FFFFFF",
                        padding: "6px 12px",
                        borderRadius: "20px",
                        fontSize: "10px",
                        fontWeight: 800,
                        letterSpacing: "1px",
                        border: "1px solid rgba(255, 255, 255, 0.25)",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        textTransform: "uppercase",
                        zIndex: 2,
                      }}
                    >
                      <IconComp size={13} />
                      <span>WEB PROFILE</span>
                    </div>
                  </div>

                  {/* Leader Info Content Body */}
                  <div
                    style={{
                      padding: "20px 20px 22px",
                      display: "flex",
                      flexDirection: "column",
                      flex: 1,
                      textAlign: "left",
                    }}
                  >
                    {/* Leader Name */}
                    <h3
                      className="font-serif"
                      style={{
                        fontSize: "20px",
                        fontWeight: 800,
                        color: "#102A43",
                        margin: "0 0 4px",
                        lineHeight: 1.3,
                      }}
                    >
                      <Link href={`/leaders/${leader.slug}`} style={{ color: "#102A43", textDecoration: "none" }}>
                        {leader.name}
                      </Link>
                    </h3>

                    {/* Role & Company */}
                    <div
                      style={{
                        fontSize: "11px",
                        fontWeight: 800,
                        letterSpacing: "1.2px",
                        color: "#64748B",
                        textTransform: "uppercase",
                        marginBottom: "12px",
                      }}
                    >
                      {leader.role || "EXECUTIVE LEADER"}{leader.company ? ` • ${leader.company}` : ""}
                    </div>

                    {/* Short Bio */}
                    <p
                      style={{
                        fontSize: "13px",
                        color: "#475569",
                        lineHeight: 1.5,
                        margin: "0 0 18px",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {leader.bio || "Leading enterprise transformation and global market expansion."}
                    </p>

                    {/* View Profile CTA Link */}
                    <Link
                      href={`/leaders/${leader.slug}`}
                      style={{
                        fontSize: "12px",
                        fontWeight: 800,
                        letterSpacing: "1px",
                        color: "#102A43",
                        textTransform: "uppercase",
                        textDecoration: "none",
                        borderBottom: "1.5px solid #102A43",
                        paddingBottom: "2px",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        marginTop: "auto",
                        transition: "opacity 0.2s ease",
                      }}
                    >
                      <span>VIEW PROFILE</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
          )}
        </section>

        {/* Newsletter Subscription Section */}
        <NewsletterSection />
      </div>
    </main>
  );
}
