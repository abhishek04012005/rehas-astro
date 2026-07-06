import styles from "./AboutSection.module.css";
import { aboutData } from "@/data/details";
import LineArtBackground from "../LineArtBackground";
import SectionHeader from "../ui/SectionHeader";
import {
  AutoAwesome,
  CompassCalibration,
  Lightbulb,
  Favorite,
  TrendingUp,
  EmojiEvents,
  Verified,
  LocalFlorist,
  Star,
} from "@mui/icons-material";

const valueItems = [
  {
    icon: AutoAwesome,
    title: "Ancient Wisdom",
    description: "Rooted in Vedic astrology traditions spanning millennia",
  },
  {
    icon: CompassCalibration,
    title: "Personalized Guidance",
    description: "Sessions tailored to your unique birth chart and life path",
  },
  {
    icon: Lightbulb,
    title: "Practical Insights",
    description: "Actionable clarity for real-world decisions and challenges",
  },
  {
    icon: Favorite,
    title: "Compassionate Support",
    description: "Safe, non-judgmental space for meaningful transformation",
  },
];

export function AboutSection() {
  return (
    <section id="about" className={`${styles.about} ${styles.muted}`}>
      <LineArtBackground variant="minimal" opacity={0.06} />

      <div className={`shell ${styles.content}`}>
        {/* Section Header */}
        <SectionHeader
          eyebrow="About REHAS"
          title="Clarity Through Cosmic Connection"
          subtitle={`REHAS bridges ancient Vedic astrology with modern guidance, offering personalized sessions designed to illuminate your path, clarify decisions, and foster meaningful progress aligned with your unique life journey.`}
        />

        {/* Story Cards - Values */}
        <div className={styles.storyGrid}>
          {aboutData.story.cards.map((card, index) => (
            <div key={index} className={styles.storyCard}>
              <div className={styles.cardIcon}>
                {index === 0 && <CompassCalibration />}
                {index === 1 && <Lightbulb />}
                {index === 2 && <Favorite />}
                {index === 3 && <TrendingUp />}
              </div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
          ))}
        </div>

        {/* Why Choose REHAS */}
        <div className={styles.whyChoose}>
          <SectionHeader title="Why Choose REHAS" />
          <div className={styles.valuesTimeline}>
            {valueItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className={`${styles.timelineItem} ${styles.left}`}>
                  <div className={styles.timelineIcon}>
                    <Icon />
                  </div>
                  <div className={styles.timelineContent}>
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mission Statement */}
        <div className={styles.mission}>
          <SectionHeader title="Our Mission" />
          <div className={styles.missionContent}>
            <p>
              At REHAS, we believe that clarity emerges when ancient cosmic wisdom
              meets personal reflection. Through personalized astrology guidance, we
              help you understand your strengths, navigate challenges, and make
              decisions that feel authentically aligned with your path.
            </p>
            <p>
              Every reading is an opportunity for deeper self-awareness and
              meaningful transformation—grounded in compassion, rooted in tradition,
              and focused on your real-world progress.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
