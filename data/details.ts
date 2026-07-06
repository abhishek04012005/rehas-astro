// ============================================
// CONTACT COMPONENT DATA
// ============================================
export const contactData = {
  hero: {
    title: "Get in Touch",
    subtitle: "We'd love to hear from you. Reach out to us anytime.",
  },
  info: {
    title: "Contact Information",
    description:
      "Have questions? We're here to help and answer any question you might have.",
    cards: [
      {
        icon: "Email",
        title: "Email",
        value: "contact@rehas.in",
        link: "mailto:contact@rehas.in",
        secondaryText: "We'll respond within 24 hours",
      },
      {
        icon: "Phone",
        title: "Phone",
        value: "+91 9517973153",
        link: "tel:+919517973153",
        secondaryText: "24 hours",
      },
      {
        icon: "WhatsApp",
        title: "WhatsApp",
        value: "+91 9517973153",
        link: "https://wa.me/919517973153",
        secondaryText: "Quick responses via WhatsApp",
      },
      {
        icon: "LocationOn",
        title: "Location",
        value: "REHAS, Chanakya Nagar Road, Agam Kua",
        link: null,
        secondaryText: "Patna, Bihar, India - 800007",
      },
    ],
  },
  socials: [
    {
      platform: "Instagram",
      href: "https://instagram.com/rehas",
    },
    {
      platform: "LinkedIn",
      href: "https://linkedin.com/company/rehas",
    },
    {
      platform: "Facebook",
      href: "https://facebook.com/rehas",
    },
    {
      platform: "YouTube",
      href: "https://youtube.com/rehas",
    },
  ],
  founder: {
    name: "Amit Sharma",
    title: "Founder, REHAS",
    address: "Chanakya Nagar Road, Agam Kua, Patna, Bihar, India - 800007",
    email: "contact@rehas.in",
  },
};

export const aboutData = {
  story: {
    cards: [
      {
        title: "Tuned to your rhythm",
        description:
          "Sessions are designed around your pace, priorities, and real-life season.",
      },
      {
        title: "Ancient insight, modern clarity",
        description:
          "We blend time-honored guidance with practical support for today.",
      },
      {
        title: "Safe, grounded support",
        description:
          "A calm, compassionate space for change that feels steady and wise.",
      },
      {
        title: "Meaningful transformation",
        description:
          "Every step is focused on growth that feels honest, lasting, and aligned.",
      },
    ],
  },
} as const;
