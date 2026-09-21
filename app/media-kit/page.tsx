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

  // Always prefer the pre-rendered page images (generated once, from
  // whichever PDF — local fallback or the real Sanity upload — was current
  // at the time) over shipping the full multi-megabyte PDF to the browser
  // and parsing it client-side. This is what actually makes the page fast:
  // each page becomes a normal lazy-loaded compressed image instead of a
  // 15-30MB document. If the Media Kit PDF is replaced in Sanity later, the
  // pre-rendered images need regenerating to match (they won't auto-update).
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

  // Last-resort fallback if pre-rendered images are ever missing — render
  // whichever PDF is actually available (real Sanity upload, else local file).
  const fallbackPdfUrl = kit?.mediaKitPdfUrl || "/media-kit-2026.pdf";
  const fallbackDownloadHref = kit?.mediaKitPdfUrl
    ? `/api/media-kit-download?url=${encodeURIComponent(kit.mediaKitPdfUrl)}`
    : "/media-kit-2026.pdf";
  return (
    <main style={{ background: "#FFFFFF", width: "100%" }}>
      <MediaKitViewer pdfUrl={fallbackPdfUrl} downloadHref={fallbackDownloadHref} />
    </main>
  );
}
