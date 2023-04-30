import Link from 'next/link';
import styles from './page.module.css';
import { postsMetadata } from './content';

export default function Root() {
  return (
    <main className={styles.page}>
      <div className={styles.posts}>
        {postsMetadata.map(({ excerpt, frontmatter, slug }) => (
          <div key={slug} className={styles.post}>
            <time className={styles.date}>{frontmatter.date.toString()}</time>
            <div>
              <h2 className={styles.postTitle}>
                <Link href={`/${slug}`}>{frontmatter.title}</Link>
              </h2>

              <p>{excerpt}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
