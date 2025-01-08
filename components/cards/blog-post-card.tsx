import { urlFor } from '@/sanity/lib/image';
import { DATE_FORMAT } from '@/utils/constants';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';

export interface BlogPostCardProps {
  title: string;
  excerpt: string;
  date: string;
  mainImage: { alt: string };
  author: string;
  slug: string;
}

const BlogPostCard = ({
  title,
  excerpt,
  date,
  mainImage,
  author,
  slug,
}: BlogPostCardProps) => {
  return (
    <div className="bg-app-background flex flex-col gap-2 shadow-lg rounded-lg overflow-hidden p-3 pb-5">
      <p className="font-bold text-a-18 flex-1 line-clamp-3">
        {/* <TextEllipsis text={title} maxLength={90} /> */}
        {title}
      </p>

      <p className="flex gap-[1ch] items-center text-a-12 font-light">
        <span>{author}</span>
        <span>-</span>
        <span>{dayjs(date).format(DATE_FORMAT)}</span>
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

      <p className="line-clamp-4 flex-1">{excerpt}</p>

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
