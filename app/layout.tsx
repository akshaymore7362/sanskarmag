import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://momentum.example.com"),
  title: "Momentum Magazine",
  description: "A premium editorial magazine for business, leadership and innovation.",
  openGraph: {
    title: "Momentum Magazine",
    description: "A premium editorial magazine for business, leadership and innovation.",
    url: "https://momentum.example.com",
    siteName: "Momentum Magazine",
    images: ["/images/hero/waterfront.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Momentum Magazine",
    description: "A premium editorial magazine for business, leadership and innovation.",
    images: ["/images/hero/waterfront.svg"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
