import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Link className={styles.headerLink} href="/">
          Christian Vuerings
        </Link>
      </div>
    </header>
  );
}
