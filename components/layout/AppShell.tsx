"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import WhatsAppFloating from "@/components/WhatsAppFloating";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname === "/admin" || pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute ? <Navbar /> : null}
      {children}
      {!isAdminRoute ? <Footer /> : null}
      {!isAdminRoute ? <WhatsAppFloating /> : null}
    </>
  );
}
