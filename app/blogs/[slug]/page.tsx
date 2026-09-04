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

  const relatedStories = articleService.related(article.slug);

  return (
    <main className="blog-detail-page site-shell inner-shell" style={{ background: "#F3F4F6", minHeight: "100vh", paddingBottom: "80px" }}>
      {/* Top Dark Header Banner */}
      <section className="article-header-banner" style={{ margin: "-20px -40px 32px -40px", padding: "40px 40px 36px 40px", background: "linear-gradient(135deg, #050C18 0%, #0A192F 60%, #050C18 100%)", borderRadius: "0 0 24px 24px" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          {/* Breadcrumb */}
          <div style={{ fontSize: "12px", color: "#A78BFA", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
            <Link href="/" style={{ color: "#9CA3AF" }}>Home</Link>
            <span>›</span>
            <Link href="/blogs" style={{ color: "#9CA3AF" }}>Blogs</Link>
            <span>›</span>
            <span style={{ color: "#C5A059" }}>{article.category || "Article"}</span>
          </div>

          <span className="hero-gold-pill-sm" style={{ background: "#C5A059", color: "#050C18", padding: "3px 8px", borderRadius: "4px", fontSize: "10px", fontWeight: 800, textTransform: "uppercase" }}>
            {article.category || "FEATURED"}
          </span>

          <h1 className="font-serif" style={{ fontSize: "40px", fontWeight: 900, color: "#FFFFFF", margin: "14px 0 16px", lineHeight: 1.15 }}>
            {article.title}
          </h1>

          <div style={{ display: "flex", alignItems: "center", gap: "16px", fontSize: "13px", color: "rgba(248, 246, 241, 0.8)" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontWeight: 700, color: "#FFFFFF" }}>
              <User size={14} style={{ color: "#C5A059" }} /> {article.author || "Editorial Team"}
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
      </section>

      {/* Main Container */}
      <div style={{ maxWidth: "860px", margin: "0 auto" }}>
        {/* HERO IMAGE */}
        {article.image && (
          <div style={{ position: "relative", height: "420px", borderRadius: "16px", overflow: "hidden", marginBottom: "32px", border: "1px solid #E5E7EB", boxShadow: "0 8px 24px rgba(0,0,0,0.06)" }}>
            <Image
              src={article.image}
              alt={article.imageAlt || article.title}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        )}

        {/* READING BODY */}
        <article className="article-body-content" style={{ color: "#0A192F", fontSize: "17px", lineHeight: 1.75 }}>
          <p style={{ fontSize: "19px", fontWeight: 600, color: "#0A192F", lineHeight: 1.6, marginBottom: "24px" }}>
            {article.description}
          </p>

          {/* Pullquote Box with Left Gold Border */}
          <div style={{ background: "#FFFFFF", borderLeft: "4px solid #C5A059", borderRadius: "0 12px 12px 0", padding: "24px 28px", margin: "32px 0", boxShadow: "0 4px 16px rgba(0,0,0,0.04)" }}>
            <p className="font-serif" style={{ fontSize: "20px", fontWeight: 800, color: "#050C18", fontStyle: "italic", margin: 0, lineHeight: 1.4 }}>
              "{article.pullQuote || "AI will not replace humans. But humans who use AI will replace those who don't."}"
            </p>
          </div>

          <h2 className="font-serif" style={{ fontSize: "28px", fontWeight: 800, color: "#050C18", marginTop: "36px", marginBottom: "14px" }}>
            Why It Matters
          </h2>
          <p style={{ marginBottom: "24px" }}>
            Enterprises and financial institutions are accelerating their adoption of automated intelligence to optimize capital allocation, streamline operation flows, and build resilient market strategies.
          </p>

          <p style={{ marginBottom: "32px" }}>
            The executives who succeed over the next decade are those investing early in data infrastructure, governance, and organizational alignment across all core business units.
          </p>

          {/* Newsletter CTA Inside Article */}
          <div style={{ background: "linear-gradient(135deg, #050C18 0%, #0A192F 100%)", borderRadius: "16px", padding: "32px", color: "#FFFFFF", textAlign: "center", margin: "40px 0" }}>
            <h3 className="font-serif" style={{ fontSize: "24px", fontWeight: 800, marginBottom: "8px" }}>Subscribe to Our Weekly Newsletter</h3>
            <p style={{ color: "#9CA3AF", fontSize: "14px", marginBottom: "20px" }}>Get executive briefings, market analysis, and new article releases straight to your inbox.</p>
            <Link href="/blogs#newsletter" className="btn btn-gold-gradient">
              Subscribe to The Success World
            </Link>
          </div>
        </article>

        {/* RELATED ARTICLES GRID */}
        {relatedStories.length > 0 && (
          <section style={{ marginTop: "56px", paddingTop: "36px", borderTop: "2px solid #E5E7EB" }}>
            <h3 className="font-serif" style={{ fontSize: "24px", fontWeight: 800, color: "#0A192F", marginBottom: "20px" }}>Related Articles</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "24px" }}>
              {relatedStories.slice(0, 3).map((item) => (
                <div key={item.slug} style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "12px", padding: "16px", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
                  {item.image && (
                    <div style={{ position: "relative", height: "140px", borderRadius: "8px", overflow: "hidden", marginBottom: "12px" }}>
                      <Image src={item.image} alt={item.title} fill className="object-cover" unoptimized />
                    </div>
                  )}
                  <span style={{ fontSize: "10px", fontWeight: 800, color: "#7C3AED", textTransform: "uppercase" }}>{item.category}</span>
                  <h4 className="font-serif" style={{ fontSize: "16px", fontWeight: 700, color: "#0A192F", margin: "6px 0", lineHeight: 1.3 }}>
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
