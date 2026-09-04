import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Clock, Search as SearchIcon } from "lucide-react";
import { PageIntro } from "@/components/editorial/PageIntro";
import { articleService } from "@/services/articleService";
import type { Article } from "@/types";

type Props = {
  searchParams: Promise<{ q?: string }>;
};

export const metadata: Metadata = {
  title: "Search Results | The Success World",
  description: "Search The Success World stories, leaders, industries, startups, events and issues.",
};

function highlightText(text: string, query: string) {
  if (!query.trim()) return text;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} style={{ background: "#C5A059", color: "#050C18", padding: "0 3px", borderRadius: "3px", fontWeight: 800 }}>
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
}

export default async function SearchPage({ searchParams }: Props) {
  const resolved = await searchParams;
  const query = resolved.q ?? "";
  const allArticles = await articleService.fetchSanityArticles();

  const results = query.trim()
    ? allArticles.filter(
        (art) =>
          art.title?.toLowerCase().includes(query.toLowerCase()) ||
          art.description?.toLowerCase().includes(query.toLowerCase()) ||
          art.category?.toLowerCase().includes(query.toLowerCase()) ||
          art.author?.toLowerCase().includes(query.toLowerCase())
      )
    : allArticles;

  return (
    <main className="site-shell inner-shell" style={{ background: "#F3F4F6", minHeight: "100vh", paddingBottom: "60px" }}>
      <PageIntro
        title="Search Results"
        intro={`Found ${results.length} result(s) for "${query || "all content"}"`}
        eyebrow="Search Engine"
      />

      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Search Form */}
        <form action="/search" style={{ marginBottom: "32px" }}>
          <div style={{ display: "flex", gap: "12px", background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "12px", padding: "10px 16px", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
            <SearchIcon size={20} style={{ color: "#C5A059", alignSelf: "center" }} />
            <input
              name="q"
              defaultValue={query}
              placeholder="Search stories, topics, executives..."
              style={{ flex: 1, border: "none", outline: "none", fontSize: "16px", background: "none" }}
            />
            <button type="submit" className="btn btn-gold-gradient btn-sm">
              Search
            </button>
          </div>
        </form>

        {/* Results Grid */}
        <section style={{ marginBottom: "48px" }}>
          {results.length > 0 ? (
            <div className="grid-responsive-3">
              {results.map((article, idx) => (
                <article key={article.slug || String(idx)} style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "14px", padding: "18px", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
                  {article.image && (
                    <div style={{ position: "relative", height: "160px", borderRadius: "8px", overflow: "hidden", marginBottom: "12px" }}>
                      <Image src={article.image} alt={article.title} fill className="object-cover" unoptimized />
                    </div>
                  )}
                  <span style={{ fontSize: "10px", fontWeight: 800, letterSpacing: "1px", textTransform: "uppercase", color: "#C5A059" }}>
                    {highlightText(article.category || "Article", query)}
                  </span>
                  <h3 className="font-serif" style={{ fontSize: "17px", fontWeight: 800, color: "#0A192F", margin: "6px 0 8px", lineHeight: 1.3 }}>
                    <Link href={`/blogs/${article.slug}`}>
                      {highlightText(article.title, query)}
                    </Link>
                  </h3>
                  <p style={{ fontSize: "13px", color: "#4B5563", lineHeight: 1.5, marginBottom: "12px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {highlightText(article.description || "", query)}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: "#4B5563" }}>
                    <Clock size={12} />
                    <span>{article.readTime}</span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "60px 20px", background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "16px" }}>
              <h3 className="font-serif" style={{ fontSize: "24px", fontWeight: 800, color: "#0A192F" }}>No Matching Stories Found</h3>
              <p style={{ color: "#4B5563", marginTop: "8px" }}>Try searching for generic terms like "AI", "Technology", "Economy", or "Leadership".</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
