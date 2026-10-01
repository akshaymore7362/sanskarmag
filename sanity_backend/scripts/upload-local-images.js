import { getCliClient } from 'sanity/cli'
import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'

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

// User-provided image folder
const DESKTOP_IMAGES_DIR = 'C:\\Users\\HP\\Desktop\\post-images'

// Helper: Find matching local image file
function findImageForSlug(slug) {
  if (!fs.existsSync(DESKTOP_IMAGES_DIR)) {
    console.error(`Error: Desktop images directory not found at: ${DESKTOP_IMAGES_DIR}`)
    return null
  }

  const extensions = ['.png', '.jpg', '.jpeg', '.webp']
  for (const ext of extensions) {
    const filePath = path.join(DESKTOP_IMAGES_DIR, `${slug}${ext}`)
    if (fs.existsSync(filePath)) {
      return filePath
    }
  }
  return null
}

// Helper: Upload file to Sanity
async function uploadImage(filePath) {
  try {
    const fileStream = fs.createReadStream(filePath)
    const asset = await client.assets.upload('image', fileStream, {
      filename: path.basename(filePath),
    })
    return asset
  } catch (err) {
    console.error(`  [ERROR] Failed to upload ${path.basename(filePath)}:`, err.message)
    return null
  }
}

async function run() {
  console.log('----------------------------------------------------')
  console.log('Sanity Local Desktop Image Uploader & Patcher')
  console.log(`Directory: ${DESKTOP_IMAGES_DIR}`)
  console.log('----------------------------------------------------')

  if (!fs.existsSync(DESKTOP_IMAGES_DIR)) {
    console.error(`Error: The directory "${DESKTOP_IMAGES_DIR}" does not exist. Please double check the path.`)
    process.exit(1)
  }

  // Fetch all industry posts with their slugs
  console.log('Fetching all industry posts from Sanity...')
  const posts = await client.fetch(`*[_type == "industryPost"] { _id, title, "slug": slug.current, mainImage }`)
  console.log(`Found ${posts.length} industry posts in dataset.`)

  let uploadCount = 0
  let skipCount = 0
  let errCount = 0
  const skippedPosts = []

  for (const post of posts) {
    const slug = post.slug
    if (!slug) {
      console.log(`[SKIP] Post ID ${post._id} has no slug.`)
      skipCount++
      continue
    }

    const imagePath = findImageForSlug(slug)
    if (!imagePath) {
      skippedPosts.push({ title: post.title, slug })
      skipCount++
      continue
    }

    console.log(`\n[MATCH] Found image on Desktop for: "${post.title}" (${slug})`)
    console.log(`  Path: ${imagePath}`)

    try {
      console.log('  Uploading image to Sanity...')
      const asset = await uploadImage(imagePath)
      if (!asset) {
        errCount++
        continue
      }

      console.log(`  Successfully uploaded asset: ${asset._id}`)
      console.log('  Patching post document...')
      await client
        .patch(post._id)
        .set({
          mainImage: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: asset._id,
            },
          },
        })
        .commit()

      console.log(`  [PATCHED] Post successfully updated with local image!`)
      uploadCount++
    } catch (err) {
      console.error(`  [ERROR] Failed to patch post "${post.title}":`, err.message)
      errCount++
    }
  }

  console.log('\n====================================================')
  console.log('PATCH IMAGE PROCESS COMPLETE')
  console.log(`Successfully Uploaded & Patched: ${uploadCount}`)
  console.log(`Skipped (No matching image/missing slug): ${skipCount}`)
  console.log(`Failed Errors: ${errCount}`)
  console.log('====================================================')

  if (skippedPosts.length > 0) {
    console.log('\n====================================================')
    console.log('SKIPPED POSTS DETAILS (NO IMAGE FOUND ON DESKTOP):')
    skippedPosts.forEach((p, idx) => {
      console.log(`${idx + 1}. Title: "${p.title}"\n   Slug:  "${p.slug}"`)
    })
    console.log('====================================================')
  }
}

run().catch((err) => {
  console.error('Fatal execution error:', err)
  process.exit(1)
})
