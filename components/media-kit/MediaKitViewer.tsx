"use client";

import { useEffect, useRef, useState } from "react";
import { AlertCircle, Download, Loader2 } from "lucide-react";

type Props = {
  pdfUrl: string;
  downloadHref: string;
};

type Status = "loading" | "ready" | "error";

export function MediaKitViewer({ pdfUrl, downloadHref }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    let cancelled = false;
    let observer: IntersectionObserver | null = null;

    async function setup() {
      try {
        const pdfjsLib = await import("pdfjs-dist");
        pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

        // Lower CMap/streaming overhead, and let the browser start painting
        // placeholders as soon as page count/dimensions are known instead of
        // waiting for every page to be fully rasterized first.
        const pdf = await pdfjsLib.getDocument({ url: pdfUrl, disableAutoFetch: false }).promise;
        if (cancelled) return;

        const container = containerRef.current;
        if (!container) return;
        container.innerHTML = "";

        const renderedPages = new Set<number>();

        async function renderPage(pageNum: number, canvas: HTMLCanvasElement) {
          if (cancelled || renderedPages.has(pageNum) || !canvas.isConnected) return;
          renderedPages.add(pageNum);
          const page = await pdf.getPage(pageNum);
          const baseViewport = page.getViewport({ scale: 1 });
          // Cap resolution so first paint is fast — still sharp on-screen since
          // pages are displayed at CSS width, not native pixel width.
          const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;
          const renderScale = Math.min(1.8 * dpr, 1400 / baseViewport.width);
          const viewport = page.getViewport({ scale: renderScale });

          canvas.width = viewport.width;
          canvas.height = viewport.height;
          const ctx = canvas.getContext("2d");
          if (!ctx || cancelled) return;
          await page.render({ canvasContext: ctx, viewport }).promise;
          canvas.style.background = "transparent";
        }

        // Build lightweight placeholders for every page immediately (cheap —
        // only reads page geometry, doesn't rasterize), so layout & scroll
        // height are correct right away instead of jumping as pages load.
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const canvas = entry.target as HTMLCanvasElement;
                const pageNum = Number(canvas.dataset.page);
                renderPage(pageNum, canvas);
              }
            });
          },
          { rootMargin: "800px 0px" } // start rendering well before the page scrolls into view
        );

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          if (cancelled) return;
          const page = await pdf.getPage(pageNum);
          const baseViewport = page.getViewport({ scale: 1 });
          const aspectRatio = baseViewport.width / baseViewport.height;

          const canvas = document.createElement("canvas");
          canvas.dataset.page = String(pageNum);
          canvas.style.width = "100%";
          canvas.style.height = "auto";
          canvas.style.aspectRatio = String(aspectRatio);
          canvas.style.display = "block";
          canvas.style.background = "#F1F1EE";
          canvas.setAttribute("aria-label", `Media Kit page ${pageNum} of ${pdf.numPages}`);

          const wrapper = document.createElement("div");
          wrapper.style.width = "100%";
          wrapper.appendChild(canvas);
          container.appendChild(wrapper);

          if (pageNum === 1) {
            // Render the first page immediately so something real is visible right away.
            renderPage(1, canvas);
          } else {
            observer.observe(canvas);
          }
        }

        if (!cancelled) setStatus("ready");
      } catch (e) {
        console.warn("Media Kit PDF render warning:", e);
        if (!cancelled) setStatus("error");
      }
    }

    setup();
    return () => {
      cancelled = true;
      observer?.disconnect();
    };
  }, [pdfUrl]);

  if (status === "error") {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
          padding: "80px 24px",
          textAlign: "center",
        }}
      >
        <AlertCircle size={36} style={{ color: "#6F8498" }} />
        <p style={{ fontSize: "15px", color: "#4B5563", margin: 0, maxWidth: "440px" }}>
          We couldn&apos;t display the Media Kit pages here. You can still download the full document below.
        </p>
        <a href={downloadHref} download className="btn btn-primary">
          <Download size={15} />
          <span>Download Media Kit PDF</span>
        </a>
      </div>
    );
  }

  return (
    <div style={{ width: "100%" }}>
      {status === "loading" && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            padding: "100px 24px",
          }}
        >
          <Loader2 size={28} className="tsw-spin" style={{ color: "#4472C4" }} />
          <p style={{ fontSize: "14px", color: "#6F8498", margin: 0 }}>Loading Media Kit…</p>
        </div>
      )}
      <div ref={containerRef} style={{ width: "100%" }} />
    </div>
  );
}
