import { NextResponse } from "next/server";
import { clearAdminSessionCookie } from "@/lib/adminAuth";

export async function POST() {
  const cookie = clearAdminSessionCookie();
  return new Response(JSON.stringify({ data: { message: "Logged out" } }), {
    status: 200,
    headers: { "Set-Cookie": cookie, "Content-Type": "application/json" },
  });
}
