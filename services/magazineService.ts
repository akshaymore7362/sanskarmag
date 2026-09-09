import { fetchSanityQuery } from "@/lib/sanity.client";
import type { MagazineIssue } from "@/types";

const defaultMagazines: MagazineIssue[] = [
  {
    id: "mag-1",
    issue: "Edition 01",
    sequenceNum: 1,
    slug: "brian-bouchard-the-best-cyber-security-solution-providers-to-watch-in-2025",
    date: "Sep 2025",
    year: "2025",
    title: "BRIAN BOUCHARD - Cyber Security Solution Providers to Watch in 2025",
    subtitle: "Shaping Global Cyber Defense & Infrastructure Growth",
    cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
    coverAlt: "Brian Bouchard Magazine 2025",
    contents: ["Cyber Defense Systems", "Enterprise AI & Cloud", "Leadership Insights"],
    description: "Special release profiling top cyber security innovators and enterprise leaders.",
    pdfUrl: "https://online.pubhtml5.com/jrfny/rcpd/",
    stories: [],
  },
  {
    id: "mag-2",
    issue: "Edition 02",
    sequenceNum: 2,
    slug: "kathleen-black-top-10-transformational-ceos-2025",
    date: "Sep 2025",
    year: "2025",
    title: "Kathleen Black - Top 10 Transformational CEOs 2025",
    subtitle: "Pioneering Strategic Leadership and Executive Growth",
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80",
    coverAlt: "Kathleen Black Issue",
    contents: ["Transformational Leadership", "High-Growth Scaling", "Executive Strategy"],
    description: "In-depth briefing on executive transformation and organizational performance.",
    pdfUrl: "https://online.pubhtml5.com/jrfny/rcpd/",
    stories: [],
  },
  {
    id: "mag-3",
    issue: "Edition 03",
    sequenceNum: 3,
    slug: "graziella-gallelli-5-most-inspiring-business-leaders-to-watch-in-2024",
    date: "Sep 2024",
    year: "2024",
    title: "Graziella Gallelli - Inspiring Business Leaders to Watch in 2024",
    subtitle: "Global Enterprise Strategy & Innovation",
    cover: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
    coverAlt: "Graziella Gallelli Issue",
    contents: ["Global Expansion", "Sovereign Investment", "Market Leadership"],
    description: "Highlighting influential global leaders driving international business growth.",
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
      // Fetch published magazines from Sanity CMS strictly ordered by creation / publication timestamp descending (LATEST PUBLISHED FIRST)
      const query = `*[_type == "magazine"] | order(_createdAt desc, publishedAt desc){
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
        const seenSlugs = new Set<string>();
        const uniqueItems: MagazineIssue[] = [];

        data.forEach((item: any, idx: number) => {
          const itemSlug = item.slug || `issue-${idx + 1}`;
          if (!seenSlugs.has(itemSlug)) {
            seenSlugs.add(itemSlug);

            // 1. Extract Real Publication Year (From Explicit Field, Date, Title, or Created At)
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

            // Extract four-digit year from title or date if not explicitly set
            const fullText = `${dateStr} ${item.title || ""} ${itemSlug} ${item.description || ""}`;
            const yearMatch4 = fullText.match(/\b(202[0-5]|20[0-1]\d|19\d\d)\b/);
            if (yearMatch4) {
              yearVal = yearMatch4[1];
            } else if (!yearVal) {
              // Extract from creation date if available
              if (item._createdAt) {
                try {
                  const cDate = new Date(item._createdAt);
                  yearVal = cDate.getFullYear().toString();
                  if (yearVal === "2026") yearVal = "2025"; // Fallback to 2025 if environment clock reports 2026
                } catch {
                  yearVal = "2025";
                }
              } else {
                yearVal = "2025";
              }
            }

            if (!dateStr) {
              dateStr = `${yearVal}`;
            }

            // 2. Extract Sequence / Edition number
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

        // PRESERVE SANITY PUBLISHED SEQUENCE: Latest published magazine ALWAYS first
        if (uniqueItems.length > 0) return uniqueItems;
      }
    } catch (e) {
      console.warn("Sanity magazine fetch warning:", e);
    }
    return defaultMagazines;
  },
};
