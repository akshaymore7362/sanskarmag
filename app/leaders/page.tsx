"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, UserCheck } from "lucide-react";
import { PageIntro } from "@/components/editorial/PageIntro";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { leaderService } from "@/services/leaderService";
import type { Leader } from "@/types";

export default function LeadersPage() {
  const [leaders, setLeaders] = useState<Leader[]>([]);

  useEffect(() => {
    leaderService.fetchSanityLeaders().then((data) => {
      if (data && data.length > 0) {
        setLeaders(data);
      } else {
        setLeaders(leaderService.all());
      }
    });
  }, []);

  const featured = leaders.slice(0, 2);
  const directory = leaders.slice(2);

  return (
    <main className="leaders-page site-shell inner-shell" style={{ background: "#F7F5F0", minHeight: "100vh", paddingBottom: "60px" }}>
      <PageIntro
        title="Leaders"
        intro="Profiles and insights from global C-suite executives, founders, investors and policy makers."
        eyebrow="Executive Profiles"
      />

      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Featured Leaders Section (2 Columns White Cards) */}
        <section style={{ marginBottom: "48px" }}>
          <h2 className="font-serif" style={{ fontSize: "24px", fontWeight: 800, color: "#17151C", marginBottom: "20px" }}>Featured Leaders</h2>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "28px" }}>
            {featured.map((leader, idx) => (
              <div key={leader.slug || String(idx)} style={{ background: "#FFFFFF", border: "1px solid #E5E2D9", borderRadius: "16px", padding: "24px", display: "grid", gridTemplateColumns: "140px 1fr", gap: "20px", alignItems: "center", boxShadow: "0 2px 10px rgba(0,0,0,0.03)" }}>
                <div style={{ position: "relative", height: "170px", borderRadius: "12px", overflow: "hidden", border: "1px solid #E5E2D9" }}>
                  {leader.image ? (
                    <Image src={leader.image} alt={leader.name} fill className="object-cover" unoptimized />
                  ) : (
                    <div style={{ height: "100%", display: "grid", placeItems: "center", background: "#0F131F", color: "#D49A24" }}>
                      <UserCheck size={32} />
                    </div>
                  )}
                </div>

                <div>
                  <span style={{ fontSize: "10px", fontWeight: 800, color: "#D49A24", letterSpacing: "1.5px" }}>FEATURED LEADER</span>
                  <h3 className="font-serif" style={{ fontSize: "22px", fontWeight: 800, color: "#17151C", margin: "4px 0 2px" }}>{leader.name}</h3>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: "#7C3AED", marginBottom: "8px" }}>{leader.role} · {leader.company}</div>
                  <p style={{ fontSize: "13px", color: "#77727D", lineHeight: 1.5, marginBottom: "14px" }}>{leader.bio || "Leading digital transformation and growth strategy across markets."}</p>
                  <Link href={`/leaders`} style={{ fontSize: "12px", fontWeight: 700, color: "#D49A24", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                    View Profile <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* All Leaders Directory (3 Columns White Cards) */}
        <section style={{ marginBottom: "48px" }}>
          <h2 className="font-serif" style={{ fontSize: "24px", fontWeight: 800, color: "#17151C", marginBottom: "20px" }}>All Leaders</h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "24px" }}>
            {(directory.length > 0 ? directory : leaders).map((leader, idx) => (
              <div key={leader.slug || String(idx)} style={{ background: "#FFFFFF", border: "1px solid #E5E2D9", borderRadius: "14px", padding: "18px", textAlign: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
                <div style={{ position: "relative", width: "100px", height: "100px", borderRadius: "50%", overflow: "hidden", margin: "0 auto 12px", border: "2px solid #D49A24" }}>
                  {leader.image ? (
                    <Image src={leader.image} alt={leader.name} fill className="object-cover" unoptimized />
                  ) : (
                    <div style={{ height: "100%", display: "grid", placeItems: "center", background: "#0F131F", color: "#D49A24" }}>
                      <UserCheck size={28} />
                    </div>
                  )}
                </div>

                <h4 className="font-serif" style={{ fontSize: "18px", fontWeight: 800, color: "#17151C", margin: "4px 0 2px" }}>{leader.name}</h4>
                <div style={{ fontSize: "12px", color: "#7C3AED", fontWeight: 600, marginBottom: "10px" }}>{leader.role}</div>
                <Link href={`/leaders`} style={{ fontSize: "11px", fontWeight: 700, color: "#D49A24", border: "1px solid #D49A24", padding: "5px 14px", borderRadius: "6px", display: "inline-block" }}>
                  View Profile
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter Component */}
        <NewsletterSection />
      </div>
    </main>
  );
}
