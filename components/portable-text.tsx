import { urlFor } from '@/sanity/lib/image';
import {
  PortableText,
  type PortableTextComponents,
  type PortableTextBlock,
} from 'next-sanity';
import Image from 'next/image';
import Tooltip from './tooltip';

export default function CustomPortableText({
  className,
  value,
}: {
  className?: string;
  value: PortableTextBlock[];
}) {
  const components: PortableTextComponents = {
    block: {
      h1: ({ children }) => (
        <h1 className="mb-4 text-3xl font-bold">{children}</h1>
      ),
      h2: ({ children }) => (
        <h2 className="mb-4 text-2xl font-semibold">{children}</h2>
      ),
      h3: ({ children }) => (
        <h3 className="mb-4 text-xl font-semibold">{children}</h3>
      ),
      h4: ({ children }) => (
        <h4 className="mb-4 text-lg font-medium">{children}</h4>
      ),
      normal: ({ children }) => <p className="my-4 text-base">{children}</p>,
      blockquote: ({ children }) => (
        <blockquote className="pl-4 border-l-4 border-gray-300 italic text-gray-700">
          {children}
        </blockquote>
      ),
    },
    marks: {
      link: ({ children, value }) => (
        <a
          href={value?.href}
          target="_blank"
          rel="noreferrer noopener"
          className="text-blue-600 underline hover:text-blue-800"
        >
          {children}
        </a>
      ),
      tooltip: ({ children, value }) => (
        <Tooltip
          text={value.text || 'Tooltip'}
          trigger={
            <span className="underline decoration-dotted cursor-help">
              {children}
            </span>
          }
        />
      ),
    },
    types: {
      image: ({ value }) => {
        console.log('Image:', value);

        if (!value?.asset?.url) return null;

        const isInline = value.layout === 'inline';
        return isInline ? (
          <span className="relative w-16 h-16 inline-block">
            <Image
              src={urlFor(value).url()}
              alt={value.alt}
              layout="fill"
              objectFit="cover"
              className="rounded"
            />
          </span>
        ) : (
          <div className="relative my-4 w-full max-w-3xl mx-auto overflow-hidden rounded-lg">
            <Image
              src={value.asset.url}
              alt={value.alt || 'Image'}
              width={800}
              height={500}
              layout="responsive"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        );
      },
      embed: ({ value }) => {
        if (!value?.url) return null;

        return (
          <div className="my-4">
            <iframe
              src={value.url}
              title="Embedded Media"
              className="w-full aspect-video rounded-lg"
              frameBorder="0"
              allowFullScreen
            />
          </div>
        );
      },
    },
  };

  return (
    <div className={className}>
      <PortableText components={components} value={value} />
    </div>
  );
}
