'use client';
import { client } from '@/sanity/lib/client';
import AsyncSelect, { AsyncSelectOptionType } from './select/async-select';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import ShowView from './show-view';
import Popover from './popover';
import SvgIcon from './icon';

interface SearchProps {
  close?: () => void;
  isMobile?: boolean;
  isDesktop?: boolean;
}

const Search = ({ close, isDesktop = false }: SearchProps) => {
  const pathname = usePathname();
  const hasMounted = useRef(false);
  const [initialPath, setInitialPath] = useState(pathname);
  const { control } = useForm<{ search: { label: string; value: string } }>();

  const fetchPosts = async (query: string) => {
    if (!query) return [];
    try {
      const posts = await client.fetch(
        `*[_type == "post" && (title match $query || excerpt match $query || body[].children[].text match $query)] {
        _id,
        title,
        "slug": slug.current,
        excerpt,
        "image": mainImage.asset->url
      }`,
        { query: `${query}*` } as Record<string, string>
      );
      return posts.map((post: AsyncSelectOptionType) => ({
        label: post.title,
        value: post.slug,
        slug: post.slug,
        image: post.image,
        excerpt: post.excerpt,
      }));
    } catch {
      return [];
    }
  };

  useEffect(() => setInitialPath(pathname), [pathname]);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    if (pathname !== initialPath) {
      close?.();
    }
  }, [pathname, close, initialPath]);

  const SearchInput = () => (
    <Controller
      name="search"
      control={control}
      render={({ field }) => (
        <AsyncSelect
          {...field}
          placeholder="Search blog..."
          loadOptions={fetchPosts}
          noOptionsMessage={({ inputValue }) => (
            <div className="py-5">
              {inputValue
                ? `No blog post found for "${inputValue}"`
                : 'Start typing to search...'}
            </div>
          )}
          className="!text-a-16"
        />
      )}
    />
  );

  if (pathname.startsWith(`/posts/`)) {
    return null;
  }

  return (
    <ShowView
      when={isDesktop}
      fallback={
        <Popover
          trigger={
            <button className="block lg:hidden" aria-label="search blog">
              <SvgIcon name="search" className="w-6 h-6" />
            </button>
          }
          sideOffset={25}
          align="end"
        >
          <div className="w-screen max-w-[500px] lg:hidden">
            <SearchInput />
          </div>
        </Popover>
      }
    >
      <div className="hidden relative max-w-[500px] self-center lg:ml-12 flex-1 z-40 lg:block">
        <SearchInput />
      </div>
    </ShowView>
  );
};

export default Search;
