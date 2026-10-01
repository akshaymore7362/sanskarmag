import { NextResponse } from 'next/server';
import { sanityClient } from '@/lib/sanity.client';
import { cleanDeepSanityData } from '@/lib/textUtils';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter required' }, { status: 400 });
  }

  try {
    const rawData = await sanityClient.fetch(query);
    const data = cleanDeepSanityData(rawData);
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=120',
      },
    });
  } catch (err: any) {
    console.error('Sanity server API error:', err);
    return NextResponse.json({ error: err?.message || 'Sanity query failed' }, { status: 500 });
  }
}
