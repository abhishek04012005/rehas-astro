import { cookies } from "next/headers";
import { getAdminSessionFromCookie } from "@/lib/adminAuth";

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("rehas_admin_session")?.value ?? null;
  const session = getAdminSessionFromCookie(token);

  if (!session) {
    return <>{children}</>;
  }

  return <>{children}</>;
}
