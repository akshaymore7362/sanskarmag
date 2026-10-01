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
    console.error(
      'Error: Could not initialize Sanity CLI client. Please log in using "npx sanity login" or provide the "SANITY_WRITE_TOKEN" environment variable.'
    )
    process.exit(1)
  }
}

async function run() {
  console.log("Fetching all industryPost documents from Sanity dataset...")
  try {
    const posts = await client.fetch('*[_type == "industryPost"] { _id }')
    console.log(`Found ${posts.length} industryPost documents.`)
    if (posts.length === 0) {
      console.log("No documents to delete.")
      return
    }
    console.log("Starting deletion transaction by IDs...")
    let transaction = client.transaction()
    posts.forEach((post) => {
      transaction = transaction.delete(post._id)
    })
    const result = await transaction.commit()
    console.log("Successfully deleted all industryPost documents by ID.", result)
  } catch (err) {
    console.error("Error deleting documents:", err.message)
  }
}

run()
