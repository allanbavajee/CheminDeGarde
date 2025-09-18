/*app/admin/louange/page.tsx*/
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

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.from("louange").insert([formData]);
    if (error) setMessage("❌ Erreur : " + error.message);
    else {
      setMessage("✅ Rapport enregistré !");
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
        ].map(field => (
          <label key={field.name} className="flex items-center space-x-2">
            <input
              type="checkbox"
              name={field.name}
              checked={formData[field.name as keyof typeof formData] as boolean}
              onChange={handleCheckboxChange}
              className="h-4 w-4"
            />
            <span>{field.label}</span>
          </label>
        ))}

        <textarea
          name="probleme"
          placeholder="Problèmes rencontrés pendant la semaine"
          className="border p-2 w-full rounded"
          value={formData.probleme}
          onChange={handleTextareaChange}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Enregistrement..." : "Soumettre le rapport"}
        </button>
      </form>

      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
}


