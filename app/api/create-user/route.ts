import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // ⚠️ bien mettre la clé service_role
);

export async function POST(req: Request) {
  try {
    const { email, password, nom, departement } = await req.json();

    if (!email || !password || !nom || !departement) {
      return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
    }

    // 1. Créer l’utilisateur auth Supabase
    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (authError) {
      console.error("Erreur création Auth:", authError);
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    // 2. Enregistrer aussi dans ta table personnalisée
    const { error: dbError } = await supabase.from("users_custom").insert([
      {
        email,
        nom,
        departement,
      },
    ]);

    if (dbError) {
      console.error("Erreur création DB:", dbError);
      return NextResponse.json({ error: dbError.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Erreur API:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
