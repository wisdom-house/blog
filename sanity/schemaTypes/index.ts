import { type SchemaTypeDefinition } from 'sanity';

import { blockContentType } from './block-content.schema';
import { categoryType } from './category.schema';
import { postType } from './post.schema';
import { authorType } from './author.schema';
import { commentType } from './comment.schema';
import newsletterType from './newsletter.schema';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    categoryType,
    postType,
    commentType,
    authorType,
    newsletterType,
  ],
};
