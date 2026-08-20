"use client";

import Link from "next/link";
import { ArrowRight, Rocket, Cpu, Leaf, Brain, GraduationCap, Utensils, HeartPulse } from "lucide-react";
import { PageIntro } from "@/components/editorial/PageIntro";
import { NewsletterSection } from "@/components/home/NewsletterSection";

const featuredStartups = [
  { name: "ai7", category: "AI Platform", desc: "Enterprise autonomous agent infrastructure", icon: Cpu },
  { name: "GreenByte", category: "CleanTech", desc: "Next-gen carbon accounting & grid management", icon: Leaf },
  { name: "NovaMind", category: "DeepTech", desc: "Neuromorphic AI processing chips", icon: Brain },
];

const latestStartups = [
  { name: "EduNest", category: "Education Platform", readTime: "5 min read", icon: GraduationCap },
  { name: "FoodVista", category: "FoodTech", readTime: "4 min read", icon: Utensils },
  { name: "HealthEV", category: "HealthTech", readTime: "6 min read", icon: HeartPulse },
];

export default function StartupsPage() {
  return (
    <main className="startups-page site-shell inner-shell" style={{ background: "#F7F5F0", minHeight: "100vh", paddingBottom: "60px" }}>
      <PageIntro
        title="Startups"
        intro="Highlighting high-growth startups, venture funding rounds, scaleups and disruptive innovation."
        eyebrow="Venture & Innovation"
      />

      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Featured Startups Top Row (3 White Cards) */}
        <section style={{ marginBottom: "48px" }}>
          <h2 className="font-serif" style={{ fontSize: "24px", fontWeight: 800, color: "#17151C", marginBottom: "20px" }}>Featured Startups</h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "24px" }}>
            {featuredStartups.map((startup) => {
              const Icon = startup.icon;
              return (
                <div key={startup.name} style={{ background: "#FFFFFF", border: "1px solid #E5E2D9", borderRadius: "16px", padding: "24px", textAlign: "center", boxShadow: "0 2px 10px rgba(0,0,0,0.03)" }}>
                  <div style={{ width: "56px", height: "56px", borderRadius: "14px", background: "rgba(212, 154, 36, 0.12)", color: "#D49A24", display: "grid", placeItems: "center", margin: "0 auto 14px" }}>
                    <Icon size={28} />
                  </div>
                  <h3 className="font-serif" style={{ fontSize: "22px", fontWeight: 900, color: "#17151C", margin: "0 0 4px" }}>{startup.name}</h3>
                  <div style={{ fontSize: "11px", fontWeight: 800, color: "#7C3AED", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "8px" }}>{startup.category}</div>
                  <p style={{ fontSize: "13px", color: "#77727D", lineHeight: 1.5, marginBottom: "16px" }}>{startup.desc}</p>
                  <Link href="/startups" style={{ fontSize: "11px", fontWeight: 700, color: "#D49A24", border: "1px solid #D49A24", padding: "6px 16px", borderRadius: "6px", display: "inline-block" }}>
                    View Profile
                  </Link>
                </div>
              );
            })}
          </div>
        </section>

        {/* Latest Startups List */}
        <section style={{ marginBottom: "48px" }}>
          <h2 className="font-serif" style={{ fontSize: "24px", fontWeight: 800, color: "#17151C", marginBottom: "20px" }}>Latest Startups</h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {latestStartups.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.name} style={{ background: "#FFFFFF", border: "1px solid #E5E2D9", borderRadius: "14px", padding: "18px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "rgba(124, 58, 237, 0.1)", color: "#7C3AED", display: "grid", placeItems: "center" }}>
                      <Icon size={20} />
                    </div>
                    <div>
                      <h4 className="font-serif" style={{ fontSize: "18px", fontWeight: 800, color: "#17151C", margin: "0 0 2px" }}>{item.name}</h4>
                      <div style={{ fontSize: "12px", color: "#77727D" }}>{item.category}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: "12px", color: "#77727D" }}>{item.readTime}</div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Newsletter Component */}
        <NewsletterSection />
      </div>
    </main>
  );
}
