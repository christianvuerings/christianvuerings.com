import rehypePrettyCode from 'rehype-pretty-code';
import remarkGfm from 'remark-gfm';

import { type SerializeOptions } from 'next-mdx-remote/dist/types';

export const mdxOptions = {
  remarkPlugins: [remarkGfm],
  rehypePlugins: [
    [
      rehypePrettyCode,
      {
        theme: 'one-dark-pro',
      },
    ],
  ],
} satisfies SerializeOptions['mdxOptions'];
