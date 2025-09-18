/* app/admin/evangelisation/page.tsx */
"use client";
import React, { useState } from "react";
import encouragements from "@/lib/encouragements";

function getWeekNumber(date: Date) {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear =
    (date.getTime() - firstDayOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

export default function IntercessionPage() {
  const [formData, setFormData] = useState({
    prierePrincipale: "",
    nombreParticipants: 0,
    atmosphere: "",
    autres: [],
  });

  const currentWeek = getWeekNumber(new Date());
  const encouragement =
    encouragements[currentWeek % encouragements.length];

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Rapport - Evangélisation</h1>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Prière principale"
          className="border p-2 w-full rounded"
          value={formData.prierePrincipale}
          onChange={(e) =>
            setFormData({ ...formData, prierePrincipale: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Nombre de participants"
          className="border p-2 w-full rounded"
          value={formData.nombreParticipants}
          onChange={(e) =>
            setFormData({ ...formData, nombreParticipants: +e.target.value })
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

      <div className="mt-8 p-4 bg-green-100 border border-green-300 rounded-lg shadow">
        <h2 className="text-lg font-semibold text-green-800">
          💡 Encouragement de la semaine
        </h2>
        <p className="mt-2 text-gray-800 italic">"{encouragement.message}"</p>
        <p className="text-sm text-gray-700 mt-2">
          <strong>{encouragement.verse}</strong>
        </p>
      </div>
    </div>
  );
}
