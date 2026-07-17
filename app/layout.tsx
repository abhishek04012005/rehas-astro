import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "REHAS | Spiritual Guidance",
    template: "%s | REHAS Astrology",
  },
  description:
    "REHAS Astrology offers holistic Vedic guidance, kundli analysis, compatibility insight, and spiritual coaching with clarity and grace.",
  metadataBase: new URL("https://rehas.in"),
  openGraph: {
    title: "REHAS Astrology | Spiritual Guidance & Kundli Services",
    description:
      "Explore premium astrology services, kundli analysis, and personalized spiritual guidance from REHAS.",
    url: "https://rehas.in",
    siteName: "REHAS Astrology",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "REHAS Astrology | Spiritual Guidance",
    description:
      "Deep astrology services, kundli consultations, and mindful guidance to help you choose with confidence.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
