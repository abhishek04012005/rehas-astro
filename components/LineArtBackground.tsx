'use client';

import {
  Star,
  Public,
  AcUnit,
  Opacity,
  LocalFireDepartment,
  Air,
  Favorite,
  Scale,
  Pets,
  Architecture,
  Psychology,
} from '@mui/icons-material';
import styles from './LineArtBackground.module.css';

interface LineArtBackgroundProps {
  variant?: 'default' | 'minimal' | 'dense';
  opacity?: number;
}

export default function LineArtBackground({
  variant = 'default',
  opacity = 0.08,
}: LineArtBackgroundProps) {
  const AstrologyIcons = [
    { Icon: LocalFireDepartment, position: { top: '10%', left: '5%' } }, // Aries
    { Icon: AcUnit, position: { top: '15%', right: '8%' } }, // Taurus
    { Icon: Air, position: { top: '30%', left: '12%' } }, // Gemini
    { Icon: Opacity, position: { top: '25%', right: '15%' } }, // Cancer
    { Icon: Favorite, position: { bottom: '20%', left: '8%' } }, // Leo
    { Icon: Star, position: { bottom: '15%', right: '10%' } }, // Virgo
    { Icon: Scale, position: { top: '50%', left: '6%' } }, // Libra
    { Icon: Pets, position: { top: '55%', right: '7%' } }, // Scorpio
    { Icon: Architecture, position: { bottom: '35%', left: '15%' } }, // Sagittarius
    { Icon: Public, position: { bottom: '40%', right: '12%' } }, // Capricorn
    { Icon: Psychology, position: { top: '70%', left: '10%' } }, // Aquarius
  ];

  return (
    <div className={`${styles.container} ${styles[variant]}`} style={{ opacity }}>
      {/* SVG Background with Astrological Patterns */}
      <svg
        className={styles.svgBackground}
        viewBox="0 0 1200 400"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Zodiac Circle */}
        <circle
          cx="600"
          cy="200"
          r="180"
          fill="none"
          stroke="var(--primary)"
          strokeWidth="1"
          opacity="0.3"
        />
        <circle
          cx="600"
          cy="200"
          r="150"
          fill="none"
          stroke="var(--secondary)"
          strokeWidth="0.8"
          opacity="0.2"
        />
        <circle
          cx="600"
          cy="200"
          r="120"
          fill="none"
          stroke="var(--primary)"
          strokeWidth="0.6"
          opacity="0.15"
        />

        {/* Zodiac Division Lines */}
        {[...Array(12)].map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const x1 = String((600 + 150 * Math.cos(angle)).toFixed(2));
          const y1 = String((200 + 150 * Math.sin(angle)).toFixed(2));
          const x2 = String((600 + 180 * Math.cos(angle)).toFixed(2));
          const y2 = String((200 + 180 * Math.sin(angle)).toFixed(2));
          return (
            <line
              key={`zodiac-line-${i}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="var(--secondary)"
              strokeWidth="1"
              opacity="0.3"
            />
          );
        })}

        {/* Constellation-like connected dots */}
        <g opacity="0.4" stroke="var(--primary)" strokeWidth="0.8">
          {/* Aries constellation */}
          <circle cx="100" cy="50" r="2" fill="var(--primary)" />
          <circle cx="130" cy="45" r="2" fill="var(--primary)" />
          <circle cx="150" cy="70" r="2" fill="var(--primary)" />
          <line x1="100" y1="50" x2="130" y2="45" />
          <line x1="130" y1="45" x2="150" y2="70" />

          {/* Libra constellation */}
          <circle cx="1050" cy="120" r="2" fill="var(--secondary)" />
          <circle cx="1100" cy="100" r="2" fill="var(--secondary)" />
          <circle cx="1120" cy="150" r="2" fill="var(--secondary)" />
          <line x1="1050" y1="120" x2="1100" y2="100" />
          <line x1="1100" y1="100" x2="1120" y2="150" />

          {/* Gemini constellation */}
          <circle cx="200" cy="280" r="2" fill="var(--primary)" />
          <circle cx="240" cy="260" r="2" fill="var(--primary)" />
          <circle cx="270" cy="300" r="2" fill="var(--primary)" />
          <line x1="200" y1="280" x2="240" y2="260" />
          <line x1="240" y1="260" x2="270" y2="300" />
        </g>

        {/* Celestial elements - stars */}
        <circle cx="50" cy="30" r="1.5" fill="var(--primary)" opacity="0.7" />
        <circle cx="180" cy="80" r="1" fill="var(--secondary)" opacity="0.5" />
        <circle cx="320" cy="120" r="1.2" fill="var(--primary)" opacity="0.6" />
        <circle cx="1000" cy="50" r="1.5" fill="var(--secondary)" opacity="0.7" />
        <circle cx="1150" cy="200" r="1" fill="var(--primary)" opacity="0.5" />
        <circle cx="950" cy="340" r="1.2" fill="var(--primary)" opacity="0.6" />
        <circle cx="150" cy="350" r="1.5" fill="var(--secondary)" opacity="0.7" />

        {/* Moon phases */}
        <circle cx="450" cy="80" r="12" fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.4" />
        <path
          d="M 450 68 A 12 12 0 0 0 450 92 A 12 12 0 0 1 450 68"
          fill="var(--accent)"
          opacity="0.2"
        />

        {/* Sun symbol */}
        <circle cx="350" cy="300" r="15" fill="none" stroke="var(--primary)" strokeWidth="1.5" opacity="0.4" />
        <line x1="350" y1="280" x2="350" y2="260" stroke="var(--primary)" strokeWidth="1" opacity="0.3" />
        <line x1="350" y1="320" x2="350" y2="340" stroke="var(--primary)" strokeWidth="1" opacity="0.3" />
        <line x1="330" y1="300" x2="310" y2="300" stroke="var(--primary)" strokeWidth="1" opacity="0.3" />
        <line x1="370" y1="300" x2="390" y2="300" stroke="var(--primary)" strokeWidth="1" opacity="0.3" />

        {/* Wave pattern (water element) */}
        <path
          d="M 0 350 Q 30 340 60 350 T 120 350 T 180 350 T 240 350 T 300 350 T 360 350 T 420 350 T 480 350 T 540 350 T 600 350 T 660 350 T 720 350 T 780 350 T 840 350 T 900 350 T 960 350 T 1020 350 T 1080 350 T 1140 350 T 1200 350"
          fill="none"
          stroke="var(--secondary)"
          strokeWidth="1"
          opacity="0.3"
        />

        {/* Fire element (triangles) */}
        <path
          d="M 800 100 L 820 130 L 780 130 Z"
          fill="none"
          stroke="var(--primary)"
          strokeWidth="1"
          opacity="0.4"
        />
        <path
          d="M 1050 250 L 1070 280 L 1030 280 Z"
          fill="none"
          stroke="var(--secondary)"
          strokeWidth="1"
          opacity="0.3"
        />

        {/* Air element (horizontal lines) */}
        <line x1="500" y1="50" x2="700" y2="50" stroke="var(--primary)" strokeWidth="0.8" opacity="0.3" />
        <line x1="480" y1="70" x2="720" y2="70" stroke="var(--primary)" strokeWidth="0.8" opacity="0.2" />
        <line x1="520" y1="90" x2="680" y2="90" stroke="var(--primary)" strokeWidth="0.8" opacity="0.25" />
      </svg>

      {/* MUI Icons scattered as astrological symbols */}
      <div className={styles.iconContainer}>
        {AstrologyIcons.map((item, idx) => (
          <div
            key={idx}
            className={styles.iconWrapper}
            style={item.position}
          >
            <item.Icon className={styles.icon} />
          </div>
        ))}
      </div>
    </div>
  );
}
