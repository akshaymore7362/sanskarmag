import { getCliClient } from 'sanity/cli'
import { createClient } from '@sanity/client'

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

const generateKey = () => Math.random().toString(36).substring(2, 14)

async function run() {
  console.log("Fetching all industryPost documents from Sanity dataset...")
  try {
    const posts = await client.fetch('*[_type == "industryPost"] { _id, title, body }')
    console.log(`Found ${posts.length} industryPost documents.`)

    let patchCount = 0

    for (const post of posts) {
      if (!post.body || !Array.isArray(post.body)) continue

      let needsPatch = false
      const patchedBody = post.body.map((block) => {
        const newBlock = { ...block }

        if (!newBlock._key) {
          newBlock._key = generateKey()
          needsPatch = true
        }

        if (Array.isArray(newBlock.children)) {
          newBlock.children = newBlock.children.map((child) => {
            if (!child._key) {
              needsPatch = true
              return { ...child, _key: generateKey() }
            }
            return child
          })
        }

        return newBlock
      })

      if (needsPatch) {
        console.log(`Patching keys for: "${post.title || 'Untitled'}"`)
        await client.patch(post._id).set({ body: patchedBody }).commit()
        patchCount++
      }
    }

    console.log(`\nMigration complete! Patched ${patchCount} documents with keys.`)
  } catch (err) {
    console.error("Migration error:", err.message)
  }
}

run()
