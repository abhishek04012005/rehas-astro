import styles from './SectionHeader.module.css';

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  level?: 1 | 2 | 3 | 4;
  align?: 'left' | 'center' | 'right';
};

export default function SectionHeader({ eyebrow, title, subtitle, level = 2, align = 'center' }: Props) {
  const Tag = `h${level}` as any;
  const alignClass = align === 'left' ? styles.left : align === 'right' ? styles.right : styles.center;

  return (
    <div className={`${styles.sectionIntro} ${alignClass}`.trim()}>
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      <Tag className={styles.title}>{title}</Tag>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
}
