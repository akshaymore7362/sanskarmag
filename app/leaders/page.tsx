"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Crown, Globe, User, Briefcase, TrendingUp, Search } from "lucide-react";
import { PageIntro } from "@/components/editorial/PageIntro";
import { NewsletterSection } from "@/components/home/NewsletterSection";
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

export default function LeadersPage() {
  const [leaders, setLeaders] = useState<Leader[]>(defaultLeaders);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    leaderService.fetchSanityLeaders().then((data) => {
      if (data && data.length > 0) {
        setLeaders(data);
      }
    });
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
    <main style={{ background: "#F3F4F6", minHeight: "100vh", paddingBottom: "80px" }}>
      <PageIntro
        title="Web Profiles Wall"
        intro="Discover the digital presence of our visionary leaders driving innovation and shaping the future."
        eyebrow="Executive Directory"
      />

      <div style={{ width: "100%", maxWidth: "1400px", margin: "0 auto", padding: "0 24px", boxSizing: "border-box" }}>
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
          {/* Background Decorative Gold Wave */}
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
            <path d="M0,180 Q225,90 450,150 T900,100" stroke="#C5A059" strokeWidth="1" fill="none" />
            <path d="M0,180 Q225,110 450,165 T900,120" stroke="#C5A059" strokeWidth="1" fill="none" />
            <path d="M0,180 Q225,130 450,180 T900,140" stroke="#C5A059" strokeWidth="1" fill="none" />
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
                  color: "#C5A059",
                  textTransform: "uppercase",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  marginBottom: "6px",
                }}
              >
                <Crown size={14} style={{ color: "#C5A059" }} />
                EXECUTIVE DIRECTORY
              </div>
              <h2
                className="font-serif"
                style={{
                  fontSize: "32px",
                  fontWeight: 900,
                  color: "#0A192F",
                  margin: 0,
                  lineHeight: 1.2,
                }}
              >
                All Web <span style={{ color: "#C5A059" }}>Profiles</span> ({filteredLeaders.length})
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
                  color: "#0A192F",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.02)",
                }}
              />
              <Search size={16} style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", color: "#94A3B8", pointerEvents: "none" }} />
            </div>
          </div>

          {/* Leaders Web Profiles Grid (Homepage Style) */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "32px 24px",
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
                    border: "1px solid #F1F5F9",
                    borderRadius: "20px",
                    padding: "28px 20px 24px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    boxShadow: "0 4px 18px rgba(10, 25, 47, 0.04)",
                    transition: "transform 0.25s ease, box-shadow 0.25s ease",
                  }}
                >
                  {/* Circular Portrait Avatar Container with Arc Ring (185px Homepage Style) */}
                  <div
                    style={{
                      position: "relative",
                      width: "185px",
                      height: "185px",
                      margin: "0 auto 20px",
                    }}
                  >
                    {/* Outer Golden/Burgundy Thin Arc Ring */}
                    <div
                      style={{
                        position: "absolute",
                        inset: "-8px",
                        borderRadius: "50%",
                        border: "2px solid #C5A059",
                        borderLeftColor: "transparent",
                        borderBottomColor: "#C5A059",
                        transform: "rotate(-35deg)",
                        pointerEvents: "none",
                      }}
                    />

                    {/* Dotted Accent Matrix on Right */}
                    <div
                      style={{
                        position: "absolute",
                        right: "-18px",
                        top: "30%",
                        width: "16px",
                        height: "36px",
                        background: "radial-gradient(#C5A059 1.5px, transparent 1.5px)",
                        backgroundSize: "6px 6px",
                        opacity: 0.7,
                        pointerEvents: "none",
                      }}
                    />

                    {/* Main Portrait Circle */}
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "50%",
                        overflow: "hidden",
                        background: "#F3F4F6",
                        border: "3.5px solid #FFFFFF",
                        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.12)",
                        position: "relative",
                      }}
                    >
                      {leader.image ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={leader.image}
                          alt={leader.name}
                          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
                        />
                      ) : (
                        <div
                          style={{
                            height: "100%",
                            display: "grid",
                            placeItems: "center",
                            color: "#C5A059",
                            fontWeight: 900,
                            fontSize: "44px",
                            background: "#E5E7EB",
                          }}
                        >
                          {leader.name.charAt(0)}
                        </div>
                      )}
                    </div>

                    {/* Bottom-Right Category Badge Icon */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: "4px",
                        right: "4px",
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        background: "#C5A059",
                        color: "#FFFFFF",
                        border: "2.5px solid #FFFFFF",
                        boxShadow: "0 4px 12px rgba(10, 25, 47, 0.3)",
                        display: "grid",
                        placeItems: "center",
                        zIndex: 4,
                      }}
                    >
                      <IconComp size={17} />
                    </div>
                  </div>

                  {/* Leader Name */}
                  <h3
                    className="font-serif"
                    style={{
                      fontSize: "22px",
                      fontWeight: 800,
                      color: "#0A192F",
                      margin: "0 0 6px",
                      lineHeight: 1.25,
                    }}
                  >
                    <Link href={`/leaders/${leader.slug}`} style={{ color: "#0A192F", textDecoration: "none" }}>
                      {leader.name}
                    </Link>
                  </h3>

                  {/* Role Badge */}
                  <div
                    style={{
                      fontSize: "11px",
                      fontWeight: 900,
                      letterSpacing: "1.5px",
                      color: "#C5A059",
                      textTransform: "uppercase",
                      marginBottom: "8px",
                    }}
                  >
                    {leader.role || "EXECUTIVE LEADER"}{leader.company ? ` • ${leader.company}` : ""}
                  </div>

                  {/* Diamond Line Divider Accent */}
                  <div
                    style={{
                      width: "24px",
                      height: "1px",
                      background: "#C5A059",
                      margin: "0 auto 12px",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        width: "5px",
                        height: "5px",
                        background: "#C5A059",
                        transform: "translate(-50%, -50%) rotate(45deg)",
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                      }}
                    />
                  </div>

                  {/* Short Bio / Tagline */}
                  <p
                    style={{
                      fontSize: "13px",
                      color: "#6B7280",
                      lineHeight: 1.5,
                      margin: "0 0 20px",
                      maxWidth: "240px",
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
                      color: "#C5A059",
                      textTransform: "uppercase",
                      textDecoration: "none",
                      borderBottom: "1.5px solid #C5A059",
                      paddingBottom: "2px",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "5px",
                      marginTop: "auto",
                      transition: "opacity 0.2s ease",
                    }}
                  >
                    <span>VIEW PROFILE</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              );
            })}
          </div>
        </section>

        {/* Newsletter Subscription Section */}
        <NewsletterSection />
      </div>
    </main>
  );
}
