"use client";

import { useEffect, useState, useMemo } from "react";
import { MagazineFilterBar } from "@/components/magazine/MagazineFilterBar";
import { MagazineCardGrid } from "@/components/magazine/MagazineCardGrid";
import { MagazineNewsletterSection } from "@/components/magazine/MagazineNewsletterSection";
import { magazineService } from "@/services/magazineService";
import type { MagazineIssue } from "@/types";

export default function MagazinesPage() {
  const [sanityIssues, setSanityIssues] = useState<MagazineIssue[]>([]);
  const [selectedYear, setSelectedYear] = useState("All Years");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    magazineService.fetchSanityMagazines().then((data) => {
      if (data && data.length > 0) setSanityIssues(data);
    });
  }, []);

  // Extract dynamic unique years strictly from real fetched magazine issues
  const availableYears = useMemo(() => {
    const yearsSet = new Set<string>();
    sanityIssues.forEach((issue) => {
      if (issue.year) {
        yearsSet.add(issue.year);
      } else if (issue.date) {
        const match = issue.date.match(/\b(19\d{2}|20\d{2})\b/);
        if (match) yearsSet.add(match[1]);
      }
    });

    const sortedYears = Array.from(yearsSet).sort((a, b) => Number(b) - Number(a));
    return ["All Years", ...sortedYears];
  }, [sanityIssues]);

  // Filter Sanity Magazines by selected year & search query, preserving published sequence (latest first)
  const filteredCards = useMemo(() => {
    return sanityIssues.filter((card) => {
      const cardYear = card.year || (card.date ? card.date.match(/\b(19\d{2}|20\d{2})\b/)?.[1] : undefined);
      const matchesYear =
        selectedYear === "All Years" ||
        cardYear === selectedYear ||
        (card.date && card.date.includes(selectedYear));

      const matchesSearch =
        !searchQuery.trim() ||
        card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (card.subtitle && card.subtitle.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesYear && matchesSearch;
    });
  }, [sanityIssues, selectedYear, searchQuery]);

  return (
    <main style={{ background: "var(--editorial-ivory, #F5F1EA)", minHeight: "100vh", paddingBottom: "40px" }}>
      {/* 1. Filter & Search Bar with Clean Direct Year Selector */}
      <MagazineFilterBar
        availableYears={availableYears}
        selectedYear={selectedYear}
        onSelectYear={setSelectedYear}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        totalFilteredCount={filteredCards.length}
      />

      {/* 2. Authentic Sanity Magazine Cards Grid in Published Sequence */}
      <MagazineCardGrid issues={filteredCards} />

      {/* 3. Stay Inspired Newsletter Section */}
      <MagazineNewsletterSection />
    </main>
  );
}
