import { routes } from '@/lib/routes';
import type { MetadataRoute } from 'next';

const siteUrl = process.env.SITE_URL as string;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', routes.icons()],
    },
    sitemap: siteUrl + '/sitemap.xml',
  };
}
