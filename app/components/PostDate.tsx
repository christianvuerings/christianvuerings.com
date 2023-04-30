import styles from './PostDate.module.css';

export default function PostDate({ date }: { date: string }) {
  return <div className={styles.postDate}>{date}</div>;
}
