import profileImage from './profile-picture.png';
import Image from 'next/image';
import Link from 'next/link';
import styles from './BioContainer.module.css';

export default function BioContainer() {
  return (
    <div className={styles.bioContainer}>
      <Image src={profileImage} alt="" width={60} height={60} />
      <div>
        Personal blog by{' '}
        <Link
          // @ts-expect-error
          href="https://twitter.com/christianvuer"
        >
          Christian Vuerings
        </Link>
        <br />I love to share interesting ideas.
      </div>
    </div>
  );
}
