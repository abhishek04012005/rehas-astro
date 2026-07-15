"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LogoImage from "@/public/rehasastrology.svg";
import Image from "next/image";
import { hasAdminSessionCookie } from "@/lib/adminClient";
import styles from "./AdminNavbar.module.css";

const links = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Contacts", href: "/admin/contacts" },
  { label: "Enquiries", href: "/admin/enquiries" },
  { label: "Kundli", href: "/admin/kundli" },
  { label: "Logout", href: "/admin/logout" },
];

export function AdminNavbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) return null;

  if (!hasAdminSessionCookie()) return null;

  return (
    <header className={styles.siteHeader}>
      <div className={`shell ${styles.shellNav}`}>
        <Link href="/admin/dashboard" className={styles.brand}>
          <span className={styles.brandMark}>
            <Image src={LogoImage} alt="REHAS logo" width={120} height={80} />
          </span>
        </Link>

        <nav className={styles.navDesktop} aria-label="Admin navigation">
          {links.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/admin/logout" && pathname.startsWith(link.href));
            return (
              <Link key={link.href} href={link.href} className={`${styles.navLink} ${isActive ? styles.active : ""}`}>
                {link.label}
              </Link>
            );
          })}
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
            {links.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/admin/logout" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${styles.mobileMenuLink} ${isActive ? styles.active : ""}`}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
