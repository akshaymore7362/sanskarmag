"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Crown, Globe, User, Briefcase, TrendingUp } from "lucide-react";
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

  useEffect(() => {
    leaderService.fetchSanityLeaders().then((data) => {
      if (data && data.length > 0) {
        setLeaders(data);
      }
    });
  }, []);

  return (
    <main style={{ background: "#F7F5F0", minHeight: "100vh", paddingBottom: "80px" }}>
      <PageIntro
        title="Web Profiles Wall"
        intro="Discover the digital presence of our visionary leaders driving innovation and shaping the future."
        eyebrow="Executive Directory"
      />

      <div className="site-shell" style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Executive Directory Grid */}
        <section
          style={{
            background: "#F7F5F0",
            border: "1px solid #E5E2D9",
            borderRadius: "20px",
            padding: "48px 32px",
            marginBottom: "60px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
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
              width: "400px",
              height: "160px",
              opacity: 0.3,
              pointerEvents: "none",
            }}
            viewBox="0 0 450 180"
            fill="none"
          >
            <path d="M0,180 Q225,90 450,150 T900,100" stroke="#B69A5A" strokeWidth="1" fill="none" />
            <path d="M0,180 Q225,110 450,165 T900,120" stroke="#B69A5A" strokeWidth="1" fill="none" />
          </svg>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "32px 0",
            }}
          >
            {leaders.map((leader, idx) => {
              const IconComp = badgeIcons[idx % badgeIcons.length];
              const showSeparator = (idx + 1) % 4 !== 0 && idx < leaders.length - 1;

              return (
                <div
                  key={leader.slug || String(idx)}
                  style={{
                    padding: "10px 24px 24px",
                    textAlign: "center",
                    position: "relative",
                    borderRight: showSeparator ? "1px solid #E5E2D9" : "none",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  {/* Diamond Node on Divider Line */}
                  {showSeparator && (
                    <div
                      style={{
                        position: "absolute",
                        right: "-5px",
                        top: "50%",
                        width: "8px",
                        height: "8px",
                        background: "#B69A5A",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 3,
                      }}
                    />
                  )}

                  {/* Avatar Container with Arc Ring */}
                  <div
                    style={{
                      position: "relative",
                      width: "140px",
                      height: "140px",
                      margin: "0 auto 20px",
                    }}
                  >
                    {/* Outer Thin Arc Ring */}
                    <div
                      style={{
                        position: "absolute",
                        inset: "-8px",
                        borderRadius: "50%",
                        border: "1.5px solid #8B1029",
                        borderLeftColor: "transparent",
                        borderBottomColor: "#B69A5A",
                        transform: "rotate(-35deg)",
                        pointerEvents: "none",
                      }}
                    />

                    {/* Dotted Accent Matrix */}
                    <div
                      style={{
                        position: "absolute",
                        right: "-18px",
                        top: "30%",
                        width: "16px",
                        height: "36px",
                        background: "radial-gradient(#B69A5A 1.5px, transparent 1.5px)",
                        backgroundSize: "6px 6px",
                        opacity: 0.7,
                        pointerEvents: "none",
                      }}
                    />

                    {/* Portrait Circle */}
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "50%",
                        overflow: "hidden",
                        background: "#F2EDE4",
                        border: "3px solid #FFFFFF",
                        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
                        position: "relative",
                      }}
                    >
                      {leader.image ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={leader.image}
                          alt={leader.name}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      ) : (
                        <div
                          style={{
                            height: "100%",
                            display: "grid",
                            placeItems: "center",
                            color: "#8B1029",
                            fontWeight: 900,
                            fontSize: "36px",
                            background: "#EBE5D8",
                          }}
                        >
                          {leader.name.charAt(0)}
                        </div>
                      )}
                    </div>

                    {/* Bottom Right Badge Icon */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: "2px",
                        right: "2px",
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        background: "#8B1029",
                        color: "#FFFFFF",
                        border: "2px solid #FFFFFF",
                        boxShadow: "0 4px 10px rgba(139, 16, 41, 0.3)",
                        display: "grid",
                        placeItems: "center",
                        zIndex: 4,
                      }}
                    >
                      <IconComp size={15} />
                    </div>
                  </div>

                  {/* Leader Name */}
                  <h3
                    className="font-serif"
                    style={{
                      fontSize: "20px",
                      fontWeight: 800,
                      color: "#101722",
                      margin: "0 0 4px",
                      lineHeight: 1.25,
                    }}
                  >
                    {leader.name}
                  </h3>

                  {/* Role Badge */}
                  <div
                    style={{
                      fontSize: "11px",
                      fontWeight: 900,
                      letterSpacing: "1.5px",
                      color: "#8B1029",
                      textTransform: "uppercase",
                      marginBottom: "6px",
                    }}
                  >
                    {leader.role || "EXECUTIVE LEADER"}
                  </div>

                  {/* Diamond Line Accent */}
                  <div
                    style={{
                      width: "24px",
                      height: "1px",
                      background: "#B69A5A",
                      margin: "0 auto 10px",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        width: "5px",
                        height: "5px",
                        background: "#B69A5A",
                        transform: "translate(-50%, -50%) rotate(45deg)",
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                      }}
                    />
                  </div>

                  {/* Short Bio */}
                  <p
                    style={{
                      fontSize: "13px",
                      color: "#66616C",
                      lineHeight: 1.5,
                      margin: "0 0 16px",
                      maxWidth: "220px",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {leader.bio || "Leading enterprise transformation and global market expansion."}
                  </p>

                  {/* View Profile Link */}
                  <Link
                    href={`/leaders/${leader.slug}`}
                    style={{
                      fontSize: "12px",
                      fontWeight: 800,
                      letterSpacing: "1px",
                      color: "#8B1029",
                      textTransform: "uppercase",
                      textDecoration: "none",
                      borderBottom: "1.5px solid #8B1029",
                      paddingBottom: "2px",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "5px",
                      marginTop: "auto",
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
