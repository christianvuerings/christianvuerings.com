import fs from 'node:fs';
import path from 'node:path';

import matter from 'gray-matter';
import removeMarkdown from 'remove-markdown';

export const POSTS_ROOT = path.join(process.cwd(), 'content/blog');

export const postFiles = fs.readdirSync(POSTS_ROOT);

export const postSlugs = postFiles.map((filename) =>
  filename.replace(/\.mdx?$/, '')
);

export const getFilePathBySlug = (slug: string) => {
  const mdxFilePath = path.join(POSTS_ROOT, `${slug}/index.mdx`);
  const mdFilePath = path.join(POSTS_ROOT, `${slug}/index.md`);
  // prefer mdx over md
  const filePath = fs.existsSync(mdxFilePath) ? mdxFilePath : mdFilePath;
  return filePath;
};

export const getSourceBySlug = async (slug: string) => {
  const filePath = getFilePathBySlug(slug);

  const source = await fs.promises.readFile(filePath, 'utf8');
  return source;
};

export const getSourceBySlugSync = (slug: string) => {
  const filePath = getFilePathBySlug(slug);

  const source = fs.readFileSync(filePath, 'utf8');
  return source;
};

export const postSlugExists = (slug: string) => {
  return postSlugs.includes(slug);
};

export type Frontmatter = {
  title: string;
  date: Date;
  description?: string;
  tags: string[];
};

export const postsMetadata = (
  postSlugs.map((slug) => {
    const source = getSourceBySlugSync(slug);

    const { data: frontmatter, excerpt } = matter(source, {
      excerpt: (file) => {
        // @ts-expect-error https://github.com/jonschlinkert/gray-matter/issues/125
        file.excerpt = `${removeMarkdown(file.content)
          .split('\n')
          .slice(0, 4)
          .join(' ')
          .replace(/^(.{160}[^\s]*).*/, '$1')}…`;
        return file;
      },
    });

    return {
      excerpt,
      frontmatter,
      slug,
    };
  }) as {
    excerpt: string;
    frontmatter: Frontmatter;
    slug: string;
  }[]
).sort((a, b) => {
  if (a.frontmatter.date < b.frontmatter.date) {
    return 1;
  } else if (a.frontmatter.date > b.frontmatter.date) {
    return -1;
  } else {
    return 0;
  }
});
