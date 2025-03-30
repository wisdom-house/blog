import { createClient } from 'next-sanity';

import {
  apiVersion,
  dataset,
  projectId,
  studioUrl,
  writeToken as token,
} from '../env';

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
