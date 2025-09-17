/*app/api/login/route.ts*/
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Clé service role côté serveur
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // 🔹 Lister les utilisateurs et filtrer par email
    const { data: users, error } = await supabase.auth.admin.listUsers({
      limit: 1000, // Ajuster selon besoin
    });

    if (error) throw error;

    const user = users.find(u => u.email === email);
    if (!user) throw new Error("Utilisateur introuvable");

    // Vérifier que le département est défini
    if (!user.user_metadata?.departement) {
      throw new Error("Département non attribué, contactez l'admin.");
    }

    // Ici, tu peux vérifier le mot de passe côté client avec signInWithPassword
    // ou créer une logique serveur si tu veux authentifier directement
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
