import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookOpen, ExternalLink, Download, FileText, ArrowLeft } from "lucide-react";
import { magazineService } from "@/services/magazineService";
import { articleService } from "@/services/articleService";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const issues = await magazineService.fetchSanityMagazines();
  const issue = issues.find((item) => item.slug === slug) || magazineService.bySlug(slug);
  if (!issue) return {};
  return { title: `${issue.title} | The Success World Digital Magazine`, description: issue.description };
}

export default async function MagazineDetailPage({ params }: Props) {
  const { slug } = await params;
  const issues = await magazineService.fetchSanityMagazines();
  const issue = issues.find((item) => item.slug === slug) || magazineService.bySlug(slug);
  if (!issue) notFound();

  const articles = await articleService.fetchSanityArticles();

  return (
    <main className="magazine-detail-page site-shell" style={{ width: "100%", overflowX: "hidden" }}>
      {/* Back Navigation Header Bar */}
      <div style={{ background: "#050C18", borderBottom: "1px solid rgba(255, 255, 255, 0.1)", padding: "12px 24px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link
            href="/magazines"
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
            <span>Back to All Magazine Editions</span>
          </Link>

          <Link
            href="/"
            style={{
              color: "rgba(255, 255, 255, 0.7)",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "1px",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            Homepage &rarr;
          </Link>
        </div>
      </div>

      {/* Magazine Hero Header */}
      <section style={{ background: "#0a192f", color: "#ffffff", padding: "48px 24px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "40px", alignItems: "center" }}>
          <div style={{ position: "relative", width: "100%", maxWidth: "340px", height: "440px", margin: "0 auto", borderRadius: "12px", overflow: "hidden", background: "#050C18", boxShadow: "0 16px 40px rgba(0,0,0,0.5)" }}>
            {issue.cover ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={issue.cover} alt={issue.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <div style={{ height: "100%", display: "grid", placeItems: "center", color: "#D4B475", fontFamily: "var(--serif)", fontSize: "24px" }}>{issue.title}</div>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <span style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "2px", color: "#D4B475", textTransform: "uppercase" }}>
              {issue.issue || "DIGITAL EDITION"} &bull; {issue.date || "2026"}
            </span>

            <h1 className="font-serif" style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 900, lineHeight: 1.1, color: "#ffffff", margin: 0 }}>
              {issue.title}
            </h1>

            <p style={{ color: "rgba(214, 227, 255, 0.9)", fontSize: "16px", lineHeight: 1.6, margin: 0 }}>
              {issue.description || "Explore exclusive executive conversations, industry insights, and market leadership in this digital magazine edition."}
            </p>

            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginTop: "8px" }}>
              {issue.pdfUrl ? (
                <a
                  href={issue.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: "#D4B475",
                    color: "#0a192f",
                    fontWeight: 900,
                    fontSize: "13px",
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    padding: "14px 28px",
                    borderRadius: "6px",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <BookOpen size={18} /> Open PDF Digital Edition <ExternalLink size={15} />
                </a>
              ) : (
                <a
                  href={`/api/sanity`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: "#D4B475",
                    color: "#0a192f",
                    fontWeight: 900,
                    fontSize: "13px",
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    padding: "14px 28px",
                    borderRadius: "6px",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <FileText size={18} /> Read Digital Magazine Edition
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Embedded PDF Interactive Reader */}
      {issue.pdfUrl && (
        <section style={{ maxWidth: "1280px", margin: "32px auto", padding: "0 24px" }}>
          <div style={{ border: "1px solid #e1e3e4", borderRadius: "12px", overflow: "hidden", background: "#ffffff", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
            <div style={{ background: "#0a192f", color: "#ffffff", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
              <div style={{ fontSize: "14px", fontWeight: 800, display: "flex", alignItems: "center", gap: "8px" }}>
                <BookOpen size={18} style={{ color: "#D4B475" }} />
                <span>INTERACTIVE DIGITAL MAGAZINE READER // {issue.title}</span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <Link
                  href="/magazines"
                  style={{
                    color: "#ffffff",
                    fontSize: "11px",
                    fontWeight: 800,
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <ArrowLeft size={13} /> Back
                </Link>

                <a
                  href={issue.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: "#D4B475",
                    color: "#0a192f",
                    fontSize: "11px",
                    fontWeight: 800,
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    padding: "8px 16px",
                    borderRadius: "5px",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <Download size={14} /> Download PDF
                </a>
              </div>
            </div>

            <iframe
              src={issue.pdfUrl}
              title={`${issue.title} PDF Digital Reader`}
              style={{ width: "100%", height: "800px", border: "none" }}
            />
          </div>
        </section>
      )}

      {/* Stories In This Issue */}
      <section style={{ maxWidth: "1280px", margin: "32px auto", padding: "0 24px 48px" }}>
        <div style={{ borderBottom: "2px solid #D4B475", paddingBottom: "10px", marginBottom: "24px" }}>
          <span style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "2px", color: "#B08B45", textTransform: "uppercase" }}>
            EXECUTIVE FEATURES
          </span>
          <h2 className="font-serif" style={{ fontSize: "28px", fontWeight: 900, color: "#0A192F", margin: "4px 0 0" }}>
            Stories In This Magazine Edition
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
          {articles.slice(0, 6).map((art, idx) => (
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
