"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import servicesData from "@/data/services.json";
import styles from "./ServicesSection.module.css";
import SectionHeader from "../ui/SectionHeader";
import LineArtBackground from "../LineArtBackground";

const services = servicesData as Array<{
  id: string;
  title: string;
  slug: string;
  description: string;
  highlights: Array<{ title: string; description: string }>;
  image: string;
  imageAlt: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}>;

export function ServicesSection() {
  return (
    <section id="services" className={styles.services} aria-labelledby="services-heading">
      <div className={styles.backgroundLayer} aria-hidden="true">
        <LineArtBackground variant="minimal" opacity={0.06} />
      </div>

      <div className="shell">
        <SectionHeader
          eyebrow="Services"
          title="Support that meets you where you are."
          subtitle="Explore astrology services designed for clarity, guidance, and confident life decisions."
        />

        <div className={styles.serviceList}>
          {services.map((service, index) => (
            <motion.article
              key={service.id}
              className={styles.serviceItem}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
              whileHover={{ y: -4, scale: 1.01 }}
            >
              <div className={`${styles.visual} ${index % 2 === 1 ? styles.reverse : ""}`}>
                <div className={styles.imageWrap}>
                  <img src={service.image} alt={service.imageAlt} className={styles.image} />
                  <div className={styles.imageOverlay} aria-hidden="true" />
                </div>
              </div>

              <div className={styles.content}>
                <div className={styles.cardTop}>
                  <span className={styles.badge}>Astrology Service</span>
                  <span className={styles.meta}>Personal guidance</span>
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>

                <div className={styles.highlightsWrap}>
                  <p className={styles.highlightsLabel}>What this service includes</p>
                  <ul className={styles.highlights}>
                    {service.highlights.map((item) => (
                      <li key={item.title}>{item.title}</li>
                    ))}
                  </ul>
                </div>

                <div className={styles.actions}>
                  <Link href={service.primaryCta.href} className={`button button--primary ${styles.primaryAction}`}>
                    {service.primaryCta.label}
                  </Link>
                  <Link href={service.secondaryCta.href} className={`button button--secondary ${styles.secondaryAction}`}>
                    {service.secondaryCta.label}
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
