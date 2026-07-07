import Link from "next/link";
import { contactData } from "@/data/details";
import styles from "./Footer.module.css";

const columns = [
  {
    title: "Explore",
    links: [
      { label: "About", href: "#about" },
      { label: "Services", href: "#services" },
      { label: "Experts", href: "#experts" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "#blog" },
      { label: "FAQ", href: "#faq" },
      { label: "Contact", href: "#contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`shell ${styles.inner}`}>
        <div className={styles.metaSection}>
          <div className={styles.brandBlock}>
            <div className={styles.brandBadge}>R</div>
            <div>
              <h3 className={styles.title}>REHAS</h3>
              <p className={styles.copy}>
                Spiritual guidance with calm professionalism and a premium experience.
              </p>
            </div>
          </div>

          <div className={styles.highlightCard}>
            <p className={styles.highlightLabel}>Trusted guidance</p>
            <p className={styles.highlightText}>
              {contactData.founder.name} · {contactData.founder.title}
            </p>
          </div>

          <div className={styles.socials}>
            {contactData.socials.map((social) => (
              <Link key={social.platform} href={social.href} className={styles.socialLink}>
                {social.platform}
              </Link>
            ))}
          </div>
        </div>

        <div className={styles.columns}>
          {columns.map((column) => (
            <div key={column.title} className={styles.column}>
              <h4 className={styles.columnTitle}>{column.title}</h4>
              <ul className={styles.columnList}>
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className={styles.columnLink}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
