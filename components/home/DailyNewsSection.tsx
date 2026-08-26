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

export function DailyNewsSection() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadLiveNews() {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadLiveNews();
    const interval = setInterval(loadLiveNews, 60000); // Auto-refresh news every minute
    return () => clearInterval(interval);
  }, []);

  if (news.length === 0 && !loading) return null;

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
