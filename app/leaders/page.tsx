"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, UserCheck, Award } from "lucide-react";
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
      }
    });
  }, []);

  const featured = leaders.slice(0, 2);
  const directory = leaders.slice(2);

  return (
    <main className="leaders-page site-shell inner-shell" style={{ background: "#F7F5F0", minHeight: "100vh", paddingBottom: "60px" }}>
      <PageIntro
        title="Leaders & Web Profiles"
        intro="Executive profiles, visionaries, and market leadership insights from global C-suite executives and founders."
        eyebrow="Executive Directory"
      />

      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Featured Leaders & Web Profiles (2 Columns White Cards) */}
        {featured.length > 0 && (
          <section style={{ marginBottom: "48px" }}>
            <h2 className="font-serif" style={{ fontSize: "24px", fontWeight: 800, color: "#17151C", marginBottom: "20px" }}>Featured Executive Profiles</h2>
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "28px" }}>
              {featured.map((leader, idx) => (
                <div key={leader.slug || String(idx)} style={{ background: "#FFFFFF", border: "1px solid #E5E2D9", borderRadius: "16px", padding: "24px", display: "grid", gridTemplateColumns: "140px 1fr", gap: "20px", alignItems: "center", boxShadow: "0 2px 10px rgba(0,0,0,0.03)" }}>
                  <div style={{ position: "relative", height: "170px", borderRadius: "12px", overflow: "hidden", border: "1px solid #E5E2D9", background: "#0a192f" }}>
                    {leader.image ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={leader.image} alt={leader.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <div style={{ height: "100%", display: "grid", placeItems: "center", background: "#0F131F", color: "#D49A24", fontWeight: 900, fontSize: "28px" }}>
                        {leader.name.charAt(0)}
                      </div>
                    )}
                  </div>

                  <div>
                    <span style={{ fontSize: "10px", fontWeight: 800, color: "#D49A24", letterSpacing: "1.5px", textTransform: "uppercase", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                      <Award size={12} /> WEB PROFILE
                    </span>
                    <h3 className="font-serif" style={{ fontSize: "20px", fontWeight: 800, color: "#17151C", margin: "4px 0 2px" }}>{leader.name}</h3>
                    <div style={{ fontSize: "12px", fontWeight: 600, color: "#7C3AED", marginBottom: "8px" }}>{leader.role} · {leader.company}</div>
                    <p style={{ fontSize: "13px", color: "#77727D", lineHeight: 1.5, marginBottom: "14px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{leader.bio || "Leading digital transformation and market expansion."}</p>
                    <Link href={`/leaders/${leader.slug}`} style={{ fontSize: "12px", fontWeight: 700, color: "#D49A24", display: "inline-flex", alignItems: "center", gap: "4px", textDecoration: "none" }}>
                      View Profile <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* All Leaders & Web Profiles Directory (3 Columns White Cards) */}
        <section style={{ marginBottom: "48px" }}>
          <h2 className="font-serif" style={{ fontSize: "24px", fontWeight: 800, color: "#17151C", marginBottom: "20px" }}>Executive Directory</h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px" }}>
            {(directory.length > 0 ? directory : leaders).map((leader, idx) => (
              <div key={leader.slug || String(idx)} style={{ background: "#FFFFFF", border: "1px solid #E5E2D9", borderRadius: "14px", padding: "20px", textAlign: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
                <div style={{ position: "relative", width: "100px", height: "100px", borderRadius: "50%", overflow: "hidden", margin: "0 auto 12px", border: "2px solid #D49A24", background: "#0a192f" }}>
                  {leader.image ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={leader.image} alt={leader.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <div style={{ height: "100%", display: "grid", placeItems: "center", color: "#D49A24", fontWeight: 900, fontSize: "24px" }}>
                      {leader.name.charAt(0)}
                    </div>
                  )}
                </div>

                <h4 className="font-serif" style={{ fontSize: "18px", fontWeight: 800, color: "#17151C", margin: "4px 0 2px" }}>{leader.name}</h4>
                <div style={{ fontSize: "12px", color: "#7C3AED", fontWeight: 600, marginBottom: "4px" }}>{leader.role}</div>
                <div style={{ fontSize: "11px", color: "#77727D", fontWeight: 600, marginBottom: "14px" }}>{leader.company}</div>
                <Link href={`/leaders/${leader.slug}`} style={{ fontSize: "11px", fontWeight: 700, color: "#D49A24", border: "1px solid #D49A24", padding: "6px 16px", borderRadius: "6px", display: "inline-block", textDecoration: "none" }}>
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
