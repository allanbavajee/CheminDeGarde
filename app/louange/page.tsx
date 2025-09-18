import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// ⚠️ Sécurité : utiliser les variables d’environnement
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // service_role côté serveur uniquement
);

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const { error } = await supabase.from("louange").insert([{
      lundi: data.lundi,
      mardi: data.mardi,
      repetition: data.repetition,
      vendredi: data.vendredi,
      dimanche: data.dimanche,
      evenement: data.evenement,
      probleme: data.probleme,
    }]);

    if (error) {
      console.error(error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: "Rapport enregistré ✅" }, { status: 201 });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
