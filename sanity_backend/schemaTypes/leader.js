import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'leader',
  title: 'Executive Leader',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
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
      name: 'designation',
      title: 'Designation / Role',
      type: 'string',
      description: 'e.g. Founder & CEO, Managing Director',
    }),
    defineField({
      name: 'company',
      title: 'Company / Organization',
      type: 'string',
    }),
    defineField({
      name: 'industry',
      title: 'Industry Category',
      type: 'reference',
      to: [{ type: 'industryCategory' }],
    }),
    defineField({
      name: 'industrySlug',
      title: 'Industry Slug',
      type: 'string',
      description: 'e.g. technology, healthcare, finance, legal',
    }),
    defineField({
      name: 'biography',
      title: 'Biography / Profile Overview',
      type: 'text',
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'imageAlt',
      title: 'Image Alt Text',
      type: 'string',
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
      subtitle: 'company',
      media: 'profileImage',
    },
  },
})
