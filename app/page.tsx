/* app/page.tsx : page d'accueil, redirige automatiquement selon login et département */

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const redirect = async () => {
      const { data } = await supabase.auth.getUser();
      const user = data.user;

      if (user) {
        // 🔎 Vérifier le département
        const { data: profile } = await supabase
          .from("users_custom")
          .select("departement")
          .eq("id", user.id)
          .single();

        if (profile?.departement) {
          router.push(`/${profile.departement.toLowerCase()}`);
        } else {
          router.push("/missions"); // fallback si pas de département
        }
      } else {
        router.push("/login");
      }
    };

    redirect();
  }, [router]);

  return <p className="text-center mt-10">Redirection...</p>;
}
