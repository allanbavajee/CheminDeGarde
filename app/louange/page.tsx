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

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // TypeScript-safe handleChange
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target;

    if (e.target instanceof HTMLInputElement && e.target.type === "checkbox") {
      setFormData(prev => ({
        ...prev,
        [name]: e.target.checked,
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: e.target.value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.from("louange").insert([formData]);

    if (error) {
      setMessage("❌ Erreur lors de l’enregistrement : " + error.message);
    } else {
      setMessage("✅ Rapport enregistré avec succès !");
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

    setLoading(false);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Rapport - Louange</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { name: "lundi", label: "Temps de prière lundi" },
          { name: "mardi", label: "Temps de prière mardi" },
          { name: "repetition", label: "Répétition" },
          { name: "vendredi", label: "Équipe présente vendredi" },
          { name: "dimanche", label: "Équipe présente dimanche" },
          { name: "evenement", label: "Équipe présente événement spécial" },
        ].map(item => (
          <label key={item.name} className="flex items-center space-x-2">
            <input
              type="checkbox"
              name={item.name}
              checked={formData[item.name as keyof typeof formData] as boolean}
              onChange={handleChange}
              className="h-4 w-4"
            />
            <span>{item.label}</span>
          </label>
        ))}

        <textarea
          name="probleme"
          placeholder="Problèmes rencontrés pendant la semaine"
          className="border p-2 w-full rounded"
          value={formData.probleme}
          onChange={handleChange}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Enregistrement..." : "Soumettre le rapport"}
        </button>
      </form>

      {message && (
        <p className="mt-4 text-center font-semibold text-gray-700">{message}</p>
      )}
    </div>
  );
}
