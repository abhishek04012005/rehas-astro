'use client';

import { useState } from 'react';
import { Phone, Email, LocationOn, Send, CheckCircle } from '@mui/icons-material';
import LineArtBackground from '../LineArtBackground';
import { contactData } from '@/data/details';
import styles from './contact.module.css';
import SectionHeader from '../ui/SectionHeader';

export function ContactSection() {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Restrict name to letters and spaces only
    if (name === 'name') {
      const sanitized = (value || '').replace(/[^A-Za-z\s]/g, '');
      setFormData((prev) => ({ ...prev, [name]: sanitized }));
      setError('');
      return;
    }

    // Restrict phone to optional leading + and up to 15 digits
    if (name === 'phone') {
      let v = value || '';
      v = v.trim();
      const hasPlus = v.startsWith('+');
      // Remove all non-digit characters
      let digits = v.replace(/\D/g, '');
      // Limit digits to 15
      digits = digits.slice(0, 15);
      const final = hasPlus ? `+${digits}` : digits;
      setFormData((prev) => ({ ...prev, [name]: final }));
      setError('');
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Normalize and validate phone number: allow optional leading + and 7-15 digits
      const rawPhone = (formData.phone || '').trim();
      const hasPlus = rawPhone.startsWith('+');
      const digitsOnly = rawPhone.replace(/\D/g, '');
      // Keep leading + if present, otherwise leave as digits (user-provided)
      const normalized = hasPlus ? `+${digitsOnly}` : `${digitsOnly}`;

      const e164Like = /^\+?\d{7,15}$/;
      if (!e164Like.test(normalized)) {
        setError('Enter a valid phone number (7–15 digits, optional leading +).');
        setLoading(false);
        return;
      }

      // POST to API route (server will store in Supabase)
      const res = await fetch('/api/save-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // send normalized phone (preserve leading + if provided)
        body: JSON.stringify({ ...formData, phone: normalized, status: 'new' }),
      });

      if (!res.ok) {
        // Try to parse JSON, otherwise read text for error details
        let errMsg = 'Failed to submit';
        try {
          const payload = await res.json();
          if (payload && payload.error) errMsg = payload.error;
          else errMsg = JSON.stringify(payload || errMsg);
        } catch {
          const txt = await res.text().catch(() => '');
          if (txt) errMsg = txt;
        }
        throw new Error(errMsg);
      }

      setSubmitted(true);
      setFormData({ name: '', phone: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err: any) {
      console.error('Error submitting form:', err);
      setError(err.message || 'An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      Email: <Email />,
      Phone: <Phone />,
      LocationOn: <LocationOn />,
    };
    return icons[iconName] || null;
  };

  // keep simple: users enter their full number (with or without +)

  return (
    <div className={styles.contact}>
      <LineArtBackground variant="minimal" opacity={0.05} />
      <section className={styles.hero}>
        <SectionHeader
          eyebrow="Contact Us"
          title={contactData.hero.title}
          subtitle={contactData.hero.subtitle}
          level={1}
        />
      </section>

      <div className={styles.container}>
        <div className={styles.contactGrid}>
          <div className={styles.infoSection}>
            <SectionHeader title={contactData.info.title} subtitle={contactData.info.description} />

            <div className={styles.infoCards}>
              {contactData.info.cards.map((card, idx) => (
                <div className={styles.infoCard} key={idx}>
                  <div className={styles.iconWrapper}>{getIconComponent(card.icon)}</div>
                  <div>
                    <h3>{card.title}</h3>
                    <p>
                      {card.link ? <a href={card.link}>{card.value}</a> : card.value}
                    </p>
                    <p className={styles.secondaryText}>{card.secondaryText}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.formSection}>
            <SectionHeader title={(contactData as any).form?.title ?? 'Contact Us'} subtitle={(contactData as any).form?.description ?? 'Get in touch with us today.'} />

            {submitted && (
              <div className={styles.successMessage}>
                <CheckCircle />
                <p>{(contactData as any).form?.successMessage ?? 'Thanks! We will be in touch.'}</p>
              </div>
            )}

            {error && (
              <div className={styles.errorMessage}>
                <p>{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className={styles.form}>
              {(
                (contactData as any).form?.fields ?? [
                  { name: 'name', label: 'Name', type: 'text', required: true, placeholder: 'Your Name' },
                  { name: 'phone', label: 'Phone', type: 'tel', required: true, placeholder: 'Your Phone Number' },
                  { name: 'message', label: 'Message', type: 'textarea', required: true, placeholder: 'Your Message' },
                ]
              ).map((field: any, idx: number) => (
                <div className={styles.formGroup} key={idx}>
                  <label htmlFor={field.name}>{field.label}</label>
                  {field.type === 'textarea' ? (
                    <textarea
                      id={field.name}
                      name={field.name}
                      value={formData[field.name as keyof typeof formData] as string}
                      onChange={handleChange}
                      required={field.required}
                      placeholder={field.placeholder}
                      rows={field.rows || 4}
                    />
                  ) : (
                    <input
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      value={formData[field.name as keyof typeof formData] as string}
                      onChange={handleChange}
                      required={field.required}
                      placeholder={field.placeholder}
                    />
                  )}
                </div>
              ))}

              <button type="submit" className={styles.submitBtn} disabled={loading}>
                {loading ? (
                  'Sending...'
                ) : (
                  <>
                    <Send />
                    {(contactData as any).form?.submitButton ?? 'Send'}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
