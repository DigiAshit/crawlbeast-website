import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'blockHero',
  title: 'Hero Section',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'ctaText',
      title: 'Primary CTA Text',
      type: 'string',
      initialValue: 'Start Your Free Audit',
    }),
    defineField({
      name: 'ctaLink',
      title: 'Primary CTA Link',
      type: 'string',
      initialValue: '#',
    }),
    defineField({
      name: 'secondaryCtaText',
      title: 'Secondary CTA Text',
      type: 'string',
    }),
    defineField({
      name: 'secondaryCtaLink',
      title: 'Secondary CTA Link',
      type: 'string',
    }),
    defineField({
      name: 'backgroundVariant',
      title: 'Background Variant',
      type: 'string',
      options: {
        list: [
          { title: 'Navy Gradient (Default)', value: 'navy-gradient' },
          { title: 'Dark Black', value: 'dark-black' },
          { title: 'Subtle Slate', value: 'subtle-slate' },
        ],
      },
      initialValue: 'navy-gradient',
    }),
  ],
})
