import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'startup',
  title: 'Startup Spotlight',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Startup Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline / Short Hook',
      type: 'string',
      description: 'e.g. Autonomous AI Agents for Healthcare & Biotech R&D',
    }),
    defineField({
      name: 'founder',
      title: 'Founders / Leadership',
      type: 'string',
      description: 'e.g. Dr. Alexander Vance & Elena Rostova',
    }),
    defineField({
      name: 'sector',
      title: 'Sector / Industry',
      type: 'string',
      description: 'e.g. AI & DeepTech, MedTech, Fintech',
    }),
    defineField({
      name: 'industry',
      title: 'Industry Category Reference',
      type: 'reference',
      to: [{ type: 'industryCategory' }],
    }),
    defineField({
      name: 'valuation',
      title: 'Funding / Valuation',
      type: 'string',
      description: 'e.g. $24M Series A or $120M Valuation',
    }),
    defineField({
      name: 'foundedYear',
      title: 'Founded Year',
      type: 'string',
      description: 'e.g. 2024',
    }),
    defineField({
      name: 'location',
      title: 'Headquarters / Location',
      type: 'string',
      description: 'e.g. San Francisco, CA',
    }),
    defineField({
      name: 'website',
      title: 'Website URL',
      type: 'url',
    }),
    defineField({
      name: 'summary',
      title: 'Full Business Summary / Pitch',
      type: 'text',
    }),
    defineField({
      name: 'logo',
      title: 'Company Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'featuredOnHome',
      title: 'Featured on Homepage',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'tagline',
      media: 'logo',
    },
  },
})
