import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Award, Building, UserCheck } from "lucide-react";
import { ArticleCard } from "@/components/editorial/ArticleCard";
import { articleService } from "@/services/articleService";
import { leaderService } from "@/services/leaderService";

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
    <main className="site-shell inner-shell" style={{ background: "#F7F5F0", minHeight: "100vh", paddingBottom: "60px" }}>
      {/* Back Navigation Bar */}
      <div style={{ background: "#0a192f", color: "#ffffff", padding: "12px 24px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link
            href="/leaders"
            style={{
              color: "#fed488",
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

      {/* Leader Profile Hero Card */}
      <section style={{ maxWidth: "1280px", margin: "32px auto", padding: "0 24px" }}>
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e1e3e4",
            borderRadius: "16px",
            padding: "36px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "40px",
            alignItems: "center",
            boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
          }}
        >
          <div style={{ position: "relative", width: "100%", maxWidth: "320px", height: "380px", margin: "0 auto", borderRadius: "14px", overflow: "hidden", background: "#0a192f" }}>
            {leader.image ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={leader.image} alt={leader.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <div style={{ height: "100%", display: "grid", placeItems: "center", color: "#fed488", fontSize: "48px", fontWeight: 900 }}>
                {leader.name.charAt(0)}
              </div>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <span style={{ fontSize: "11px", fontWeight: 800, color: "#775a19", letterSpacing: "2px", textTransform: "uppercase", display: "inline-flex", alignItems: "center", gap: "6px" }}>
              <Award size={14} /> EXECUTIVE WEB PROFILE
            </span>

            <h1 className="font-serif" style={{ fontSize: "clamp(32px, 3.5vw, 44px)", fontWeight: 900, color: "#191c1d", margin: 0, lineHeight: 1.15 }}>
              {leader.name}
            </h1>

            <div style={{ fontSize: "16px", fontWeight: 700, color: "#0a192f", display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
              <span>{leader.role}</span>
              <span style={{ color: "#775a19" }}>&bull;</span>
              <span style={{ color: "#44474d", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                <Building size={16} /> {leader.company}
              </span>
            </div>

            {leader.bio && (
              <div style={{ fontSize: "15px", color: "#44474d", lineHeight: 1.6, background: "#f8f9fa", padding: "20px", borderRadius: "10px", borderLeft: "4px solid #775a19" }}>
                "{leader.bio}"
              </div>
            )}

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "8px" }}>
              <Link
                href="/contact"
                style={{
                  background: "#0a192f",
                  color: "#fed488",
                  fontWeight: 800,
                  fontSize: "12px",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  padding: "12px 24px",
                  borderRadius: "6px",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                Request Executive Interview
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Executive Features */}
      <section style={{ maxWidth: "1280px", margin: "48px auto 0", padding: "0 24px" }}>
        <div style={{ borderBottom: "2px solid #ffdea5", paddingBottom: "10px", marginBottom: "24px" }}>
          <span style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "2px", color: "#775a19", textTransform: "uppercase" }}>
            EXECUTIVE INSIGHTS
          </span>
          <h2 className="font-serif" style={{ fontSize: "28px", fontWeight: 900, color: "#191c1d", margin: "4px 0 0" }}>
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
              <span style={{ fontSize: "9px", fontWeight: 800, color: "#775a19", letterSpacing: "1px", textTransform: "uppercase" }}>{art.category || "EXECUTIVE FEATURE"}</span>
              <h3 className="font-serif" style={{ fontSize: "16px", fontWeight: 800, color: "#191c1d", margin: 0, lineHeight: 1.35 }}>
                <Link href={`/blogs/${art.slug}`} style={{ color: "#191c1d", textDecoration: "none" }}>{art.title}</Link>
              </h3>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
