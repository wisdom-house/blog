import { defineField, defineType } from 'sanity';

export const newsletterType = defineType({
  name: 'newsletter',
  title: 'Newsletter Sign Ups',
  type: 'document',
  groups: [
    {
      name: 'name',
      title: 'Name',
    },
    {
      name: 'email',
      title: 'Email',
    },
  ],
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
      readOnly: true,
      group: 'name',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'email',
      type: 'string',
      title: 'Email Address',
      readOnly: true,
      group: 'email',
      validation: (rule) => rule.required().email(),
    }),
  ],
});

export default newsletterType;
