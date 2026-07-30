import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'founderCheckout',
  title: 'Founder Checkouts',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
    }),
    defineField({
      name: 'status',
      title: 'Payment Status',
      type: 'string',
      initialValue: 'pending',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Completed', value: 'completed' },
          { title: 'Failed', value: 'failed' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      name: 'name',
      email: 'email',
      status: 'status',
    },
    prepare({ name, email, status }) {
      return {
        title: name || 'No Name',
        subtitle: `${email || 'No Email'} (${status || 'pending'})`,
      }
    },
  },
})
