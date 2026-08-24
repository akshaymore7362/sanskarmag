"use client";

import { useEffect, useState, useMemo } from "react";
import { MagazineHeroBanner } from "@/components/magazine/MagazineHeroBanner";
import { MagazineFilterBar } from "@/components/magazine/MagazineFilterBar";
import { MagazineCardGrid } from "@/components/magazine/MagazineCardGrid";
import { MagazineNewsletterSection } from "@/components/magazine/MagazineNewsletterSection";
import { magazineService } from "@/services/magazineService";
import type { MagazineIssue } from "@/types";

const categoriesList = ["All", "Business", "Leadership", "Innovation", "Entrepreneurship", "Lifestyle"];

export default function MagazinesPage() {
  const [sanityIssues, setSanityIssues] = useState<MagazineIssue[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    magazineService.fetchSanityMagazines().then((data) => {
      if (data && data.length > 0) setSanityIssues(data);
    });
  }, []);

  // Filter ONLY authentic Sanity Magazines (no leader duplicates or dummy items)
  const filteredCards = useMemo(() => {
    return sanityIssues.filter((card) => {
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
  }, [sanityIssues, activeCategory, searchQuery]);

  return (
    <main style={{ background: "#F7F5F0", minHeight: "100vh", paddingBottom: "40px" }}>
      {/* 1. Full-Width Luxury Magazine Hero Banner */}
      {sanityIssues.length > 0 && <MagazineHeroBanner issues={sanityIssues.slice(0, 5)} />}

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
