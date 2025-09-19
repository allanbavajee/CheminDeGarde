/* app/missions/page.tsx */
import { useEffect, useState } from "react";
import supabase from "../../lib/supabaseClient";   // ✅ import par défaut
import { useRouter } from "next/navigation";

export default function MissionsPage() {
  const [missions, setMissions] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchMissions = async () => {
      const { data, error } = await supabase.from("missions").select("*");
      if (error) {
        console.error("Erreur récupération missions:", error.message);
      } else {
        setMissions(data || []);
      }
    };
    fetchMissions();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Missions</h1>
      <ul className="list-disc pl-6">
        {missions.map((mission) => (
          <li key={mission.id}>{mission.titre}</li>
        ))}
      </ul>
    </div>
  );
}
