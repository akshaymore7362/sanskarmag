"use client";

import { useEffect, useState } from "react";
import { Activity, TrendingUp, TrendingDown } from "lucide-react";

interface TickerItem {
  symbol: string;
  price: string;
  change: string;
  isPositive: boolean;
}

const initialMarketData: TickerItem[] = [
  { symbol: "INDEX", price: "3,421.06", change: "-0.03%", isPositive: false },
  { symbol: "BTC/USD", price: "$68,340.12", change: "+0.00%", isPositive: true },
  { symbol: "S&P 500", price: "5,283.40", change: "+0.74%", isPositive: true },
  { symbol: "NASDAQ", price: "16,898.05", change: "+0.67%", isPositive: true },
  { symbol: "DOW JONES", price: "39,027.12", change: "-0.38%", isPositive: false },
  { symbol: "GOLD", price: "$2,352.45", change: "+1.08%", isPositive: true },
  { symbol: "USD/INR", price: "83.15", change: "-0.08%", isPositive: false },
];

const signalItems = [
  "SIGNAL BLOGS AND ARTICLES: +14% Market Activity",
  "SIGNAL EXECUTIVE PERSPECTIVES: +14% Market Activity",
  "SIGNAL TECH & AI INNOVATIONS: +22% Enterprise Adoption",
  "SIGNAL HEALTHCARE BIOTECH: +18% Capital Outflow",
];

export function MarketTicker() {
  const [items, setItems] = useState<TickerItem[]>(initialMarketData);

  useEffect(() => {
    const interval = setInterval(() => {
      setItems((prevItems) =>
        prevItems.map((item) => {
          if (Math.random() > 0.6) {
            const rawVal = parseFloat(item.price.replace(/[^0-9.]/g, ""));
            const delta = (Math.random() - 0.48) * (rawVal * 0.001);
            const newVal = Math.max(1, rawVal + delta);
            const isPos = delta >= 0;
            const pct = (delta / rawVal) * 100;
            const changeStr = `${isPos ? "+" : ""}${pct.toFixed(2)}%`;
            const formattedPrice = item.price.startsWith("$")
              ? `$${newVal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
              : newVal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

            return {
              ...item,
              price: formattedPrice,
              change: changeStr,
              isPositive: isPos,
            };
          }
          return item;
        })
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const displayItems = [...items, ...items];

  return (
    <div className="market-ticker-bar" aria-label="Live Market Ticker">
      {/* Far Left Badge */}
      <div className="market-ticker-badge">
        <span className="live-dot" />
        <Activity size={13} style={{ color: "#D49A24" }} />
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
