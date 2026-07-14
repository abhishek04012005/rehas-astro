"use client";
import { ContactSection } from "@/components/sections/ContactSection";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default function ContactPage() {
  return (
    <div className="pageShell">
      <main>
        <div className="shell">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
        </div>
        <ContactSection />
      </main>
    </div>
  );
}
