import { getCliClient } from 'sanity/cli'

const client = getCliClient({ apiVersion: '2023-05-03' })

async function run() {
  console.log('Querying categories from Sanity Studio...');
  const categories = await client.fetch(`*[_type == "category"] { title, slug }`);
  console.log(JSON.stringify(categories, null, 2));
}

run().catch(console.error);
