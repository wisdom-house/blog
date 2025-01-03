'use client';

import Image from 'next/image';
import { useState } from 'react';

import { Button } from './buttons/button';
import BlogPostCard from './cards/blog-post-card';

import { cn } from '@/lib/classnameMerge';

const categories = [
  {
    label: 'All',
    slug: 'all',
  },
  {
    label: 'News',
    slug: 'news',
  },
  {
    label: 'Fashion',
    slug: 'fashion',
  },
  {
    label: 'Sport',
    slug: 'sport',
  },
];

const BlogPostSection = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  return (
    <section className="section-padding relative flex flex-col  lmd:flex-row gap-10">
      <div>
        <div className="flex bg-app-background shadow-lg rounded overflow-x-auto mb-10">
          {categories.map((category) => (
            <button
              key={category.slug}
              className={cn(
                'px-5 py-2 border-b-4  border-transparent hover:border-secondary transition-colors',
                selectedCategory === category &&
                  'border-primary hover:border-primary',
                category === categories[0] && 'sticky left-0 bg-app-background'
              )}
              onClick={() => setSelectedCategory(category)}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <BlogPostCard
              key={i}
              title={
                'This is the blog title  This is the blog title This is the blog title This is the blog title This is the blog title'
              }
              excerpts={
                'WordPress News Magazine Charts the Most Chic and Fashionable Women of New York City WordPress News Magazine Charts the Most Chic and Fashionable Women of New York City'
              }
              date={'01-01-2024'}
              image={`https://picsum.photos/1820/108${i}`}
              author={'Paul Oluwatoni'}
              slug={`#blog-post-${i}`}
            />
          ))}
        </div>
      </div>

      <div className="w-full lmd:max-w-[300px] lmd:[&>div]:p-5">
        <div className="top-[120px] z-50 sticky rounded-lg overflow-y-auto  bg-app-background shadow-lg ">
          <div className="grid place-items-center p-6 relative aspect-video lmd:aspect-square group ">
            <Image
              src={`https://picsum.photos/1900/1111`}
              alt="advertise here"
              sizes="100%"
              fill
              className="object-cover absolute bg-app-gray-50/5 brightness-[0.3] group-hover:brightness-95 transition-all ease-linear duration-300  -z-1"
            />

            <div>
              <p className="text-a-16 text-white text-center mb-5">
                Advertise here
              </p>

              <Button>Contact us</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogPostSection;
