import { fetchSanityQuery } from "@/lib/sanity.client";
import type { Industry } from "@/types";

const defaultIndustries: Industry[] = [
  {
    slug: "tech-ai",
    name: "Tech & AI Revolution",
    descriptor: "Technology & Artificial Intelligence",
    overview: "Autonomous systems, enterprise AI deployment, quantum computing, and frontier software driving worldwide market transformation.",
    marketSignal: "+24% Market Growth",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
    imageAlt: "Tech & AI Revolution",
  },
  {
    slug: "healthcare",
    name: "Healthcare & Biotech",
    descriptor: "Life Sciences & Digital Health",
    overview: "Genomic engineering, AI clinical diagnostics, pharmaceutical R&D, and scalable healthcare infrastructure.",
    marketSignal: "+18% Market Growth",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    imageAlt: "Healthcare & Biotech",
  },
  {
    slug: "finance",
    name: "Finance & Fintech",
    descriptor: "Capital Markets & Banking Tech",
    overview: "Digital asset management, algorithmic trading, cross-border banking rails, and institutional DeFi infrastructure.",
    marketSignal: "+21% Market Growth",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
    imageAlt: "Finance & Fintech",
  },
  {
    slug: "real-estate",
    name: "Real Estate & PropTech",
    descriptor: "Commercial Realty & Smart Cities",
    overview: "Urban redevelopment, automated property management, capital asset valuation, and sustainable architecture.",
    marketSignal: "+14% Market Growth",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    imageAlt: "Real Estate & PropTech",
  },
  {
    slug: "energy",
    name: "Energy & Climate Action",
    descriptor: "Renewable Power & Sustainability",
    overview: "Next-gen solar, wind power grids, green hydrogen energy storage, and industrial carbon capture.",
    marketSignal: "+28% Market Growth",
    image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&q=80",
    imageAlt: "Energy & Climate Action",
  },
  {
    slug: "transportation",
    name: "EV & Transportation",
    descriptor: "Future Mobility & Global Logistics",
    overview: "Electric vehicle fleets, autonomous transit, freight supply chain optimization, and aerospace innovation.",
    marketSignal: "+19% Market Growth",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
    imageAlt: "EV & Transportation",
  },
  {
    slug: "manufacturing",
    name: "Smart Manufacturing",
    descriptor: "Industrial IoT & Robotics",
    overview: "Automated assembly, predictive machine maintenance, supply chain resilience, and additive manufacturing.",
    marketSignal: "+16% Market Growth",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
    imageAlt: "Smart Manufacturing",
  },
  {
    slug: "education",
    name: "Education & EdTech",
    descriptor: "Learning Innovation & Corporate Training",
    overview: "AI personalized learning, executive skill building, global university networks, and digital classrooms.",
    marketSignal: "+12% Market Growth",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80",
    imageAlt: "Education & EdTech",
  },
  {
    slug: "retail",
    name: "Retail & E-Commerce",
    descriptor: "Consumer Insights & Brand Automation",
    overview: "Omnichannel commerce, predictive inventory intelligence, direct-to-consumer strategy, and retail AI.",
    marketSignal: "+15% Market Growth",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
    imageAlt: "Retail & E-Commerce",
  },
  {
    slug: "media",
    name: "Digital Media & Content",
    descriptor: "Broadcasting & Entertainment Tech",
    overview: "Streaming infrastructure, generative media platforms, digital journalism, and IP monetization.",
    marketSignal: "+17% Market Growth",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80",
    imageAlt: "Digital Media & Content",
  },
  {
    slug: "legal",
    name: "LegalTech & Compliance",
    descriptor: "Privacy Law & Regulatory Tech",
    overview: "Automated contract intelligence, international trade compliance, cross-border privacy, and legal AI.",
    marketSignal: "+13% Market Growth",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
    imageAlt: "LegalTech & Compliance",
  },
  {
    slug: "others",
    name: "Emerging Sectors & Global Markets",
    descriptor: "Specialized Industries",
    overview: "Cross-sector innovation, sovereign wealth trends, frontier ventures, and global enterprise strategy.",
    marketSignal: "+20% Market Growth",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    imageAlt: "Emerging Sectors",
  },
];

export const industryService = {
  all: (): Industry[] => defaultIndustries,

  bySlug: (slug: string): Industry => {
    if (!slug) return defaultIndustries[0];
    const s = slug.toLowerCase().trim();

    // 1. Direct match
    const found = defaultIndustries.find((item) => item.slug.toLowerCase() === s);
    if (found) return found;

    // 2. Alias mapping
    if (s.includes("tech") || s.includes("ai") || s.includes("software")) {
      return defaultIndustries.find((i) => i.slug === "tech-ai") || defaultIndustries[0];
    }
    if (s.includes("health") || s.includes("bio") || s.includes("pharma") || s.includes("med")) {
      return defaultIndustries.find((i) => i.slug === "healthcare") || defaultIndustries[1];
    }
    if (s.includes("fin") || s.includes("bank") || s.includes("market") || s.includes("crypto")) {
      return defaultIndustries.find((i) => i.slug === "finance") || defaultIndustries[2];
    }
    if (s.includes("real") || s.includes("estate") || s.includes("prop") || s.includes("property")) {
      return defaultIndustries.find((i) => i.slug === "real-estate") || defaultIndustries[3];
    }
    if (s.includes("energy") || s.includes("solar") || s.includes("climate") || s.includes("power")) {
      return defaultIndustries.find((i) => i.slug === "energy") || defaultIndustries[4];
    }
    if (s.includes("trans") || s.includes("ev") || s.includes("auto") || s.includes("logistics") || s.includes("mobility")) {
      return defaultIndustries.find((i) => i.slug === "transportation") || defaultIndustries[5];
    }
    if (s.includes("manufactur") || s.includes("factory") || s.includes("industrial")) {
      return defaultIndustries.find((i) => i.slug === "manufacturing") || defaultIndustries[6];
    }
    if (s.includes("edu") || s.includes("learn")) {
      return defaultIndustries.find((i) => i.slug === "education") || defaultIndustries[7];
    }
    if (s.includes("retail") || s.includes("shop") || s.includes("commerce")) {
      return defaultIndustries.find((i) => i.slug === "retail") || defaultIndustries[8];
    }
    if (s.includes("media") || s.includes("content") || s.includes("film")) {
      return defaultIndustries.find((i) => i.slug === "media") || defaultIndustries[9];
    }
    if (s.includes("law") || s.includes("legal")) {
      return defaultIndustries.find((i) => i.slug === "legal") || defaultIndustries[10];
    }

    // 3. Dynamic Fallback
    const formattedTitle = s
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

    return {
      slug: s,
      name: formattedTitle || "Industry Sector",
      descriptor: "Executive Intelligence",
      overview: `Sector analysis, market shifts, and executive perspectives defining the future of ${formattedTitle}.`,
      marketSignal: "+15% Market Growth",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
      imageAlt: formattedTitle,
    };
  },

  fetchSanityIndustries: async (): Promise<Industry[]> => {
    try {
      const query = `*[_type in ["industryCategory", "category"]] | order(title asc){
        _id,
        _type,
        title,
        "slug": slug.current,
        description,
        altText,
        "imageUrl": coalesce(image.asset->url, category_image.asset->url)
      }`;
      const data = await fetchSanityQuery(query);
      if (data && data.length > 0) {
        const fetched: Industry[] = data.map((item: any, idx: number) => ({
          slug: item.slug || `industry-${idx + 1}`,
          name: item.title || "Industry Sector",
          descriptor: "Market Sector",
          overview: item.description || "Sector intelligence and strategic analysis.",
          marketSignal: "+14% Market Activity",
          image: item.imageUrl || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
          imageAlt: item.altText || item.title || "Industry Image",
        }));

        // Merge fetched items with defaultIndustries ensuring no duplicate slugs
        const mergedMap = new Map<string, Industry>();
        defaultIndustries.forEach((ind) => mergedMap.set(ind.slug, ind));
        fetched.forEach((ind) => mergedMap.set(ind.slug, ind));
        return Array.from(mergedMap.values());
      }
    } catch (e) {
      console.warn("Sanity industry fetch warning:", e);
    }
    return defaultIndustries;
  },
};
