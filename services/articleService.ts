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

export const articleService = {
  all: (): Article[] => [],
  hero: (): Article | undefined => undefined,
  featured: (): Article | undefined => undefined,
  secondary: (): Article[] => [],
  latest: (): Article[] => [],
  bySlug: (slug: string): Article | undefined => undefined,
  byIndustry: (industrySlug: string): Article[] => [],
  related: (slug: string): Article[] => [],
  trending: (): Article[] => [],

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
    return undefined;
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
    return [];
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
    return [];
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
    return [];
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
    return [];
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
    return [];
  },
};
