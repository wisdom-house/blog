'use client';

import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import Link from 'next/link';

export interface Advert {
  name: string;
  banner: string;
  external_link?: string;
}

const AdvertCard = ({ name, banner, external_link }: Advert) => {
  const content = (
    <div className="relative overflow-hidden bg-app-foreground rounded-b-lg [&:not(:last-of-type)]:bg-black shadow-lg cursor-pointer hover:opacity-80 transition-opacity">
      <Image
        src={urlFor(banner).url()}
        alt={`${name} Advert`}
        width={400}
        height={200}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-app-text">{name}</h3>
      </div>
    </div>
  );

  return external_link ? (
    <Link href={external_link} target="_blank" rel="noopener noreferrer">
      {content}
    </Link>
  ) : (
    content
  );
};

export default AdvertCard;
