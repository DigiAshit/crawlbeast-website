import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  name: 'blockFeatureGrid',
  title: 'Feature Grid',
  type: 'object',
  fields: [
    defineField({
      name: 'sectionTitle',
      title: 'Section Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sectionDescription',
      title: 'Section Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'featureItem',
          title: 'Feature Item',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon Type',
              type: 'string',
              description: 'Select an icon or type any Lucide icon name.',
              options: {
                list: [
                  { title: 'Sparkles', value: 'sparkles' },
                  { title: 'Bug / Crawler', value: 'bug' },
                  { title: 'Bar Chart', value: 'bar-chart' },
                  { title: 'Globe / Web', value: 'globe' },
                  { title: 'CPU / Desktop', value: 'cpu' },
                  { title: 'Clock / Speed', value: 'clock' },
                  { title: 'Trending Up', value: 'trending-up' },
                  { title: 'Shield / Security', value: 'shield' },
                  { title: 'Check / Done', value: 'check' },
                  { title: 'Star / Quality', value: 'star' },
                ],
              },
            }),
            defineField({
              name: 'title',
              title: 'Feature Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Feature Description',
              type: 'text',
              rows: 3,
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ],
})
