import Link from "next/link";
import { contactData } from "@/data/details";

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
    <footer className="footer">
      <div className="shell footer__inner">
        <div>
          <h3 className="footer__title">REHAS</h3>
          <p className="footer__copy">
            Spiritual guidance with calm professionalism and a premium experience.
          </p>
          <p className="footer__meta">
            {contactData.founder.name} · {contactData.founder.title}
          </p>
          <div className="footer__social">
            {contactData.socials.map((social) => (
              <Link key={social.platform} href={social.href} className="footer__socialLink">
                {social.platform}
              </Link>
            ))}
          </div>
        </div>
        <div className="footer__columns">
          {columns.map((column) => (
            <div key={column.title} className="footer__column">
              <h4>{column.title}</h4>
              <ul>
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href}>{link.label}</Link>
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
