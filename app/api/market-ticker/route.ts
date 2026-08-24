import { NextResponse } from "next/server";

export const revalidate = 60; // Cache for 60 seconds

export async function GET() {
  const tickerItems: Array<{ symbol: string; price: string; change: string; isPositive: boolean }> = [];

  // 1. Fetch Live Stock Indices, Commodities, and Forex from Yahoo Chart API
  const symbols = [
    { name: "S&P 500", ticker: "%5EGSPC", prefix: "" },
    { name: "NASDAQ", ticker: "%5EIXIC", prefix: "" },
    { name: "DOW JONES", ticker: "%5EDJI", prefix: "" },
    { name: "GOLD", ticker: "GC%3DF", prefix: "$" },
    { name: "CRUDE OIL", ticker: "CL%3DF", prefix: "$" },
    { name: "USD/INR", ticker: "INR%3DX", prefix: "₹" },
  ];

  for (const s of symbols) {
    try {
      const url = `https://query2.finance.yahoo.com/v8/finance/chart/${s.ticker}?interval=1d&range=2d`;
      const res = await fetch(url, {
        headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" },
        next: { revalidate: 60 },
      });
      if (res.ok) {
        const json = await res.json();
        const meta = json.chart.result[0].meta;
        const price = meta.regularMarketPrice;
        const prevClose = meta.chartPreviousClose || meta.previousClose || price;
        const changePct = ((price - prevClose) / prevClose) * 100;
        const isPos = changePct >= 0;

        const formattedPrice = `${s.prefix}${price.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`;
        const changeStr = `${isPos ? "+" : ""}${changePct.toFixed(2)}%`;

        tickerItems.push({
          symbol: s.name,
          price: formattedPrice,
          change: changeStr,
          isPositive: isPos,
        });
      }
    } catch {
      // Fallback if individual endpoint fails
    }
  }

  // 2. Fetch Live Crypto (Bitcoin & Ethereum) from CoinGecko API
  try {
    const cryptoRes = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true",
      { next: { revalidate: 60 } }
    );
    if (cryptoRes.ok) {
      const cryptoJson = await cryptoRes.json();
      if (cryptoJson.bitcoin) {
        const btcPrice = cryptoJson.bitcoin.usd;
        const btcChange = cryptoJson.bitcoin.usd_24h_change || 0;
        const btcPos = btcChange >= 0;
        tickerItems.push({
          symbol: "BTC/USD",
          price: `$${btcPrice.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
          change: `${btcPos ? "+" : ""}${btcChange.toFixed(2)}%`,
          isPositive: btcPos,
        });
      }

      if (cryptoJson.ethereum) {
        const ethPrice = cryptoJson.ethereum.usd;
        const ethChange = cryptoJson.ethereum.usd_24h_change || 0;
        const ethPos = ethChange >= 0;
        tickerItems.push({
          symbol: "ETH/USD",
          price: `$${ethPrice.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
          change: `${ethPos ? "+" : ""}${ethChange.toFixed(2)}%`,
          isPositive: ethPos,
        });
      }
    }
  } catch {
    // Fallback if CoinGecko is unavailable
  }

  // Fallback defaults if APIs are blocked or offline
  if (tickerItems.length === 0) {
    tickerItems.push(
      { symbol: "S&P 500", price: "5,969.34", change: "-0.44%", isPositive: false },
      { symbol: "NASDAQ", price: "18,972.42", change: "-0.57%", isPositive: false },
      { symbol: "DOW JONES", price: "43,456.78", change: "-0.35%", isPositive: false },
      { symbol: "GOLD", price: "$2,674.50", change: "+0.79%", isPositive: true },
      { symbol: "CRUDE OIL", price: "$69.04", change: "-2.32%", isPositive: false },
      { symbol: "BTC/USD", price: "$98,429.00", change: "+1.53%", isPositive: true },
      { symbol: "ETH/USD", price: "$3,499.84", change: "+2.85%", isPositive: true }
    );
  }

  return NextResponse.json({ tickers: tickerItems });
}
