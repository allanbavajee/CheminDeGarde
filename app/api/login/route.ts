/*app/api/login/route.ts*/
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Client Supabase côté serveur
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // 🔹 Lire l'utilisateur depuis users_custom
    const { data: user, error } = await supabase
      .from("users_custom")
      .select("*")
      .eq("email", email)
      .limit(1)
      .single();

    if (error || !user) throw new Error("Utilisateur introuvable");

    // 🔹 Vérifier le mot de passe
    if (user.password !== password) {
      throw new Error("Mot de passe incorrect");
    }

    // 🔹 Vérifier le département
    if (!user.departement) {
      throw new Error("Département non attribué, contactez l'admin.");
    }

    return NextResponse.json({
      success: true,
      user: {
        email: user.email,
        nom: user.nom,
        departement: user.departement,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

