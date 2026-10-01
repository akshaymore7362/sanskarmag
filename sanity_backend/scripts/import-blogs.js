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

// Initialize client
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

// Configuration
const SHEET_URL = 'https://docs.google.com/spreadsheets/d/1osbktvFb7H1xw_2dSYcGfkNUAHRTPzfx9Hz1-xuYRfA/export?format=csv'
const importImagesDir = path.join(process.cwd(), 'import_images')

// Parse execution mode
const isDryRun = !process.argv.includes('--commit')

// Helper: Custom state-machine CSV parser to handle nested commas, quotes, and newlines
function parseCSV(text) {
  const result = []
  let row = ['']
  let inQuotes = false

  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    const nextChar = text[i + 1]

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        // Escaped quote inside quoted field
        row[row.length - 1] += '"'
        i++
      } else {
        // Toggle quote state
        inQuotes = !inQuotes
      }
    } else if (char === ',' && !inQuotes) {
      row.push('')
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++
      }
      if (row.length > 1 || row[0] !== '') {
        result.push(row)
      }
      row = ['']
    } else {
      row[row.length - 1] += char
    }
  }
  if (row.length > 1 || row[0] !== '') {
    result.push(row)
  }
  return result
}

// Helper: Generate clean URL slugs from text strings
function generateSlug(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

// Helper: Find local image matching the slug
function findLocalImage(slug) {
  if (!fs.existsSync(importImagesDir)) {
    return null
  }
  const extensions = ['.png', '.jpg', '.jpeg', '.webp']
  for (const ext of extensions) {
    const filePath = path.join(importImagesDir, `${slug}${ext}`)
    if (fs.existsSync(filePath)) {
      return filePath
    }
  }
  return null
}

// Helper: Upload local image file to Sanity
async function uploadLocalImage(filePath) {
  try {
    const fileStream = fs.createReadStream(filePath)
    const asset = await client.assets.upload('image', fileStream, {
      filename: path.basename(filePath),
    })
    return asset
  } catch (err) {
    console.error(`Error uploading local image ${filePath}:`, err.message)
    return null
  }
}

// Helper: Download and upload web image (with Google Images imgurl parameter parsing)
async function downloadAndUploadImage(url, slug) {
  try {
    let directUrl = url.trim()
    if (url.includes('google.com/imgres') || url.includes('google.co.in/imgres')) {
      const urlObj = new URL(url)
      const imgurl = urlObj.searchParams.get('imgurl')
      if (imgurl) {
        directUrl = decodeURIComponent(imgurl)
      }
    }

    if (!directUrl.startsWith('http')) {
      return null
    }

    console.log(`Downloading image from URL: ${directUrl}`)
    const res = await fetch(directUrl)
    if (!res.ok) throw new Error(`HTTP status ${res.status}`)

    const buffer = await res.arrayBuffer()
    const asset = await client.assets.upload('image', Buffer.from(buffer), {
      filename: `${slug}${path.extname(new URL(directUrl).pathname) || '.jpg'}`,
    })
    return asset
  } catch (err) {
    console.warn(`Warning: Could not download/upload image from URL: ${url}. Error: ${err.message}`)
    return null
  }
}

// Helper: Convert plain text body to Sanity Portable Text blockContent array
function convertBodyToBlockContent(bodyText) {
  if (!bodyText) return []
  const paragraphs = bodyText
    .split(/\r?\n\r?\n/)
    .map((p) => p.trim())
    .filter(Boolean)

  const generateKey = () => Math.random().toString(36).substring(2, 14)

  return paragraphs.map((p) => ({
    _key: generateKey(),
    _type: 'block',
    style: 'normal',
    children: [
      {
        _key: generateKey(),
        _type: 'span',
        text: p,
      },
    ],
  }))
}

// Main execution function
async function run() {
  console.log('----------------------------------------------------')
  console.log(`Mode: ${isDryRun ? 'DRY-RUN (No changes will be written)' : 'LIVE-COMMIT (Writing to Sanity)'}`)
  console.log('----------------------------------------------------')

  // Create local images folder if it doesn't exist to make it easy for user
  if (!fs.existsSync(importImagesDir)) {
    fs.mkdirSync(importImagesDir)
    console.log(`Created empty local images directory: ${importImagesDir}`)
    console.log('Place your downloaded blog images here, named by their slugs (e.g. healthcare-at-a-turning-point.png)')
  }

  // 1. Fetch Google Sheet CSV content
  console.log(`Fetching Google Sheet from: ${SHEET_URL}`)
  const res = await fetch(SHEET_URL)
  if (!res.ok) {
    throw new Error(`Failed to fetch Google Sheet: ${res.statusText}`)
  }
  const csvText = await res.text()
  const rows = parseCSV(csvText)

  if (rows.length < 2) {
    console.log('No blogs found in CSV.')
    return
  }

  // Parse Headers
  const headers = rows[0].map((h) => h.trim().toLowerCase())
  const titleIdx = headers.indexOf('title')
  const slugIdx = headers.indexOf('slug')
  const industryIdx = headers.indexOf('industry')
  const keywordsIdx = headers.indexOf('keywords')
  const altTextIdx = headers.indexOf('alt text')
  const descIdx = headers.indexOf('description')
  const bodyIdx = headers.indexOf('body')
  const imageIdx = headers.indexOf('image')

  if (titleIdx === -1 || slugIdx === -1 || industryIdx === -1 || bodyIdx === -1) {
    console.error('Error: CSV is missing required headers. Headers must include Title, Slug, Industry, and Body.')
    console.log('Found headers:', rows[0])
    process.exit(1)
  }

  // 2. Fetch existing data from Sanity for caching and duplicate checks
  console.log('Fetching existing industry categories and posts from Sanity...')
  const existingCategories = await client.fetch(`*[_type == "industryCategory"] { _id, title, "slug": slug.current }`)
  const existingPosts = await client.fetch(`*[_type == "industryPost"] { "slug": slug.current }`)

  const categoryMap = new Map()
  existingCategories.forEach((cat) => {
    categoryMap.set(cat.title.toLowerCase(), cat._id)
    categoryMap.set(cat.slug.toLowerCase(), cat._id)
  })

  const existingSlugs = new Set(existingPosts.map((p) => p.slug))

  console.log(`Found ${existingCategories.length} existing categories and ${existingPosts.length} existing industry posts.`)

  let successCount = 0
  let skipCount = 0
  let errCount = 0

  // 3. Process each row
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i]
    if (row.length <= 1) continue // Skip empty rows

    const title = row[titleIdx]?.trim() || ''
    const rawSlug = row[slugIdx]?.trim() || ''
    const industry = row[industryIdx]?.trim() || ''
    const keywords = row[keywordsIdx]?.trim() || ''
    const altText = row[altTextIdx]?.trim() || ''
    const description = row[descIdx]?.trim() || ''
    const body = row[bodyIdx]?.trim() || ''
    const imageUrl = row[imageIdx]?.trim() || ''

    const slug = generateSlug(rawSlug || title)

    console.log(`\n[ROW ${i}] Processing: "${title || '(No Title)'}"`)

    // Validation
    if (!title || !slug || !industry || !body) {
      console.log(`  [SKIP] Missing critical fields: Title, Slug, Industry, or Body is empty.`)
      skipCount++
      continue
    }

    // Duplicate slug check
    if (existingSlugs.has(slug)) {
      console.log(`  [SKIP] Duplicate slug found: "${slug}" already exists.`)
      skipCount++
      continue
    }

    // Resolve Category
    let categoryId = categoryMap.get(industry.toLowerCase()) || categoryMap.get(generateSlug(industry))
    if (!categoryId) {
      console.log(`  Category "${industry}" does not exist in Sanity.`)
      if (isDryRun) {
        console.log(`  [DRY-RUN] Would create new category: "${industry}"`)
        categoryId = 'temporary-category-id'
      } else {
        try {
          const newCat = await client.create({
            _type: 'industryCategory',
            title: industry,
            slug: { _type: 'slug', current: generateSlug(industry) },
          })
          console.log(`  [CREATED] Created category "${industry}" with ID: ${newCat._id}`)
          categoryMap.set(industry.toLowerCase(), newCat._id)
          categoryMap.set(generateSlug(industry), newCat._id)
          categoryId = newCat._id
        } catch (catErr) {
          console.error(`  [ERROR] Failed to create category "${industry}":`, catErr.message)
          errCount++
          continue
        }
      }
    } else {
      console.log(`  Linked to existing category: "${industry}"`)
    }

    // Resolve Image Asset
    let imageAsset = null
    const localImgPath = findLocalImage(slug)

    if (localImgPath) {
      console.log(`  Found matching local image: ${localImgPath}`)
      if (!isDryRun) {
        imageAsset = await uploadLocalImage(localImgPath)
      } else {
        console.log(`  [DRY-RUN] Would upload local image file: ${path.basename(localImgPath)}`)
        imageAsset = { _id: 'mock-image-asset-id' }
      }
    } else if (imageUrl) {
      console.log(`  No local image found. Attempting web upload from: ${imageUrl}`)
      if (!isDryRun) {
        imageAsset = await downloadAndUploadImage(imageUrl, slug)
      } else {
        console.log(`  [DRY-RUN] Would attempt web upload from URL: ${imageUrl}`)
        imageAsset = { _id: 'mock-image-asset-id' }
      }
    } else {
      console.log('  No image provided in local folder or CSV URL column.')
    }

    // Build industryPost document
    const postDoc = {
      _type: 'industryPost',
      title: title,
      slug: {
        _type: 'slug',
        current: slug,
      },
      keywords: keywords,
      altText: altText,
      description: description,
      publishedAt: new Date().toISOString(),
      featured: false,
      body: convertBodyToBlockContent(body),
      industryCategory: {
        _type: 'reference',
        _ref: categoryId,
      },
    }

    if (imageAsset) {
      postDoc.mainImage = {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: imageAsset._id,
        },
      }
    }

    // Create Document
    if (isDryRun) {
      console.log(`  [DRY-RUN] Would create post: "${title}" (Slug: ${slug})`)
      successCount++
    } else {
      try {
        const createdPost = await client.create(postDoc)
        console.log(`  [CREATED] Successfully imported post! ID: ${createdPost._id}`)
        existingSlugs.add(slug) // Avoid duplicate processing if row is duplicated in sheet
        successCount++
      } catch (postErr) {
        console.error(`  [ERROR] Failed to import post "${title}":`, postErr.message)
        errCount++
      }
    }
  }

  console.log('\n====================================================')
  console.log('IMPORT COMPLETE SUMMARY')
  console.log(`Mode: ${isDryRun ? 'DRY-RUN' : 'LIVE-COMMIT'}`)
  console.log(`Successfully Processed: ${successCount}`)
  console.log(`Skipped (Invalid/Duplicates): ${skipCount}`)
  console.log(`Failed Errors: ${errCount}`)
  console.log('====================================================')
  if (isDryRun) {
    console.log('Note: To execute the live import and write changes to Sanity, run:')
    console.log('npx sanity exec scripts/import-blogs.js -- --commit')
    console.log('====================================================')
  }
}

run().catch((err) => {
  console.error('Fatal execution error:', err)
  process.exit(1)
})
