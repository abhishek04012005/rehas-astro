"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogoutPage() {
  const router = useRouter();
  const [message, setMessage] = useState("Logging out...");

  useEffect(() => {
    async function logout() {
      try {
        const res = await fetch("/api/admin/logout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
          const payload = await res.json().catch(() => ({}));
          throw new Error(payload?.error || "Logout failed");
        }

        router.push("/admin");
      } catch (err: any) {
        setMessage(err?.message || "Logout failed.");
      }
    }

    logout();
  }, [router]);

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "3rem" }}>
      <div style={{ textAlign: "center" }}>
        <p>{message}</p>
      </div>
    </div>
  );
}
