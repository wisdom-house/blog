import { DATE_FORMAT } from '@/utils/constants';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import TextEllipsis from '../text-ellipses';

interface BlogPostCardProps {
  title: string;
  excerpts: string;
  date: string;
  image: string;
  author: string;
  slug: string;
}

const BlogPostCard = ({
  title,
  excerpts,
  date,
  image,
  author,
  slug,
}: BlogPostCardProps) => {
  return (
    <div className="bg-app-background flex flex-col gap-2 shadow-lg rounded-lg overflow-hidden p-3 pb-5">
      <p className="font-bold text-a-18">
        <TextEllipsis text={title} maxLength={90} />
      </p>

      <p className="flex gap-[1ch] items-center text-a-12 font-light">
        <span>{author}</span>
        <span>-</span>
        <span>{dayjs(date).format(DATE_FORMAT)}</span>
      </p>

      <div className="relative aspect-video w-full group overflow-hidden">
        <Image
          src={image}
          alt="blog post image"
          fill
          sizes="100%"
          className="object-cover group-hover:scale-125 transition-all ease-linear duration-200"
        />
      </div>

      <p>{excerpts}</p>

      <Link
        href={slug}
        className="text-primary hover:underline transition-all duration-100 ease-linear font-medium italic w-max  block"
      >
        Continue reading
      </Link>
    </div>
  );
};

export default BlogPostCard;
