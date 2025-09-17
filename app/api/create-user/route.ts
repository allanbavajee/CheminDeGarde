/* app/api/create-user/route.ts : API pour ajouter des utilisateurs */
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Clé service role pour créer des comptes (ne jamais mettre côté client)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const { email, password, nom, departement } = await req.json();

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { nom, departement },
    });

    if (error) throw error;

    return NextResponse.json({ success: true, user: data.user });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
