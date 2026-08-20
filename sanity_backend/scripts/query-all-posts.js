import { getCliClient } from 'sanity/cli'
import { createClient } from '@sanity/client'
import fs from 'fs'

// Load local .env file if it exists
if (fs.existsSync('.env')) {
  const envConfig = fs.readFileSync('.env', 'utf-8')
  envConfig.split('\n').forEach((line) => {
    const [key, ...valueParts] = line.split('=')
    if (key && valueParts.length > 0) {
      process.env[key.trim()] = valueParts.join('=').trim().replace(/^['"]|['"]$/g, '')
    }
  })
}

let client
const token = process.env.SANITY_WRITE_TOKEN

if (token) {
  client = createClient({
    projectId: 'i7vt4u64',
    dataset: 'production',
    apiVersion: '2023-05-03',
    token: token,
    useCdn: false,
  })
} else {
  try {
    client = getCliClient({ apiVersion: '2023-05-03' })
  } catch (err) {
    console.error('Error: Could not initialize client.')
    process.exit(1)
  }
}

async function run() {
  // Fetch standard posts filtered by the category 'Blogs And Articles'
  const filteredPosts = await client.fetch(`*[_type == "post" && "Blogs And Articles" in categories[]->title] {
    title,
    "slug": slug.current
  }`)

  let csvContent = '\uFEFF' // UTF-8 BOM to ensure Excel opens it correctly with formatting/encodings
  csvContent += 'Title,Slug\n'
  filteredPosts.forEach(post => {
    const cleanTitle = post.title.replace(/"/g, '""').trim()
    const cleanSlug = (post.slug || '').trim()
    csvContent += `"${cleanTitle}","${cleanSlug}"\n`
  })

  fs.writeFileSync('blogs_and_articles_list.csv', csvContent, 'utf-8')
  fs.writeFileSync('../blogs_and_articles_list.csv', csvContent, 'utf-8')
  console.log('CSV file successfully written!')
}

run().catch(err => {
  console.error(err)
  process.exit(1)
})
