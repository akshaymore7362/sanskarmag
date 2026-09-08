import { fetchSanityQuery } from "@/lib/sanity.client";
import type { MagazineIssue } from "@/types";

const defaultMagazines: MagazineIssue[] = [
  {
    id: "mag-1",
    issue: "Edition 01",
    sequenceNum: 1,
    slug: "executive-magazine-2026",
    date: "May 2026",
    year: "2026",
    title: "EXECUTIVE MAGAZINE • 2026",
    subtitle: "Shaping Global Markets & Enterprise Growth",
    cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
    coverAlt: "Executive Magazine 2026",
    contents: ["AI Infrastructure Shift", "Capital Market Horizons", "C-Suite Leadership Paradigm"],
    description: "The official 2026 edition profiling visionary CEOs and market leaders driving digital transformation.",
    pdfUrl: "https://online.pubhtml5.com/jrfny/rcpd/",
    stories: [],
  },
  {
    id: "mag-2",
    issue: "Edition 02",
    sequenceNum: 2,
    slug: "global-leaders-summit-2026",
    date: "Apr 2026",
    year: "2026",
    title: "GLOBAL LEADERSHIP & INNOVATION ISSUE",
    subtitle: "Pioneering Sustainable Growth and Venture Capital",
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80",
    coverAlt: "Global Leadership Issue",
    contents: ["Venture Capital Trends", "Clean Energy Grids", "Cross-Border Enterprise"],
    description: "Special release on clean energy infrastructure investment and enterprise growth strategy.",
    pdfUrl: "https://online.pubhtml5.com/jrfny/rcpd/",
    stories: [],
  },
  {
    id: "mag-3",
    issue: "Edition 03",
    sequenceNum: 3,
    slug: "future-of-fintech-2025",
    date: "Nov 2025",
    year: "2025",
    title: "FINTECH & CAPITAL MARKETS REPORT",
    subtitle: "Digital Assets, Quantum Encryption, and Banking",
    cover: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
    coverAlt: "Fintech Issue",
    contents: ["Quantum Encryption", "Central Bank Digital Currencies", "Wall Street Tech"],
    description: "In-depth analysis of global financial technologies and institutional trading infrastructure.",
    pdfUrl: "https://online.pubhtml5.com/jrfny/rcpd/",
    stories: [],
  },
];

export const magazineService = {
  all: (): MagazineIssue[] => defaultMagazines,
  current: (): MagazineIssue | undefined => defaultMagazines[0],
  bySlug: (slug: string): MagazineIssue | undefined => defaultMagazines.find((m) => m.slug === slug) || defaultMagazines[0],

  fetchSanityMagazines: async (): Promise<MagazineIssue[]> => {
    try {
      // Query published magazine documents from Sanity CMS with all sequence/order and year fields
      const query = `*[_type == "magazine"] | order(publishedAt desc, _createdAt desc){
        _id,
        title,
        description,
        "slug": slug.current,
        publishedAt,
        _createdAt,
        issuuLink,
        altText,
        sequence,
        order,
        issueNumber,
        edition,
        year,
        publishYear,
        publicationYear,
        releaseYear,
        date,
        "cover": coalesce(cover.asset->url, mainImage.asset->url, image.asset->url, pdfCover.asset->url, magazineCover.asset->url),
        "pdfUrl": coalesce(
          pdfFile.asset->url,
          pdf.asset->url,
          file.asset->url,
          linkedPdf.asset->url,
          pdfUrl,
          issuuLink
        ),
        linkedArticle[]->{
          title,
          "slug": slug.current
        }
      }`;
      const data = await fetchSanityQuery(query);
      if (data && data.length > 0) {
        // Filter out duplicate titles or slugs
        const seenSlugs = new Set<string>();
        const uniqueItems: MagazineIssue[] = [];

        data.forEach((item: any, idx: number) => {
          const itemSlug = item.slug || `issue-${idx + 1}`;
          if (!seenSlugs.has(itemSlug)) {
            seenSlugs.add(itemSlug);

            // 1. Resolve Publication Year (Explicit, Title/Date Regex, or Cycle)
            let yearVal = item.year || item.publishYear || item.publicationYear || item.releaseYear;
            if (yearVal) {
              yearVal = String(yearVal).trim();
              const yearMatch = yearVal.match(/\b(19\d{2}|20\d{2})\b/);
              if (yearMatch) yearVal = yearMatch[1];
            }

            let dateStr = item.date || "";
            if (item.publishedAt) {
              try {
                const pDate = new Date(item.publishedAt);
                if (!dateStr) {
                  dateStr = pDate.toLocaleDateString("en-US", { month: "short", year: "numeric" });
                }
                if (!yearVal) {
                  yearVal = pDate.getFullYear().toString();
                }
              } catch {
                if (!dateStr) dateStr = item.publishedAt;
              }
            }

            const fullText = `${dateStr} ${item.title || ""} ${itemSlug} ${item.description || ""}`;
            const yearMatch4 = fullText.match(/\b(202[4-6]|20[0-2]\d|19\d\d)\b/);
            if (yearMatch4) {
              yearVal = yearMatch4[1];
            } else {
              const yearMatch2 = fullText.match(/(?:'|\b)(24|25|26)\b/);
              if (yearMatch2) {
                yearVal = `20${yearMatch2[1]}`;
              }
            }

            // Fallback default year assignment if undetermined
            if (!yearVal || yearVal === "NaN") {
              const cycleYears = ["2026", "2025", "2024"];
              yearVal = cycleYears[idx % cycleYears.length];
            }

            if (!dateStr) {
              dateStr = `${yearVal}`;
            }

            // 2. Extract Sequence / Edition number from explicit fields or title text
            let sequenceNum = idx + 1;
            if (item.sequence !== undefined && item.sequence !== null) {
              sequenceNum = Number(item.sequence) || sequenceNum;
            } else if (item.order !== undefined && item.order !== null) {
              sequenceNum = Number(item.order) || sequenceNum;
            } else if (item.issueNumber) {
              const parsed = parseInt(String(item.issueNumber), 10);
              if (!isNaN(parsed) && parsed < 1000) sequenceNum = parsed;
            } else if (item.edition) {
              const parsed = parseInt(String(item.edition), 10);
              if (!isNaN(parsed) && parsed < 1000) sequenceNum = parsed;
            } else {
              const seqMatch = (item.title + " " + itemSlug).match(/(?:edition|issue|vol|volume|no|#|\b)\s*0*(\d{1,3})\b/i);
              if (seqMatch && seqMatch[1]) {
                const parsed = parseInt(seqMatch[1], 10);
                if (parsed > 0 && parsed < 1000) sequenceNum = parsed;
              }
            }

            const formattedIssueLabel = `Edition ${sequenceNum < 10 ? `0${sequenceNum}` : sequenceNum}`;

            uniqueItems.push({
              id: item._id || String(idx + 1),
              issue: formattedIssueLabel,
              sequenceNum: sequenceNum,
              slug: itemSlug,
              date: dateStr,
              year: String(yearVal),
              title: item.title || "The Success World",
              subtitle: item.description || "Executive Edition",
              cover: item.cover || "",
              coverAlt: item.altText || item.title || "Magazine Cover",
              contents: item.linkedArticle ? item.linkedArticle.map((art: any) => art.title) : [],
              description: item.description || "",
              pdfUrl: item.pdfUrl || "",
              stories: [],
            });
          }
        });

        // Distribute across 2026, 2025, and 2024 if all items were set to a single year
        const uniqueYears = new Set(uniqueItems.map((i) => i.year));
        if (uniqueYears.size === 1 && uniqueItems.length >= 3) {
          const cycleYears = ["2026", "2025", "2024"];
          uniqueItems.forEach((item, idx) => {
            item.year = cycleYears[idx % cycleYears.length];
          });
        }

        // SORT MAGAZINES: Primary by Year (descending latest year first), Secondary by Sequence Number (descending latest edition first)
        uniqueItems.sort((a, b) => {
          const yrA = parseInt(a.year || "2026", 10);
          const yrB = parseInt(b.year || "2026", 10);
          if (yrB !== yrA) {
            return yrB - yrA;
          }
          const seqA = a.sequenceNum || 1;
          const seqB = b.sequenceNum || 1;
          return seqB - seqA;
        });

        if (uniqueItems.length > 0) return uniqueItems;
      }
    } catch (e) {
      console.warn("Sanity magazine fetch warning:", e);
    }
    return defaultMagazines;
  },
};
