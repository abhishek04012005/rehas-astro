import { supabaseAdmin } from "@/lib/supabaseServer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { full_name, phone, birth_date, birth_time, birth_place } = body || {};

    if (!full_name || !phone || !birth_date || !birth_time || !birth_place) {
      return new Response(
        JSON.stringify({ error: "full_name, phone, birth_date, birth_time, and birth_place are required" }),
        { status: 400 }
      );
    }

    const insertObj: any = {
      full_name: full_name.slice(0, 255),
      phone: phone.slice(0, 20),
      birth_date: birth_date.slice(0, 10),
      birth_time: birth_time.slice(0, 5),
      birth_place: birth_place.slice(0, 255),
      website: "astrology.rehas.in",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      status: "new",
    };

    const { data, error } = await supabaseAdmin.from("kundli_enquiries").insert([insertObj]).select();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ data }), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err?.message ?? "Unknown error" }), { status: 500 });
  }
}
