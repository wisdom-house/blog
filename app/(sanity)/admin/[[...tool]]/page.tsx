import { NextStudio, metadata as studioMetadata } from 'next-sanity/studio';

import config from '@/sanity.config';
import { Metadata } from 'next';
import { BRAND_NAME } from '@/utils/constants';

export const dynamic = 'force-static';

export { viewport } from 'next-sanity/studio';

export const metadata: Metadata = {
  ...studioMetadata,
  title: `Admin | ${BRAND_NAME}`,
};

export default function StudioPage() {
  return <NextStudio config={config} />;
}
