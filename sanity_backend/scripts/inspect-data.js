import { getCliClient } from 'sanity/cli'
import { createClient } from '@sanity/client'
import fs from 'fs'

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
  const postsCount = await client.fetch('count(*[_type == "post"])')
  const magazinesCount = await client.fetch('count(*[_type == "magazine"])')
  console.log(`=== DATA INSPECTION ===`)
  console.log(`Total Posts: ${postsCount}`)
  console.log(`Total Magazines: ${magazinesCount}`)

  if (magazinesCount > 0) {
    const magazines = await client.fetch(`*[_type == "magazine"] | order(publishedAt asc) {
      title,
      publishedAt
    }`)
    console.log(`\nMagazines in DB:`)
    magazines.forEach((m, idx) => {
      console.log(`  ${idx + 1}. Title: "${m.title}", Published At: ${m.publishedAt}`)
    })
  }
}

run().catch(err => {
  console.error(err)
  process.exit(1)
})
