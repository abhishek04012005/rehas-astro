import Link from "next/link";
import Image from "next/image";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { contactData } from "@/data/details";
import styles from "./Footer.module.css";
import LogoImage from "@/public/rehasastrology.svg";

const columns = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Vedic Astrology", href: "/services/vedic-astro" },
      { label: "Kundli Analysis", href: "/services/kundli-analysis" },
      { label: "Kundali Milan", href: "/services/kundali-milan" },
      { label: "Planetary Insights", href: "/services/planetary-insights" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Free Kundli", href: "/" },
      { label: "Get Enquiry", href: "/enquiry" },
      { label: "Admin Login", href: "/admin" },
    ],
  },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`shell ${styles.inner}`}>
        <div className={styles.metaSection}>
          <div className={styles.brandBlock}>
            <Image
              src={LogoImage}
              alt="REHAS Astrology"
              width={120}
              height={48}
              className={styles.logo}
            />

          </div>
          <div>
            <p className={styles.copy}>
              Spiritual guidance with calm professionalism and a premium experience.
            </p>
          </div>
          {/* <div className={styles.highlightCard}>
            <p className={styles.highlightLabel}>Trusted guidance</p>
            <p className={styles.highlightText}>
              {contactData.founder.name} · {contactData.founder.title}
            </p>
          </div> */}

          <div className={styles.socials}>
            <Link href="https://instagram.com/rehas" className={styles.socialLink} aria-label="Instagram">
              <InstagramIcon />
            </Link>
            <Link href="https://facebook.com/rehas" className={styles.socialLink} aria-label="Facebook">
              <FacebookIcon />
            </Link>
            <Link href="https://youtube.com/rehas" className={styles.socialLink} aria-label="YouTube">
              <YouTubeIcon />
            </Link>
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

      <div className={styles.bottomSection}>
        <div className="shell">
          <p className={styles.copyright}>
            © 2026 REHAS Astrology. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );
}
