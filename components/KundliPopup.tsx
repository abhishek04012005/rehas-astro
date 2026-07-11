"use client";

import { useState, useEffect } from "react";
import styles from "./KundliPopup.module.css";

interface KundliPopupProps {
  isOpen?: boolean;
  onClose?: () => void;
  mode?: "modal" | "page";
}

export default function KundliPopup({ isOpen = true, onClose = () => {}, mode = "modal" }: KundliPopupProps) {
  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    birth_date: "",
    birth_time: "",
    birth_place: "",
    website: "astrology.rehas.in",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Close on Escape key
  useEffect(() => {
    if (mode !== "modal" || !isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "full_name") {
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
      if (!form.full_name || !form.phone || !form.birth_date || !form.birth_time || !form.birth_place) {
        setError("All fields are required");
        setLoading(false);
        return;
      }

      const res = await fetch("/api/save-kundli", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        throw new Error(payload?.error || "Failed to submit");
      }

      setSuccess(true);
      setForm({
        full_name: "",
        phone: "",
        birth_date: "",
        birth_time: "",
        birth_place: "",
        website: "astrology.rehas.in",
      });

      setTimeout(() => {
        onClose();
        setSuccess(false);
      }, 2000);
    } catch (err: any) {
      setError(err?.message || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  if (mode !== "page" && !isOpen) return null;

  return (
    <div className={mode === "page" ? styles.pageWrapper : styles.overlay} onClick={mode === "modal" ? onClose : undefined}>
      <div className={mode === "page" ? styles.pageCard : styles.modal} onClick={mode === "modal" ? (e) => e.stopPropagation() : undefined}>
        {mode === "modal" && (
          <button className={styles.closeBtn} onClick={onClose}>
            ✕
          </button>
        )}

        <div className={styles.content}>
          <div className={styles.header}>
            <h2>Get Your Free Kundli</h2>
            <p>Unlock your cosmic blueprint with a personalized Kundli analysis</p>
          </div>

          {success && (
            <div className={styles.successMessage}>
              <p>✓ Kundli request submitted successfully! We'll contact you soon.</p>
            </div>
          )}

          {error && (
            <div className={styles.errorMessage}>
              <p>✗ {error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="full_name">Full Name *</label>
              <input
                id="full_name"
                name="full_name"
                type="text"
                value={form.full_name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="phone">Phone Number *</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                required
                placeholder="+919876543210 or 9876543210"
              />
            </div>

            <div className={styles.twoCol}>
              <div className={styles.formGroup}>
                <label htmlFor="birth_date">Birth Date *</label>
                <input
                  id="birth_date"
                  name="birth_date"
                  type="date"
                  value={form.birth_date}
                  onChange={handleChange}
                  max={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="birth_time">Birth Time *</label>
                <input
                  id="birth_time"
                  name="birth_time"
                  type="time"
                  value={form.birth_time}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="birth_place">Birth Place *</label>
              <input
                id="birth_place"
                name="birth_place"
                type="text"
                value={form.birth_place}
                onChange={handleChange}
                required
                placeholder="City, State, Country"
              />
            </div>

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? "Submitting..." : "Get My Free Kundli"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
