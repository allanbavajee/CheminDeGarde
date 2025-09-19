/* app/missions/page.tsx */
import { useEffect, useState } from "react";
import supabase from "../../lib/supabaseClient";   // ✅ sans accolades
import { useRouter } from "next/navigation";

export default function MissionsPage() {
  const [missions, setMissions] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchMissions = async () => {
      const { data, error } = await supabase
        .from("missions")
        .select("*");

      if (error) {
        console.error(error);
      } else {
        setMissions(data || []);
      }
    };

    fetchMissions();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📌 Missions</h1>
      {missions.length === 0 ? (
        <p>Aucune mission trouvée.</p>
      ) : (
        <ul className="space-y-2">
          {missions.map((mission) => (
            <li
              key={mission.id}
              className="p-4 border rounded-lg shadow cursor-pointer hover:bg-gray-100"
              onClick={() => router.push(`/missions/${mission.id}`)}
            >
              {mission.titre}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
