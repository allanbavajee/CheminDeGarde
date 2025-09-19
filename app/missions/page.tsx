/* app/missions/page.tsx */
import { useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient";   // ✅ avec alias @
import { useRouter } from "next/navigation";

export default function MissionsPage() {
  const [missions, setMissions] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchMissions = async () => {
      const { data, error } = await supabase.from("missions").select("*");
      if (error) {
        console.error("Erreur Supabase:", error);
      } else {
        setMissions(data || []);
      }
    };

    fetchMissions();
  }, []);

  return (
    <div>
      <h1>Liste des Missions</h1>
      <ul>
        {missions.map((mission) => (
          <li key={mission.id}>{mission.nom}</li>
        ))}
      </ul>
    </div>
  );
}
