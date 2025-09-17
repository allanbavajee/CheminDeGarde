/* app/api/create-user/route.ts*/
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const { email, password, nom, departement } = await req.json();

    if (!email || !password || !nom || !departement) {
      throw new Error("Tous les champs sont requis !");
    }

    // 1️⃣ Création de l’utilisateur dans Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { nom, departement },
    });

    if (authError) throw authError;

    const userId = authData.user?.id;
    if (!userId) throw new Error("Impossible de récupérer l'ID du nouvel utilisateur.");

    // 2️⃣ Insertion dans ta table users_custom (⚠️ pas users)
    const { error: insertError } = await supabase
      .from("users_custom")
      .insert({
        user_id: userId,
        nom,
        email,
        departement,
        password, // à chiffrer plus tard
        role: departement === "Admin" ? "admin" : "user",
      });

    if (insertError) throw insertError;

    return NextResponse.json({
      success: true,
      user: { email, nom, departement },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
