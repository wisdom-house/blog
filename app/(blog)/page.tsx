import BlogPostSection from '@/components/blogs-post-section';
import Hero from '@/components/hero';

import { sanityFetch } from '@/sanity/lib/fetch';
import {
  activeAdvertsQuery,
  categoriesQuery,
  postsByCategoryQuery,
  postsQuery,
} from '@/sanity/lib/queries';

type Props = {
  searchParams: Promise<Record<string, string>>;
};

const POST_PER_PAGE = 2;

const Home = async ({ searchParams }: Props) => {
  const { page = '1', category = '' } = await searchParams;

  const pageNum = parseInt(page);
  const start = (pageNum - 1) * POST_PER_PAGE;
  const end = start + POST_PER_PAGE;

  const categories = await sanityFetch({ query: categoriesQuery });

  let postsQueryToUse = postsQuery;
  const categoryId =
    category !== 'all'
      ? categories.find((cat: { slug: string }) => cat.slug === category)
          ?._id || ''
      : '';

  if (categoryId) {
    postsQueryToUse = postsByCategoryQuery;
  }

  const { posts: heroPosts } = await sanityFetch({
    query: postsQuery,
    params: {
      start: 0,
      end: 4,
    },
  });

  // Now, fetch only the posts for the current page
  const { posts: paginatedPosts, total } = await sanityFetch({
    query: postsQueryToUse,
    params: {
      categoryId,
      start,
      end,
    },
  });

  const activeAdverts = await sanityFetch({ query: activeAdvertsQuery });

  return (
    <>
      <Hero posts={heroPosts} />

      <BlogPostSection
        categories={categories}
        posts={paginatedPosts}
        postPerPage={POST_PER_PAGE}
        total={total}
        adverts={activeAdverts}
      />
    </>
  );
};

export default Home;
