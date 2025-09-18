/*app/api/louange/route.ts*/
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // ⚠️ service_role uniquement côté serveur
);

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const { error } = await supabase.from("louange").insert([data]);

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
