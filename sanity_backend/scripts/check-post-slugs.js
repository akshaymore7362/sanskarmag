import { getCliClient } from 'sanity/cli'

const client = getCliClient({ apiVersion: '2023-05-03' })

async function run() {
  console.log('Querying posts to check slugs...');
  const posts = await client.fetch(`*[_type == "post"] { _id, title, slug }`);
  const missingSlugs = posts.filter(post => !post.slug || !post.slug.current);
  if (missingSlugs.length > 0) {
    console.log(`[ALERT] Found ${missingSlugs.length} posts with missing/null slugs:`);
    missingSlugs.forEach(p => console.log(`- ID: ${p._id}, Title: "${p.title}"`));
  } else {
    console.log('All posts have valid slugs!');
  }
}

run().catch(console.error);
