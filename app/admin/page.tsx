"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import SectionHeader from "@/components/ui/SectionHeader";
import LogoImage from "@/public/rehasastrology.svg";
import styles from "./AdminLoginPage.module.css";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        throw new Error(payload?.error || "Invalid credentials");
      }

      const payload = await res.json().catch(() => ({}));
      if (payload?.data?.username) {
        const setCookie = res.headers.get("set-cookie") ?? "";
        const cookieValue = setCookie.split(";")[0];
        if (cookieValue) {
          document.cookie = cookieValue;
        }
      }

      window.location.assign("/admin/dashboard");
    } catch (err: any) {
      setError(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.adminLogin}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.logoWrap}>
            <Image src={LogoImage} alt="REHAS Astrology logo" width={140} height={90} className={styles.logoImage} />
          </div>
          <h1>Admin Access</h1>
          <p>Secure sign in for the REHAS admin portal. Enter your username and password to continue.</p>
        </div>
        <div className={styles.cardBody}>
          {error ? (
            <div className={styles.errorMessage}>
              <p>{error}</p>
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="username">
                Username
              </label>
              <input
                id="username"
                name="username"
                className={styles.input}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Admin username"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="password">
                Password
              </label>
              <div className={styles.inputWrapper}>
                <input
                  id="password"
                  name="password"
                  className={styles.input}
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Password"
                />
                <button
                  type="button"
                  className={styles.toggleButton}
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}
