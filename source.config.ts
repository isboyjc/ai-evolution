import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
  metaSchema,
} from 'fumadocs-mdx/config';

import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';

// You can customise Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.vercel.app/docs/mdx/collections#define-docs

export const docs = defineDocs({
  dir: 'content/book',
  docs: {
    schema: frontmatterSchema,
  },
  meta: {
    schema: metaSchema,
  },
});

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkMath],
    // Place it at first, it should be executed before the syntax highlighter
    rehypePlugins: (v) => [rehypeKatex, ...v],
  },
  lastModifiedTime: 'git',
  // 禁用图片尺寸检查以避免远程图片访问问题
  // remarkImageOptions: {
  //   getImageSize: false
  // }
});
