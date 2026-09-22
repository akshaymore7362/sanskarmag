import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, Calendar, User, ArrowLeft, Share2 } from "lucide-react";
import { articleService } from "@/services/articleService";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await articleService.fetchSanityArticleBySlug(slug);
  if (!article) return {};

  return {
    title: `${article.title} | The Success World`,
    description: article.subtitle || article.description,
    openGraph: {
      title: article.title,
      description: article.subtitle || article.description,
      images: [article.image],
      type: "article",
    },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = await articleService.fetchSanityArticleBySlug(slug);
  if (!article) notFound();

  const allArticles = await articleService.fetchSanityArticles();
  const relatedStories = allArticles
    .filter((a) => a.slug !== article.slug && a.industrySlug === article.industrySlug)
    .slice(0, 3);

  return (
    <main className="blog-detail-page" style={{ background: "var(--editorial-ivory, #F7F5EF)", minHeight: "100vh", paddingBottom: "80px", width: "100%" }}>
      {/* Full-Screen Article Hero — fills the viewport edge to edge, image
          behind the title/meta instead of a small boxed thumbnail below it. */}
      <section
        className="article-header-banner"
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          minHeight: "560px",
          overflow: "hidden",
          background: "linear-gradient(135deg, #0B1E30 0%, #102A43 60%, #0B1E30 100%)",
        }}
      >
        {article.image && (
          <Image
            src={article.image}
            alt={article.imageAlt || article.title}
            fill
            className="object-cover"
            unoptimized
            priority
          />
        )}

        {/* Scrim so the overlaid title/meta stay legible over any photo */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(11,30,48,0.55) 0%, rgba(11,30,48,0.35) 40%, rgba(6,16,30,0.95) 100%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "0 clamp(16px, 4vw, 56px) 44px" }}>
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            {/* Breadcrumb */}
            <div style={{ fontSize: "12px", color: "#A78BFA", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
              <Link href="/" style={{ color: "#9CA3AF" }}>Home</Link>
              <span>›</span>
              <Link href="/blogs" style={{ color: "#9CA3AF" }}>Blogs</Link>
              <span>›</span>
              <span style={{ color: "#FFFFFF" }}>{article.category || "Article"}</span>
            </div>

            <span className="hero-gold-pill-sm" style={{ background: "#102A43", color: "#F7F5EF", padding: "3px 8px", borderRadius: "4px", fontSize: "10px", fontWeight: 800, textTransform: "uppercase" }}>
              {article.category || "FEATURED"}
            </span>

            <h1 className="font-serif" style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 900, color: "#FFFFFF", margin: "14px 0 16px", lineHeight: 1.15 }}>
              {article.title}
            </h1>

            <div style={{ display: "flex", alignItems: "center", gap: "16px", fontSize: "13px", color: "rgba(248, 246, 241, 0.8)", flexWrap: "wrap" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontWeight: 700, color: "#FFFFFF" }}>
                <User size={14} style={{ color: "#FFFFFF" }} /> {article.author || "Editorial Team"}
              </span>
              <span>•</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                <Calendar size={14} /> {article.date}
              </span>
              <span>•</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "#A78BFA" }}>
                <Clock size={14} /> {article.readTime}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div style={{ maxWidth: "860px", margin: "40px auto 0", padding: "0 clamp(16px, 2.5vw, 40px)", boxSizing: "border-box" }}>
        {/* READING BODY */}
        <article className="article-body-content" style={{ color: "#102A43", fontSize: "17px", lineHeight: 1.75 }}>
          <p style={{ fontSize: "19px", fontWeight: 600, color: "#102A43", lineHeight: 1.6, marginBottom: "24px" }}>
            {article.description}
          </p>

          {/* Pullquote Box with Left Gold Border */}
          <div style={{ background: "#FFFFFF", borderLeft: "4px solid #102A43", borderRadius: "0 12px 12px 0", padding: "24px 28px", margin: "32px 0", boxShadow: "0 4px 16px rgba(0,0,0,0.04)" }}>
            <p className="font-serif" style={{ fontSize: "20px", fontWeight: 800, color: "#0B1E30", fontStyle: "italic", margin: 0, lineHeight: 1.4 }}>
              "{article.pullQuote || "AI will not replace humans. But humans who use AI will replace those who don't."}"
            </p>
          </div>

          <h2 className="font-serif" style={{ fontSize: "28px", fontWeight: 800, color: "#0B1E30", marginTop: "36px", marginBottom: "14px" }}>
            Why It Matters
          </h2>
          <p style={{ marginBottom: "24px" }}>
            Enterprises and financial institutions are accelerating their adoption of automated intelligence to optimize capital allocation, streamline operation flows, and build resilient market strategies.
          </p>

          <p style={{ marginBottom: "32px" }}>
            The executives who succeed over the next decade are those investing early in data infrastructure, governance, and organizational alignment across all core business units.
          </p>

          {/* Newsletter CTA Inside Article */}
          <div style={{ background: "linear-gradient(135deg, #0B1E30 0%, #102A43 100%)", borderRadius: "16px", padding: "32px", color: "#FFFFFF", textAlign: "center", margin: "40px 0" }}>
            <h3 className="font-serif" style={{ fontSize: "24px", fontWeight: 800, marginBottom: "8px" }}>Subscribe to Our Weekly Newsletter</h3>
            <p style={{ color: "#9CA3AF", fontSize: "14px", marginBottom: "20px" }}>Get executive briefings, market analysis, and new article releases straight to your inbox.</p>
            <Link href="/blogs#newsletter" className="btn btn-blue-gradient">
              Subscribe to The Success World
            </Link>
          </div>
        </article>

        {/* RELATED ARTICLES GRID */}
        {relatedStories.length > 0 && (
          <section style={{ marginTop: "56px", paddingTop: "36px", borderTop: "2px solid #E5E7EB" }}>
            <h3 className="font-serif" style={{ fontSize: "24px", fontWeight: 800, color: "#102A43", marginBottom: "20px" }}>Related Articles</h3>
            <div className="related-articles-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "24px" }}>
              {relatedStories.slice(0, 3).map((item) => (
                <div key={item.slug} style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "12px", padding: "16px", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
                  {item.image && (
                    <div style={{ position: "relative", height: "140px", borderRadius: "8px", overflow: "hidden", marginBottom: "12px" }}>
                      <Image src={item.image} alt={item.title} fill className="object-cover" unoptimized />
                    </div>
                  )}
                  <span style={{ fontSize: "10px", fontWeight: 800, color: "#7C3AED", textTransform: "uppercase" }}>{item.category}</span>
                  <h4 className="font-serif" style={{ fontSize: "16px", fontWeight: 700, color: "#102A43", margin: "6px 0", lineHeight: 1.3 }}>
                    <Link href={`/blogs/${item.slug}`}>{item.title}</Link>
                  </h4>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
