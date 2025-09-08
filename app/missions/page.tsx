/* app/missions/page.tsx : page des missions assignées, permet de soumettre des rapports */

"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function MissionsPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [missions, setMissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      const user = data.user;
      if (!user) {
        router.push("/login");
        return;
      }
      setUser(user);
      fetchMissions(user.id);
    };
    checkUser();
  }, [router]);

  const fetchMissions = async (userId: string) => {
    const { data, error } = await supabase
      .from("missions")
      .select("id, titre, description, date")
      .eq("responsable_id", userId)
      .order("date", { ascending: true });

    if (!error && data) setMissions(data);
    setLoading(false);
  };

  const handleRapport = async (missionId: string, statut: "accomplie" | "non accomplie") => {
    const explication = feedback[missionId] || null;

    const { error } = await supabase.from("rapports").insert([
      { mission_id: missionId, user_id: user.id, statut, explication },
    ]);

    if (!error) {
      alert("Rapport enregistré ✅");
      fetchMissions(user.id);
    } else {
      alert("Erreur lors de l'enregistrement ❌");
    }
  };

  if (loading) return <p className="text-center mt-10">Chargement des missions...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Mes missions assignées</h1>

      {missions.length === 0 && (
        <p className="text-gray-500 text-center">Aucune mission assignée pour le moment.</p>
      )}

      <div className="space-y-4">
        {missions.map((mission) => (
          <div key={mission.id} className="bg-white shadow p-4 rounded-2xl border">
            <h2 className="font-semibold text-lg">{mission.titre}</h2>
            <p className="text-sm text-gray-600">{mission.description}</p>
            <p className="text-xs text-gray-400">
              Date : {new Date(mission.date).toLocaleDateString("fr-FR")}
            </p>

            <div className="mt-3">
              <textarea
                placeholder="Expliquez si la mission n'a pas été accomplie..."
                className="w-full p-2 border rounded-lg text-sm"
                value={feedback[mission.id] || ""}
                onChange={(e) => setFeedback({ ...feedback, [mission.id]: e.target.value })}
              />
            </div>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => handleRapport(mission.id, "accomplie")}
                className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
              >
                ✅ Accomplie
              </button>
              <button
                onClick={() => handleRapport(mission.id, "non accomplie")}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
              >
                ❌ Non accomplie
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
