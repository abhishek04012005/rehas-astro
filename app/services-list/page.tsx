import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { ServicesSection } from "@/components/sections/ServicesSection";

export const metadata = {
  title: "Astrology Services | REHAS",
  description:
    "Browse REHAS astrology services including Vedic astrology, kundli analysis, and compatibility guidance designed to support clear decisions.",
  openGraph: {
    title: "Astrology Services | REHAS",
    description:
      "Discover REHAS astrology services for kundli analysis, relationship insight, and spiritual guidance.",
    url: "https://rehas.in/services-list",
  },
};

export default function ServicesListPage() {
  return (
    <div className="pageShell">
      <main>
        <div className="shell">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services" }]} />
        </div>
        <ServicesSection />
      </main>
    </div>
  );
}
