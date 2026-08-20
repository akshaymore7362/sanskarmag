import type { MetadataRoute } from "next";
import { articles } from "@/data/articles";
import { events } from "@/data/events";
import { industries } from "@/data/industries";
import { leaders } from "@/data/leaders";
import { magazineIssues } from "@/data/magazines";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://thesuccessworld.com";
  const staticRoutes = [
    "",
    "/articles",
    "/magazine",
    "/industries",
    "/leaders",
    "/startups",
    "/insights",
    "/events",
    "/search",
    "/about",
    "/advertise",
    "/contact",
    "/newsletter",
  ];

  return [
    ...staticRoutes.map((route) => ({ url: `${base}${route}`, lastModified: new Date() })),
    ...articles.map((article) => ({ url: `${base}/articles/${article.slug}`, lastModified: new Date(article.date || Date.now()) })),
    ...magazineIssues.map((issue) => ({ url: `${base}/magazine/${issue.slug}`, lastModified: new Date() })),
    ...industries.map((industry) => ({ url: `${base}/industries/${industry.slug}`, lastModified: new Date() })),
    ...leaders.map((leader) => ({ url: `${base}/leaders/${leader.slug}`, lastModified: new Date() })),
    ...events.map((event) => ({ url: `${base}/events/${event.slug}`, lastModified: new Date(event.date) })),
  ];
}
