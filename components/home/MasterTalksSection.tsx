"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, ArrowUpRight } from "lucide-react";
import { articleService } from "@/services/articleService";
import type { Article } from "@/types";

export function MasterTalksSection() {
  const [talks, setTalks] = useState<Article[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    articleService.fetchSanityArticles().then((items) => {
      if (items && items.length > 0) {
        setTalks(items.slice(0, 3));
      } else {
        setTalks(articleService.all().slice(0, 3));
      }
    });
  }, []);

  // Continuous Auto-Slide Timer (cycles episode tab every 3 seconds)
  useEffect(() => {
    if (talks.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % talks.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [talks.length]);

  if (talks.length === 0) return null;

  const currentTalk = talks[activeIndex % talks.length];

  return (
    <div className="tsw-band tsw-band--paper">
      <section className="tsw-band-inner">
        <div className="tsw-talks-grid">
          {/* LEFT — copy + episode selector */}
          <div className="tsw-talks-left">
            <div>
              <span className="tsw-kicker">Executive Broadcast</span>
              <h2 className="tsw-title">Master Talks &amp; Interviews</h2>
            </div>
            <p>
              Exclusive unscripted conversations with global CEOs, visionary founders, and market leaders
              shaping the future of global enterprise and capital.
            </p>
            <Link href="/blogs" className="tsw-link">
              Discover the conversations <ArrowUpRight size={14} />
            </Link>

            <div className="tsw-talks-eps">
              {talks.map((talk, idx) => (
                <div
                  key={talk.slug || String(idx)}
                  onClick={() => setActiveIndex(idx)}
                  className={`tsw-talks-ep ${idx === activeIndex ? "is-active" : ""}`}
                >
                  <span className="tsw-talks-ep-num">0{idx + 1}</span>
                  <span className="tsw-talks-ep-title">{talk.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — video card */}
          <div className="tsw-talks-video">
            {currentTalk?.image && (
              <Image src={currentTalk.image} alt={currentTalk.title} fill className="object-cover" unoptimized priority />
            )}
            <div className="tsw-talks-video-grad" />
            <Link href={`/blogs/${currentTalk?.slug}`} className="tsw-talks-play" aria-label={`Play ${currentTalk?.title}`}>
              <Play size={26} style={{ color: "#fff", fill: "#fff", marginLeft: "2px" }} />
            </Link>
            <div className="tsw-talks-caption">
              <span className="tsw-eyebrow-sm">Master Talk / 00{activeIndex + 1}</span>
              <h3>
                <Link href={`/blogs/${currentTalk?.slug}`}>{currentTalk?.title}</Link>
              </h3>
              <div className="tsw-talks-caption-row">
                <span>{currentTalk?.author || "Editorial Board"} · CEO · Founder</span>
                <Link href={`/blogs/${currentTalk?.slug}`} className="tsw-talks-watch">
                  Watch interview <ArrowUpRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
