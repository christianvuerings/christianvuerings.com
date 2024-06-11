import { type Metadata } from 'next';
import { compileMDX } from 'next-mdx-remote/rsc';
import { mdxOptions } from '../../compile';
import {
  getSourceBySlug,
  postSlugs,
  postsMetadata,
  type Frontmatter,
} from '../../content';
import styles from './page.module.css';
import Link from 'next/link';

import { baseUrl } from '../../metadata';
import BioContainer from '../../BioContainer';

export const dynamicParams = false;

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> => {
  const metadata = postsMetadata.find((post) => post.slug === params.slug);

  if (!metadata) {
    console.warn('no metadata found for slug', params.slug);
    return {};
  }

  const title = metadata.frontmatter.title;
  const description = metadata.frontmatter.description ?? title;

  return {
    title,
    description,
    twitter: {
      title,
    },
    openGraph: {
      title,
      description,
    },
  };
};

const PostPage = async ({ params }: { params: { slug: string } }) => {
  const source = await getSourceBySlug(params.slug);

  const {
    content,
    frontmatter: { title, date },
  } = await compileMDX<Frontmatter>({
    source,
    options: { mdxOptions, parseFrontmatter: true },
  });

  const completePath = baseUrl + '/' + params.slug;
  const xUrl = `https://x.com/share?original_referer=${completePath}&amp;url=${completePath}&amp;text=${title.replace(
    '&',
    '%26'
  )}&amp;via=christianvuer`;

  return (
    <main className={styles.post}>
      <article>
        <h1 className={styles.postHeading}>{title}</h1>
        <time className={styles.date}>
          {new Date(date).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>

        {content}

        <div className={styles.marginBottomTop}>
          <Link
            className={styles.xLink}
            // @ts-expect-error x.com URL is not typed
            href={xUrl}
            target="_blank"
          >
            <svg
              viewBox="0 0 1200 1227"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="none"
              width={16}
            >
              <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"></path>
            </svg>
            Post
          </Link>
        </div>

        <hr className={styles.hr} />

        <BioContainer />
      </article>
    </main>
  );
};

export const generateStaticParams = async () => {
  return postSlugs.map((slug) => ({ slug }));
};

export default PostPage;
