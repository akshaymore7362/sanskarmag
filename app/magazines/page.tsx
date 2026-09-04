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
  const [selectedYear, setSelectedYear] = useState("All Years");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    magazineService.fetchSanityMagazines().then((data) => {
      if (data && data.length > 0) setSanityIssues(data);
    });
  }, []);

  // Extract dynamic unique years from fetched magazine issues
  const availableYears = useMemo(() => {
    const yearsSet = new Set<string>();
    sanityIssues.forEach((issue) => {
      if (issue.year) {
        yearsSet.add(issue.year);
      } else if (issue.date) {
        const match = issue.date.match(/\b(20\d{2}|19\d{2})\b/);
        if (match) yearsSet.add(match[1]);
      }
    });

    const sortedYears = Array.from(yearsSet).sort((a, b) => Number(b) - Number(a));
    if (sortedYears.length === 0) {
      return ["All Years", "2026", "2025", "2024"];
    }
    return ["All Years", ...sortedYears];
  }, [sanityIssues]);

  // Filter Sanity Magazines by category, publication year, and search term
  const filteredCards = useMemo(() => {
    return sanityIssues.filter((card) => {
      const matchesCategory =
        activeCategory === "All" ||
        card.title.toLowerCase().includes(activeCategory.toLowerCase()) ||
        (card.subtitle && card.subtitle.toLowerCase().includes(activeCategory.toLowerCase())) ||
        (card.description && card.description.toLowerCase().includes(activeCategory.toLowerCase()));

      const cardYear = card.year || (card.date ? card.date.match(/\b(20\d{2}|19\d{2})\b/)?.[1] : undefined);
      const matchesYear =
        selectedYear === "All Years" ||
        cardYear === selectedYear ||
        (card.date && card.date.includes(selectedYear));

      const matchesSearch =
        !searchQuery.trim() ||
        card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (card.subtitle && card.subtitle.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesYear && matchesSearch;
    });
  }, [sanityIssues, activeCategory, selectedYear, searchQuery]);

  return (
    <main style={{ background: "var(--editorial-ivory, #F5F1EA)", minHeight: "100vh", paddingBottom: "40px" }}>
      {/* 1. Full-Width Luxury Magazine Hero Banner */}
      {sanityIssues.length > 0 && <MagazineHeroBanner issues={sanityIssues.slice(0, 5)} />}

      {/* 2. Filter & Search Bar with Year Selector */}
      <MagazineFilterBar
        categories={categoriesList}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        availableYears={availableYears}
        selectedYear={selectedYear}
        onSelectYear={setSelectedYear}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        totalFilteredCount={filteredCards.length}
      />

      {/* 3. Authentic Sanity Magazine Cards Grid */}
      <MagazineCardGrid issues={filteredCards} />

      {/* 4. Stay Inspired Newsletter Section */}
      <MagazineNewsletterSection />
    </main>
  );
}
