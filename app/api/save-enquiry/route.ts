import { supabaseAdmin } from "@/lib/supabaseServer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, service_type, submitted_from } = body || {};

    if (!name || !phone || !service_type || !submitted_from) {
      return new Response(JSON.stringify({ error: "name, phone, service_type and submitted_from are required" }), { status: 400 });
    }

    const insertObj: any = {
      name: name.slice(0, 255),
      phone: phone.slice(0, 20),
      service_type: service_type.slice(0, 100),
      submitted_from: submitted_from.slice(0, 50),
      website: 'astrology.rehas.in',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      status: 'new',
    };

    const { data, error } = await supabaseAdmin.from('enquiries').insert([insertObj]).select();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ data }), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err?.message ?? 'Unknown error' }), { status: 500 });
  }
}
