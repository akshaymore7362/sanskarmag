import { NextResponse } from 'next/server';
import { sanityClient } from '@/lib/sanity.client';

// Local persistent store fallback if Sanity Write Token is not configured
let localSuggestionsStore: Array<{
  id: string;
  name: string;
  email: string;
  topic: string;
  message: string;
  status: string;
  createdAt: string;
}> = [
  {
    id: "sug-demo-1",
    name: "Alexander Wright",
    email: "alexander@wrightcapital.com",
    topic: "Editorial Topic Idea",
    message: "Would love to see an executive breakdown on Quantum Computing commercialization in logistics and supply chain optimization.",
    status: "new",
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: "sug-demo-2",
    name: "Elena Rostova",
    email: "elena@fintechglobal.io",
    topic: "Executive Leader Recommendation",
    message: "Recommending Dr. Marcus Vance, CEO of NeuralGrid AI, for the upcoming Tech Leaders Web Profile feature.",
    status: "reviewed",
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
];

export async function GET() {
  try {
    // Attempt fetching live suggestions from Sanity CMS
    const sanityQuery = `*[_type == "suggestion"] | order(createdAt desc){
      _id,
      name,
      email,
      topic,
      message,
      status,
      createdAt
    }`;
    const sanityData = await sanityClient.fetch(sanityQuery);

    if (Array.isArray(sanityData) && sanityData.length > 0) {
      const formatted = sanityData.map((item: any) => ({
        id: item._id,
        name: item.name || 'Anonymous Reader',
        email: item.email || '',
        topic: item.topic || 'General Feedback',
        message: item.message || '',
        status: item.status || 'new',
        createdAt: item.createdAt || new Date().toISOString(),
      }));
      return NextResponse.json({ suggestions: formatted });
    }
  } catch {
    // Retain fallback local store
  }

  return NextResponse.json({ suggestions: localSuggestionsStore });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, topic, message } = body;

    if (!message) {
      return NextResponse.json({ error: 'Message content is required' }, { status: 400 });
    }

    const newSuggestion = {
      id: `sug-${Date.now()}`,
      name: name || 'Anonymous Reader',
      email: email || 'No email provided',
      topic: topic || 'General Suggestion',
      message,
      status: 'new',
      createdAt: new Date().toISOString(),
    };

    // Save to local persistent store
    localSuggestionsStore.unshift(newSuggestion);

    // If Sanity write token is configured, save to Sanity CMS
    const writeToken = process.env.SANITY_WRITE_TOKEN;
    if (writeToken) {
      try {
        const authenticatedClient = sanityClient.withConfig({
          token: writeToken,
          useCdn: false,
        });

        await authenticatedClient.create({
          _type: 'suggestion',
          name: newSuggestion.name,
          email: newSuggestion.email,
          topic: newSuggestion.topic,
          message: newSuggestion.message,
          status: 'new',
          createdAt: newSuggestion.createdAt,
        });
      } catch (err) {
        console.warn('Sanity document creation warning:', err);
      }
    }

    return NextResponse.json({ success: true, suggestion: newSuggestion });
  } catch (err: any) {
    console.error('Error saving suggestion:', err);
    return NextResponse.json({ error: 'Failed to save suggestion' }, { status: 500 });
  }
}
