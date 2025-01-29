import { createClient } from 'next-sanity';

import { apiVersion, dataset, projectId, studioUrl } from '../env';

const token = process.env.SANITY_API_WRITE_TOKEN;

if (!token) {
  throw new Error('SANITY_API_WRITE_TOKEN not found');
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: 'published',
  stega: {
    studioUrl,
  },
  token,
});
