/*app/louange/page.tsx*/
"use client";

import { useState } from "react";
import supabase from "@/lib/supabaseClient";

export default function LouangePage() {
  const [formData, setFormData] = useState({
    lundi: false,
    mardi: false,
    repetition: false,
    vendredi: false,
    dimanche: false,
    evenement: false,
    probleme: "",
  });

  // ✅ Handler pour les checkbox
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  // ✅ Handler pour le textarea
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from("louange").insert([formData]);

    if (error) {
      alert("Erreur : " + error.message);
    } else {
      alert("Rapport enregistré ✅");
      setFormData({
        lundi: false,
        mardi: false,
        repetition: false,
        vendredi: false,
        dimanche: false,
        evenement: false,
        probleme: "",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Rapport Louange</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {["lundi", "mardi", "repetition", "vendredi", "dimanche", "evenement"].map(key => (
          <label key={key} className="flex items-center space-x-2">
            <input
              type="checkbox"
              name={key}
              checked={formData[key as keyof typeof formData] as boolean}
              onChange={handleCheckboxChange}
              className="h-4 w-4"
            />
            <span>{key}</span>
          </label>
        ))}

        <div>
          <label className="block font-medium mb-1">Problèmes rencontrés :</label>
          <textarea
            name="probleme"
            value={formData.probleme}
            onChange={handleTextareaChange}
            placeholder="Décris les problèmes rencontrés cette semaine..."
            className="border p-2 w-full rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
}

