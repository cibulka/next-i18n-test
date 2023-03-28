import path from 'path';
import { defineDocumentType } from 'contentlayer/source-files';

const DIR = 'pages';

export const Page = defineDocumentType(() => ({
  name: 'Page',
  filePathPattern: `${DIR}/*/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the post',
      required: true,
    },
    emoji: {
      type: 'string',
      description: 'Optional emoji',
      required: false,
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (post) => {
        const result = path.basename(post._raw.sourceFileName, '.mdx').split('.').filter(Boolean);
        if (result.length !== 2) throw new Error('NOPE');
        return result[0];
      },
    },
    locale: {
      type: 'string',
      resolve: (post) => {
        const result = path.basename(post._raw.sourceFileName, '.mdx').split('.').filter(Boolean);
        if (result.length !== 2) throw new Error('NOPE');
        return result[1];
      },
    },
  },
}));
