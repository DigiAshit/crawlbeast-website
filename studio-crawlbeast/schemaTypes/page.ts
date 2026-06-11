import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'page',
  title: 'Page Builder',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // --- CONTENT TAB ---
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: 'Used internally and as fallback for meta title.',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Dynamic URL path (e.g. "pricing" or "about"). Use "/" for the homepage.',
      options: {
        source: 'title',
        maxLength: 96,
      },
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pageType',
      title: 'Page Type',
      type: 'string',
      options: {
        list: [
          { title: 'Homepage', value: 'homepage' },
          { title: 'Standard Page', value: 'standard' },
          { title: 'Landing Page', value: 'landing' },
          { title: 'Documentation Page', value: 'docs' },
        ],
      },
      initialValue: 'standard',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'contentBlocks',
      title: 'Content Blocks',
      type: 'array',
      description: 'Add, reorder, or modify the sections that compose this page.',
      group: 'content',
      of: [
        { type: 'blockHero' },
        { type: 'blockFeatureGrid' },
        { type: 'blockTestimonial' },
        { type: 'blockFaq' },
        { type: 'blockCta' },
        { type: 'blockPricing' },
        { type: 'blockRichContent' },
        { type: 'blockChangelog' },
      ],
    }),

    // --- SEO TAB ---
    defineField({
      name: 'seoSettings',
      title: 'SEO & Social Settings',
      type: 'seoSettings',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      type: 'pageType',
    },
    prepare({ title, slug, type }) {
      return {
        title: title || 'Untitled Page',
        subtitle: `Path: /${slug === '/' ? '' : slug} [Type: ${type || 'Standard'}]`,
      }
    },
  },
})
