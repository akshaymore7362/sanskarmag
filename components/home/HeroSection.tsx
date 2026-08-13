"use client";

import Image from "next/image";
import { Play, ArrowRight } from "lucide-react";
import { articleService } from "@/services/articleService";
import { magazineService } from "@/services/magazineService";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { MagazineCover } from "@/components/editorial/MagazineCover";

export function HeroSection() {
  const hero = articleService.hero();
  const issue = magazineService.current();
  const [active, setActive] = useState(0);

  return (
    <section className="hero-grid">
      <div className="hero-main">
        <Image src={hero.image} alt={hero.imageAlt} fill className="object-cover" />
        <div className="hero-copy">
          <p className="gold-label">Cover Story</p>
          <h1>The Visionaries<br />Building Tomorrow</h1>
          <p>{hero.description}</p>
          <div className="hero-actions">
            <Button>Read Full Story <ArrowRight size={14} /></Button>
            <button className="video-button" type="button"><span><Play size={15} fill="currentColor" /></span>Watch Video</button>
          </div>
        </div>
        <div className="hero-slider">
          {[0, 1, 2, 3].map((item) => (
            <button key={item} onClick={() => setActive(item)} className={active === item ? "active" : ""}>
              {String(item + 1).padStart(2, "0")}<span />
            </button>
          ))}
        </div>
      </div>
      <aside className="current-issue">
        <h2>Current Issue</h2>
        <MagazineCover issue={issue} compact decorative />
        <div className="issue-actions">
          <Button>Read Issue</Button>
          <Button variant="outline">Download PDF</Button>
        </div>
        <h3>In This Issue</h3>
        <div className="issue-list">
          {issue.contents.map((item, index) => <p key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</p>)}
        </div>
        <a className="toc" href="#">View Table of Contents <ArrowRight size={13} /></a>
      </aside>
    </section>
  );
}
