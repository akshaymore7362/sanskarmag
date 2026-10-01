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
  console.log('Using SANITY_WRITE_TOKEN environment variable for client...')
  client = createClient({
    projectId: 'i7vt4u64',
    dataset: 'production',
    apiVersion: '2023-05-03',
    token: token,
    useCdn: false,
  })
} else {
  console.log('Attempting to use Sanity CLI context client...')
  try {
    client = getCliClient({ apiVersion: '2023-05-03' })
  } catch (err) {
    console.error('Error: Could not initialize client.')
    process.exit(1)
  }
}

// Generate random dates between Jan 1, 2024 and today
const startMs = new Date('2024-01-01T00:00:00Z').getTime()
const endMs = new Date().getTime()

function getRandomDate() {
  const randomMs = startMs + Math.random() * (endMs - startMs)
  return new Date(randomMs).toISOString()
}

// Generate monthly magazine slots from Jan 2024 to May 2026 (inclusive)
// Jan, Feb, Mar 2024 will have 2 slots each; all other months have 1 slot each.
function getMagazineSlots() {
  const slots = []
  const startYear = 2024
  const endYear = 2026

  for (let year = startYear; year <= endYear; year++) {
    const maxMonth = year === 2026 ? 5 : 12 // up to May 2026
    for (let month = 1; month <= maxMonth; month++) {
      if (year === 2024 && (month === 1 || month === 2 || month === 3)) {
        slots.push({ year, month, day: 1 })
        slots.push({ year, month, day: 15 })
      } else {
        slots.push({ year, month, day: 1 })
      }
    }
  }
  return slots
}

async function run() {
  console.log('Fetching all posts...')
  const posts = await client.fetch(`*[_type == "post"] { _id, title, publishedAt }`)
  console.log(`Found ${posts.length} posts.`)

  console.log('Fetching all magazines...')
  // Sort by current publishedAt / creation to keep some stable order during assignment
  const magazines = await client.fetch(
    `*[_type == "magazine"] | order(coalesce(publishedAt, _createdAt) asc) { _id, title, publishedAt }`
  )
  console.log(`Found ${magazines.length} magazines.`)

  const slots = getMagazineSlots()
  console.log(`Generated ${slots.length} monthly magazine slots.`)

  if (magazines.length !== slots.length) {
    console.warn(
      `Warning: Number of magazines (${magazines.length}) does not match slots count (${slots.length}).`
    )
  }

  const patches = []

  // 1. Spreading all posts randomly
  console.log('\nGenerating random dates for posts...')
  posts.forEach((post) => {
    const randomDate = getRandomDate()
    patches.push({
      id: post._id,
      title: post.title,
      type: 'post',
      publishedAt: randomDate,
    })
  })

  // 2. Assigning magazines to monthly slots
  console.log('\nAssigning magazines to monthly slots...')
  const pad = (num) => String(num).padStart(2, '0')
  magazines.forEach((mag, index) => {
    const slot = slots[index]
    if (slot) {
      const slotDate = `${slot.year}-${pad(slot.month)}-${pad(slot.day)}T12:00:00Z`
      patches.push({
        id: mag._id,
        title: mag.title,
        type: 'magazine',
        publishedAt: slotDate,
      })
    } else {
      console.warn(`No slot available for magazine index ${index}: "${mag.title}"`)
    }
  })

  console.log(`\nTotal updates to commit: ${patches.length}`)

  // Batch commits (40 items per batch to avoid exceeding payload limits)
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

  console.log('\nSuccessfully redistributed all post and magazine dates!')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
