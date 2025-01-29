import { defineField, defineType } from 'sanity';

export const commentType = defineType({
  name: 'comment',
  title: 'Comments',
  type: 'document',
  groups: [
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
      description: 'Name of the commenter',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'email',
      type: 'string',
      title: 'Email Address',
      group: 'email',
      validation: (rule) => rule.required().email(),
    }),

    defineField({
      name: 'comment',
      type: 'text',
      title: 'Comment Content',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'post',
      type: 'reference',
      to: [{ type: 'post' }],
      title: 'Post',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'status',
      type: 'string',
      title: 'Comment Status',
      description: 'Status of the comment (approved, pending, or deleted)',
      options: {
        list: [
          { title: 'Approved', value: 'approved' },
          { title: 'Pending', value: 'pending' },
          { title: 'Deleted', value: 'deleted' },
        ],
        layout: 'radio',
      },
      initialValue: 'approved',
      validation: (rule) => rule.required(),
    }),
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'comment',
      postTitle: 'post.title',
      postImage: 'post.mainImage',
    },
    prepare(selection) {
      const { title, subtitle, postTitle, postImage } = selection;
      return {
        title: `${title} commented on "${postTitle}"`,
        subtitle: subtitle && subtitle.substring(0, 50) + '...',
        media: postImage,
      };
    },
  },
});
