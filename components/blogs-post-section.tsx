'use client';

import { cn } from '@/lib/classnameMerge';
import { routes } from '@/lib/routes';
import { Category, Post } from '@/sanity.types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import BlogPostCard from './cards/blog-post-card';
import NoAdvertCard from './cards/no-advert-card';

interface IBlogPostProps {
  categories: Category[];
  posts: (Omit<Post, 'mainImage' | 'author' | 'slug'> & {
    mainImage: { alt: string };
    author: string;
    slug: string;
  })[];
}

const BlogPostSection = ({ categories, posts }: IBlogPostProps) => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const router = useRouter();

  const handleCategoryChange = (category: Category) => {
    setSelectedCategory(category);
    router.push(`/?category=${category.slug}`, undefined);
  };

  return (
    <section className="section-padding relative flex flex-col lmd:flex-row gap-10">
      <div>
        <div className="flex bg-app-background shadow-lg rounded overflow-x-auto mb-10">
          {categories.map((category) => (
            <button
              key={category._id}
              className={cn(
                'px-5 py-2 border-b-4 border-transparent hover:border-secondary transition-colors',
                selectedCategory === category &&
                  'border-primary hover:border-primary',
                category === categories[0] && 'sticky left-0 bg-app-background'
              )}
              onClick={() => handleCategoryChange(category)}
            >
              {category.title}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5">
          {posts.map(
            ({ _id, title, excerpt, publishedAt, author, mainImage, slug }) => (
              <BlogPostCard
                key={_id}
                title={title ?? ''}
                excerpt={excerpt || 'No summary available.'}
                date={publishedAt || ''}
                mainImage={mainImage}
                author={author || 'Anonymous'}
                slug={routes.post(slug)}
              />
            )
          )}
        </div>
      </div>

      <div className="w-full lmd:max-w-[300px] lmd:[&>div]:p-5">
        <div className="top-[120px] z-50 sticky rounded-lg overflow-y-auto bg-app-background shadow-lg">
          <NoAdvertCard />
        </div>
      </div>
    </section>
  );
};

export default BlogPostSection;
