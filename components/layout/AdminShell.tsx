"use client";

import { usePathname } from "next/navigation";
import { AdminNavbar } from "./AdminNavbar";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showNavbar = pathname !== "/admin";

  return (
    <>
      {showNavbar ? <AdminNavbar /> : null}
      {children}
    </>
  );
}
