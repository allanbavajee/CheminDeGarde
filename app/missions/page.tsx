"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

// Config Supabase
const supabase = createClient(
  "https://vbxdztukagsoymtdtall.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZieGR6dHVrYWdzb3ltdGR0YWxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTczMTUzMzMsImV4cCI6MjA3Mjg5MTMzM30.ZYQnnjW39idoWF7RTqHzLqQxBGvi4-d4HdrFF0ExJdE"
);

export default function MissionsPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [missions, setMissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<{ [key: string]: string }>({});

  // Vérifie si l'utilisateur est connecté
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
      } else {
        setUser(user);
        fetchMissions(user.id);
      }
    };
    getUser();
  }, [router]);

  // Récupère les missions assignées à l'utilisateur
  const fetchMissions = async (userId: string) => {
    const { data, error } = await supabase
      .from("missions")
      .select("id, titre, description, date")
      .eq("responsable_id", userId)
      .order("date", { ascending: true });

    if (!error && data) {
      setMissions(data);
    }
    setLoading(false);
  };

  // Marquer une mission comme accomplie / non accomplie
  const handleRapport = async (
    missionId: string,
    statut: "accomplie" | "non accomplie"
  ) => {
    const explication = feedback[missionId] || null;

    const { error } = await supabase.from("rapports").insert([
      {
        mission_id: missionId,
        user_id: user.id,
        statut,
        explication,
      },
    ]);

    if (!error) {
      alert("Rapport enregistré ✅");
      fetchMissions(user.id); // recharger missions
    } else {
      alert("Erreur lors de l'enregistrement ❌");
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Chargement des missions...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Mes missions assignées
      </h1>

      {missions.length === 0 && (
        <p className="text-gray-500 text-center">
          Aucune mission assignée pour le moment.
        </p>
      )}

      <div className="space-y-4">
        {missions.map((mission) => (
          <div
            key={mission.id}
            className="bg-white shadow p-4 rounded-2xl border"
          >
            <h2 className="font-semibold text-lg">{mission.titre}</h2>
            <p className="text-sm text-gray-600">{mission.description}</p>
            <p className="text-xs text-gray-400">
              Date
