"use client";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { BlogSection } from "@/components/sections/BlogSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <div className="pageShell">
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <BlogSection />
        <FaqSection />
        <ContactSection />
      </main>
    </div>
  );
}
