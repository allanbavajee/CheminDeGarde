/* app/api/create-user/route.ts : API pour ajouter des utilisateurs */

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // ⚠️ Service key, pas anon key
);

export async function POST(req: Request) {
  try {
    const { email, nom, departement, password } = await req.json();

    if (!email || !password || !departement || !nom) {
      return NextResponse.json(
        { error: "Champs obligatoires manquants" },
        { status: 400 }
      );
    }

    // Insert utilisateur dans users_custom
    const { data, error } = await supabase.from("users_custom").insert([
      {
        email,
        nom,
        departement,
        password, // ⚠️ bien stocker le password envoyé
      },
    ]);

    if (error) {
      console.error("Erreur Supabase:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, user: data }, { status: 201 });
  } catch (err: any) {
    console.error("Erreur API:", err.message);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
