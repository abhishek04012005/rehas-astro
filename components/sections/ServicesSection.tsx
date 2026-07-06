"use client";

import { motion } from "framer-motion";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import styles from "./ServicesSection.module.css";
import SectionHeader from "../ui/SectionHeader";

const services = [
  {
    title: "Personal Guidance",
    description: "Thoughtful sessions that help you gain clarity and move forward with confidence.",
  },
  {
    title: "Spiritual Coaching",
    description: "Gentle structure for rituals, reflection, and long-term growth.",
  },
  {
    title: "Mindful Planning",
    description: "Practical support for life transitions, intention-setting, and calm decision-making.",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className={styles.services}>
      <div className="shell">
        <SectionHeader eyebrow="Services" title="Support that meets you where you are." />
        <div className={styles.cardGrid}>
          {services.map((service) => (
            <motion.article key={service.title} className={styles.card} whileHover={{ y: -4, scale: 1.01 }}>
              <FavoriteBorderIcon className="icon" />
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
