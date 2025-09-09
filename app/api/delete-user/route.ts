/* app/api/delete-user/route.ts */
/* app/api/delete-user/route.ts */
import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function POST(req: Request) {
  const { user_id } = await req.json();

  try {
    // 1. Supprimer de Supabase Auth
    const { error: authError } = await supabaseServer.auth.admin.deleteUser(user_id);
    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    // 2. Supprimer de users_custom
    const { error: dbError } = await supabaseServer.from("users_custom").delete().eq("user_id", user_id);
    if (dbError) {
      return NextResponse.json({ error: dbError.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
