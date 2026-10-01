import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'

// Load local .env file from the current directory or sanity_backend directory
const envPath = fs.existsSync('.env') ? '.env' : path.join('sanity_backend', '.env')

if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, 'utf-8')
  envConfig.split('\n').forEach((line) => {
    const [key, ...valueParts] = line.split('=')
    if (key && valueParts.length > 0) {
      process.env[key.trim()] = valueParts.join('=').trim().replace(/^['"]|['"]$/g, '')
    }
  })
}

const token = process.env.SANITY_WRITE_TOKEN

if (!token) {
  console.error('Error: SANITY_WRITE_TOKEN is required in .env file.')
  process.exit(1)
}

const client = createClient({
  projectId: 'i7vt4u64',
  dataset: 'production',
  apiVersion: '2023-05-03',
  token: token,
  useCdn: false,
})

// Generate random dates between Aug 1, 2025 and today (June 18, 2026)
const startMs = new Date('2025-08-01T00:00:00Z').getTime()
const endMs = new Date().getTime()

function getRandomDate() {
  const randomMs = startMs + Math.random() * (endMs - startMs)
  return new Date(randomMs).toISOString()
}

async function run() {
  console.log('Fetching all industry posts...')
  const posts = await client.fetch(`*[_type == "industryPost"] { _id, title, publishedAt }`)
  console.log(`Found ${posts.length} industry posts.`)

  if (posts.length === 0) {
    console.log('No industry posts found. Exiting.')
    return
  }

  const patches = []

  posts.forEach((post) => {
    const randomDate = getRandomDate()
    patches.push({
      id: post._id,
      title: post.title,
      publishedAt: randomDate,
    })
  })

  console.log(`\nTotal updates to commit: ${patches.length}`)

  // Batch commits (40 items per batch)
  const BATCH_SIZE = 40
  for (let i = 0; i < patches.length; i += BATCH_SIZE) {
    const batch = patches.slice(i, i + BATCH_SIZE)
    console.log(`Committing batch ${Math.floor(i / BATCH_SIZE) + 1} (${batch.length} updates)...`)
    
    let transaction = client.transaction()
    batch.forEach((patch) => {
      transaction = transaction.patch(patch.id, (p) => p.set({ publishedAt: patch.publishedAt }))
    });
    
    await transaction.commit()
  }

  console.log('\nSuccessfully redistributed all industry post dates!')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
