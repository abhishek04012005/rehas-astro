import Link from "next/link";
import { contactData } from "@/data/details";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default function PrivacyPolicyPage() {
  return (
    <main style={{ minHeight: "100vh", padding: "7rem 1.5rem 3rem", maxWidth: "900px", margin: "0 auto" }}>
      <div style={{ marginBottom: "2rem" }}>
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]} />
      </div>
      <h1 style={{ fontSize: "2rem", color: "var(--primary)", marginBottom: "1rem" }}>Privacy Policy</h1>
      <p style={{ lineHeight: 1.8, color: "var(--text-grey)" }}>
        REHAS Astrology respects your privacy and is committed to protecting the personal information you share with us.
        This Privacy Policy explains how we collect, use, store, and protect your data when you visit our website,
        submit an enquiry, request a kundli consultation, or contact us for support.
      </p>

      <h2 style={{ fontSize: "1.15rem", color: "var(--primary)", marginTop: "1.5rem", marginBottom: "0.5rem" }}>Information We Collect</h2>
      <p style={{ lineHeight: 1.8, color: "var(--text-grey)" }}>
        We may collect personal information such as your name, phone number, email address, birth details, location,
        and the message you send through our forms. We may also collect limited technical information such as your IP address,
        browser type, and usage data to improve the performance and security of our website.
      </p>

      <h2 style={{ fontSize: "1.15rem", color: "var(--primary)", marginTop: "1.5rem", marginBottom: "0.5rem" }}>How We Use Your Information</h2>
      <p style={{ lineHeight: 1.8, color: "var(--text-grey)" }}>
        Your information is used to respond to enquiries, provide astrology-related services, follow up with you regarding your request,
        improve our website experience, and comply with applicable legal or regulatory requirements. We do not sell your personal data.
      </p>

      <h2 style={{ fontSize: "1.15rem", color: "var(--primary)", marginTop: "1.5rem", marginBottom: "0.5rem" }}>Data Sharing and Storage</h2>
      <p style={{ lineHeight: 1.8, color: "var(--text-grey)" }}>
        We may share your information only with trusted service providers who help us operate our website and process enquiries,
        or where required by law. Your data is stored securely and retained only for as long as necessary to fulfill the purpose
        for which it was collected or as required by law.
      </p>

      <h2 style={{ fontSize: "1.15rem", color: "var(--primary)", marginTop: "1.5rem", marginBottom: "0.5rem" }}>Your Rights</h2>
      <p style={{ lineHeight: 1.8, color: "var(--text-grey)" }}>
        You may request access to, correction of, or deletion of your personal data at any time. If you wish to withdraw consent
        or limit how we use your information, please contact us using the details below.
      </p>

      <div style={{ marginTop: "1.5rem", padding: "1rem 1.25rem", border: "1px solid var(--border-light)", borderRadius: "12px", background: "var(--surface-alt)" }}>
        <h3 style={{ fontSize: "1rem", color: "var(--primary)", marginBottom: "0.5rem" }}>Contact Us</h3>
        <p style={{ lineHeight: 1.7, color: "var(--text-grey)", margin: "0.25rem 0" }}>
          Email: <a href={`mailto:${contactData.founder.email}`} style={{ color: "var(--primary)" }}>{contactData.founder.email}</a>
        </p>
        <p style={{ lineHeight: 1.7, color: "var(--text-grey)", margin: "0.25rem 0" }}>
          Phone: <a href="tel:+919517973153" style={{ color: "var(--primary)" }}>+91 9517973153</a>
        </p>
        <p style={{ lineHeight: 1.7, color: "var(--text-grey)", margin: "0.25rem 0" }}>
          Address: {contactData.founder.address}
        </p>
      </div>

      <Link href="/" style={{ display: "inline-block", marginTop: "1.5rem", color: "var(--primary)", fontWeight: 700 }}>
        Back to Home
      </Link>
    </main>
  );
}
