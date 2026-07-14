import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { FaqSection } from "@/components/sections/FaqSection";

export const metadata = {
  title: "FAQ | REHAS Astrology",
  description:
    "Frequently asked questions about REHAS astrology services, kundli analysis, consultation preparation, and ongoing guidance.",
  openGraph: {
    title: "FAQ | REHAS Astrology",
    description:
      "Answers to common questions about astrology sessions, Kundli requests, and how REHAS works.",
    url: "https://rehas.in/faq",
  },
};

export default function FaqPage() {
  return (
    <div className="pageShell">
      <main>
        <div className="shell">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "FAQ" }]} />
        </div>
        <FaqSection />
      </main>
    </div>
  );
}
