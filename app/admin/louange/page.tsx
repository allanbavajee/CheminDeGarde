/*CheminDeGarde/app/admin/louange/page.tsx*/

"use client";

import { useState } from "react";

export default function LouangePage() {
  const [formData, setFormData] = useState({
    lundi: "",
    mardi: "",
    repetition: "",
    vendredi: "",
    dimanche: "",
    evenement: "",
    probleme: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Données envoyées :", formData);

    // Exemple d’envoi vers Supabase
    const res = await fetch("/api/louange", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert("Rapport enregistré ✅");
    } else {
      alert("Erreur lors de l’enregistrement ❌");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Suivi - Louange</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Questions Oui/Non */}
        {[
          { name: "lundi", label: "Temps de prière lundi" },
          { name: "mardi", label: "Temps de prière mardi" },
          { name: "repetition", label: "Répétition" },
          { name: "vendredi", label: "Équipe présente vendredi" },
          { name: "dimanche", label: "Équipe présente dimanche" },
          { name: "evenement", label: "Équipe présente événement spécial" },
        ].map((field) => (
          <div key={field.name}>
            <label className="block font-medium">{field.label} :</label>
            <div className="flex gap-4 mt-2">
              <label>
                <input
                  type="radio"
                  name={field.name}
                  value="Oui"
                  checked={(formData as any)[field.name] === "Oui"}
                  onChange={() => handleChange(field.name, "Oui")}
                />{" "}
                Oui
              </label>
              <label>
                <input
                  type="radio"
                  name={field.name}
                  value="Non"
                  checked={(formData as any)[field.name] === "Non"}
                  onChange={() => handleChange(field.name, "Non")}
                />{" "}
                Non
              </label>
            </div>
          </div>
        ))}

        {/* Champ libre */}
        <div>
          <label className="block font-medium">Problèmes rencontrés :</label>
          <textarea
            placeholder="Décris les difficultés rencontrées cette semaine..."
            className="w-full border p-2 rounded mt-2"
            value={formData.probleme}
            onChange={(e) => handleChange("probleme", e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
}
