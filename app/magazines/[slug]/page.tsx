import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
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
  return { title: `${issue.title} | The Success World Magazine`, description: issue.description };
}

export default async function MagazineDetailPage({ params }: Props) {
  const { slug } = await params;
  const issues = await magazineService.fetchSanityMagazines();
  const issue = issues.find((item) => item.slug === slug) || magazineService.bySlug(slug);
  if (!issue) notFound();

  const articles = await articleService.fetchSanityArticles();

  return (
    <main className="magazine-detail-page site-shell">
      <section className="section" style={{ background: "var(--black)", color: "var(--white)", padding: "64px 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "360px 1fr", gap: "48px", alignItems: "center" }}>
          <div style={{ position: "relative", height: "460px", borderRadius: "16px", overflow: "hidden" }}>
            {issue.cover ? (
              <Image src={issue.cover} alt={issue.title} fill className="object-cover" unoptimized />
            ) : (
              <div style={{ height: "100%", display: "grid", placeItems: "center", fontFamily: "var(--serif)", fontSize: "24px" }}>{issue.title}</div>
            )}
          </div>
          <div>
            <div style={{ color: "var(--startups)", fontSize: "12px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase" }}>
              Issue {issue.issueNumber || "24"} · {issue.publicationDate || "Spring 2026"}
            </div>
            <h1 style={{ fontFamily: "var(--serif)", fontSize: "52px", fontWeight: 900, lineHeight: 1.1, margin: "16px 0" }}>{issue.title}</h1>
            <p style={{ color: "rgba(255,255,255,.7)", fontSize: "18px", lineHeight: 1.6, marginBottom: "24px" }}>{issue.description}</p>
            {issue.pdfUrl && (
              <a href={issue.pdfUrl} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ background: "var(--startups)" }}>
                Download PDF Edition →
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Stories In This Issue */}
      <section className="section" style={{ padding: "48px 80px" }}>
        <div className="section-label">Stories In This Issue</div>
        <div className="trending-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "32px" }}>
          {articles.slice(0, 6).map((art, idx) => (
            <div key={art.slug || String(idx)} className="card card-medium">
              {art.image && (
                <div className="card-img" style={{ height: "200px" }}>
                  <Image src={art.image} alt={art.title} width={400} height={200} unoptimized />
                </div>
              )}
              <span className="tag tag-tech">{art.category}</span>
              <h3 className="card-title">
                <Link href={`/blogs/${art.slug}`}>{art.title}</Link>
              </h3>
              <div className="card-meta">
                <span>{art.author}</span>
                <span className="card-meta-dot" />
                <span>{art.readTime}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
