import { getCliClient } from 'sanity/cli'
import { createClient } from '@sanity/client'

let client

// Check if we have a write token environment variable
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
    console.error(
      'Error: Could not initialize Sanity CLI client. Please log in using "npx sanity login" or provide the "SANITY_WRITE_TOKEN" environment variable.'
    )
    process.exit(1)
  }
}

async function run() {
  console.log('Fetching magazines...')
  const magazines = await client.fetch(
    `*[_type == "magazine"] | order(coalesce(publishedAt, _createdAt) desc) {
      _id,
      title,
      publishedAt,
      _createdAt
    }`
  )

  console.log(`Found ${magazines.length} magazines total.`)

  if (magazines.length <= 4) {
    console.log('You have 4 or fewer magazines. Nothing to delete.')
    return
  }

  const keep = magazines.slice(0, 4)
  const toDelete = magazines.slice(4)

  console.log('\nMagazines to KEEP (Latest 4):')
  keep.forEach((m, i) => {
    console.log(`  ${i + 1}. [${m.title}] (Published: ${m.publishedAt || m._createdAt})`)
  })

  console.log('\nMagazines to DELETE:')
  toDelete.forEach((m, i) => {
    console.log(`  ${i + 1}. [${m.title}] (Published: ${m.publishedAt || m._createdAt}) - ID: ${m._id}`)
  })

  console.log('\nStarting deletion transaction...')

  let transaction = client.transaction()
  toDelete.forEach((m) => {
    transaction = transaction.delete(m._id)
  })

  await transaction.commit()
  console.log('Successfully deleted older magazines!')
}

run().catch((err) => {
  console.error('Error running script:', err)
  process.exit(1)
})
