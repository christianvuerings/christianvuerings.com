import styles from './Footer.module.css';

export default function Footer() {
  const footerLinks = [
    {
      href: 'https://x.com/christianvuer',
      title: `Christian's x.com page`,
      text: 'X',
    },
    {
      href: 'https://github.com/christianvuerings',
      title: `Have a peek at Christian's github repositories`,
      text: 'GitHub',
    },
    {
      href: 'https://www.linkedin.com/in/christianvuerings',
      title: `Contact Christian for business enquiries`,
      text: 'LinkedIn',
    },
  ];

  return (
    <footer className={styles.footer}>
      <ul className={styles.footerList}>
        {footerLinks.map((link) => (
          <li key={link.href} className={styles.footerItem}>
            <a
              className={styles.footerLink}
              href={link.href}
              title={link.title}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.text}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
}
