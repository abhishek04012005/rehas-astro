"use client";

import { motion } from "framer-motion";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import Link from "next/link";
import styles from "./BlogSection.module.css";
import SectionHeader from "../ui/SectionHeader";

const posts = [
  {
    title: "How intention-setting creates calmer weeks",
    excerpt: "A simple framework for bringing peace into everyday routines.",
  },
  {
    title: "What a spiritual reset can look like",
    excerpt: "Small rituals that help you reconnect with clarity and purpose.",
  },
  {
    title: "Choosing guidance that feels aligned",
    excerpt: "What to look for when selecting a mentor or advisor.",
  },
];

export function BlogSection() {
  return (
    <section id="blog" className={styles.blog}>
      <div className="shell">
        <SectionHeader eyebrow="Insights" title="Thoughtful articles for your next step." />
        <div className={styles.cardGrid}>
          {posts.map((post) => (
            <motion.article key={post.title} className={styles.card} whileHover={{ y: -4, scale: 1.01 }}>
              <ArticleOutlinedIcon className="icon" />
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <Link href="#contact" className="textLink">
                Read more
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
