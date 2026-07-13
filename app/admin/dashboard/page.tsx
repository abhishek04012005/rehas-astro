import { cookies } from "next/headers";
import { getAdminSessionFromCookie } from "@/lib/adminAuth";
import Link from "next/link";

function getSession() {
  const cookieStore = cookies();
  const token = cookieStore.get("rehas_admin_session")?.value ?? null;
  return getAdminSessionFromCookie(token);
}

export default function AdminDashboardPage() {
  const session = getSession();

  if (!session) {
    return (
      <div className="pageShell">
        <main>
          <div style={{ padding: "3rem", textAlign: "center" }}>
            <h1>Unauthorized</h1>
            <p>You must sign in to manage admin content.</p>
            <Link href="/admin">Go to login</Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="pageShell">
      <main style={{ padding: "3rem" }}>
        <h1>Admin Dashboard</h1>
        <p>Welcome back, {session.username}.</p>
        <div style={{ marginTop: "1.5rem" }}>
          <Link href="/admin/logout" style={{ color: "var(--primary)" }}>
            Logout
          </Link>
        </div>
      </main>
    </div>
  );
}
