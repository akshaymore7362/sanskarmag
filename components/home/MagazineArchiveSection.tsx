"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MagazineCover } from "@/components/editorial/MagazineCover";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { magazineService } from "@/services/magazineService";
import type { MagazineIssue } from "@/types";

export function MagazineArchiveSection() {
  const [issue, setIssue] = useState<MagazineIssue | null>(null);

  useEffect(() => {
    magazineService.fetchSanityMagazines().then((data) => {
      if (data && data.length > 0) {
        setIssue(data[0]);
      }
    });
  }, []);

  if (!issue) return null;

  return (
    <section className="home-archive section-light">
      <SectionHeading title="From The Magazine" linkText="Open Current Issue" />
      <div className="magazine-package">
        <aside className="magazine-package-cover">
          <MagazineCover issue={issue} decorative />
          <Link href="/magazines">Read The Full Issue</Link>
        </aside>
        <div className="magazine-package-main">
          <p className="gold-label">{issue.issue} | {issue.date}</p>
          <h3>{issue.title}</h3>
          <p>{issue.description}</p>
        </div>
      </div>
    </section>
  );
}
