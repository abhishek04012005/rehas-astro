import Link from "next/link";
import { contactData } from "@/data/details";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default function TermsOfServicePage() {
  return (
    <main style={{ minHeight: "100vh", padding: "7rem 1.5rem 3rem", maxWidth: "900px", margin: "0 auto" }}>
      <div style={{ marginBottom: "2rem" }}>
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Terms of Service" }]} />
      </div>
      <h1 style={{ fontSize: "2rem", color: "var(--primary)", marginBottom: "1rem" }}>Terms of Service</h1>
      <p style={{ lineHeight: 1.8, color: "var(--text-grey)" }}>
        By accessing or using the REHAS Astrology website, you agree to comply with these Terms of Service.
        These terms govern your use of our website, enquiry forms, astrology-related information, and any services requested through us.
      </p>

      <h2 style={{ fontSize: "1.15rem", color: "var(--primary)", marginTop: "1.5rem", marginBottom: "0.5rem" }}>Use of the Website</h2>
      <p style={{ lineHeight: 1.8, color: "var(--text-grey)" }}>
        You agree to use the website lawfully and responsibly. You will not submit false information, misuse the enquiry forms,
        or engage in activity that disrupts the functioning, security, or integrity of the website.
      </p>

      <h2 style={{ fontSize: "1.15rem", color: "var(--primary)", marginTop: "1.5rem", marginBottom: "0.5rem" }}>Service Requests and Consultations</h2>
      <p style={{ lineHeight: 1.8, color: "var(--text-grey)" }}>
        Any request submitted through the website, including kundli or consultation enquiries, is for informational and service-related purposes.
        We reserve the right to accept, decline, or delay any request if it appears inappropriate, incomplete, or inconsistent with our policies.
      </p>

      <h2 style={{ fontSize: "1.15rem", color: "var(--primary)", marginTop: "1.5rem", marginBottom: "0.5rem" }}>Content and Advice</h2>
      <p style={{ lineHeight: 1.8, color: "var(--text-grey)" }}>
        The content provided on this website is for general guidance and educational purposes only. It should not be considered a substitute
        for professional, medical, legal, financial, or psychological advice. Any decisions you make based on the content are your own responsibility.
      </p>

      <h2 style={{ fontSize: "1.15rem", color: "var(--primary)", marginTop: "1.5rem", marginBottom: "0.5rem" }}>Intellectual Property</h2>
      <p style={{ lineHeight: 1.8, color: "var(--text-grey)" }}>
        All content, branding, design, and materials on this website are the property of REHAS Astrology unless otherwise stated.
        You may not reproduce, distribute, or use them without prior written permission.
      </p>

      <h2 style={{ fontSize: "1.15rem", color: "var(--primary)", marginTop: "1.5rem", marginBottom: "0.5rem" }}>Limitation of Liability</h2>
      <p style={{ lineHeight: 1.8, color: "var(--text-grey)" }}>
        REHAS Astrology shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of the website,
        including any reliance on the information provided. This limitation applies to the maximum extent permitted by law.
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
