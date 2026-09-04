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
    <main className="site-shell inner-shell" style={{ background: "#F3F4F6", minHeight: "100vh", paddingBottom: "60px" }}>
      {/* Back Navigation Bar */}
      <div style={{ background: "#0a192f", color: "#ffffff", padding: "12px 24px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link
            href="/leaders"
            style={{
              color: "#D4B475",
              fontSize: "12px",
              fontWeight: 800,
              letterSpacing: "1px",
              textTransform: "uppercase",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <ArrowLeft size={16} />
            <span>Back to All Executive Leaders &amp; Web Profiles</span>
          </Link>
        </div>
      </div>

      {/* Centered Leader Profile Card (Full Width 1400px, Middle Image, Downside Content) */}
      <section style={{ width: "100%", maxWidth: "1400px", margin: "32px auto", padding: "0 24px", boxSizing: "border-box" }}>
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e1e3e4",
            borderRadius: "20px",
            padding: "44px 36px",
            boxShadow: "0 4px 25px rgba(0,0,0,0.05)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          {/* Centered Executive Photo */}
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "500px",
              height: "520px",
              maxHeight: "70vh",
              borderRadius: "18px",
              overflow: "hidden",
              background: "#0a192f",
              border: "3.5px solid #D4B475",
              boxShadow: "0 12px 35px rgba(0,0,0,0.18)",
              marginBottom: "28px",
            }}
          >
            {leader.image ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={leader.image} alt={leader.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <div style={{ height: "100%", display: "grid", placeItems: "center", color: "#D4B475", fontSize: "64px", fontWeight: 900 }}>
                {leader.name.charAt(0)}
              </div>
            )}
          </div>

          {/* Centered Header & Credentials */}
          <span style={{ fontSize: "11px", fontWeight: 800, color: "#B08B45", letterSpacing: "2px", textTransform: "uppercase", display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
            <Award size={14} /> EXECUTIVE WEB PROFILE
          </span>

          <h1 className="font-serif" style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 900, color: "#0A192F", margin: "0 0 10px", lineHeight: 1.15 }}>
            {leader.name}
          </h1>

          <div style={{ fontSize: "16px", fontWeight: 700, color: "#0a192f", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", flexWrap: "wrap", marginBottom: "28px" }}>
            <span>{leader.role}</span>
            <span style={{ color: "#B08B45" }}>&bull;</span>
            <span style={{ color: "#4B5563", display: "inline-flex", alignItems: "center", gap: "4px" }}>
              <Building size={16} /> {leader.company}
            </span>
          </div>

          {/* Downside Bio Info Content (Full Width below image & header) */}
          {leader.bio && (
            <div style={{ width: "100%", textAlign: "left", marginBottom: "28px" }}>
              <LeaderBioExpandable bio={leader.bio} />
            </div>
          )}

          {/* Bottom Action CTA */}
          <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
            <Link
              href="/contact"
              style={{
                background: "#0a192f",
                color: "#D4B475",
                fontWeight: 800,
                fontSize: "13px",
                letterSpacing: "1px",
                textTransform: "uppercase",
                padding: "14px 32px",
                borderRadius: "8px",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "0 4px 14px rgba(10, 25, 47, 0.2)",
              }}
            >
              Request Executive Interview
            </Link>
          </div>
        </div>
      </section>

      {/* Related Executive Features (Full Width 1400px) */}
      <section style={{ width: "100%", maxWidth: "1400px", margin: "48px auto 0", padding: "0 24px", boxSizing: "border-box" }}>
        <div style={{ borderBottom: "2px solid #D4B475", paddingBottom: "10px", marginBottom: "24px" }}>
          <span style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "2px", color: "#B08B45", textTransform: "uppercase" }}>
            EXECUTIVE INSIGHTS
          </span>
          <h2 className="font-serif" style={{ fontSize: "28px", fontWeight: 900, color: "#0A192F", margin: "4px 0 0" }}>
            Related Market Stories &amp; Articles
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
          {articles.slice(0, 4).map((art, idx) => (
            <div key={art.slug || String(idx)} style={{ background: "#ffffff", border: "1px solid #e1e3e4", borderRadius: "10px", padding: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
              {art.image && (
                <div style={{ position: "relative", width: "100%", height: "180px", borderRadius: "8px", overflow: "hidden", background: "#0a192f" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={art.image} alt={art.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              )}
              <span style={{ fontSize: "9px", fontWeight: 800, color: "#B08B45", letterSpacing: "1px", textTransform: "uppercase" }}>{art.category || "EXECUTIVE FEATURE"}</span>
              <h3 className="font-serif" style={{ fontSize: "16px", fontWeight: 800, color: "#0A192F", margin: 0, lineHeight: 1.35 }}>
                <Link href={`/blogs/${art.slug}`} style={{ color: "#0A192F", textDecoration: "none" }}>{art.title}</Link>
              </h3>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
