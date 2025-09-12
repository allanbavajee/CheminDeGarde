/* app/louange/page.tsx : page du département Louange */
"use client";
import React, { useState } from "react";
import encouragements from "@/lib/encouragements";

export default function LouangePage() {
  const [formData, setFormData] = useState({
    chantPrincipal: "",
    nombreChants: 0,
    participation: "",
    atmosphere: "",
    autres: [],
  });

  const currentWeek = new Date().getWeek?.() ?? 0; // fallback si pas défini
  const encouragement =
    encouragements[currentWeek % encouragements.length];

  const handleChange = (
    section: string,
    field: string,
    value: string | number
  ) => {
    setFormData({
      ...formData,
      [section]: {
        ...(formData as any)[section],
        [field]: value,
      },
    });
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Rapport - Louange</h1>

      {/* Champs principaux */}
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Chant principal"
          className="border p-2 w-full rounded"
          value={formData.chantPrincipal}
          onChange={(e) =>
            setFormData({ ...formData, chantPrincipal: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Nombre de chants"
          className="border p-2 w-full rounded"
          value={formData.nombreChants}
          onChange={(e) =>
            setFormData({ ...formData, nombreChants: +e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Participation de l’assemblée"
          className="border p-2 w-full rounded"
          value={formData.participation}
          onChange={(e) =>
            setFormData({ ...formData, participation: e.target.value })
          }
        />
        <textarea
          placeholder="Atmosphère spirituelle"
          className="border p-2 w-full rounded"
          value={formData.atmosphere}
          onChange={(e) =>
            setFormData({ ...formData, atmosphere: e.target.value })
          }
        />
      </div>

      {/* Bloc encouragement */}
      <div className="mt-8 p-4 bg-green-100 border border-green-300 rounded-lg shadow">
        <h2 className="text-lg font-semibold text-green-800">
          💡 Encouragement de la semaine
        </h2>
        <p className="mt-2 text-gray-800 italic">
          "{encouragement.message}"
        </p>
        <p className="text-sm text-gray-700 mt-2">
          <strong>{encouragement.verse}</strong>
        </p>
      </div>
    </div>
  );
}
