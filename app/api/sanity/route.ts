import { NextResponse } from 'next/server';
import { sanityClient } from '@/lib/sanity.client';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter required' }, { status: 400 });
  }

  try {
    const data = await sanityClient.fetch(query);
    return NextResponse.json(data, {
      headers: {
        // Every component that needs the same content (articles, magazines,
        // etc.) issues its own request with an identical query string —
        // caching here lets the browser/CDN serve repeats of the same query
        // instantly instead of re-hitting Sanity 15-20+ times per page load.
        // Short enough that new/edited Sanity content still shows up fast.
        'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=120',
      },
    });
  } catch (err: any) {
    console.error('Sanity server API error:', err);
    return NextResponse.json({ error: err?.message || 'Sanity query failed' }, { status: 500 });
  }
}
