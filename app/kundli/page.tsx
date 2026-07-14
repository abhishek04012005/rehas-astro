import Breadcrumbs from "@/components/ui/Breadcrumbs";
import KundliPopup from "@/components/KundliPopup";

export default function KundliPage() {
  return (
    <div className="pageShell">
      <div className="shell">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Free Kundli" }]} />
      </div>
      <KundliPopup mode="page" />
    </div>
  );
}
