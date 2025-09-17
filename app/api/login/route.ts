import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// On utilise la clé service role côté serveur
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // On se connecte avec la clé service role pour lire user_metadata
    const { data: userData, error } = await supabase.auth.admin.getUserByEmail(email);
    if (error || !userData.user) throw new Error("Utilisateur introuvable");

    const user = userData.user;

    // Vérifier le mot de passe manuellement via la table auth.users si nécessaire
    // Ou utiliser supabase.auth.signInWithPassword côté client après vérification

    return NextResponse.json({
      success: true,
      user: {
        email: user.email,
        nom: user.user_metadata.nom,
        departement: user.user_metadata.departement,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
