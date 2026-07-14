"use client";

import { useState } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import styles from "@/components/sections/contact.module.css";
import servicesData from "@/data/services.json";
import LineArtBackground from "@/components/LineArtBackground";

export default function EnquiryPage() {
  const services = (servicesData as any).map((s: any) => s.title);

  const [form, setForm] = useState({ name: "", phone: "", service_type: services[0] ?? "General", submitted_from: "page", website: "rehas.in" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    // simple sanitization similar to contact form
    if (name === "name") {
      const sanitized = (value || "").replace(/[^A-Za-z\s]/g, "");
      setForm((p) => ({ ...p, [name]: sanitized }));
      return;
    }

    if (name === "phone") {
      let v = (value || "").trim();
      const hasPlus = v.startsWith("+");
      let digits = v.replace(/\D/g, "").slice(0, 15);
      const final = hasPlus ? `+${digits}` : digits;
      setForm((p) => ({ ...p, [name]: final }));
      return;
    }

    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (!form.name || !form.phone || !form.service_type) {
        setError("Please fill name, phone and select a service.");
        setLoading(false);
        return;
      }

      const res = await fetch("/api/save-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        throw new Error(payload?.error || "Failed to submit enquiry");
      }

      setSuccess(true);
      setForm({ name: "", phone: "", service_type: services[0] ?? "General", submitted_from: "page", website: "rehas.in" });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err: any) {
      setError(err?.message || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.contact}>
      <LineArtBackground variant="minimal" opacity={0.05} />

      <div className={`shell`}>
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Service Enquiry" }]} />
      </div>

      <section className={styles.hero}>
        <SectionHeader eyebrow="Enquiry" title="Quick Enquiry" subtitle="Send a quick enquiry and we'll get back to you." />
      </section>

      <div className={styles.container}>
        <div className={styles.centerWrapper}>
          <div className={`${styles.contactGrid} ${styles.centeredGrid}`}>
            <div className={styles.formSection}>
              {success && (
                <div className={styles.successMessage}>
                  <p>Enquiry submitted — we'll contact you soon.</p>
                </div>
              )}
              {error && (
                <div className={styles.errorMessage}>
                  <p>{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Name</label>
                  <input id="name" name="name" value={form.name} onChange={handleChange} required placeholder="Your Name" />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="phone">Phone</label>
                  <input id="phone" name="phone" value={form.phone} onChange={handleChange} required placeholder="+919876543210 or 9876543210" />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="service_type">Service</label>
                  <select id="service_type" name="service_type" value={form.service_type} onChange={handleChange}>
                    {services.map((s: string) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <button type="submit" className={styles.submitBtn} disabled={loading}>
                  {loading ? 'Sending...' : 'Send Enquiry'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
