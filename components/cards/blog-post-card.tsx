import { routes } from '@/lib/routes';
import { Category } from '@/sanity.types';
import { urlFor } from '@/sanity/lib/image';
import { DATE_FORMAT } from '@/utils/constants';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';

export interface BlogPostCardProps {
  title: string;
  excerpt: string;
  publishedAt: string;
  mainImage: { alt: string };
  author: string;
  slug: string;
  category?: Category;
}

const BlogPostCard = ({
  title,
  excerpt,
  publishedAt,
  mainImage,
  author,
  slug,
}: BlogPostCardProps) => {
  return (
    <Link
      href={routes.post(slug)}
      className="bg-app-background flex flex-col gap-2 shadow-lg rounded-lg overflow-hidden p-3 pb-5"
    >
      <p className="font-bold text-a-18 flex-1 line-clamp-3">{title}</p>

      <p className="flex gap-[1ch] items-center text-a-12 font-light">
        <span>{author}</span>
        <span>-</span>
        <span>{dayjs(publishedAt).format(DATE_FORMAT)}</span>
      </p>

      <div className="relative aspect-video w-full group overflow-hidden">
        <Image
          src={urlFor(mainImage).url()}
          alt={mainImage.alt}
          fill
          sizes="100%"
          className="object-cover group-hover:scale-125 transition-all ease-linear duration-200"
        />
      </div>

      <p className="line-clamp-3">{excerpt}</p>
    </Link>
  );
};

export default BlogPostCard;
