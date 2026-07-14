"use client";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { AboutSection } from "@/components/sections/AboutSection";

export default function AboutPage() {
  return (
    <div className="pageShell">
      <main>
        <div className="shell">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />
        </div>
        <AboutSection />
      </main>
    </div>
  );
}
