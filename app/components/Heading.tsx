import styles from './Heading.module.css';

export default function Heading({ title }: { title: string }) {
  return <h1 className={styles.heading}>{title}</h1>;
}
