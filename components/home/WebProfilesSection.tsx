"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Crown, Building2, ExternalLink } from "lucide-react";
import { leaderService } from "@/services/leaderService";
import type { Leader } from "@/types";

export function WebProfilesSection() {
  const [profiles, setProfiles] = useState<Leader[]>([]);

  useEffect(() => {
    leaderService.fetchSanityLeaders().then((items) => {
      if (items && items.length > 0) {
        setProfiles(items);
      }
    });
  }, []);

  if (profiles.length === 0) return null;

  // Display up to 4 web profiles
  const displayProfiles = profiles.slice(0, 4);

  return (
    <section
      style={{
        width: "100%",
        maxWidth: "1280px",
        margin: "32px auto",
        padding: "36px 20px",
        background: "#FFFFFF",
        border: "1px solid #E2DCD0",
        borderRadius: "20px",
        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.04)",
      }}
    >
      {/* Header Row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          borderBottom: "2px solid #8B1029",
          paddingBottom: "14px",
          marginBottom: "32px",
          flexWrap: "wrap",
          gap: "14px",
        }}
      >
        <div>
          <span
            style={{
              fontSize: "10px",
              fontWeight: 900,
              letterSpacing: "2.5px",
              color: "#8B1029",
              textTransform: "uppercase",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              marginBottom: "4px",
              background: "rgba(139, 16, 41, 0.08)",
              padding: "4px 10px",
              borderRadius: "4px",
            }}
          >
            <Crown size={13} style={{ color: "#8B1029" }} /> EXECUTIVE DIRECTORY
          </span>
          <h2 className="font-serif" style={{ fontSize: "clamp(22px, 2.4vw, 30px)", fontWeight: 900, color: "#101722", margin: 0, letterSpacing: "-0.5px" }}>
            Web Profiles Wall
          </h2>
        </div>

        <Link
          href="/leaders"
          style={{
            fontSize: "11px",
            fontWeight: 800,
            letterSpacing: "1px",
            color: "#8B1029",
            textTransform: "uppercase",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            padding: "8px 16px",
            background: "rgba(139, 16, 41, 0.06)",
            border: "1px solid rgba(139, 16, 41, 0.2)",
            borderRadius: "6px",
          }}
        >
          <span>View All ({profiles.length})</span>
          <ExternalLink size={14} />
        </Link>
      </div>

      {/* Circular Executive Avatars Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "24px",
          alignItems: "stretch",
        }}
      >
        {displayProfiles.map((leader, idx) => (
          <div
            key={leader.slug || String(idx)}
            style={{
              background: "linear-gradient(180deg, #FBF9F5 0%, #FFFFFF 100%)",
              border: "1px solid #E5E2D9",
              borderRadius: "16px",
              padding: "24px 16px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 14px rgba(0, 0, 0, 0.03)",
              position: "relative",
            }}
          >
            {/* Top Rank Badge */}
            <div
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                fontSize: "10px",
                fontWeight: 900,
                color: "#8B1029",
                background: "rgba(139, 16, 41, 0.08)",
                padding: "2px 8px",
                borderRadius: "10px",
                letterSpacing: "1px",
              }}
            >
              #{String(idx + 1).padStart(2, "0")}
            </div>

            {/* Circular Foil Portrait Ring (140px Circle) */}
            <div
              style={{
                position: "relative",
                width: "140px",
                height: "140px",
                borderRadius: "50%",
                padding: "5px",
                background: "linear-gradient(135deg, #8B1029 0%, #101722 100%)",
                boxShadow: "0 8px 24px rgba(139, 16, 41, 0.25)",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  overflow: "hidden",
                  background: "#0A0D16",
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
                  <div style={{ height: "100%", display: "grid", placeItems: "center", color: "#8B1029", fontWeight: 900, fontSize: "28px" }}>
                    {leader.name.charAt(0)}
                  </div>
                )}
              </div>
            </div>

            {/* Executive Info */}
            <h3
              className="font-serif"
              style={{
                fontSize: "18px",
                fontWeight: 900,
                color: "#101722",
                margin: "0 0 4px",
                lineHeight: 1.25,
              }}
            >
              {leader.name}
            </h3>

            <div
              style={{
                fontSize: "12px",
                fontWeight: 800,
                color: "#8B1029",
                marginBottom: "6px",
                letterSpacing: "0.3px",
              }}
            >
              {leader.role}
            </div>

            {leader.company && (
              <div
                style={{
                  fontSize: "11px",
                  color: "#555259",
                  fontWeight: 600,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  background: "#EBE8DF",
                  padding: "3px 10px",
                  borderRadius: "12px",
                  marginBottom: "16px",
                }}
              >
                <Building2 size={11} style={{ color: "#8B1029" }} />
                <span>{leader.company}</span>
              </div>
            )}

            {/* Read Profile Button */}
            <Link
              href={`/leaders/${leader.slug}`}
              style={{
                marginTop: "auto",
                width: "100%",
                padding: "9px 14px",
                background: "#101722",
                color: "#FFFFFF",
                fontSize: "11px",
                fontWeight: 800,
                letterSpacing: "1px",
                textTransform: "uppercase",
                textDecoration: "none",
                borderRadius: "8px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                transition: "all 0.2s ease",
              }}
            >
              <span>View Web Profile</span>
              <ArrowRight size={13} style={{ color: "#FFFFFF" }} />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
