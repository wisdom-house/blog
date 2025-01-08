import { routes } from '@/lib/routes';
import {
  defineDocuments,
  defineLocations,
  DocumentLocation,
  PresentationPluginOptions,
} from 'sanity/presentation';

const homeLocation: DocumentLocation = {
  title: 'Home',
  href: routes.home(),
};

export const resolve: PresentationPluginOptions['resolve'] = {
  mainDocuments: defineDocuments([
    {
      route: '/posts/:slug',
      filter: `_type == "post" && slug.current == $slug`,
    },
  ]),
  locations: {
    post: defineLocations({
      select: {
        title: 'title',
        slug: 'slug.current',
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || 'Untitled',
            href: routes.post(doc?.slug),
          },
          homeLocation,
        ],
      }),
    }),
  },
};
