import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import type { Article } from "@/types";

type Props = {
  article?: Article;
  compact?: boolean;
  dark?: boolean;
};

export function ArticleCard({ article, compact = false }: Props) {
  if (!article || !article.slug) return null;

  return (
    <article className="bulletin-lead-card" style={{ padding: "20px", display: "flex", flexDirection: "column" }}>
      <Link href={`/blogs/${article.slug}`} style={{ display: "block", position: "relative", height: compact ? "140px" : "200px", borderRadius: "10px", overflow: "hidden", marginBottom: "14px" }}>
        {article.image ? (
          <Image src={article.image} alt={article.imageAlt || article.title} fill className="object-cover" unoptimized />
        ) : (
          <div style={{ width: "100%", height: "100%", background: "#120E24" }} />
        )}
      </Link>
      <div>
        <span className="tag tag-tech" style={{ marginBottom: "8px" }}>{article.category || "Business"}</span>
        <h3 className="font-serif" style={{ fontSize: "18px", fontWeight: 800, color: "#FFFFFF", margin: "8px 0", lineHeight: 1.35 }}>
          <Link href={`/blogs/${article.slug}`}>{article.title}</Link>
        </h3>
        {!compact && article.description && (
          <p style={{ color: "#A9A5B5", fontSize: "13px", lineHeight: 1.5, marginBottom: "12px" }}>{article.description}</p>
        )}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "#A9A5B5" }}>
          <span>{article.author || "Editorial"}</span>
          <span>•</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", color: "#F5B942" }}>
            <Clock size={12} /> {article.readTime}
          </span>
        </div>
      </div>
    </article>
  );
}
