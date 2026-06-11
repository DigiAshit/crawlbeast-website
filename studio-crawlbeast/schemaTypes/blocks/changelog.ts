import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'blockChangelog',
  title: 'Changelog Section',
  type: 'object',
  fields: [
    defineField({
      name: 'version',
      title: 'Version Tag',
      type: 'string',
      placeholder: 'v1.2.0',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Release Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Release Description',
      type: 'text',
      description: 'Highlight what is new, fixed, or upgraded in this version.',
      rows: 4,
    }),
  ],
})
