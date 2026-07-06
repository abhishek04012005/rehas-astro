"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LogoImage from "@/public/logohalf.svg";
import Image from "next/image";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="siteHeader">
      <div className="shell shell--nav">
        <Link href="#" className="brand">
          <Image src={LogoImage} alt="REHAS logo" width={40} height={40} />
          <span>REHAS</span>
        </Link>

        <nav className="navDesktop" aria-label="Primary navigation">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="navLink">
              {link.label}
            </Link>
          ))}
          <Link href="#contact" className="navCta">
            Call with Expert
          </Link>
        </nav>

        <button
          className="navToggle"
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
            className="mobileMenu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >

            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="mobileMenu__link"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link href="#contact" className="mobileMenu__cta" onClick={() => setOpen(false)}>
              Call with Expert
            </Link>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
