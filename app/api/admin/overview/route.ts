import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAdminSessionFromCookie } from "@/lib/adminAuth";
import { supabaseAdmin } from "@/lib/supabaseServer";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("rehas_admin_session")?.value ?? null;
    const session = getAdminSessionFromCookie(token);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [contactsRes, enquiriesRes, kundliRes] = await Promise.all([
      supabaseAdmin.from("contact_submissions").select("id,name,phone,message,status,created_at").order("created_at", { ascending: false }).limit(8),
      supabaseAdmin.from("enquiries").select("id,name,phone,service_type,status,created_at").order("created_at", { ascending: false }).limit(8),
      supabaseAdmin.from("kundli_enquiries").select("id,full_name,phone,birth_date,birth_place,status,created_at").order("created_at", { ascending: false }).limit(8),
    ]);

    const contacts = contactsRes.data ?? [];
    const enquiries = enquiriesRes.data ?? [];
    const kundli = kundliRes.data ?? [];

    const contactsNew = contacts.filter((item: any) => String(item.status || "").toLowerCase() === "new").length;
    const contactsResolved = contacts.filter((item: any) => String(item.status || "").toLowerCase() === "resolved").length;
    const enquiriesNew = enquiries.filter((item: any) => String(item.status || "").toLowerCase() === "new").length;
    const enquiriesCompleted = enquiries.filter((item: any) => String(item.status || "").toLowerCase() === "completed").length;
    const kundliNew = kundli.filter((item: any) => String(item.status || "").toLowerCase() === "new").length;
    const kundliCompleted = kundli.filter((item: any) => String(item.status || "").toLowerCase() === "completed").length;

    return NextResponse.json({
      summary: {
        contacts: contacts.length,
        enquiries: enquiries.length,
        kundli: kundli.length,
        contactsNew,
        contactsResolved,
        enquiriesNew,
        enquiriesCompleted,
        kundliNew,
        kundliCompleted,
      },
      contacts,
      enquiries,
      kundli,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? "Failed to fetch dashboard data" }, { status: 500 });
  }
}
