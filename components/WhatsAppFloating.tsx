import React from "react";
import styles from "./WhatsAppFloating.module.css";

const PHONE = "919517973153";
const MESSAGE = encodeURIComponent("Hello — I'd like to schedule a consultation. Could you help?");
const WHATSAPP_URL = `https://wa.me/${PHONE}?text=${MESSAGE}`;

export default function WhatsAppFloating() {
  return (
    <a
      className={styles.fab}
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
    >
      <span className={styles.icon} aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.52 3.48A11.91 11.91 0 0012 0C5.373 0 .01 5.373.01 12.002c0 2.11.55 4.098 1.6 5.88L0 24l6.35-1.66A11.9 11.9 0 0012 24c6.627 0 11.99-5.373 11.99-11.998 0-3.2-1.25-6.2-3.47-8.82z" fill="#25D366"/>
          <path d="M17.08 14.26c-.3-.15-1.77-.86-2.04-.96-.27-.10-.46-.15-.65.15-.19.30-.73.96-.9 1.16-.17.19-.34.21-.64.07-.3-.15-1.27-.47-2.42-1.49-.9-.8-1.51-1.8-1.69-2.1-.18-.3-.02-.46.13-.61.13-.13.3-.34.45-.51.15-.17.2-.29.3-.48.1-.19.05-.37-.02-.52-.07-.15-.65-1.56-.89-2.14-.23-.56-.46-.48-.64-.49l-.55-.01c-.19 0-.5.07-.76.36-.26.29-1 1-1 2.44s1.03 2.84 1.17 3.04c.14.2 2.02 3.08 4.9 4.32 2.86 1.24 2.86.83 3.37.78.51-.06 1.64-.67 1.87-1.32.23-.65.23-1.2.16-1.32-.07-.12-.27-.19-.57-.34z" fill="#fff"/>
        </svg>
      </span>
      <span className={styles.label}>Chat</span>
    </a>
  );
}
