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
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (err: any) {
    console.error('Sanity server API error:', err);
    return NextResponse.json({ error: err?.message || 'Sanity query failed' }, { status: 500 });
  }
}
