import { getCliClient } from 'sanity/cli'
import { createClient } from '@sanity/client'

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
    console.error(
      'Error: Could not initialize Sanity CLI client. Please log in using "npx sanity login" or provide the "SANITY_WRITE_TOKEN" environment variable.'
    )
    process.exit(1)
  }
}

async function run() {
  console.log('Fetching posts with category "web-profiles"...')
  const posts = await client.fetch(
    `*[_type == "post" && references(*[_type == "category" && slug.current == "web-profiles"]._id)] | order(coalesce(publishedAt, _createdAt) desc) {
      _id,
      title,
      publishedAt,
      _createdAt
    }`
  )

  console.log(`Found ${posts.length} posts in "web-profiles" category.`)

  if (posts.length <= 6) {
    console.log('You have 6 or fewer posts in this category. Nothing to delete.')
    return
  }

  const keep = posts.slice(0, 6)
  const toDelete = posts.slice(6)

  console.log('\nPosts to KEEP (Latest 6):')
  keep.forEach((p, i) => {
    console.log(`  ${i + 1}. [${p.title}] (Published: ${p.publishedAt || p._createdAt})`)
  })

  console.log('\nPosts to DELETE:')
  toDelete.forEach((p, i) => {
    console.log(`  ${i + 1}. [${p.title}] (Published: ${p.publishedAt || p._createdAt}) - ID: ${p._id}`)
  })

  console.log('\nStarting deletion transaction...')

  let transaction = client.transaction()
  toDelete.forEach((p) => {
    transaction = transaction.delete(p._id)
  })

  await transaction.commit()
  console.log('Successfully deleted older posts!')
}

run().catch((err) => {
  console.error('Error running script:', err)
  process.exit(1)
})
