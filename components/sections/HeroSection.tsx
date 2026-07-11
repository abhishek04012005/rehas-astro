"use client";

import { motion } from "framer-motion";
import StarIcon from "@mui/icons-material/Star";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ComprassIcon from "@mui/icons-material/Explore";
import LineArtBackground from "../LineArtBackground";
import styles from "./HeroSection.module.css";
import SectionHeading from "../ui/SectionHeading";

interface HeroSectionProps {
  onOpenKundli?: () => void;
}

export function HeroSection({ onOpenKundli }: HeroSectionProps) {
  return (
    <section className={styles.hero}>
      <LineArtBackground variant="default" opacity={0.06} />
      <div className={`shell ${styles.mainContent}`}>
        <motion.div
          className={styles.heroContent}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.eyebrowWithIcon}>
            <AutoAwesomeIcon className={styles.eyebrowIcon} />
            <p className="eyebrow">Celestial Guidance</p>
          </div>
          <SectionHeading
            title="Find clarity through the wisdom of the stars"
            subtitle="Grounded in ancient practices, guided by cosmic insight. Discover your path with intentional, meaningful support tailored to your unique journey."
            level={1}
            className={styles.heroHeading}
          />
          <div className={styles.heroActions}>
            <button className={styles.primaryButton} onClick={onOpenKundli}>
              <StarIcon className={styles.buttonIcon} />
              Get Your Free Kundli
            </button>
            <a className={styles.secondaryButton} href="#services">
              <ComprassIcon className={styles.buttonIcon} />
              Explore Services
            </a>
          </div>
        </motion.div>

        <motion.div
          className={styles.heroVisual}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45 }}
        >
          <div className={styles.solarSystem} aria-hidden="true">
            <div className={styles.sun} />
            <div className={`${styles.orbit} ${styles.orbit1}`} style={{ "--duration": "3s" } as any}>
              <div className={styles.planetBody} style={{ "--size": "8px", "--color": "#8c7853" } as any} />
            </div>
            <div className={`${styles.orbit} ${styles.orbit2}`} style={{ "--duration": "4.5s" } as any}>
              <div className={styles.planetBody} style={{ "--size": "14px", "--color": "#ffc649" } as any} />
            </div>
            <div className={`${styles.orbit} ${styles.orbit3}`} style={{ "--duration": "6.25s" } as any}>
              <div className={styles.planetBody} style={{ "--size": "15px", "--color": "#4a90e2" } as any} />
            </div>
            <div className={`${styles.orbit} ${styles.orbit4}`} style={{ "--duration": "8.2s" } as any}>
              <div className={styles.planetBody} style={{ "--size": "12px", "--color": "#e27b58" } as any} />
            </div>
            <div className={`${styles.orbit} ${styles.orbit5}`} style={{ "--duration": "12s" } as any}>
              <div className={styles.planetBody} style={{ "--size": "28px", "--color": "#c88b3a" } as any} />
            </div>
            <div className={`${styles.orbit} ${styles.orbit6}`} style={{ "--duration": "16.5s" } as any}>
              <div className={`${styles.planetBody} ${styles.withRing}`} style={{ "--size": "24px", "--color": "#fad5a5" } as any} />
            </div>
            <div className={`${styles.orbit} ${styles.orbit7}`} style={{ "--duration": "19.5s" } as any}>
              <div className={styles.planetBody} style={{ "--size": "18px", "--color": "#4fd0e7" } as any} />
            </div>
            <div className={`${styles.orbit} ${styles.orbit8}`} style={{ "--duration": "22.5s" } as any}>
              <div className={styles.planetBody} style={{ "--size": "18px", "--color": "#4166f5" } as any} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
