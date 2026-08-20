"use client";

import { useEffect, useState, useMemo } from "react";
import { MagazineHeroBanner } from "@/components/magazine/MagazineHeroBanner";
import { MagazineFilterBar } from "@/components/magazine/MagazineFilterBar";
import { MagazineCardGrid } from "@/components/magazine/MagazineCardGrid";
import { MagazineNewsletterSection } from "@/components/magazine/MagazineNewsletterSection";
import { magazineService } from "@/services/magazineService";
import { leaderService } from "@/services/leaderService";
import type { MagazineIssue, Leader } from "@/types";

const categoriesList = ["All", "Business", "Leadership", "Innovation", "Entrepreneurship", "Lifestyle"];

export default function MagazinesPage() {
  const [sanityIssues, setSanityIssues] = useState<MagazineIssue[]>([]);
  const [sanityLeaders, setSanityLeaders] = useState<Leader[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    magazineService.fetchSanityMagazines().then((data) => {
      if (data && data.length > 0) setSanityIssues(data);
    });

    leaderService.fetchSanityLeaders().then((ldrs) => {
      if (ldrs && ldrs.length > 0) setSanityLeaders(ldrs);
    });
  }, []);

  // Merge ONLY authentic Sanity Magazines & Sanity Leaders uploaded by user
  const allMagazineCards: MagazineIssue[] = useMemo(() => {
    const list: MagazineIssue[] = [];

    // Add Sanity uploaded magazines first
    if (sanityIssues.length > 0) {
      sanityIssues.forEach((issue) => {
        list.push(issue);
      });
    }

    // Add Sanity uploaded leaders mapped as magazine cards
    if (sanityLeaders.length > 0) {
      sanityLeaders.forEach((ldr, idx) => {
        if (!list.some((existing) => existing.slug === ldr.slug || existing.title === ldr.name)) {
          list.push({
            issue: `Edition ${list.length + 1}`,
            slug: ldr.slug || `leader-mag-${idx}`,
            date: "2026",
            title: ldr.name,
            subtitle: `${ldr.role || "Executive Leader"} ${ldr.company ? `| ${ldr.company}` : ""}`,
            cover: ldr.image || "",
            coverAlt: ldr.name,
            contents: [],
            description: ldr.bio || "",
            stories: [],
          });
        }
      });
    }

    return list;
  }, [sanityIssues, sanityLeaders]);

  // Filter cards by category & search query
  const filteredCards = useMemo(() => {
    return allMagazineCards.filter((card) => {
      const matchesCategory =
        activeCategory === "All" ||
        card.title.toLowerCase().includes(activeCategory.toLowerCase()) ||
        (card.subtitle && card.subtitle.toLowerCase().includes(activeCategory.toLowerCase())) ||
        (card.description && card.description.toLowerCase().includes(activeCategory.toLowerCase()));

      const matchesSearch =
        !searchQuery.trim() ||
        card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (card.subtitle && card.subtitle.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [allMagazineCards, activeCategory, searchQuery]);

  return (
    <main style={{ background: "#F7F5F0", minHeight: "100vh", paddingBottom: "40px" }}>
      {/* 1. Full-Width Luxury Magazine Hero Banner */}
      {allMagazineCards.length > 0 && <MagazineHeroBanner issues={allMagazineCards.slice(0, 5)} />}

      {/* 2. Filter & Search Bar */}
      <MagazineFilterBar
        categories={categoriesList}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* 3. Authentic Sanity Magazine Cards Grid */}
      <MagazineCardGrid issues={filteredCards} />

      {/* 4. Stay Inspired Newsletter Section */}
      <MagazineNewsletterSection />
    </main>
  );
}
