import { NextResponse } from 'next/server';
import { sanityClient } from '@/lib/sanity.client';

// Simple in-memory cache to deduplicate identical Sanity GROQ queries during page renders
const queryCache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL_MS = 15000; // 15 seconds cache TTL

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter required' }, { status: 400 });
  }

  const now = Date.now();
  const cached = queryCache.get(query);
  if (cached && now - cached.timestamp < CACHE_TTL_MS) {
    return NextResponse.json(cached.data);
  }

  try {
    const data = await sanityClient.fetch(query);
    queryCache.set(query, { data, timestamp: now });
    return NextResponse.json(data);
  } catch (err: any) {
    console.error('Sanity server API error:', err);
    return NextResponse.json({ error: err?.message || 'Sanity query failed' }, { status: 500 });
  }
}
