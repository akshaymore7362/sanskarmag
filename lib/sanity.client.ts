import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'i7vt4u64';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  if (!source) return { url: () => '' };
  return builder.image(source);
}

export async function fetchSanityQuery<T = any>(query: string): Promise<T> {
  // If running on server side (Node environment), query directly with sanityClient
  if (typeof window === 'undefined') {
    try {
      const data = await sanityClient.fetch(query);
      return data;
    } catch (e) {
      console.warn('Server Sanity query warning:', e);
    }
    return [] as any;
  }

  // If running in browser, proxy through local server API endpoint to prevent CORS blocks
  try {
    const res = await fetch(`/api/sanity?query=${encodeURIComponent(query)}`);
    if (res.ok) {
      const json = await res.json();
      return json;
    }
  } catch (err) {
    console.warn('Client API Sanity proxy warning:', err);
  }
  return [] as any;
}
