"use client";

import Link from "next/link";
import LineArtBackground from "@/components/LineArtBackground";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import styles from "./serviceDetail.module.css";

interface ServiceDetailPageProps {
  service: {
    slug?: string;
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    highlights?: Array<{ title: string; description: string }>;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    heroSummary?: string[];
    heroBadge?: string;
    overviewIntro?: {
      eyebrow: string;
      title: string;
      text: string;
    };
    experienceSection?: {
      eyebrow: string;
      title: string;
      text: string;
      processSteps: Array<{ title: string; text: string }>;
    };
    detailsHeading?: {
      eyebrow: string;
      title: string;
    };
    consultSection?: {
      eyebrow: string;
      title: string;
      buttonLabel: string;
      buttonHref: string;
    };
    detailSections?: Array<{
      title: string;
      intro: string;
      items: Array<{ title: string; description: string }>;
    }>;
  };
}

export default function ServiceDetailPage({ service }: ServiceDetailPageProps) {
  const overviewPoints = service.highlights ?? [];
  const heroSummary = service.heroSummary ?? [];
  const heroBadge = service.heroBadge ?? "Deep Service Review";
  const overviewIntro = service.overviewIntro ?? {
    eyebrow: "What you will explore",
    title: "Full clarity across every major life area.",
    text: "This service is created to help you see the true meaning behind your chart, understand the timing of key moments, and make confident decisions for what comes next.",
  };
  const experienceSection = service.experienceSection ?? {
    eyebrow: "How the session works",
    title: "A smooth, professional process from first call to final guidance.",
    text: "We keep the experience calm and useful: exact astrology data, clear explanation, and a plan you can follow.",
    processSteps: [
      {
        title: "Step 1 — Share the essentials",
        text: "Provide your birth date, time and location so the analysis can be built on exact chart data.",
      },
      {
        title: "Step 2 — Explore the themes",
        text: "Review the astrology guidance for your career, relationships, health, and the timing ahead.",
      },
      {
        title: "Step 3 — Receive a clear plan",
        text: "Get practical suggestions, meaningful timings, and the next actions that feel aligned with your life path.",
      },
    ],
  };
  const detailsHeading = service.detailsHeading ?? {
    eyebrow: "Detailed coverage",
    title: "In-depth explanations for every category we analyze.",
  };
  const consultSection = service.consultSection ?? {
    eyebrow: "Ready for the next step?",
    title: "Schedule your expert consultation and get a clear, calm plan for your future.",
    buttonLabel: "Speak with our expert",
    buttonHref: "tel:+919517973153",
  };

  const schemaPayload = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: {
      "@type": "Organization",
      name: "REHAS Astrology",
      url: "https://rehas.in",
    },
    serviceType: service.title,
    url: service.slug ? `https://rehas.in/services/${service.slug}` : "https://rehas.in/services",
    image: service.image ? `https://rehas.in${service.image}` : undefined,
    areaServed: {
      "@type": "Country",
      name: "India",
    },
  };

  return (
    <div className="pageShell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaPayload) }}
      />
      <main>
        <div className="shell">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Services", href: "/services-list" },
              { label: service.title },
            ]}
          />
        </div>
        <section className={styles.hero}>
          <LineArtBackground variant="minimal" opacity={0.08} />
          <div className={`shell ${styles.heroContent}`}>
            <div className={styles.heroText}>
              <p className={styles.eyebrow}>Astrology Service</p>
              <h1>{service.title}</h1>
              <p className={styles.heroSubtitle}>{service.description}</p>
              <div className={styles.heroSummary}>
                {heroSummary.map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
              <div className={styles.heroActions}>
                <Link href={service.secondaryCta.href} className={`button button--primary ${styles.consultCta}`}>
                  {service.secondaryCta.label}
                </Link>
              </div>
            </div>

            <div className={styles.heroVisual}>
              {/* <div className={styles.heroBadge}>
                <span>{heroBadge}</span>
              </div> */}
              <img src={service.image} alt={service.imageAlt} className={styles.heroImage} />
            </div>
          </div>
        </section>

        <section className={styles.splitSection}>
          <div className="shell">
            <div className={styles.splitContent}>
              <div className={styles.splitCard}>
                {/* <p className={styles.eyebrow}>{overviewIntro.eyebrow}</p> */}
                <h2>{overviewIntro.title}</h2>
                <p>{overviewIntro.text}</p>
              </div>

              <div className={styles.splitCardSecondary}>
                {overviewPoints.map((point) => (
                  <div key={point.title} className={styles.splitPoint}>
                    <h3>{point.title}</h3>
                    <p>{point.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className={styles.experienceSection}>
          <div className="shell">
            <div className={styles.sectionHeaderGrid}>
              <div>
                <p className={styles.eyebrow}>{experienceSection.eyebrow}</p>
                <h2>{experienceSection.title}</h2>
              </div>
              <p className={styles.sectionSubtext}>{experienceSection.text}</p>
            </div>

            <div className={styles.processGrid}>
              {experienceSection.processSteps.map((step) => (
                <article key={step.title} className={styles.processCard}>
                  <h4>{step.title}</h4>
                  <p>{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.detailsSection}>
          <div className="shell">
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>{detailsHeading.eyebrow}</p>
              <h2>{detailsHeading.title}</h2>
            </div>
            <div className={styles.detailsGrid}>
              {service.detailSections?.map((section, index) => (
                <article key={`${section.title}-${index}`} className={styles.card}>
                  <h3>{section.title}</h3>
                  <p>{section.intro}</p>
                  <div className={styles.detailExplanation}>
                    {section.items.map((item) => (
                      <div key={item.title} className={styles.detailPoint}>
                        <h4>{item.title}</h4>
                        <p>{item.description}</p>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.consultSection}>
          <div className={`shell ${styles.consultCard}`}>
            <div>
              <p className={styles.eyebrow}>{consultSection.eyebrow}</p>
              <h2>{consultSection.title}</h2>
            </div>
            <Link href={consultSection.buttonHref} className={`button button--primary `}>
              {consultSection.buttonLabel}
            </Link>
          </div>
        </section>
      </main>

    </div>
  );
}
