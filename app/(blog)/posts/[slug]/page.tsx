// app/(blog)/posts/[slug]/page.tsx

import { PortableTextBlock } from 'next-sanity';
import { notFound } from 'next/navigation';

import NoAdvertCard from '@/components/cards/no-advert-card';
import SvgIcon from '@/components/icon';
import PortableText from '@/components/portable-text';
import { routes } from '@/lib/routes';
import { sanityFetch } from '@/sanity/lib/fetch';
import { singlePostQuery } from '@/sanity/lib/queries';
import { pageTitle } from '@/utils/pageTitle';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await sanityFetch({
    query: singlePostQuery,
    params,
    stega: false,
  });

  return {
    authors: post?.author?.name ? [{ name: post?.author?.name }] : [],
    title: pageTitle(post?.title),
    description: post?.excerpt,
  };
}

export default async function PostPage({ params }: Props) {
  const [post] = await Promise.all([
    sanityFetch({ query: singlePostQuery, params }),
  ]);

  if (!post) {
    return notFound();
  }

  return (
    <>
      <section className="section-padding relative flex flex-col lmd:flex-row gap-10">
        <div className="flex-1">
          <div className="flex items-center gap-[0.5ch] text-a-12">
            <Link
              href={routes.home()}
              className="underline hover:no-underline transition-all ease-linear duration-200"
            >
              Home
            </Link>

            <SvgIcon name="chevron-right" className="w-2 h-2" />

            <p className="text-primary font-medium">{post.title}</p>
          </div>

          <h1 className="text-a-30 mt-5 font-bold lg:lmd:text-a-40">
            {post.title}
          </h1>

          <div className="relative aspect-video w-full overflow-hidden my-5">
            <Image
              src={urlFor(post?.mainImage).url()}
              alt={post.mainImage.alt || post.title}
              fill
              sizes="100%"
              className="object-cover"
            />
          </div>

          <PortableText
            value={post.body as PortableTextBlock[]}
            className="prose"
          />
        </div>

        <div className="w-full lmd:max-w-[300px] lmd:[&>div]:p-5">
          <div className="top-[120px] z-50 sticky rounded-lg overflow-y-auto bg-app-background shadow-lg">
            <NoAdvertCard />
          </div>
        </div>
      </section>
    </>
  );
}
