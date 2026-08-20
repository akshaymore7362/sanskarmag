"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, Clock, ArrowRight } from "lucide-react";
import { articleService } from "@/services/articleService";
import type { Article } from "@/types";

export function MasterTalksSection() {
  const [talks, setTalks] = useState<Article[]>([]);

  useEffect(() => {
    articleService.fetchSanityArticles().then((items) => {
      if (items && items.length > 0) {
        setTalks(items.slice(0, 3));
      }
    });
  }, []);

  if (talks.length === 0) return null;

  return (
    <section className="section master-talks-section" aria-label="Master Talks">
      <div className="section-header-row">
        <div>
          <span className="section-eyebrow">EXECUTIVE BROADCAST</span>
          <h2 className="section-title font-serif">Master Talks & Interviews</h2>
        </div>
        <Link href="/blogs" className="section-viewall-link">
          <span>View All Talks</span>
          <ArrowRight size={15} />
        </Link>
      </div>

      <div className="master-talks-grid">
        {talks.map((item, idx) => (
          <article key={item.slug || String(idx)} className="master-talk-card">
            <div className="master-talk-thumb-wrap">
              {item.image && (
                <Image src={item.image} alt={item.title} fill className="object-cover" unoptimized />
              )}
              <div className="master-talk-overlay" />
              <div className="play-button-ring">
                <Play size={18} fill="#FFFFFF" className="play-icon" />
              </div>
            </div>

            <div className="master-talk-body">
              <span className="master-talk-tag">MASTER TALK</span>
              <h3 className="master-talk-title font-serif">
                <Link href={`/blogs/${item.slug}`}>{item.title}</Link>
              </h3>
              <div className="master-talk-meta">
                <span>By {item.author}</span>
                <span className="meta-dot">•</span>
                <span className="talk-time"><Clock size={12} /> {item.readTime}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
