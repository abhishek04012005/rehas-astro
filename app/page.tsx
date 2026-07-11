"use client";
import { useState, useEffect } from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { BlogSection } from "@/components/sections/BlogSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { ContactSection } from "@/components/sections/ContactSection";
import KundliPopup from "@/components/KundliPopup";

export default function Home() {
  const [showKundliPopup, setShowKundliPopup] = useState(false);

  useEffect(() => {
    setShowKundliPopup(true);
  }, []);

  return (
    <div className="pageShell">
      <main>
        <HeroSection onOpenKundli={() => setShowKundliPopup(true)} />
        <AboutSection />
        <ServicesSection />
        <BlogSection />
        <FaqSection />
        <ContactSection />
      </main>
      <KundliPopup isOpen={showKundliPopup} onClose={() => setShowKundliPopup(false)} />
    </div>
  );
}
