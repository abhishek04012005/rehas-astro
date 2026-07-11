"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LogoImage from "@/public/rehasastrology.svg";
import Image from "next/image";
import styles from "./Navbar.module.css";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services-list" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.siteHeader}>
      <div className={`shell ${styles.shellNav}`}>
        <Link href="/" className={styles.brand}>
          <span className={styles.brandMark}>
            <Image src={LogoImage} alt="REHAS logo" width={120} height={80} />
          </span>
        </Link>

        <nav className={styles.navDesktop} aria-label="Primary navigation">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
            </Link>
          ))}
          <Link href="/contact" className={styles.navCta}>
            Call with Expert
          </Link>
        </nav>

        <button
          className={styles.navToggle}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={styles.mobileMenuLink}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link href="#contact" className={styles.mobileMenuCta} onClick={() => setOpen(false)}>
              Call with Expert
            </Link>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
