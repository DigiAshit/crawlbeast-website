import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  name: 'blockTestimonial',
  title: 'Testimonial Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Trusted by 1200+ SEO professionals',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'testimonialItem',
          title: 'Testimonial Item',
          fields: [
            defineField({
              name: 'quote',
              title: 'Quote',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'author',
              title: 'Author Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'role',
              title: 'Role / Company',
              type: 'string',
            }),
            defineField({
              name: 'initials',
              title: 'Author Initials',
              type: 'string',
              description: 'Used for fallback avatar badges (e.g. SM).',
              validation: (Rule) => Rule.max(3),
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ],
})
