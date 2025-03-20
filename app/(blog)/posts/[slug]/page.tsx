// app/(blog)/posts/[slug]/page.tsx

import { pageTitle } from '@/utils/pageTitle';
import dayjs from 'dayjs';
import { Metadata } from 'next';
import { PortableTextBlock } from 'next-sanity';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import NoAdvertCard from '@/components/cards/no-advert-card';
import PostCommentForm from '@/components/forms/comment-form';
import PortableText from '@/components/portable-text';
import ShareToSocialMedia from '@/components/share-to-social';
import ShowView from '@/components/show-view';

import GoBackButton from '@/components/buttons/go-back.button';
import AdvertCard, { Advert } from '@/components/cards/advert-card';
import { Comment, Post } from '@/sanity.types';
import { sanityFetch } from '@/sanity/lib/fetch';
import { urlFor } from '@/sanity/lib/image';
import {
  activeAdvertsQuery,
  postCommentsQuery,
  singlePostQuery,
} from '@/sanity/lib/queries';
import { DATE_FORMAT } from '@/utils/constants';

type Props = {
  params: Promise<{ slug: string }>;
};

type PostProp = [
  Omit<Post, 'author' | 'categories'> & {
    author: string;
    categories: { title: string; _id: string }[];
  },
];

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

const colors = ['bg-primary', 'bg-secondary', 'bg-tertiary', 'bg-purple-700'];

export default async function PostPage({ params }: Props) {
  const [post] = (await Promise.all([
    sanityFetch({ query: singlePostQuery, params }),
  ])) as PostProp;

  const comments = await sanityFetch({
    query: postCommentsQuery,
    params: { postId: post._id },
  });

  const activeAdverts = (await sanityFetch({
    query: activeAdvertsQuery,
  })) as Advert[];

  if (!post) {
    return notFound();
  }

  return (
    <>
      <section className="section-padding relative flex flex-col lmd:flex-row gap-10">
        <div className="flex-1">
          <GoBackButton />

          <div>
            <div className="flex gap-4 my-6 flex-wrap">
              {post.categories.map((category) => {
                const randomColor =
                  colors[Math.floor(Math.random() * colors.length)];
                return (
                  <span
                    key={category.title}
                    className={`py-2 px-5 font-semibold w-max text-white ${randomColor} rounded`}
                  >
                    {category.title}
                  </span>
                );
              })}
            </div>
          </div>

          <h1 className="text-a-30 mt-5 font-bold lg:lmd:text-a-40">
            {post.title}
          </h1>

          <div className="flex flex-wrap gap-5 my-5 items-center ">
            <p className="font-bold text-a-16 md:text-a-18">
              {post.author ?? ''}
            </p>

            <time>{dayjs(post.myPublishedAt).format(DATE_FORMAT)}</time>
          </div>

          <div className="relative aspect-video w-full overflow-hidden my-5">
            <Image
              src={urlFor(post?.mainImage ?? '').url()}
              alt={(post?.mainImage?.alt || post.title) ?? ''}
              fill
              sizes="100%"
              className="object-cover"
            />
          </div>

          <PortableText value={post.body as PortableTextBlock[]} className="" />

          <ShareToSocialMedia
            title={post.title ?? ''}
            url={(post?.slug as unknown as string) ?? ''}
            description={post.excerpt ?? ''}
            author={post.author}
          />

          <div>
            <div className="flex justify-between items-center mt-10">
              <p className="text-a-16 md:text-a-20 font-medium">
                Comments {!!comments.length && `(${comments.length})`}
              </p>

              <PostCommentForm
                postId={post._id}
                slug={post.slug as unknown as string}
                post_title={post.title as string}
              />
            </div>

            <div className="mt-8">
              <ShowView
                when={!!comments.length}
                fallback={
                  <div className="text-center py-6 bg-app-background rounded-lg shadow-md">
                    <p className="text-lg font-semibold">
                      This post has no comments yet.
                    </p>
                    <p className="text-base">Be the first to comment!</p>
                  </div>
                }
              >
                {comments.map((comment: Comment) => {
                  return (
                    <div
                      key={comment._createdAt}
                      className="bg-app-background group p-5 mb-4 rounded-lg shadow-md"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 group-odd:bg-primary group-even:bg-secondary rounded-full flex items-center justify-center">
                          <p className="text-white text-lg uppercase">
                            {comment?.name?.[0]}
                          </p>
                        </div>
                        <div>
                          <p className="font-semibold capitalize">
                            {comment.name}
                          </p>
                          <p className=" first-letter:capitalize">
                            {comment.comment}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </ShowView>
            </div>
          </div>
        </div>
        <div className="w-full lmd:max-w-[300px] lmd:[&>div]:p-5">
          <div className="top-[120px] z-1 sticky rounded-lg overflow-y-auto bg-app-background">
            <ShowView when={!!activeAdverts.length} fallback={<NoAdvertCard />}>
              <div className="grid gap-5">
                <h2 className="text-lg font-semibold mb-4 text-app-text text-center">
                  Sponsored Adverts
                </h2>

                {activeAdverts.map((ad, i) => (
                  <AdvertCard
                    key={ad.banner + i}
                    name={ad.name}
                    banner={ad.banner}
                    external_link={ad.external_link}
                  />
                ))}
              </div>
            </ShowView>
          </div>
        </div>
      </section>
    </>
  );
}
