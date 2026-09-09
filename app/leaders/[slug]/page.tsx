import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Award, Building, UserCheck } from "lucide-react";
import { ArticleCard } from "@/components/editorial/ArticleCard";
import { articleService } from "@/services/articleService";
import { leaderService } from "@/services/leaderService";
import { LeaderBioExpandable } from "@/components/leaders/LeaderBioExpandable";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const leaders = await leaderService.fetchSanityLeaders();
  const leader = leaders.find((l) => l.slug === slug) || leaderService.bySlug(slug);
  if (!leader) return {};
  return { title: `${leader.name} | Executive Web Profile & Leader`, description: leader.bio };
}

export default async function LeaderProfilePage({ params }: Props) {
  const { slug } = await params;
  const leaders = await leaderService.fetchSanityLeaders();
  const leader = leaders.find((l) => l.slug === slug) || leaderService.bySlug(slug);

  if (!leader) notFound();

  const articles = await articleService.fetchSanityArticles();

  return (
    <main className="site-shell inner-shell" style={{ background: "#F8FAFC", minHeight: "100vh", paddingBottom: "60px" }}>
      {/* Back Navigation Bar */}
      <div style={{ background: "#0A192F", color: "#ffffff", padding: "14px 24px", boxShadow: "0 2px 10px rgba(0,0,0,0.15)" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link
            href="/leaders"
            style={{
              color: "#1E40AF",
              fontSize: "12px",
              fontWeight: 800,
              letterSpacing: "1.2px",
              textTransform: "uppercase",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              transition: "opacity 0.2s ease",
            }}
          >
            <ArrowLeft size={16} />
            <span>Back to All Executive Leaders &amp; Web Profiles</span>
          </Link>
        </div>
      </div>

      {/* Centered Grand Leader Profile Card */}
      <section style={{ width: "100%", maxWidth: "1400px", margin: "36px auto", padding: "0 24px", boxSizing: "border-box" }}>
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #E2E8F0",
            borderRadius: "24px",
            padding: "clamp(32px, 5vw, 64px) clamp(24px, 4vw, 56px)",
            boxShadow: "0 20px 50px rgba(10, 25, 47, 0.08)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          {/* Centered Extra Large Executive Photo Frame (100% Uncropped Full View) */}
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "900px",
              height: "720px",
              maxHeight: "82vh",
              borderRadius: "24px",
              overflow: "hidden",
              background: "radial-gradient(circle at center, #1E293B 0%, #0F172A 100%)",
              border: "3.5px solid #1E40AF",
              boxShadow: "0 25px 60px rgba(10, 25, 47, 0.28)",
              marginBottom: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
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
                  filter: "drop-shadow(0 10px 25px rgba(0,0,0,0.5))",
                }}
              />
            ) : (
              <div style={{ height: "100%", display: "grid", placeItems: "center", color: "#1E40AF", fontSize: "96px", fontWeight: 900 }}>
                {leader.name.charAt(0)}
              </div>
            )}

            {/* Executive Badge */}
            <div
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                background: "rgba(10, 25, 47, 0.92)",
                backdropFilter: "blur(10px)",
                color: "#1E40AF",
                fontSize: "11px",
                fontWeight: 800,
                letterSpacing: "1.8px",
                textTransform: "uppercase",
                padding: "10px 20px",
                borderRadius: "30px",
                border: "1.5px solid rgba(197, 160, 89, 0.6)",
                boxShadow: "0 4px 14px rgba(0,0,0,0.3)",
              }}
            >
              VERIFIED EXECUTIVE PORTRAIT
            </div>
          </div>

          {/* Header Credentials */}
          <span style={{ fontSize: "12px", fontWeight: 800, color: "#1E40AF", letterSpacing: "2.5px", textTransform: "uppercase", display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
            <Award size={16} style={{ color: "#1E40AF" }} /> OFFICIAL EXECUTIVE WEB PROFILE
          </span>

          <h1 className="font-serif" style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 900, color: "#0A192F", margin: "0 0 14px", lineHeight: 1.1, letterSpacing: "-0.5px" }}>
            {leader.name}
          </h1>

          <div style={{ fontSize: "17px", fontWeight: 700, color: "#1E40AF", display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", flexWrap: "wrap", marginBottom: "36px" }}>
            <span>{leader.role || "EXECUTIVE LEADER"}</span>
            <span style={{ color: "#94A3B8" }}>&bull;</span>
            <span style={{ color: "#4B5563", display: "inline-flex", alignItems: "center", gap: "6px" }}>
              <Building size={18} style={{ color: "#1E40AF" }} /> {leader.company || "Leadership & Innovation"}
            </span>
          </div>

          {/* Full Bio & Main Content Section (Shown 100% Fully) */}
          {leader.bio && (
            <div style={{ width: "100%", maxWidth: "1000px", textAlign: "left", marginBottom: "40px" }}>
              <LeaderBioExpandable bio={leader.bio} />
            </div>
          )}

          {/* Action CTA Button */}
          <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
            <Link
              href="/contact"
              style={{
                background: "linear-gradient(135deg, #0A192F 0%, #1E293B 100%)",
                color: "#FFFFFF",
                fontWeight: 800,
                fontSize: "13px",
                letterSpacing: "1.4px",
                textTransform: "uppercase",
                padding: "18px 42px",
                borderRadius: "30px",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
                boxShadow: "0 8px 25px rgba(10, 25, 47, 0.22)",
                border: "1px solid rgba(197, 160, 89, 0.3)",
                transition: "all 0.25s ease",
              }}
            >
              <span>Request Executive Interview</span>
              <UserCheck size={18} style={{ color: "#1E40AF" }} />
            </Link>
          </div>
        </div>
      </section>

      {/* Related Executive Features */}
      <section style={{ width: "100%", maxWidth: "1400px", margin: "48px auto 0", padding: "0 24px", boxSizing: "border-box" }}>
        <div style={{ borderBottom: "2px solid #1E40AF", paddingBottom: "12px", marginBottom: "28px" }}>
          <span style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "2px", color: "#1E40AF", textTransform: "uppercase" }}>
            EXECUTIVE INSIGHTS
          </span>
          <h2 className="font-serif" style={{ fontSize: "30px", fontWeight: 900, color: "#0A192F", margin: "4px 0 0" }}>
            Related Market Stories &amp; Articles
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
          {articles.slice(0, 4).map((art, idx) => (
            <div key={art.slug || String(idx)} style={{ background: "#ffffff", border: "1px solid #E2E8F0", borderRadius: "14px", padding: "18px", display: "flex", flexDirection: "column", gap: "12px", boxShadow: "0 4px 14px rgba(0,0,0,0.03)" }}>
              {art.image && (
                <div style={{ position: "relative", width: "100%", height: "190px", borderRadius: "10px", overflow: "hidden", background: "#0F172A" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={art.image} alt={art.title} style={{ width: "100%", height: "100%", objectFit: "contain", padding: "6px" }} />
                </div>
              )}
              <span style={{ fontSize: "10px", fontWeight: 800, color: "#1E40AF", letterSpacing: "1px", textTransform: "uppercase" }}>{art.category || "EXECUTIVE FEATURE"}</span>
              <h3 className="font-serif" style={{ fontSize: "17px", fontWeight: 800, color: "#0A192F", margin: 0, lineHeight: 1.35 }}>
                <Link href={`/blogs/${art.slug}`} style={{ color: "#0A192F", textDecoration: "none" }}>{art.title}</Link>
              </h3>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

