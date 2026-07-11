import { supabaseAdmin } from "@/lib/supabaseServer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, message, status, notes, admin_id } = body || {};

    // For `contact_submissions` table require name, phone and message
    if (!name || !phone || !message) {
      return new Response(
        JSON.stringify({ error: "name, phone and message are required" }),
        { status: 400 }
      );
    }

    const insertObj: any = {
      name,
      phone,
      message,
      status: status ?? 'new',
      notes: notes ?? null,
      admin_id: admin_id ?? null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      website: "astrology.rehas.in",
    };

    const { data, error } = await supabaseAdmin.from("contact_submissions").insert([insertObj]).select();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ data }), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err?.message ?? "Unknown error" }), { status: 500 });
  }
}
