import styles from './SectionHeading.module.css';

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  level?: 1 | 2 | 3 | 4;
  align?: 'left' | 'center' | 'right';
  className?: string;
};

export default function SectionHeading({ eyebrow, title, subtitle, level = 2, align = 'left', className = '' }: Props) {
  const Tag = `h${level}` as any;
  const alignClass = align === 'center' ? styles.center : align === 'right' ? styles.right : '';

  return (
    <div className={`${styles.root} ${alignClass} ${className}`.trim()}>
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      <Tag className={styles.title}>{title}</Tag>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
}
