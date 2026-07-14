import Link from "next/link";
import Image from "next/image";
import blogPosts from "@/data/blogPosts.json";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import styles from "./page.module.css";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    return {
      title: "Blog Post Not Found | REHAS Astrology",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: `${post.title} | REHAS Blog`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | REHAS Blog`,
      description: post.excerpt,
      url: `https://rehas.in/blog/${post.slug}`,
      type: "article",
      images: [
        {
          url: post.image ? `https://rehas.in${post.image}` : "https://rehas.in/images/vedic.png",
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | REHAS Blog`,
      description: post.excerpt,
    },
  };
}

export default function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  return <BlogDetailContent params={params} />;
}

async function BlogDetailContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    image: [`https://rehas.in${post.image}`],
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "REHAS Astrology",
      logo: {
        "@type": "ImageObject",
        url: "https://rehas.in/images/vedic.png",
      },
    },
    datePublished: new Date(post.publishedAt).toISOString(),
    dateModified: new Date(post.publishedAt).toISOString(),
    description: post.excerpt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://rehas.in/blog/${post.slug}`,
    },
  };

  return (
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className={styles.wrapper}>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: post.title },
          ]}
        />
        <Link href="/blog" className={styles.backLink}>
          ← Back to all blogs
        </Link>

        <article className={styles.postCard}>
          <div className={styles.imageWrapper}>
            <Image src={post.image} alt={post.title} fill sizes="(max-width: 1280px) 100vw, 1280px" className={styles.heroImage} />
          </div>

          <div className={styles.postBody}>
            <div className={styles.postMeta}>
              <span className={styles.categoryTag}>{post.category}</span>
              <span>•</span>
              <span>{post.readingTime}</span>
              <span>•</span>
              <span>{post.publishedAt}</span>
              <span>•</span>
              <span>{post.author}</span>
            </div>

            <h1 className={styles.postTitle}>{post.title}</h1>
            <p className={styles.postExcerpt}>{post.excerpt}</p>

            <div className={styles.introCard}>
              <p className={styles.sectionTitle}>Introduction</p>
              <p className={styles.introText}>{post.intro}</p>
            </div>

            <div className={styles.highlightsBlock}>
              <h2 className={styles.sectionTitle}>Key highlights</h2>
              <ul className={styles.highlightsList}>
                {post.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div style={{ display: "grid", gap: "1.2rem" }}>
              {post.sections.map((section) => (
                <section key={section.title} className={styles.sectionCard}>
                  <h2 className={styles.sectionTitle}>{section.title}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className={styles.sectionParagraph}>{paragraph}</p>
                  ))}
                </section>
              ))}
            </div>

            <div className={styles.conclusionCard}>
              <h2 className={styles.sectionTitle}>Final reflection</h2>
              <p className={styles.conclusionText}>{post.conclusion}</p>
            </div>

            <div className={styles.hashtagSection}>
              <p className={styles.hashtagLabel}>SEO hashtags</p>
              <div className={styles.hashtags}>
                {post.seoHashtags.map((hashtag) => (
                  <span key={hashtag} className={styles.hashtag}>{hashtag}</span>
                ))}
              </div>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
