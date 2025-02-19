import { routes } from '@/lib/routes';
import type { MetadataRoute } from 'next';

const siteUrl = (process.env.SITE_URL ||
  process.env.NEXT_PUBLIC_SITE_URL) as string;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly',
    },

    {
      url: siteUrl + routes.about(),
      lastModified: new Date(),
    },

    {
      url: siteUrl + routes.contact(),
      lastModified: new Date(),
    },
  ];
}
