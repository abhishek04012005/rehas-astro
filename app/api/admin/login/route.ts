import { NextResponse } from "next/server";
import { verifyAdminCredentials, createAdminSessionToken, getAdminSessionCookie } from "@/lib/adminAuth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const username = String(body?.username ?? "").trim();
    const password = String(body?.password ?? "");

    if (!username || !password) {
      return NextResponse.json({ error: "username and password are required" }, { status: 400 });
    }

    const admin = await verifyAdminCredentials(username, password);
    if (!admin) {
      return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
    }

    const session = {
      id: admin.id,
      username: admin.username,
      expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
    };
    const token = createAdminSessionToken(session);
    const cookie = getAdminSessionCookie(token);

    return new Response(JSON.stringify({ data: { id: admin.id, username: admin.username, email: admin.email } }), {
      status: 200,
      headers: { "Set-Cookie": cookie, "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? "Unknown error" }, { status: 500 });
  }
}
