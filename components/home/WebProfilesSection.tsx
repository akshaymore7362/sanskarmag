"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Crown, Globe, User, Briefcase, TrendingUp } from "lucide-react";
import { leaderService } from "@/services/leaderService";
import type { Leader } from "@/types";

const badgeIcons = [Globe, User, Briefcase, TrendingUp];

const defaultLeaders: Leader[] = [
  {
    id: "1",
    name: "Iana Abuqulbain",
    role: "EXECUTIVE LEADER",
    company: "Global Growth Corp",
    slug: "iana-abuqulbain",
    bio: "Driving enterprise growth and global excellence across international markets.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Iana Abuqulbain",
    highlights: [],
    quote: "",
    industrySlug: "technology",
  },
  {
    id: "2",
    name: "Dr. Annalisa Perego",
    role: "EXECUTIVE LEADER",
    company: "Sustainable Tech",
    slug: "dr-annalisa-perego",
    bio: "Leading strategic initiatives for sustainable growth and digital innovation.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Dr. Annalisa Perego",
    highlights: [],
    quote: "",
    industrySlug: "technology",
  },
  {
    id: "3",
    name: "James Stephens",
    role: "EXECUTIVE LEADER",
    company: "Apex Leadership",
    slug: "james-stephens",
    bio: "Empowering teams to achieve operational excellence and market leadership.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    imageAlt: "James Stephens",
    highlights: [],
    quote: "",
    industrySlug: "technology",
  },
  {
    id: "4",
    name: "Nichole Daher",
    role: "EXECUTIVE LEADER",
    company: "Creative Solutions",
    slug: "nichole-daher",
    bio: "Championing innovation and creative solutions across global industries.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Nichole Daher",
    highlights: [],
    quote: "",
    industrySlug: "technology",
  },
];

export function WebProfilesSection() {
  const [profiles, setProfiles] = useState<Leader[]>(defaultLeaders);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  useEffect(() => {
    leaderService.fetchSanityLeaders().then((items) => {
      if (items && items.length > 0) {
        setProfiles(items);
      }
    });
  }, []);

  const displayProfiles = profiles.length > 0 ? profiles : defaultLeaders;
  const activeLeader = displayProfiles[activeIndex % displayProfiles.length] || displayProfiles[0];

  const handleSelectLeader = (idx: number) => {
    setActiveIndex(idx);
    setIsExpanded(false);
  };

  return (
    <section
      style={{
        background: "linear-gradient(180deg, #F8FAFC 0%, #F1F5F9 100%)",
        position: "relative",
        padding: "50px 0 70px",
        overflow: "hidden",
      }}
    >
      {/* Background Decorative Metallic Graphic Lines */}
      <svg
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: "500px",
          height: "220px",
          opacity: 0.25,
          pointerEvents: "none",
          zIndex: 1,
        }}
        viewBox="0 0 500 220"
        fill="none"
      >
        <path d="M0,220 Q250,110 500,180 T1000,120" stroke="#1E40AF" strokeWidth="1.5" fill="none" />
        <path d="M0,220 Q250,130 500,195 T1000,140" stroke="#1E40AF" strokeWidth="1" fill="none" />
      </svg>

      <div className="site-shell" style={{ position: "relative", zIndex: 2 }}>
        {/* SECTION HEADER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "36px",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "12px",
                fontWeight: 800,
                letterSpacing: "2.5px",
                color: "#1E40AF",
                textTransform: "uppercase",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "8px",
              }}
            >
              <Crown size={15} style={{ color: "#1E40AF" }} />
              GLOBAL EXECUTIVE SPOTLIGHT
            </div>
            <h2
              className="font-serif"
              style={{
                fontSize: "clamp(28px, 4vw, 44px)",
                fontWeight: 900,
                color: "#0A192F",
                lineHeight: 1.1,
                margin: "0 0 10px",
                letterSpacing: "-0.5px",
              }}
            >
              Web <span style={{ color: "#1E40AF" }}>Profiles</span> Wall
            </h2>
            <p
              style={{
                fontSize: "15px",
                color: "#4B5563",
                margin: 0,
                maxWidth: "560px",
                lineHeight: 1.6,
              }}
            >
              Discover the inspiring journeys and visionary impact of world-class executives.
            </p>
          </div>

          <Link
            href="/leaders"
            style={{
              fontSize: "13px",
              fontWeight: 800,
              letterSpacing: "1.2px",
              color: "#0A192F",
              textTransform: "uppercase",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "#FFFFFF",
              border: "1.5px solid #1E40AF",
              padding: "10px 20px",
              borderRadius: "30px",
              boxShadow: "0 4px 14px rgba(197, 160, 89, 0.15)",
              transition: "all 0.25s ease",
            }}
          >
            <span>VIEW ALL ({profiles.length})</span>
            <ArrowRight size={15} style={{ color: "#1E40AF" }} />
          </Link>
        </div>

        {/* SINGLE FULL-SECTION WEB PROFILE SHOWCASE CARD */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "20px",
            border: "1px solid #E2E8F0",
            boxShadow: "0 20px 45px rgba(10, 25, 47, 0.07)",
            padding: "clamp(24px, 3.5vw, 40px)",
            marginBottom: "36px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "36px",
              alignItems: "center",
            }}
          >
            {/* LEFT: Full Uncropped Portrait Image Container (100% full view) */}
            <div
              style={{
                width: "100%",
                height: "480px",
                borderRadius: "16px",
                overflow: "hidden",
                border: "1px solid #E2E8F0",
                boxShadow: "0 12px 30px rgba(0, 0, 0, 0.08)",
                position: "relative",
                background: "#0F172A",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "12px",
              }}
            >
              {activeLeader.image ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={activeLeader.image}
                  alt={activeLeader.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              ) : (
                <div
                  style={{
                    height: "100%",
                    width: "100%",
                    display: "grid",
                    placeItems: "center",
                    color: "#1E40AF",
                    fontWeight: 900,
                    fontSize: "72px",
                    background: "linear-gradient(135deg, #0A192F 0%, #1E293B 100%)",
                  }}
                >
                  {activeLeader.name.charAt(0)}
                </div>
              )}

              {/* Executive Accent Tag */}
              <div
                style={{
                  position: "absolute",
                  top: "14px",
                  left: "14px",
                  background: "rgba(10, 25, 47, 0.85)",
                  backdropFilter: "blur(8px)",
                  color: "#1E40AF",
                  padding: "6px 14px",
                  borderRadius: "20px",
                  fontSize: "11px",
                  fontWeight: 800,
                  letterSpacing: "1px",
                  border: "1px solid rgba(197, 160, 89, 0.4)",
                  textTransform: "uppercase",
                }}
              >
                FEATURED SPOTLIGHT
              </div>
            </div>

            {/* RIGHT: Leader Info & Details */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 900,
                  letterSpacing: "2px",
                  color: "#1E40AF",
                  textTransform: "uppercase",
                }}
              >
                EXECUTIVE PROFILE &bull; 0{activeIndex + 1} OF {displayProfiles.length}
              </div>

              <h3
                className="font-serif"
                style={{
                  fontSize: "clamp(30px, 3.5vw, 40px)",
                  fontWeight: 900,
                  color: "#0A192F",
                  margin: 0,
                  lineHeight: 1.15,
                }}
              >
                {activeLeader.name}
              </h3>

              <div
                style={{
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "#1E40AF",
                  letterSpacing: "0.5px",
                }}
              >
                {activeLeader.role || "EXECUTIVE LEADER"}{" "}
                {activeLeader.company ? <span style={{ color: "#64748B" }}>&bull; {activeLeader.company}</span> : ""}
              </div>

              {/* Bio description with Read More toggle */}
              <div style={{ position: "relative" }}>
                <p
                  style={{
                    fontSize: "15px",
                    color: "#475569",
                    lineHeight: 1.65,
                    margin: 0,
                    display: "-webkit-box",
                    WebkitLineClamp: isExpanded ? "none" : 4,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {activeLeader.bio ||
                    "Driving visionary leadership, international enterprise growth, digital innovation, and transformation across worldwide markets."}
                </p>

                {/* Read More inline toggle */}
                <button
                  type="button"
                  onClick={() => setIsExpanded(!isExpanded)}
                  style={{
                    background: "none",
                    border: "none",
                    padding: "6px 0 0",
                    color: "#1E40AF",
                    fontSize: "13px",
                    fontWeight: 800,
                    letterSpacing: "0.5px",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    textDecoration: "underline",
                    textUnderlineOffset: "3px",
                  }}
                >
                  {isExpanded ? "Read Less ▲" : "Read More ▶"}
                </button>
              </div>

              {/* Milestone chips */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                  marginTop: "4px",
                }}
              >
                <span
                  style={{
                    background: "rgba(197, 160, 89, 0.12)",
                    color: "#0A192F",
                    padding: "6px 14px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: 700,
                    border: "1px solid rgba(197, 160, 89, 0.3)",
                  }}
                >
                  Enterprise Leadership
                </span>
                <span
                  style={{
                    background: "#F1F5F9",
                    color: "#475569",
                    padding: "6px 14px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: 700,
                  }}
                >
                  Global Growth
                </span>
                <span
                  style={{
                    background: "#F1F5F9",
                    color: "#475569",
                    padding: "6px 14px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: 700,
                  }}
                >
                  Digital Transformation
                </span>
              </div>

              {/* Action Buttons */}
              <div
                style={{
                  display: "flex",
                  gap: "14px",
                  flexWrap: "wrap",
                  marginTop: "12px",
                }}
              >
                <Link
                  href={`/leaders/${activeLeader.slug}`}
                  style={{
                    background: "linear-gradient(135deg, #0A192F 0%, #1E293B 100%)",
                    color: "#FFFFFF",
                    fontSize: "12px",
                    fontWeight: 800,
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    padding: "13px 26px",
                    borderRadius: "8px",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    boxShadow: "0 6px 18px rgba(10, 25, 47, 0.18)",
                    transition: "all 0.2s ease",
                  }}
                >
                  <span>VIEW FULL WEB PROFILE</span>
                  <ArrowRight size={15} style={{ color: "#1E40AF" }} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM EXECUTIVE SELECTOR (Click to Redirect Direct to Profile Page) */}
        <div>
          <div
            style={{
              fontSize: "12px",
              fontWeight: 800,
              color: "#0A192F",
              letterSpacing: "1.8px",
              textTransform: "uppercase",
              marginBottom: "14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span>EXECUTIVE DIRECTORY ({displayProfiles.length})</span>
            <span style={{ color: "#1E40AF", fontSize: "11px" }}>CLICK TO VIEW PROFILE</span>
          </div>

          <div
            style={{
              display: "flex",
              gap: "14px",
              overflowX: "auto",
              paddingBottom: "12px",
              scrollbarWidth: "thin",
            }}
          >
            {displayProfiles.map((leader, idx) => {
              const isActive = idx === activeIndex;

              return (
                <Link
                  key={leader.slug || String(idx)}
                  href={`/leaders/${leader.slug}`}
                  style={{
                    flex: "0 0 160px",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "10px 14px",
                    background: isActive ? "#FFFFFF" : "rgba(255, 255, 255, 0.7)",
                    border: isActive ? "2px solid #1E40AF" : "1px solid #E2E8F0",
                    borderRadius: "12px",
                    textDecoration: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.25s ease",
                    boxShadow: isActive ? "0 8px 20px rgba(10, 25, 47, 0.09)" : "0 2px 6px rgba(0, 0, 0, 0.02)",
                  }}
                >
                  {/* Thumbnail Image */}
                  <div
                    style={{
                      width: "48px",
                      height: "60px",
                      borderRadius: "8px",
                      overflow: "hidden",
                      background: "#0F172A",
                      flexShrink: 0,
                      border: isActive ? "1px solid #1E40AF" : "1px solid #CBD5E1",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {leader.image ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={leader.image}
                        alt={leader.name}
                        style={{ width: "100%", height: "100%", objectFit: "contain" }}
                      />
                    ) : (
                      <div style={{ color: "#1E40AF", fontWeight: 800 }}>{leader.name.charAt(0)}</div>
                    )}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: "13px",
                        fontWeight: 800,
                        color: "#0A192F",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {leader.name}
                    </div>
                    <div
                      style={{
                        fontSize: "11px",
                        color: "#64748B",
                        fontWeight: 600,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        marginTop: "2px",
                      }}
                    >
                      {leader.role || "EXECUTIVE"}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}








