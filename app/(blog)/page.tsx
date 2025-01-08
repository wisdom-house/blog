import BlogPostSection from '@/components/blogs-post-section';
import Hero from '@/components/hero';

import { sanityFetch } from '@/sanity/lib/fetch';
import { categoriesQuery, postsQuery } from '@/sanity/lib/queries';

type Props = {
  searchParams: Promise<Record<string, string>>;
};

const Home = async ({ searchParams }: Props) => {
  const { page = '1', limit = '3', category = '' } = await searchParams;

  console.log(page, limit, category);
  // Fetch categories from Sanity
  const categories = await sanityFetch({ query: categoriesQuery });

  // Determine which query to use based on the selected category
  // let postsQueryToUse = postsQuery;
  // const categoryId = categories.find((cat: { slug: string }) => cat.slug === category)?._id || '';

  // if (categoryId) {
  //   postsQueryToUse = postsByCategoryQuery;
  // }

  // Fetch posts based on the current page, limit, and category
  const posts = await sanityFetch({
    query: postsQuery,
    // params: {
    //   page: parseInt(page),
    //   limit: parseInt(limit),
    //   categoryId,
    // },
  });

  const heroPosts = posts.splice(0, 4);

  return (
    <>
      <Hero posts={heroPosts} />

      <BlogPostSection categories={categories} posts={posts} />
    </>
  );
};

export default Home;
