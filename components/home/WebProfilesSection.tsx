"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { leaderService } from "@/services/leaderService";
import type { Leader } from "@/types";

export function WebProfilesSection() {
  const [leaders, setLeaders] = useState<Leader[]>([]);

  useEffect(() => {
    leaderService.fetchSanityLeaders().then((items) => {
      if (items && items.length > 0) {
        setLeaders(items.slice(0, 3));
      }
    });
  }, []);

  if (leaders.length === 0) return null;

  const featured = leaders[0];
  const list = leaders.slice(1);

  return (
    <section className="section section-bg">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div className="section-label" style={{ margin: 0 }}>Web Profiles & Leadership</div>
        <Link href="/leaders" style={{ fontSize: "13px", fontWeight: 700, color: "var(--startups)" }}>
          View All Profiles →
        </Link>
      </div>

      {/* Featured Executive Profile Strip */}
      {featured && (
        <div style={{ background: "var(--white)", border: "1px solid var(--border-grey)", borderRadius: "16px", padding: "32px", marginBottom: "32px", display: "grid", gridTemplateColumns: "220px 1fr", gap: "32px", alignItems: "center" }}>
          <div style={{ position: "relative", height: "280px", borderRadius: "12px", overflow: "hidden", background: "var(--black)" }}>
            {featured.image ? (
              <Image src={featured.image} alt={featured.name} fill className="object-cover" unoptimized />
            ) : (
              <div style={{ height: "100%", display: "grid", placeItems: "center", color: "#fff", fontFamily: "var(--serif)" }}>{featured.name}</div>
            )}
          </div>
          <div>
            <div style={{ color: "var(--leadership)", fontSize: "11px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "8px" }}>
              Featured Web Profile
            </div>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "32px", fontWeight: 800, lineHeight: 1.15, marginBottom: "8px" }}>
              {featured.name}
            </h2>
            <p style={{ fontWeight: 600, fontSize: "16px", color: "var(--black)", marginBottom: "12px" }}>
              {featured.role}, {featured.company}
            </p>
            <p style={{ color: "var(--text-grey)", fontSize: "15px", lineHeight: 1.6, marginBottom: "20px" }}>
              {featured.bio}
            </p>
            <Link href={`/leaders/${featured.slug}`} className="btn btn-primary">
              Read Executive Profile →
            </Link>
          </div>
        </div>
      )}

      {/* Supporting Profile Rows */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "24px" }}>
        {list.map((leader, idx) => (
          <div key={leader.slug || String(idx)} style={{ background: "var(--white)", border: "1px solid var(--border-grey)", borderRadius: "12px", padding: "20px", display: "flex", gap: "20px", alignItems: "center" }}>
            {leader.image && (
              <div style={{ position: "relative", width: "90px", height: "110px", borderRadius: "8px", overflow: "hidden", flexShrink: 0 }}>
                <Image src={leader.image} alt={leader.name} fill className="object-cover" unoptimized />
              </div>
            )}
            <div>
              <span className="tag tag-leadership" style={{ marginBottom: "6px" }}>Web Profile</span>
              <h3 style={{ fontFamily: "var(--serif)", fontSize: "18px", fontWeight: 700, margin: "4px 0" }}>
                <Link href={`/leaders/${leader.slug}`}>{leader.name}</Link>
              </h3>
              <p style={{ fontSize: "13px", color: "var(--text-grey)" }}>{leader.role} · {leader.company}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
