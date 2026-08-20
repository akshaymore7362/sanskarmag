import { fetchSanityQuery } from "@/lib/sanity.client";
import type { Article, Leader, Startup, EventItem, MagazineIssue } from "@/types";

export interface HomePageData {
  heroStory?: Article;
  featuredStories?: Article[];
  trendingStories?: Article[];
  editorPicks?: Article[];
  featuredMagazine?: MagazineIssue;
  featuredStartups?: Startup[];
  featuredLeaders?: Leader[];
  featuredEvents?: EventItem[];
}

export const homeService = {
  fetchHomePageData: async (): Promise<HomePageData | null> => {
    try {
      const query = `*[_type == "homePage"][0]{
        heroStory->{
          _id,
          title,
          "slug": slug.current,
          subtitle,
          readTime,
          description,
          "imageUrl": coalesce(mainImage.asset->url, image.asset->url),
          imageAlt,
          author,
          authorRef->{ name },
          primaryIndustry->{ "name": coalesce(name, title), "slug": slug.current }
        },
        featuredStories[]->{
          _id,
          title,
          "slug": slug.current,
          subtitle,
          readTime,
          description,
          "imageUrl": coalesce(mainImage.asset->url, image.asset->url),
          imageAlt,
          author,
          authorRef->{ name },
          primaryIndustry->{ "name": coalesce(name, title), "slug": slug.current }
        },
        trendingStories[]->{
          _id,
          title,
          "slug": slug.current,
          description
        },
        editorPicks[]->{
          _id,
          title,
          "slug": slug.current,
          description,
          readTime,
          "imageUrl": coalesce(mainImage.asset->url, image.asset->url),
          imageAlt,
          primaryIndustry->{ "name": coalesce(name, title) }
        },
        featuredMagazine->{
          _id,
          title,
          issueNumber,
          "slug": slug.current,
          "cover": coverImage.asset->url,
          pdfUrl
        },
        featuredStartups[]->{
          _id,
          name,
          "slug": slug.current,
          stage,
          founder,
          location,
          "description": coalesce(description, summary),
          "logo": logo.asset->url,
          "coverImage": coalesce(coverImage.asset->url, image.asset->url)
        },
        featuredLeaders[]->{
          _id,
          name,
          "slug": slug.current,
          "role": coalesce(designation, role),
          company,
          "bio": coalesce(biography, bio),
          "image": coalesce(profileImage.asset->url, image.asset->url)
        },
        featuredEvents[]->{
          _id,
          title,
          "slug": slug.current,
          location,
          eventDate,
          registrationUrl,
          "image": coalesce(coverImage.asset->url, image.asset->url)
        }
      }`;

      const data = await fetchSanityQuery(query);
      if (data) {
        return data as HomePageData;
      }
    } catch (e) {
      console.warn("Sanity homePage fetch warning:", e);
    }
    return null;
  },
};
