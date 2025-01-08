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
  "publishedAt": coalesce(publishedAt, _createdAt),
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
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc, _updatedAt desc) {
    ${postFields}
  }
`;

export const postsByCategoryQuery = /* groq */ `
  *[_type == "post" && $categoryId in categories[]._ref] | order(publishedAt desc, _updatedAt desc) {
    ${postFields}
  }
`;

export const searchPostsQuery = /* groq */ `
  *[_type == "post" && (title match $query || excerpt match $query || body[].children[].text match $query)] | order(publishedAt desc, _updatedAt desc) {
    ${postFields}
  }
`;

export const singlePostQuery = /* groq */ `
  *[_type == "post" && slug.current == $slug][0] {
    ${singlePostFields}
  }
`;
