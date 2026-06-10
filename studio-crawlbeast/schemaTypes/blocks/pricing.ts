import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  name: 'blockPricing',
  title: 'Pricing Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Flexible Plans for Every Team Size',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Section Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'plans',
      title: 'Pricing Plans',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'planItem',
          title: 'Plan Item',
          fields: [
            defineField({
              name: 'name',
              title: 'Plan Name',
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
              name: 'monthlyPrice',
              title: 'Monthly Price ($)',
              type: 'number',
              validation: (Rule) => Rule.required().min(0),
            }),
            defineField({
              name: 'yearlyPrice',
              title: 'Yearly Price ($ per month if billed annually)',
              type: 'number',
              validation: (Rule) => Rule.required().min(0),
            }),
            defineField({
              name: 'buttonText',
              title: 'Button Text',
              type: 'string',
              initialValue: 'Start Now',
            }),
            defineField({
              name: 'popular',
              title: 'Is Popular / Featured',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({
              name: 'features',
              title: 'Features Included',
              type: 'array',
              of: [{ type: 'string' }],
              validation: (Rule) => Rule.min(1),
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ],
})
