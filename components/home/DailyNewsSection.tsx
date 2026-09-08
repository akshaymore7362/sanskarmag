"use client";

import { useEffect, useState } from "react";
import { ExternalLink, RefreshCw, Flame } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  source: string;
  link: string;
  time: string;
  date: string;
  category: string;
  snippet: string;
  image: string;
}

const fallbackNews: NewsItem[] = [
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
  },
];

export function DailyNewsSection() {
  const [news, setNews] = useState<NewsItem[]>(fallbackNews);
  const [loading, setLoading] = useState(false);

  async function loadLiveNews() {
    try {
      const res = await fetch("/api/news");
      if (res.ok) {
        const data = await res.json();
        if (data.news && data.news.length > 0) {
          setNews(data.news);
        }
      }
    } catch {
      // Retain fallback state
    }
  }

  useEffect(() => {
    loadLiveNews();
    const interval = setInterval(loadLiveNews, 60000); // Auto-refresh news every minute
    return () => clearInterval(interval);
  }, []);

  const leadStory = news[0];
  const secondaryStories = news.slice(1, 3);
  const wireHeadlines = news.slice(3, 7);

  const currentDateStr = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).toUpperCase();

  return (
    <section className="tsw-section">
      {/* Masthead */}
      <div className="tsw-news-masthead">
        <h2 className="tsw-title">Daily Live News &amp; Market Intelligence</h2>
        <span className="tsw-news-live"><span className="live-dot" /> Real-time press wire</span>
      </div>
      <div className="tsw-news-date" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
        <span><b>Daily Edition</b> &nbsp;·&nbsp; {currentDateStr}</span>
        <button type="button" onClick={loadLiveNews} disabled={loading} className="tsw-news-refresh">
          <RefreshCw size={11} className={loading ? "animate-spin" : ""} /> Refresh
        </button>
      </div>

      <div className="tsw-news-grid">
        {/* Lead story */}
        {leadStory && (
          <article className="tsw-news-lead">
            <a href={leadStory.link} target="_blank" rel="noopener noreferrer" className="tsw-news-lead-img">
              {leadStory.image ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={leadStory.image} alt={leadStory.title} />
              ) : null}
              <span className="tsw-tag"><Flame size={11} style={{ verticalAlign: "-1px" }} /> Lead Story</span>
            </a>
            <div className="tsw-news-metaline">
              {leadStory.category} <span>· {leadStory.source} · {leadStory.time}</span>
            </div>
            <h3>{leadStory.title}</h3>
            <p>{leadStory.snippet}</p>
            <a href={leadStory.link} target="_blank" rel="noopener noreferrer" className="tsw-link">
              Read full story <ExternalLink size={13} />
            </a>
          </article>
        )}

        {/* Secondary column */}
        <div className="tsw-news-col">
          {secondaryStories.map((item, idx) => (
            <a key={item.id || String(idx)} href={item.link} target="_blank" rel="noopener noreferrer" className="tsw-news-item">
              <div className="tsw-news-item-thumb">
                {item.image ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={item.image} alt={item.title} />
                ) : null}
              </div>
              <div style={{ minWidth: 0 }}>
                <div className="tsw-news-metaline">{item.category} <span>· {item.time}</span></div>
                <h4>{item.title}</h4>
              </div>
            </a>
          ))}
        </div>

        {/* Wire */}
        <div className="tsw-news-wire">
          <div className="tsw-news-wire-h">Real-time press wire</div>
          {wireHeadlines.map((wire, wIdx) => (
            <a key={wire.id || String(wIdx)} href={wire.link} target="_blank" rel="noopener noreferrer">
              <div className="tsw-news-wire-thumb">
                {wire.image ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={wire.image} alt={wire.title} />
                ) : null}
              </div>
              <div style={{ minWidth: 0 }}>
                <div className="tsw-news-wire-m">{wire.source} · {wire.time}</div>
                <div className="tsw-news-wire-t">{wire.title}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
