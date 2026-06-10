import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'blockCta',
  title: 'CTA Section',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      initialValue: 'Download Now',
    }),
    defineField({
      name: 'buttonUrl',
      title: 'Button URL',
      type: 'string',
      initialValue: '#',
    }),
  ],
})
