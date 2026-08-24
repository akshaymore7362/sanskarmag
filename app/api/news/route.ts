import { NextResponse } from "next/server";

export const revalidate = 60; // Cache live news for 1 minute

const categoryImages: Record<string, string[]> = {
  "MARKETS": [
    "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1535320903710-d993d3d77d29?auto=format&fit=crop&w=800&q=80",
  ],
  "ENTERPRISE TECH": [
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
  ],
  "AI & INNOVATION": [
    "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
  ],
  "GLOBAL TRADE": [
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80",
  ],
  "CAPITAL MARKETS": [
    "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
  ],
};

function getCategoryPhoto(cat: string, index: number): string {
  const photos = categoryImages[cat] || categoryImages["MARKETS"];
  return photos[index % photos.length];
}

export async function GET() {
  const newsItems: Array<{
    id: string;
    title: string;
    source: string;
    link: string;
    time: string;
    date: string;
    category: string;
    snippet: string;
    image: string;
  }> = [];

  try {
    const res = await fetch(
      "https://news.google.com/rss/search?q=business+technology+markets+executive&hl=en-US&gl=US&ceid=US:en",
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
        next: { revalidate: 60 },
      }
    );

    if (res.ok) {
      const xml = await res.text();
      const itemRegex = /<item>([\s\S]*?)<\/item>/g;
      let match;

      const categories = ["MARKETS", "ENTERPRISE TECH", "AI & INNOVATION", "GLOBAL TRADE", "CAPITAL MARKETS"];

      while ((match = itemRegex.exec(xml)) !== null && newsItems.length < 7) {
        const itemContent = match[1];
        const titleMatch = itemContent.match(/<title>([\s\S]*?)<\/title>/);
        const linkMatch = itemContent.match(/<link>([\s\S]*?)<\/link>/);
        const pubDateMatch = itemContent.match(/<pubDate>([\s\S]*?)<\/pubDate>/);
        const sourceMatch = itemContent.match(/<source[^>]*>([\s\S]*?)<\/source>/);
        const mediaMatch = itemContent.match(/url="(https:\/\/[^"]+\.(?:jpg|png|jpeg|webp))"/i) || itemContent.match(/src="(https:\/\/[^"]+)"/i);

        if (titleMatch) {
          let rawTitle = titleMatch[1].replace(/<!\[CDATA\[(.*?)\]\]>/g, "$1").trim();
          rawTitle = rawTitle
            .replace(/&amp;/g, "&")
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">")
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'");

          const cleanSource = sourceMatch ? sourceMatch[1].trim() : "Global Market Wire";
          const cleanLink = linkMatch ? linkMatch[1].trim() : "#";
          const cat = categories[newsItems.length % categories.length];

          let timeAgo = "Live Today";
          let formattedDate = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

          if (pubDateMatch) {
            const dateObj = new Date(pubDateMatch[1]);
            const diffMs = Date.now() - dateObj.getTime();
            const diffMins = Math.floor(diffMs / 60000);

            if (diffMins < 60) {
              timeAgo = `${Math.max(1, diffMins)}m ago`;
            } else {
              const diffHours = Math.floor(diffMins / 60);
              timeAgo = `${diffHours}h ago`;
            }
            formattedDate = dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric" });
          }

          const extractedImage = mediaMatch ? mediaMatch[1] : getCategoryPhoto(cat, newsItems.length);

          newsItems.push({
            id: `live-news-${newsItems.length + 1}`,
            title: rawTitle,
            source: cleanSource,
            link: cleanLink,
            time: timeAgo,
            date: formattedDate,
            category: cat,
            snippet: "Real-time daily editorial intelligence covering corporate shifts, technological breakthroughs, and financial markets.",
            image: extractedImage,
          });
        }
      }
    }
  } catch (error) {
    console.error("Error fetching live news API:", error);
  }

  // Fallback fresh headlines if RSS is offline
  if (newsItems.length === 0) {
    newsItems.push(
      {
        id: "fb-1",
        title: "Global Enterprise Tech Spending Surges 14% as Enterprise AI Adoption Scales",
        source: "Wall Street Journal",
        link: "#",
        time: "15m ago",
        date: "Today",
        category: "ENTERPRISE TECH",
        snippet: "Corporate IT departments increase infrastructure allocations for generative AI deployment across global operations.",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "fb-2",
        title: "Central Banks Signal Stable Interest Rates Amid Balanced Inflation Reports",
        source: "Financial Times",
        link: "#",
        time: "32m ago",
        date: "Today",
        category: "MARKETS",
        snippet: "Global monetary authorities maintain steady policy stances as macroeconomic benchmarks stabilize.",
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "fb-3",
        title: "Venture Capital Inflows Hit New Quarterly Highs in Renewable Energy Infrastructure",
        source: "Reuters",
        link: "#",
        time: "1h ago",
        date: "Today",
        category: "CAPITAL MARKETS",
        snippet: "Private equity funds accelerate investments in next-generation clean grid networks and battery storage systems.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "fb-4",
        title: "Semiconductor Manufacturers Expand Fab Capabilities to Meet AI Hardware Demand",
        source: "Bloomberg",
        link: "#",
        time: "2h ago",
        date: "Today",
        category: "AI & INNOVATION",
        snippet: "Chip fabricators announce multi-billion dollar capital expansions across North American and Asian hubs.",
        image: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "fb-5",
        title: "Cross-Border Trade Volume Increases as Supply Chains Re-orient for 2026",
        source: "MarketWatch",
        link: "#",
        time: "3h ago",
        date: "Today",
        category: "GLOBAL TRADE",
        snippet: "Logistics and shipping networks report rising throughput across major international trade corridors.",
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
      }
    );
  }

  return NextResponse.json({ news: newsItems });
}
