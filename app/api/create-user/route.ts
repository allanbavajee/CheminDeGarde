/* app/api/create-user/route.ts*/
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Supabase côté serveur
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const { email, password, nom, departement, role } = await req.json();

    // 🔹 Insérer l'utilisateur dans users_custom
    const { data, error } = await supabase
      .from("users_custom")
      .insert([
        {
          nom,
          email,
          departement,
          password,
          role: role || "Utilisateur", // par défaut
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, user: data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

