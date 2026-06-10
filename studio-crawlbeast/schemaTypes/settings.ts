import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Global Site Settings',
  type: 'document',
  groups: [
    { name: 'general', title: 'Branding & Info' },
    { name: 'seo', title: 'Default SEO Fallbacks' },
    { name: 'analytics', title: 'Analytics & Tracking' },
    { name: 'social', title: 'Social Profiles' },
  ],
  fields: [
    // --- Branding Tab ---
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      initialValue: 'CrawlBeast',
      group: 'general',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
      initialValue: 'Digital Neighbour',
      group: 'general',
    }),
    defineField({
      name: 'companyLogo',
      title: 'Company Logo',
      type: 'image',
      options: { hotspot: true },
      group: 'general',
    }),
    defineField({
      name: 'supportEmail',
      title: 'Support Email',
      type: 'string',
      placeholder: 'support@crawlbeast.com',
      group: 'general',
    }),

    // --- SEO Fallbacks Tab ---
    defineField({
      name: 'defaultMetaTitle',
      title: 'Default Meta Title',
      type: 'string',
      description: 'Used when a page does not specify a meta title.',
      group: 'seo',
    }),
    defineField({
      name: 'defaultMetaDescription',
      title: 'Default Meta Description',
      type: 'text',
      description: 'Used when a page does not specify a meta description.',
      rows: 3,
      group: 'seo',
    }),
    defineField({
      name: 'defaultOgImage',
      title: 'Default Open Graph Image',
      type: 'image',
      description: 'Fallback image for social shares.',
      options: { hotspot: true },
      group: 'seo',
    }),
    defineField({
      name: 'defaultTwitterSite',
      title: 'Default Twitter Site Account',
      type: 'string',
      placeholder: '@crawlbeast',
      group: 'seo',
    }),

    // --- Analytics Tab ---
    defineField({
      name: 'googleAnalyticsId',
      title: 'Google Analytics Measurement ID (G-XXXXXX)',
      type: 'string',
      group: 'analytics',
    }),
    defineField({
      name: 'googleTagManagerId',
      title: 'Google Tag Manager Container ID (GTM-XXXXXX)',
      type: 'string',
      group: 'analytics',
    }),
    defineField({
      name: 'microsoftClarityId',
      title: 'Microsoft Clarity Project ID',
      type: 'string',
      group: 'analytics',
    }),

    // --- Social Profiles Tab ---
    defineField({
      name: 'socialProfiles',
      title: 'Social Media Profiles',
      type: 'array',
      group: 'social',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'profileItem',
          title: 'Profile Link',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  { title: 'Twitter / X', value: 'twitter' },
                  { title: 'GitHub', value: 'github' },
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'YouTube', value: 'youtube' },
                ],
              },
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Global Site Settings',
        subtitle: 'Configure branding, SEO fallbacks, and tracking scripts.',
      }
    },
  },
})
