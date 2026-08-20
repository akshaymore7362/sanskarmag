import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'mediaKit',
  title: 'Media Kit',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'keywords',
      title: 'Key Words',
      type: 'string',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'altText',
      title: 'Alt Text',
      type: 'string',
    }),
    defineField({
      name: 'mediaKitTitle',
      title: 'Media Kit Title',
      type: 'string',
      description: 'Title shown above the media kit PDF viewer.',
    }),
    defineField({
      name: 'mediaKitPdf',
      title: 'Media Kit PDF',
      type: 'file',
      options: {
        accept: '.pdf',
      },
      description: 'Upload one PDF and it will be shown in the viewer and split into pages below.',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'coverImage',
      subtitle: 'publishedAt',
    },
    prepare({title, media, subtitle}) {
      return {
        title,
        media,
        subtitle: subtitle ? `Published: ${new Date(subtitle).toLocaleDateString()}` : 'Draft',
      }
    },
  },
})
