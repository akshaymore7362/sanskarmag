import { getCliClient } from 'sanity/cli'

const client = getCliClient({ apiVersion: '2024-01-01' })

const categories = [
  {
    _type: 'category',
    title: 'Featured Articles',
    slug: { _type: 'slug', current: 'web-profiles' },
    altText: 'Featured Articles',
  },
  {
    _type: 'category',
    title: 'Blogs And Articles',
    slug: { _type: 'slug', current: 'blogs-and-articles' },
  },
  {
    _type: 'category',
    title: 'Market Pulse',
    slug: { _type: 'slug', current: 'market-news' },
    altText: 'Market Pulse',
  },
  {
    _type: 'category',
    title: 'Magazines',
    slug: { _type: 'slug', current: 'magazines' },
  },
  {
    _type: 'category',
    title: 'Partner Brands',
    slug: { _type: 'slug', current: 'trusted-brands' },
    altText: 'Partner Brands',
  },
  {
    _type: 'category',
    title: 'The Briefing',
    slug: { _type: 'slug', current: 'business-bulletin' },
    description: 'bulletin',
    altText: 'The Briefing',
  },
  {
    _type: 'category',
    title: 'Executive Perspectives',
    slug: { _type: 'slug', current: 'master-talks' },
    description: 'Executive perspectives and interview profiles.',
  },
]

const industryCategories = [
  {
    _type: 'industryCategory',
    title: 'Finance',
    slug: { _type: 'slug', current: 'finance' },
    description: 'Financial services, banking, and fintech.',
  },
  {
    _type: 'industryCategory',
    title: 'Transportation',
    slug: { _type: 'slug', current: 'transportation' },
    description: 'Transportation and logistics.',
  },
  {
    _type: 'industryCategory',
    title: 'Legal',
    slug: { _type: 'slug', current: 'legal' },
    description: 'Legal and corporate law.',
  },
  {
    _type: 'industryCategory',
    title: 'Tech-Ai',
    slug: { _type: 'slug', current: 'tech-ai' },
    description: 'Technology and Artificial Intelligence.',
    altText: 'Tech-Ai',
  },
  {
    _type: 'industryCategory',
    title: 'Stock Market',
    slug: { _type: 'slug', current: 'stock-market' },
  },
  {
    _type: 'industryCategory',
    title: 'Politics',
    slug: { _type: 'slug', current: 'politics' },
  },
  {
    _type: 'industryCategory',
    title: 'Healthcare',
    slug: { _type: 'slug', current: 'healthcare' },
    description: 'Healthcare, medicine, and wellness.',
  },
  {
    _type: 'industryCategory',
    title: 'Manufacturing-Products',
    slug: { _type: 'slug', current: 'manufacturing-products' },
    description: 'Manufacturing and industrial products.',
  },
]

async function seed() {
  console.log('Seeding categories and industry categories to Sanity...')

  for (const cat of categories) {
    const id = `cat-${cat.slug.current}`
    await client.createOrReplace({ _id: id, ...cat })
    console.log(`✓ Created/Updated Category: ${cat.title}`)
  }

  for (const indCat of industryCategories) {
    const id = `ind-cat-${indCat.slug.current}`
    await client.createOrReplace({ _id: id, ...indCat })
    console.log(`✓ Created/Updated Industry Category: ${indCat.title}`)
  }

  console.log('Successfully seeded all categories and industry categories!')
}

seed().catch((err) => {
  console.error('Seeding error:', err)
  process.exit(1)
})
