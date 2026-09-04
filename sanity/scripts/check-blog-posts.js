import { getCliClient } from 'sanity/cli'

const client = getCliClient({ apiVersion: '2023-05-03' })

async function run() {
  console.log('Testing blogs query...');
  const query = `
    *[
      _type == "post" &&
      "blogs-and-articles" in categories[]->slug.current
    ]
    {
      title,
      slug,
      'category': {
        'title': categories[0]->title,
        'slug': categories[0]->slug.current
      }
    } | order(coalesce(publishedAt, _updatedAt) desc, _updatedAt desc)
  `;
  const response = await client.fetch(query);
  console.log(`Query returned ${response.length} posts.`);
  if (response.length > 0) {
    console.log('First 3 posts:', response.slice(0, 3));
  }
}

run().catch(console.error);
