import styles from "./FaqSection.module.css";
import SectionHeader from "../ui/SectionHeader";

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
];

export function FaqSection() {
  return (
    <section id="faq" className={styles.faqSection}>
      <div className="shell">
        <div className={styles.faqGrid}>
          <SectionHeader eyebrow="FAQ" title="Questions that commonly come up." />
          <div className={styles.faqList}>
            {faqs.map((faq) => (
              <details key={faq.question} className={styles.faqItem}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
