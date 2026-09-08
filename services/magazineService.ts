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
      // Query published magazine documents from Sanity CMS with all sequence/order fields
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

            let dateStr = "2026";
            let yearVal = "2026";
            if (item.publishedAt) {
              try {
                const pDate = new Date(item.publishedAt);
                dateStr = pDate.toLocaleDateString("en-US", { month: "short", year: "numeric" });
                yearVal = pDate.getFullYear().toString();
              } catch {
                dateStr = item.publishedAt;
              }
            } else if (item._createdAt) {
              try {
                yearVal = new Date(item._createdAt).getFullYear().toString();
              } catch {
                yearVal = "2026";
              }
            }

            // Extract 4-digit year if present in title or dateStr
            const matchedYear = (dateStr + " " + (item.title || "")).match(/\b(19\d\d|20\d\d)\b/);
            if (matchedYear && matchedYear[1]) {
              yearVal = matchedYear[1];
            }

            // Extract Sequence / Edition number from explicit fields or title text (e.g., "Edition 02", "Issue 1", "01")
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
              // Extract number from title or slug like "Edition 02", "Issue 1", "vol-3", "01"
              const seqMatch = (item.title + " " + itemSlug).match(/(?:edition|issue|vol|volume|no|#|\b)\s*0*(\d{1,3})\b/i);
              if (seqMatch && seqMatch[1]) {
                const parsed = parseInt(seqMatch[1], 10);
                if (parsed > 0 && parsed < 1000) {
                  sequenceNum = parsed;
                }
              }
            }

            const formattedIssueLabel = `Edition ${sequenceNum < 10 ? `0${sequenceNum}` : sequenceNum}`;

            uniqueItems.push({
              id: item._id || String(idx + 1),
              issue: formattedIssueLabel,
              sequenceNum: sequenceNum,
              slug: itemSlug,
              date: dateStr,
              year: yearVal,
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

        // SORT MAGAZINES: Primary by Year (descending), Secondary by Sequence Number (ascending)
        uniqueItems.sort((a, b) => {
          const yrA = parseInt(a.year || "2026", 10);
          const yrB = parseInt(b.year || "2026", 10);
          if (yrB !== yrA) {
            return yrB - yrA; // Latest year first
          }
          const seqA = a.sequenceNum || 1;
          const seqB = b.sequenceNum || 1;
          return seqA - seqB; // Sequence wise (Edition 01, Edition 02, Edition 03...)
        });

        if (uniqueItems.length > 0) return uniqueItems;
      }
    } catch (e) {
      console.warn("Sanity magazine fetch warning:", e);
    }
    return defaultMagazines;
  },
};
