import styles from "./FaqSection.module.css";
import SectionHeader from "../ui/SectionHeader";
import LineArtBackground from "../LineArtBackground";

const faqs = [
  {
    question: "What makes REHAS different?",
    answer: "The experience blends spiritual depth with calm clarity and modern professionalism. Our approach combines traditional Vedic wisdom with personalized, actionable guidance tailored to your unique circumstances.",
    category: "About",
  },
  {
    question: "Can I book a session online?",
    answer: "Yes. The booking flow is designed to be quick, simple, and welcoming. You can schedule a consultation from anywhere, at a time that works best for you.",
    category: "Booking",
  },
  {
    question: "Do you offer ongoing guidance?",
    answer: "Absolutely. Many clients choose recurring sessions for longer-term growth. Whether monthly check-ins or quarterly deep dives, we support your journey over time.",
    category: "Services",
  },
  {
    question: "What should I expect in a first consultation?",
    answer: "A warm introduction, a focused conversation, and a clear path for the guidance you are seeking. We listen, ask meaningful questions, and provide clear, practical insights.",
    category: "Experience",
  },
  {
    question: "Is the guidance suitable for personal or life decisions?",
    answer: "Yes. The sessions are designed to support emotional clarity, relationships, purpose, and important life choices. From career transitions to relationship matters, we guide you through it all.",
    category: "Services",
  },
  {
    question: "How do I prepare for a session?",
    answer: "Bring your questions, intentions, and any areas of life you would like to explore with openness. Having your birth details (date, time, place) ready helps us provide more precise guidance.",
    category: "Preparation",
  },
];

export function FaqSection() {
  return (
    <section id="faq" className={styles.faqSection}>
      <LineArtBackground variant="minimal" opacity={0.05} />
      
      <section className={styles.hero}>
        <SectionHeader 
          eyebrow="FAQ" 
          title="Questions that commonly come up." 
          subtitle="Everything you need to know before your first session, presented with calm clarity and a touch of elegance."
        />
      </section>

      <div className="shell">
        <div className={styles.faqList}>
          {faqs.map((faq, index) => (
            <details key={faq.question} className={styles.faqItem} style={{'--delay': `${index * 0.05}s`} as React.CSSProperties}>
              <summary>
                <div className={styles.summaryContent}>
                  <span className={styles.category}>{faq.category}</span>
                  <span className={styles.question}>{faq.question}</span>
                </div>
                <span className={styles.icon} aria-hidden="true" />
              </summary>
              <p className={styles.answer}>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
