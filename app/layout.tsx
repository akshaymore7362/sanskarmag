import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://thesuccessworld.com"),
  title: "The Success World | Ideas. Leaders. Markets. Success.",
  description: "Ideas. Leaders. Markets. Success. Premium editorial coverage for founders, executives, operators, and investors.",
  openGraph: {
    title: "The Success World",
    description: "Ideas. Leaders. Markets. Success. Premium editorial coverage for founders, executives, operators, and investors.",
    url: "https://thesuccessworld.com",
    siteName: "The Success World",
    images: ["/images/articles/hero-cover.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Success World",
    description: "Ideas. Leaders. Markets. Success. Premium editorial coverage for founders, executives, operators, and investors.",
    images: ["/images/articles/hero-cover.jpg"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,700&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=DM+Serif+Display:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
