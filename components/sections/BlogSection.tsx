"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import styles from "./BlogSection.module.css";
import SectionHeader from "../ui/SectionHeader";
import postsData from "@/data/blogPosts.json";

export function BlogSection({ showAll = false }: { showAll?: boolean }) {
  const visiblePosts = showAll ? postsData : postsData.slice(0, 3);

  return (
    <section id="blog" className={styles.blog}>
      <div className="shell">
        <SectionHeader
          eyebrow="Insights"
          title="Thoughtful articles for your next step."
          subtitle="Explore perspectives on spiritual guidance, personal growth, and intentional living to support your journey."
        />
        <div className={styles.cardGrid}>
          {visiblePosts.map((post) => (
            <motion.article key={post.slug} className={styles.card} whileHover={{ y: -4, scale: 1.01 }}>
              <div className={styles.imageWrap}>
                <Image src={post.image} alt={post.title} fill sizes="(max-width: 900px) 100vw, 33vw" className={styles.image} />
              </div>
              <div className={styles.content}>
                <p className={styles.meta}>{post.category} · {post.readingTime}</p>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <div className={styles.actions}>
                  <Link href={`/blog/${post.slug}`} className={styles.primaryButton}>
                    Read Blog
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {!showAll && (
          <div className={styles.moreWrap}>
            <Link href="/blog" className={styles.moreButton}>
              More Blogs
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
