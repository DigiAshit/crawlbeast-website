import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'seoSettings',
  title: 'SEO Settings',
  type: 'object',
  groups: [
    { name: 'seo', title: 'Search Engine Optimization' },
    { name: 'social', title: 'Social Media (OG/Twitter)' },
    { name: 'schema', title: 'Structured Data & Robots' },
    { name: 'internal', title: 'Advanced & Notes' },
  ],
  fields: [
    // --- SEO Tab ---
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Title of the page shown in browser tabs and search results.',
      group: 'seo',
      validation: (Rule) => Rule.max(70).warning('Titles should be under 70 characters'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      description: 'Snippet text summarizing the page in search engine lists.',
      rows: 3,
      group: 'seo',
      validation: (Rule) => Rule.max(160).warning('Descriptions should be under 160 characters'),
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      description: 'The primary URL of this page, used to prevent duplicate content issues.',
      group: 'seo',
    }),

    // --- Social Tab ---
    defineField({
      name: 'openGraphTitle',
      title: 'Open Graph Title',
      type: 'string',
      description: 'Title displayed when this page is shared on social platforms.',
      group: 'social',
    }),
    defineField({
      name: 'openGraphDescription',
      title: 'Open Graph Description',
      type: 'text',
      description: 'Short summary shown during social sharing.',
      rows: 3,
      group: 'social',
    }),
    defineField({
      name: 'openGraphImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'Image displayed when sharing (Recommended: 1200 x 630px).',
      options: { hotspot: true },
      group: 'social',
    }),
    defineField({
      name: 'openGraphImageAlt',
      title: 'Open Graph Image Alt Text',
      type: 'string',
      description: 'Alternative text describing the social sharing image for accessibility.',
      group: 'social',
    }),
    defineField({
      name: 'twitterCardType',
      title: 'Twitter Card Type',
      type: 'string',
      options: {
        list: [
          { title: 'Summary Card', value: 'summary' },
          { title: 'Summary Card with Large Image', value: 'summary_large_image' },
        ],
        layout: 'radio',
      },
      initialValue: 'summary_large_image',
      group: 'social',
    }),
    defineField({
      name: 'twitterSite',
      title: 'Twitter Site Handle',
      type: 'string',
      placeholder: '@crawlbeast',
      group: 'social',
    }),
    defineField({
      name: 'twitterCreator',
      title: 'Twitter Creator Handle',
      type: 'string',
      placeholder: '@creator',
      group: 'social',
    }),

    // --- Schema & Robots Tab ---
    defineField({
      name: 'robotsIndex',
      title: 'Allow Search Indexing (Index)',
      type: 'boolean',
      description: 'If false, instructs engines not to display this page in search lists.',
      initialValue: true,
      group: 'schema',
    }),
    defineField({
      name: 'robotsFollow',
      title: 'Follow Links (Follow)',
      type: 'boolean',
      description: 'If false, search spiders will not crawl external links from this page.',
      initialValue: true,
      group: 'schema',
    }),
    defineField({
      name: 'structuredData',
      title: 'Structured Data (JSON-LD)',
      type: 'text',
      description: 'Paste valid JSON-LD schema markup directly (e.g. FAQPage, SoftwareApplication, Product). Do not include <script> tags.',
      rows: 8,
      group: 'schema',
    }),

    // --- Advanced / Internal Tab ---
    defineField({
      name: 'focusKeyword',
      title: 'Focus Keyword',
      type: 'string',
      description: 'Primary search query targeting this page (For internal SEO tracking only).',
      group: 'internal',
    }),
    defineField({
      name: 'secondaryKeywords',
      title: 'Secondary Keywords',
      type: 'string',
      description: 'Additional keywords targeted (comma-separated). For internal tracking.',
      group: 'internal',
    }),
    defineField({
      name: 'seoNotes',
      title: 'SEO Notes & Directives',
      type: 'text',
      description: 'Internal editor remarks, reminders, or content checklists.',
      rows: 4,
      group: 'internal',
    }),
  ],
})
