import type { Metadata } from "next";
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

export default async function MediaKitPage() {
  const kit = await mediaKitService.fetchSanityMediaKit();
  const sourcePdfUrl = kit?.mediaKitPdfUrl || "/media-kit-2026.pdf";
  const downloadHref = kit?.mediaKitPdfUrl
    ? `/api/media-kit-download?url=${encodeURIComponent(kit.mediaKitPdfUrl)}`
    : "/media-kit-2026.pdf";

  return (
    <main style={{ background: "#FFFFFF", width: "100%" }}>
      {/* The actual published Media Kit (from Sanity), rendered page-by-page */}
      <MediaKitViewer pdfUrl={sourcePdfUrl} downloadHref={downloadHref} />
    </main>
  );
}
