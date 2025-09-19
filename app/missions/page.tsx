/* app/missions/page.tsx */
"use client";

import { useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient";   // ⬅️ alias fonctionnel
import { useRouter } from "next/navigation";

export default function MissionsPage() {
  const [missions, setMissions] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchMissions = async () => {
      const { data, error } = await supabase.from("missions").select("*");
      if (error) {
        console.error("Erreur Supabase:", error.message);
      } else {
        setMissions(data || []);
      }
    };

    fetchMissions();
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold">Liste des missions</h1>
      <ul className="mt-4 space-y-2">
        {missions.map((m) => (
          <li key={m.id} className="p-2 border rounded">
            {m.nom}
          </li>
        ))}
      </ul>
    </div>
  );
}
