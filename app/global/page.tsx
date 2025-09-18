"use client";

import { useEffect, useState } from "react";

export default function GlobalPage() {
  const [louange, setLouange] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/louange");
      const data = await res.json();
      setLouange(data);
    };
    fetchData();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Vue Globale - Départements</h1>

      {/* Louange */}
      <div className="p-4 bg-white rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">🎶 Louange</h2>

        {louange.length === 0 ? (
          <p className="text-gray-600">Aucun rapport disponible</p>
        ) : (
          <div className="space-y-2">
            <p>
              <strong>Temps de prière :</strong> Lundi {louange[0].lundi} | Mardi {louange[0].mardi}
            </p>
            <p>
              <strong>Répétition :</strong> {louange[0].repetition}
            </p>
            <p>
              <strong>Présence :</strong> Vendredi {louange[0].vendredi} | Dimanche {louange[0].dimanche} | Événement {louange[0].evenement}
            </p>
            <p className="text-red-600">
              <strong>Problèmes :</strong>{" "}
              {louange[0].probleme ? louange[0].probleme : "Aucun"}
            </p>
          </div>
        )}
      </div>

      {/* 🔜 Ici on ajoutera les autres départements */}
    </div>
  );
}
