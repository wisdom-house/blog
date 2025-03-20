import { DATE_FORMAT } from '@/utils/constants';
import dayjs from 'dayjs';
import { defineField, defineType } from 'sanity';

export const advertSchema = defineType({
  name: 'advert',
  title: 'Adverts',
  type: 'document',

  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Brand Name',
      description: 'Name of the brand',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'banner',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'start_date',
      type: 'datetime',
      description: 'When advert should be displayed on the page',
      validation: (rule) => rule.required(),
      initialValue: dayjs().toISOString(),
    }),

    defineField({
      name: 'end_date',
      type: 'datetime',
      description: 'When advert should stop being displayed on the page',
      validation: (rule) => rule.required(),
      initialValue: dayjs().add(1, 'month').toISOString(),
    }),

    defineField({
      name: 'external_link',
      type: 'url',
      title: 'External Link',
      description: 'Optional link to the advertiser’s website',
      validation: (rule) => rule.uri({ scheme: ['https'] }),
    }),
  ],

  preview: {
    select: {
      title: 'name',
      start: 'start_date',
      end: 'end_date',
      banner: 'banner',
    },
    prepare(selection) {
      const { title, start, end, banner } = selection;
      return {
        title: `${title} Advert"`,
        subtitle: `${dayjs(start).format(DATE_FORMAT)} - ${dayjs(end).format(DATE_FORMAT)}`,
        media: banner,
      };
    },
  },
});
