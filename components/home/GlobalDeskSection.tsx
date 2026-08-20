"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { articleService } from "@/services/articleService";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Article } from "@/types";

export function GlobalDeskSection() {
  const [articlesList, setArticlesList] = useState<Article[]>([]);

  useEffect(() => {
    articleService.fetchSanityArticles().then((items) => {
      if (items && items.length > 0) {
        setArticlesList(items);
      }
    });
  }, []);

  if (articlesList.length === 0) return null;

  const lead = articlesList[0];
  const signals = articlesList.slice(1, 7);

  return (
    <section className="global-desk section-light">
      <SectionHeading title="Global Desk" linkText="Explore Signals" />
      <div className="global-desk-grid">
        {lead && (
          <article className="global-lead">
            {lead.image && <Image src={lead.image} alt={lead.imageAlt || lead.title} fill className="object-cover" unoptimized />}
            <div>
              <p>{lead.category}</p>
              <h3><Link href={`/articles/${lead.slug}`}>{lead.title}</Link></h3>
              <small>{lead.description}</small>
            </div>
          </article>
        )}
        <div className="signal-ledger">
          {signals.map((article, index) => (
            <Link href={`/articles/${article.slug}`} key={article.slug || String(index)}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{article.title}</strong>
              <small>{article.category} | {article.date}</small>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
