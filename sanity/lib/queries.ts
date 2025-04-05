export const postFields = /* groq */ `
  _id,
  "status": select(_id in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  excerpt,
  "mainImage": mainImage{
    asset->{
      url,
      metadata {
        dimensions {
          width,
          height
        },
        palette {
          dominant {
            background,
            foreground
          }
        }
      }
    },
    alt
  },
"myPublishedAt": coalesce(myPublishedAt, _createdAt),
  "author": author->.name,
  categories[]->{
    title,
    "slug": slug.current
  }
`;

const categoryFields = /* groq */ `
  _id,
  "slug": slug.current,
  title,
  description
`;

export const singlePostFields = /* groq */ `
  ${postFields},
  body
`;

export const categoriesQuery = /* groq */ `
  *[_type == "category"] {
    ${categoryFields}
  }
`;

export const postsQuery = /* groq */ `
{
  "posts": *[_type == "post" && defined(slug.current) && myPublishedAt <= now()] 
    | order(myPublishedAt desc) [$start...$end] {
    ${postFields}
  },
  "total": count(*[_type == "post" && defined(slug.current) && myPublishedAt <= now()])
}
`;

export const postsByCategoryQuery = /* groq */ `
{
  "posts": *[_type == "post" && $categoryId in categories[]._ref] | order(myPublishedAt desc) [$start...$end] {
    ${postFields}
  },
  "total": count(*[_type == "post" && $categoryId in categories[]._ref])
}
`;

export const searchPostsQuery = /* groq */ `
  *[_type == "post" && (title match $query || excerpt match $query || body[].children[].text match $query)] | order(myPublishedAt desc, _updatedAt desc) {
    ${postFields}
  }
`;

export const singlePostQuery = /* groq */ `
  *[_type == "post" && slug.current == $slug][0] {
    ${singlePostFields}
  }
`;

export const postCommentsQuery = /* groq */ `
  *[_type == "comment" && post._ref == $postId && status == "approved"] | order(_createdAt desc) {
    _id,
    name,
    email,
    comment,
    _createdAt,
  }
`;

export const activeAdvertsQuery = /* groq */ `
*[_type == "advert" && start_date <= now() && end_date >= now()] | order(start_date desc) [0...4] {
  _id,
  name,
  banner,
  start_date,
  end_date,
  external_link
}
`;
