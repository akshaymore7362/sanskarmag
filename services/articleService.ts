import { fetchSanityQuery } from "@/lib/sanity.client";
import type { Article } from "@/types";

const mapSanityDocToArticle = (item: any, idx: number): Article => {
  const catName = item.industryCategory?.name || item.industryCategory?.title || item.primaryIndustry?.name || item.primaryIndustry?.title || item.industryName || item.categoryRef?.title || item.category || (item.categories && item.categories[0]?.title) || "Editorial";
  const catSlug = item.industryCategory?.slug || item.primaryIndustry?.slug || (item.industryName ? item.industryName.toLowerCase().replace(/\s+/g, '-') : null) || item.categoryRef?.slug || (item.categories && item.categories[0]?.slug) || (item.category ? item.category.toLowerCase().replace(/\s+/g, '-') : "technology");
  const authorName = item.authorRef?.name || item.author?.name || item.author || "Editorial Board";

  let formattedDate = "May 2026";
  if (item.publishedAt) {
    try {
      const d = new Date(item.publishedAt);
      formattedDate = d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    } catch {
      formattedDate = item.publishedAt;
    }
  }

  return {
    id: item._id || String(idx + 1),
    slug: item.slug || `story-${idx + 1}`,
    title: item.title || "Sanity Document",
    subtitle: item.subtitle || item.description || "",
    category: catName,
    author: authorName,
    authorId: "1",
    date: formattedDate,
    readTime: item.readTime || "5 min read",
    image: item.imageUrl || "",
    imageAlt: item.altText || item.imageAlt || item.title || "Sanity Story Image",
    description: item.description || item.subtitle || "",
    pullQuote: item.pullQuote || "",
    industrySlug: catSlug,
    tags: Array.isArray(item.topics) ? item.topics : Array.isArray(item.categories) ? item.categories.map((c: any) => c.title) : [catName],
    body: [],
    stats: [],
    contentType: item.storyType || item.contentType || (item.featured ? "insight" : "story"),
    homePlacement: item.homePlacement || {},
  };
};

const dedupeArticles = (list: Article[]): Article[] => {
  const seenSlugs = new Set<string>();
  const seenIds = new Set<string>();
  return list.filter((item, idx) => {
    const slugKey = item.slug ? item.slug.toLowerCase().trim() : `idx-${idx}`;
    const idKey = item.id || `id-${idx}`;
    if (seenSlugs.has(slugKey) || seenIds.has(idKey)) {
      return false;
    }
    seenSlugs.add(slugKey);
    seenIds.add(idKey);
    return true;
  });
};

const defaultArticles: Article[] = [
  {
    id: "art-1",
    slug: "global-ai-infrastructure-boom-2026",
    title: "Global Enterprise AI Infrastructure Surge Shapes 2026 Capital Allocations",
    subtitle: "Enterprise leaders re-evaluate data center architecture and GPU investments.",
    category: "Technology",
    author: "Elena Rostova",
    authorId: "1",
    date: "May 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "AI Infrastructure",
    description: "Corporate IT departments increase infrastructure allocations for generative AI deployment across global operations.",
    industrySlug: "technology",
    tags: ["Technology", "AI", "Enterprise"],
    contentType: "insight",
  },
  {
    id: "art-2",
    slug: "sustainable-capital-markets-transformation",
    title: "Green Bond Issuance Hits Record Milestones Amid Global Grid Transition",
    subtitle: "Institutional investors double down on renewable infrastructure funds.",
    category: "Business",
    author: "Marcus Vance",
    authorId: "2",
    date: "Apr 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Capital Markets",
    description: "Private equity funds accelerate investments in next-generation clean grid networks and energy storage.",
    industrySlug: "business",
    tags: ["Business", "Markets", "Capital"],
    contentType: "story",
  },
  {
    id: "art-3",
    slug: "future-of-csuite-leadership-frameworks",
    title: "The Next Era of Executive Leadership: Navigating Geopolitical Ambiguity",
    subtitle: "How modern CEOs balance supply chain resilience and digital transformation.",
    category: "Leadership",
    author: "Dr. Annalisa Perego",
    authorId: "3",
    date: "Apr 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Leadership",
    description: "Discover strategic decision-making paradigms adopted by Fortune 500 boardrooms in 2026.",
    industrySlug: "leadership",
    tags: ["Leadership", "Strategy"],
    contentType: "insight",
  },
  {
    id: "art-4",
    slug: "cross-border-fintech-regulatory-shift",
    title: "Digital Currencies & Cross-Border Payments: Regulatory Horizons 2026",
    subtitle: "Central banks and commercial institutions align on global settlement protocols.",
    category: "Economy",
    author: "Jonathan Sterling",
    authorId: "4",
    date: "Mar 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Fintech",
    description: "Global financial networks adopt unified instant clearing protocols to streamline international commerce.",
    industrySlug: "economy",
    tags: ["Economy", "Fintech"],
    contentType: "story",
  },
  {
    id: "art-5",
    slug: "quantum-computing-commercialization-milestones",
    title: "Quantum Encryption Standards Mandatory for Financial Systems by 2027",
    subtitle: "Cybersecurity leaders prepare enterprise networks for post-quantum algorithms.",
    category: "Innovation",
    author: "Sarah Jenkins",
    authorId: "5",
    date: "Mar 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Quantum Tech",
    description: "Banking and government systems begin migrating core data infrastructure to post-quantum cryptography.",
    industrySlug: "innovation",
    tags: ["Innovation", "Quantum"],
    contentType: "insight",
  },
  {
    id: "art-6",
    slug: "healthcare-ai-diagnostics-revolution",
    title: "Precision Medicine & AI Diagnostics Scale Across Global Healthcare Hubs",
    subtitle: "Clinical algorithms reduce patient diagnosis timelines while improving outcomes.",
    category: "Healthcare",
    author: "Dr. Michael Chen",
    authorId: "6",
    date: "Feb 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Healthcare AI",
    description: "Hospitals and research institutions integrate predictive machine learning into emergency room triage.",
    industrySlug: "healthcare",
    tags: ["Healthcare", "AI"],
    contentType: "story",
  },
];

export const articleService = {
  all: (): Article[] => defaultArticles,
  hero: (): Article | undefined => defaultArticles[0],
  featured: (): Article | undefined => defaultArticles[1],
  secondary: (): Article[] => defaultArticles.slice(1, 4),
  latest: (): Article[] => defaultArticles,
  bySlug: (slug: string): Article | undefined => defaultArticles.find((a) => a.slug === slug) || defaultArticles[0],
  byIndustry: (industrySlug: string): Article[] => defaultArticles,
  related: (slug: string): Article[] => defaultArticles.slice(1, 4),
  trending: (): Article[] => defaultArticles.slice(0, 4),

  // Fetch a single article by slug from Sanity
  fetchSanityArticleBySlug: async (slug: string): Promise<Article | undefined> => {
    try {
      const query = `*[_type in ["post", "industryPost"] && slug.current == "${slug}"][0]{
        _id,
        _type,
        title,
        "slug": slug.current,
        subtitle,
        storyType,
        contentType,
        publishedAt,
        readTime,
        description,
        pullQuote,
        topics,
        featured,
        altText,
        "imageUrl": coalesce(mainImage.asset->url, image.asset->url, coverImage.asset->url, featuredImage.asset->url, thumbnail.asset->url),
        imageAlt,
        author,
        authorRef->{ name, slug },
        industryCategory->{ "name": coalesce(name, title), "slug": slug.current },
        primaryIndustry->{ "name": coalesce(name, title), "slug": slug.current },
        industryName,
        categoryRef->{ title, "slug": slug.current },
        category,
        categories[]->{ title, "slug": slug.current }
      }`;
      const data = await fetchSanityQuery(query);
      if (data) {
        const item = Array.isArray(data) ? data[0] : data;
        if (item && (item._id || item.title)) {
          return mapSanityDocToArticle(item, 0);
        }
      }
    } catch (e) {
      console.warn(`Sanity article fetch warning for slug ${slug}:`, e);
    }
    return defaultArticles.find((a) => a.slug === slug) || defaultArticles[0];
  },

  // Fetch 100% pure live published post & industryPost documents from Sanity
  fetchSanityArticles: async (): Promise<Article[]> => {
    try {
      const query = `*[_type in ["post", "industryPost"] && (status == "published" || !defined(status))] | order(publishedAt desc){
        _id,
        _type,
        title,
        "slug": slug.current,
        subtitle,
        storyType,
        contentType,
        publishedAt,
        readTime,
        description,
        pullQuote,
        topics,
        featured,
        altText,
        "imageUrl": coalesce(mainImage.asset->url, image.asset->url, coverImage.asset->url, featuredImage.asset->url, thumbnail.asset->url),
        imageAlt,
        author,
        authorRef->{ name, slug },
        industryCategory->{ "name": coalesce(name, title), "slug": slug.current },
        primaryIndustry->{ "name": coalesce(name, title), "slug": slug.current },
        industryName,
        categoryRef->{ title, "slug": slug.current },
        category,
        categories[]->{ title, "slug": slug.current }
      }`;
      const data = await fetchSanityQuery(query);
      if (data && data.length > 0) {
        return dedupeArticles(data.map(mapSanityDocToArticle));
      }
    } catch (e) {
      console.warn("Sanity article fetch warning:", e);
    }
    return defaultArticles;
  },

  // Fetch posts strictly belonging to a specific Industry
  fetchSanityArticlesByIndustry: async (industrySlug: string): Promise<Article[]> => {
    try {
      const slugLower = industrySlug.toLowerCase();
      const query = `*[_type in ["post", "industryPost"] && (status == "published" || !defined(status)) && (
        lower(industryCategory->slug.current) == "${slugLower}" ||
        lower(industryCategory->name) == "${slugLower}" ||
        lower(industryCategory->title) == "${slugLower}" ||
        lower(primaryIndustry->slug.current) == "${slugLower}" ||
        lower(industryName) == "${slugLower}" ||
        lower(categoryRef->slug.current) == "${slugLower}" ||
        lower(category) == "${slugLower}" ||
        count(categories[lower(slug.current) == "${slugLower}" || lower(title) == "${slugLower}"]) > 0
      )] | order(publishedAt desc){
        _id,
        _type,
        title,
        "slug": slug.current,
        subtitle,
        storyType,
        contentType,
        publishedAt,
        readTime,
        description,
        pullQuote,
        topics,
        featured,
        altText,
        "imageUrl": coalesce(mainImage.asset->url, image.asset->url, coverImage.asset->url, featuredImage.asset->url, thumbnail.asset->url),
        imageAlt,
        author,
        authorRef->{ name, slug },
        industryCategory->{ "name": coalesce(name, title), "slug": slug.current },
        primaryIndustry->{ "name": coalesce(name, title), "slug": slug.current },
        industryName,
        categoryRef->{ title, "slug": slug.current },
        category,
        categories[]->{ title, "slug": slug.current }
      }`;
      const data = await fetchSanityQuery(query);
      if (data && data.length > 0) {
        return dedupeArticles(data.map(mapSanityDocToArticle));
      }
    } catch (e) {
      console.warn(`Sanity fetch warning for industry ${industrySlug}:`, e);
    }
    return defaultArticles;
  },

  // Fetch posts for Insights view
  fetchSanityInsights: async (): Promise<Article[]> => {
    try {
      const query = `*[_type in ["post", "industryPost"] && (status == "published" || !defined(status)) && (storyType == "insight" || contentType == "insight" || featured == true)] | order(publishedAt desc){
        _id,
        _type,
        title,
        "slug": slug.current,
        subtitle,
        storyType,
        contentType,
        publishedAt,
        readTime,
        description,
        pullQuote,
        topics,
        featured,
        altText,
        "imageUrl": coalesce(mainImage.asset->url, image.asset->url, coverImage.asset->url, featuredImage.asset->url, thumbnail.asset->url),
        imageAlt,
        author,
        authorRef->{ name, slug },
        industryCategory->{ "name": coalesce(name, title), "slug": slug.current },
        primaryIndustry->{ "name": coalesce(name, title), "slug": slug.current },
        industryName,
        categoryRef->{ title, "slug": slug.current },
        category,
        categories[]->{ title, "slug": slug.current }
      }`;
      const data = await fetchSanityQuery(query);
      if (data && data.length > 0) {
        return dedupeArticles(data.map(mapSanityDocToArticle));
      }
    } catch (e) {
      console.warn("Sanity insights fetch warning:", e);
    }
    return defaultArticles;
  },

  // Fetch articles for "The Intelligence Brief" section
  fetchIntelligenceBriefArticles: async (): Promise<Article[]> => {
    try {
      const query = `*[_type in ["post", "industryPost"] && (status == "published" || !defined(status)) && (
        editorialSection == "intelligenceBrief" ||
        editorialSection == "the-briefing" ||
        editorialSection == "briefing" ||
        !defined(editorialSection)
      )] | order(publishedAt desc, _createdAt desc){
        _id,
        _type,
        title,
        "slug": slug.current,
        subtitle,
        storyType,
        contentType,
        publishedAt,
        readTime,
        description,
        pullQuote,
        topics,
        featured,
        editorialSection,
        altText,
        "imageUrl": coalesce(mainImage.asset->url, image.asset->url, coverImage.asset->url, featuredImage.asset->url, thumbnail.asset->url),
        imageAlt,
        author,
        authorRef->{ name, slug },
        industryCategory->{ "name": coalesce(name, title), "slug": slug.current },
        primaryIndustry->{ "name": coalesce(name, title), "slug": slug.current },
        industryName,
        categoryRef->{ title, "slug": slug.current },
        category,
        categories[]->{ title, "slug": slug.current }
      }`;
      const data = await fetchSanityQuery(query);
      if (data && data.length > 0) {
        return dedupeArticles(data.map(mapSanityDocToArticle));
      }
    } catch (e) {
      console.warn("Sanity intelligence brief fetch warning:", e);
    }
    return defaultArticles;
  },

  // Fetch articles for "Leadership Lens" section
  fetchLeadershipLensArticles: async (): Promise<Article[]> => {
    try {
      const query = `*[_type in ["post", "industryPost"] && (status == "published" || !defined(status)) && (
        editorialSection == "leadershipLens" ||
        editorialSection == "executive-perspectives" ||
        editorialSection == "perspectives" ||
        !defined(editorialSection)
      )] | order(publishedAt desc, _createdAt desc){
        _id,
        _type,
        title,
        "slug": slug.current,
        subtitle,
        storyType,
        contentType,
        publishedAt,
        readTime,
        description,
        pullQuote,
        topics,
        featured,
        editorialSection,
        altText,
        "imageUrl": coalesce(mainImage.asset->url, image.asset->url, coverImage.asset->url, featuredImage.asset->url, thumbnail.asset->url),
        imageAlt,
        author,
        authorRef->{ name, slug },
        industryCategory->{ "name": coalesce(name, title), "slug": slug.current },
        primaryIndustry->{ "name": coalesce(name, title), "slug": slug.current },
        industryName,
        categoryRef->{ title, "slug": slug.current },
        category,
        categories[]->{ title, "slug": slug.current }
      }`;
      const data = await fetchSanityQuery(query);
      if (data && data.length > 0) {
        return dedupeArticles(data.map(mapSanityDocToArticle));
      }
    } catch (e) {
      console.warn("Sanity leadership lens fetch warning:", e);
    }
    return defaultArticles;
  },
};
