"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Crown, Globe, User, Briefcase, TrendingUp } from "lucide-react";
import { leaderService } from "@/services/leaderService";
import { useMagazineSync, deriveWebProfile } from "@/components/home/MagazineSyncContext";
import type { Leader } from "@/types";

const badgeIcons = [Globe, User, Briefcase, TrendingUp];

// Sanity's CDN serves the original, un-resized upload unless a transform is
// requested — so a raw asset URL can be several MB. Requesting a sized,
// compressed variant is what actually makes slide switches fast, since the
// browser downloads a fraction of the bytes (and repeats hit its own cache).
function sanityImg(url: string, width: number, quality = 70): string {
  if (!url || !url.includes("cdn.sanity.io")) return url;
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}w=${width}&q=${quality}&auto=format&fit=max`;
}

function normalizeName(name: string): string {
  return name
    .toLowerCase()
    .replace(/^(dr|mr|mrs|ms|prof)\.?\s+/i, "")
    .trim();
}

export function WebProfilesSection() {
  const [profiles, setProfiles] = useState<Leader[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // Shared with HeroSection via MagazineSyncProvider — the exact same
  // selected-issue object the magazine cover slider renders from. The
  // spotlight below is derived from this one object (deriveWebProfile), so
  // it is architecturally impossible for it to show a different issue than
  // the cover: there is only one object, not two independent indexes.
  const { selectedIssue, selectedIndex, issues } = useMagazineSync();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  useEffect(() => {
    leaderService
      .fetchSanityLeaders()
      .then((items) => {
        if (items && items.length > 0) {
          setProfiles(items);
        }
      })
      .finally(() => setIsLoading(false));
  }, []);

  const displayProfiles = profiles;
  const issueProfile = selectedIssue ? deriveWebProfile(selectedIssue) : null;

  // Warm the browser cache for every leader photo up front, at the sized
  // variant the spotlight actually renders — so switching to a slide (first
  // time or repeated) is instant instead of triggering a fresh fetch.
  useEffect(() => {
    if (profiles.length === 0) return;
    profiles.forEach((leader) => {
      if (!leader.image) return;
      const img = new Image();
      img.src = sanityImg(leader.image, 700);
    });
  }, [profiles]);

  // Prefer a REAL leader record (real photo, real bio, real role/company)
  // when this issue's cover subject has one — the magazine cover image is
  // never used as a stand-in "portrait" here, it's a different kind of
  // asset (a full page layout, not a headshot) and showing it in a
  // photo-card looked wrong. Falls back to an initials avatar, never the
  // cover, when no matching leader record exists.
  const matchedLeader = issueProfile
    ? displayProfiles.find((l) => {
        const a = normalizeName(l.name || "");
        const b = normalizeName(issueProfile.name);
        return a === b || (a && b && (a.includes(b) || b.includes(a)));
      })
    : undefined;

  const profile = issueProfile
    ? {
        name: matchedLeader?.name || issueProfile.name,
        headline: matchedLeader
          ? `${matchedLeader.role || "EXECUTIVE LEADER"}${matchedLeader.company ? ` • ${matchedLeader.company}` : ""}`
          : issueProfile.headline,
        bio: matchedLeader?.bio || issueProfile.bio,
        // No cover-image fallback — real photo or nothing (initials avatar).
        avatar: matchedLeader?.image || "",
      }
    : null;

  // "View full profile" link target: a matched leader has a real profile
  // page; otherwise there's no separate leader page for this cover subject,
  // so it opens that issue's own reader page instead.
  const profileHref = matchedLeader?.slug
    ? `/leaders/${matchedLeader.slug}`
    : selectedIssue?.pdfUrl || `/magazines/${selectedIssue?.slug || ""}`;

  // Collapse any expanded bio when the selected issue changes (driven by the
  // Hero slider), so switching covers doesn't leave a stale reader state.
  useEffect(() => {
    setIsExpanded(false);
  }, [selectedIssue?.id]);

  if (isLoading && profiles.length === 0) {
    return (
      <section style={{ background: "var(--editorial-ivory, #F7F5EF)", padding: "50px 0 70px" }}>
        <div className="site-shell">
          <div className="skeleton-pulse" style={{ width: "40%", height: 14, marginBottom: 16 }} />
          <div className="grid-split-layout" style={{ display: "grid", gridTemplateColumns: "minmax(380px, 1.7fr) minmax(280px, 1fr)", gap: 36 }}>
            <div className="skeleton-pulse" style={{ width: "100%", height: 520, borderRadius: 16 }} />
            <div>
              <div className="skeleton-pulse" style={{ width: "70%", height: 32, marginBottom: 12 }} />
              <div className="skeleton-pulse" style={{ width: "50%", height: 16, marginBottom: 20 }} />
              <div className="skeleton-pulse" style={{ width: "100%", height: 80 }} />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!profile) return null;

  return (
    <section
      style={{
        background: "var(--editorial-ivory, #F7F5EF)",
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
        <path d="M0,220 Q250,110 500,180 T1000,120" stroke="#102A43" strokeWidth="1.5" fill="none" />
        <path d="M0,220 Q250,130 500,195 T1000,140" stroke="#102A43" strokeWidth="1" fill="none" />
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
                color: "#102A43",
                textTransform: "uppercase",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "8px",
              }}
            >
              <Crown size={15} style={{ color: "#102A43" }} />
              GLOBAL EXECUTIVE SPOTLIGHT
            </div>
            <h2
              className="font-serif"
              style={{
                fontSize: "clamp(28px, 4vw, 44px)",
                fontWeight: 900,
                color: "#102A43",
                lineHeight: 1.1,
                margin: "0 0 10px",
                letterSpacing: "-0.5px",
              }}
            >
              Web <span style={{ color: "#102A43" }}>Profiles</span> Wall
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
              color: "#102A43",
              textTransform: "uppercase",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "#FFFFFF",
              border: "1.5px solid #102A43",
              padding: "10px 20px",
              borderRadius: "30px",
              transition: "all 0.25s ease",
            }}
          >
            <span>VIEW ALL ({profiles.length})</span>
            <ArrowRight size={15} style={{ color: "#102A43" }} />
          </Link>
        </div>

        {/* SINGLE FULL-SECTION WEB PROFILE SHOWCASE CARD */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "20px",
            border: "1px solid #E2E8F0",
            boxShadow: "0 6px 14px rgba(10, 25, 47, 0.05)",
            padding: "clamp(24px, 3.5vw, 40px)",
            marginBottom: "36px",
          }}
        >
          <div
            className="grid-split-layout"
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(380px, 1.7fr) minmax(280px, 1fr)",
              gap: "36px",
              alignItems: "center",
            }}
          >
            {/* LEFT: Portrait Photo Card — a real headshot, full-bleed like a
                proper profile card (never the magazine cover graphic) —
                clickable through to the profile */}
            <Link
              href={profileHref}
              aria-label={`View full profile for ${profile.name}`}
              style={{
                width: "100%",
                height: "520px",
                borderRadius: "16px",
                overflow: "hidden",
                border: "1px solid #E2E8F0",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.05)",
                position: "relative",
                background: "#0F172A",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              {profile.avatar ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={sanityImg(profile.avatar, 700)}
                  alt={profile.name}
                  loading="eager"
                  fetchPriority="high"
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
                    color: "#102A43",
                    fontWeight: 900,
                    fontSize: "72px",
                    background: "linear-gradient(135deg, #102A43 0%, #1E293B 100%)",
                  }}
                >
                  {profile.name.charAt(0)}
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
                  color: "#B7C4CD",
                  padding: "6px 14px",
                  borderRadius: "20px",
                  fontSize: "11px",
                  fontWeight: 800,
                  letterSpacing: "1px",
                  border: "1px solid rgba(147, 197, 253, 0.35)",
                  textTransform: "uppercase",
                }}
              >
                FEATURED SPOTLIGHT
              </div>
            </Link>

            {/* RIGHT: Leader Info & Details */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 900,
                  letterSpacing: "2px",
                  color: "#102A43",
                  textTransform: "uppercase",
                }}
              >
                EXECUTIVE PROFILE &bull; 0{selectedIndex + 1} OF {issues.length}
              </div>

              <h3
                className="font-serif"
                style={{
                  fontSize: "clamp(30px, 3.5vw, 40px)",
                  fontWeight: 900,
                  color: "#102A43",
                  margin: 0,
                  lineHeight: 1.15,
                }}
              >
                {profile.name}
              </h3>

              <div
                style={{
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "#102A43",
                  letterSpacing: "0.5px",
                }}
              >
                {profile.headline}
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
                  {profile.bio ||
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
                    color: "#102A43",
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
                    background: "rgba(147, 197, 253, 0.12)",
                    color: "#102A43",
                    padding: "6px 14px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: 700,
                    border: "1px solid rgba(147, 197, 253, 0.3)",
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
                  href={profileHref}
                  style={{
                    background: "linear-gradient(135deg, #102A43 0%, #1E293B 100%)",
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
                    transition: "all 0.2s ease",
                  }}
                >
                  <span>VIEW FULL WEB PROFILE</span>
                  <ArrowRight size={15} style={{ color: "#FFFFFF" }} />
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
              color: "#102A43",
              letterSpacing: "1.8px",
              textTransform: "uppercase",
              marginBottom: "14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span>EXECUTIVE DIRECTORY ({displayProfiles.length})</span>
            <Link
              href={profileHref}
              style={{ color: "#102A43", fontSize: "11px", textDecoration: "none", cursor: "pointer" }}
            >
              CLICK TO VIEW PROFILE
            </Link>
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
              // Cosmetic only: highlight this directory card if it happens to
              // be the same person currently featured in the spotlight above.
              // The directory itself is a separate real leaders list and is
              // not driven by the magazine slider.
              const isActive = leader.name?.trim().toLowerCase() === profile.name.trim().toLowerCase();

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
                    border: isActive ? "2px solid #102A43" : "1px solid #E2E8F0",
                    borderRadius: "12px",
                    textDecoration: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.25s ease",
                    boxShadow: isActive ? "0 3px 8px rgba(10, 25, 47, 0.06)" : "0 1px 3px rgba(0, 0, 0, 0.02)",
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
                      border: isActive ? "1px solid #102A43" : "1px solid #CBD5E1",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {leader.image ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={sanityImg(leader.image, 120)}
                        alt={leader.name}
                        loading="lazy"
                        style={{ width: "100%", height: "100%", objectFit: "contain" }}
                      />
                    ) : (
                      <div style={{ color: "#102A43", fontWeight: 800 }}>{leader.name.charAt(0)}</div>
                    )}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: "13px",
                        fontWeight: 800,
                        color: "#102A43",
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








