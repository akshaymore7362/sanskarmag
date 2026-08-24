"use client";

import { useEffect, useState } from "react";
import { Activity, TrendingUp, TrendingDown } from "lucide-react";

interface TickerItem {
  symbol: string;
  price: string;
  change: string;
  isPositive: boolean;
}

const fallbackMarketData: TickerItem[] = [
  { symbol: "S&P 500", price: "5,969.34", change: "-0.44%", isPositive: false },
  { symbol: "NASDAQ", price: "18,972.42", change: "-0.57%", isPositive: false },
  { symbol: "DOW JONES", price: "43,456.78", change: "-0.35%", isPositive: false },
  { symbol: "GOLD", price: "$2,674.50", change: "+0.79%", isPositive: true },
  { symbol: "CRUDE OIL", price: "$69.04", change: "-2.32%", isPositive: false },
  { symbol: "BTC/USD", price: "$98,429.00", change: "+1.53%", isPositive: true },
  { symbol: "ETH/USD", price: "$3,499.84", change: "+2.85%", isPositive: true },
  { symbol: "USD/INR", price: "₹84.45", change: "-0.04%", isPositive: false },
];

const signalItems = [
  "MARKET ACTIVITY: Enterprise AI & Semiconductor Rally Continues",
  "GLOBAL MARKETS: Central Banks Monitor Interest Rate Policies",
  "SECTOR WATCH: Renewable Energy & Biotech Capital Inflows",
];

export function MarketTicker() {
  const [items, setItems] = useState<TickerItem[]>(fallbackMarketData);

  // Fetch real live market quotes from API route
  useEffect(() => {
    async function loadLiveQuotes() {
      try {
        const res = await fetch("/api/market-ticker");
        if (res.ok) {
          const data = await res.json();
          if (data.tickers && data.tickers.length > 0) {
            setItems(data.tickers);
          }
        }
      } catch {
        // Retain fallback data if fetch fails
      }
    }

    loadLiveQuotes();
    const interval = setInterval(loadLiveQuotes, 30000); // Refresh live quotes every 30s
    return () => clearInterval(interval);
  }, []);

  const displayItems = [...items, ...items];

  return (
    <div className="market-ticker-bar" aria-label="Live Market Ticker">
      {/* Far Left Live Badge */}
      <div className="market-ticker-badge">
        <span className="live-dot" />
        <Activity size={13} style={{ color: "#8B1029" }} />
        <span>LIVE MARKET</span>
      </div>

      <div className="market-ticker-track-wrap">
        <div className="market-ticker-track">
          {displayItems.map((item, idx) => (
            <div className="ticker-item" key={`${item.symbol}-${idx}`}>
              <span className="ticker-symbol">{item.symbol}</span>
              <span className="ticker-price">{item.price}</span>
              <span className={`ticker-change ${item.isPositive ? "positive" : "negative"}`}>
                {item.isPositive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                {item.change}
              </span>
            </div>
          ))}

          {signalItems.map((sig, sIdx) => (
            <div className="ticker-item signal-item" key={`sig-${sIdx}`}>
              <span style={{ fontSize: "11px", fontWeight: 600, color: "rgba(255, 255, 255, 0.85)", letterSpacing: "0.5px" }}>{sig}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
