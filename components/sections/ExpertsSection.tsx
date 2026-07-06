"use client";

import { motion } from "framer-motion";
import styles from "./ExpertsSection.module.css";
import SectionHeader from "../ui/SectionHeader";

const experts = [
  {
    name: "Mira Lee",
    role: "Senior Spiritual Guide",
    bio: "Experienced in soulful coaching and meaningful life transitions.",
  },
  {
    name: "Arun Shah",
    role: "Wellness Mentor",
    bio: "Blends calm reflection with structured, grounded support.",
  },
  {
    name: "Nadia Khan",
    role: "Meditation Specialist",
    bio: "Known for intuitive, compassionate guidance and tailored rituals.",
  },
];

export function ExpertsSection() {
  return (
    <section id="experts" className={styles.experts}>
      <div className="shell">
        <SectionHeader eyebrow="Experts" title="Meet the people behind the guidance." />
        <div className={styles.cardGrid}>
          {experts.map((expert) => (
            <motion.article key={expert.name} className={`${styles.card} ${styles.cardAccent}`} whileHover={{ y: -4, scale: 1.01 }}>
              <h3>{expert.name}</h3>
              <p className={styles.cardMeta}>{expert.role}</p>
              <p>{expert.bio}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
