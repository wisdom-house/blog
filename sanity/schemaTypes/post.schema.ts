import { DocumentTextIcon } from '@sanity/icons';
import dayjs from 'dayjs';
import { defineArrayMember, defineField, defineType } from 'sanity';

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'author',
      type: 'reference',
      to: { type: 'author' },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'mainImage',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
          validation: (rule) =>
            rule
              .required()
              .warning('Alt text is crucial for accessibility and SEO.'),
        },
      ],
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'categories',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: { type: 'category' } })],
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'myPublishedAt',
      title: 'Displayed Publish Date',
      type: 'datetime',
      description: 'Date you want to be displayed on the UI.',
      validation: (rule) => rule.required(),
      initialValue: dayjs().toISOString(),
    }),

    defineField({
      name: 'body',
      type: 'blockContent',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      description: 'Brief summary of post.',
      validation: (rule) => rule.required(),
    }),
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const { author } = selection;
      return { ...selection, subtitle: author && `by ${author}` };
    },
  },
});
