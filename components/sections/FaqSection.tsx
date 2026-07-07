import styles from "./FaqSection.module.css";
import SectionHeader from "../ui/SectionHeader";
import LineArtBackground from "../LineArtBackground";

const faqs = [
  {
    question: "What makes REHAS different?",
    answer: "The experience blends spiritual depth with calm clarity and modern professionalism.",
  },
  {
    question: "Can I book a session online?",
    answer: "Yes. The booking flow is designed to be quick, simple, and welcoming.",
  },
  {
    question: "Do you offer ongoing guidance?",
    answer: "Absolutely. Many clients choose recurring sessions for longer-term growth.",
  },
  {
    question: "What should I expect in a first consultation?",
    answer: "A warm introduction, a focused conversation, and a clear path for the guidance you are seeking.",
  },
  {
    question: "Is the guidance suitable for personal or life decisions?",
    answer: "Yes. The sessions are designed to support emotional clarity, relationships, purpose, and important life choices.",
  },
  {
    question: "How do I prepare for a session?",
    answer: "Bring your questions, intentions, and any areas of life you would like to explore with openness.",
  },
];

export function FaqSection() {
  return (
    <section id="faq" className={styles.faqSection}>
      <div className={styles.backgroundLayer} aria-hidden="true">
        <LineArtBackground variant="minimal" opacity={0.05} />
      </div>

      <div className="shell">
        <div className={styles.headerBlock}>
          <SectionHeader eyebrow="FAQ" title="Questions that commonly come up." />
          <p className={styles.introCopy}>
            Everything you need to know before your first session, presented with calm clarity and a touch of elegance.
          </p>
          <div className={styles.introBadge}>Personal guidance · Online sessions · Ongoing support</div>
        </div>

        <div className={styles.faqList}>
          {faqs.map((faq) => (
            <details key={faq.question} className={styles.faqItem}>
              <summary>
                <span>{faq.question}</span>
                <span className={styles.icon} aria-hidden="true">
                  +
                </span>
              </summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
