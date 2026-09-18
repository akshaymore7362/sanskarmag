import { NextRequest, NextResponse } from "next/server";

// Proxies the PDF and forces a real file download (Content-Disposition: attachment),
// since browsers ignore the `download` attribute on cross-origin links (e.g. Sanity's
// CDN) and instead open the file in their native in-browser PDF viewer.
export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  if (!url || !url.startsWith("https://cdn.sanity.io/")) {
    return NextResponse.json({ error: "Invalid file URL" }, { status: 400 });
  }

  try {
    const upstream = await fetch(url);
    if (!upstream.ok || !upstream.body) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }
    const filename = url.split("/").pop() || "media-kit.pdf";
    return new NextResponse(upstream.body, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch {
    return NextResponse.json({ error: "Download failed" }, { status: 500 });
  }
}
