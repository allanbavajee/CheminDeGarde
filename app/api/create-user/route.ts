/* app/api/create-user/route.ts */
import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function POST(req: Request) {
  const { nom, email, password, departement } = await req.json();

  try {
    // 1. Créer l’utilisateur dans Auth
    const { data, error } = await supabaseServer.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // 2. Ajouter les infos dans users_custom
    const { error: insertError } = await supabaseServer
      .from("users_custom")
      .insert([
        {
          user_id: data.user.id,
          nom,
          email,
          departement,
        },
      ]);

    if (insertError) {
      return NextResponse.json(
        { error: insertError.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
