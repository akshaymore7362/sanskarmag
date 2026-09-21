import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { mediaKitService } from "@/services/mediaKitService";
import { MediaKitViewer } from "@/components/media-kit/MediaKitViewer";

export async function generateMetadata(): Promise<Metadata> {
  const kit = await mediaKitService.fetchSanityMediaKit();
  return {
    title: kit?.title ? `${kit.title} | The Success World` : "Media Kit 2026 | The Success World",
    description:
      kit?.description ||
      "Exploring the future of creativity, technology and design innovation. Where ambition meets influence — The Success World Media Kit 2026.",
  };
}

type PageManifestEntry = { page: number; file: string; width: number; height: number };

function readPrerenderedManifest(): PageManifestEntry[] | null {
  try {
    const manifestPath = path.join(process.cwd(), "public", "media-kit-pages", "manifest.json");
    const raw = fs.readFileSync(manifestPath, "utf8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export default async function MediaKitPage() {
  const kit = await mediaKitService.fetchSanityMediaKit();

  // If a real PDF has been uploaded in Sanity, render it live (page-by-page,
  // client-side) since we can't pre-render an arbitrary upload ahead of time.
  if (kit?.mediaKitPdfUrl) {
    const downloadHref = `/api/media-kit-download?url=${encodeURIComponent(kit.mediaKitPdfUrl)}`;
    return (
      <main style={{ background: "#FFFFFF", width: "100%" }}>
        <MediaKitViewer pdfUrl={kit.mediaKitPdfUrl} downloadHref={downloadHref} />
      </main>
    );
  }

  // Otherwise, serve the pre-rendered page images (generated once from the
  // local PDF) instead of shipping the full multi-megabyte PDF to the
  // browser and parsing it client-side — this is what actually makes the
  // page fast, since each page is now a normal lazy-loaded compressed image.
  const pages = readPrerenderedManifest();

  if (pages && pages.length > 0) {
    return (
      <main style={{ background: "#FFFFFF", width: "100%" }}>
        {pages.map((p) => (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            key={p.page}
            src={`/media-kit-pages/${p.file}`}
            alt={`Media Kit page ${p.page}`}
            width={p.width}
            height={p.height}
            loading={p.page === 1 ? "eager" : "lazy"}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        ))}
      </main>
    );
  }

  // Last-resort fallback if pre-rendered images are ever missing.
  return (
    <main style={{ background: "#FFFFFF", width: "100%" }}>
      <MediaKitViewer pdfUrl="/media-kit-2026.pdf" downloadHref="/media-kit-2026.pdf" />
    </main>
  );
}
