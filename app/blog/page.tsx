import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { BlogSection } from "@/components/sections/BlogSection";

export const metadata = {
  title: "Blog | REHAS Astrology",
  description:
    "Read REHAS Astrology articles on spiritual guidance, astrology insights, and intentional living.",
  openGraph: {
    title: "Blog | REHAS Astrology",
    description:
      "Insights and guidance from REHAS Astrology on kundli, spiritual balance, and mindful living.",
    url: "https://rehas.in/blog",
  },
};

export default function BlogPage() {
  return (
    <div className="pageShell">
      <main>
        <div className="shell">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />
        </div>
        <BlogSection showAll />
      </main>
    </div>
  );
}
