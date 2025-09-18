/* app/louange/page.tsx*/
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
  });

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Données envoyées :", formData);
    // TODO: connecter à Supabase (insertion dans une table "louange")
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Suivi - Louange</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Temps de prière lundi */}
        <div>
          <label className="block font-medium">Temps de prière lundi :</label>
          <div className="flex gap-4 mt-2">
            <label>
              <input
                type="radio"
                name="lundi"
                value="Oui"
                checked={formData.lundi === "Oui"}
                onChange={() => handleChange("lundi", "Oui")}
              />{" "}
              Oui
            </label>
            <label>
              <input
                type="radio"
                name="lundi"
                value="Non"
                checked={formData.lundi === "Non"}
                onChange={() => handleChange("lundi", "Non")}
              />{" "}
              Non
            </label>
          </div>
        </div>

        {/* Temps de prière mardi */}
        <div>
          <label className="block font-medium">Temps de prière mardi :</label>
          <div className="flex gap-4 mt-2">
            <label>
              <input
                type="radio"
                name="mardi"
                value="Oui"
                checked={formData.mardi === "Oui"}
                onChange={() => handleChange("mardi", "Oui")}
              />{" "}
              Oui
            </label>
            <label>
              <input
                type="radio"
                name="mardi"
                value="Non"
                checked={formData.mardi === "Non"}
                onChange={() => handleChange("mardi", "Non")}
              />{" "}
              Non
            </label>
          </div>
        </div>

        {/* Répétition */}
        <div>
          <label className="block font-medium">Répétition :</label>
          <div className="flex gap-4 mt-2">
            <label>
              <input
                type="radio"
                name="repetition"
                value="Oui"
                checked={formData.repetition === "Oui"}
                onChange={() => handleChange("repetition", "Oui")}
              />{" "}
              Oui
            </label>
            <label>
              <input
                type="radio"
                name="repetition"
                value="Non"
                checked={formData.repetition === "Non"}
                onChange={() => handleChange("repetition", "Non")}
              />{" "}
              Non
            </label>
          </div>
        </div>

        {/* Équipe présente vendredi */}
        <div>
          <label className="block font-medium">Équipe présente vendredi :</label>
          <div className="flex gap-4 mt-2">
            <label>
              <input
                type="radio"
                name="vendredi"
                value="Oui"
                checked={formData.vendredi === "Oui"}
                onChange={() => handleChange("vendredi", "Oui")}
              />{" "}
              Oui
            </label>
            <label>
              <input
                type="radio"
                name="vendredi"
                value="Non"
                checked={formData.vendredi === "Non"}
                onChange={() => handleChange("vendredi", "Non")}
              />{" "}
              Non
            </label>
          </div>
        </div>

        {/* Équipe présente dimanche */}
        <div>
          <label className="block font-medium">Équipe présente dimanche :</label>
          <div className="flex gap-4 mt-2">
            <label>
              <input
                type="radio"
                name="dimanche"
                value="Oui"
                checked={formData.dimanche === "Oui"}
                onChange={() => handleChange("dimanche", "Oui")}
              />{" "}
              Oui
            </label>
            <label>
              <input
                type="radio"
                name="dimanche"
                value="Non"
                checked={formData.dimanche === "Non"}
                onChange={() => handleChange("dimanche", "Non")}
              />{" "}
              Non
            </label>
          </div>
        </div>

        {/* Équipe présente événement spécial */}
        <div>
          <label className="block font-medium">Équipe présente événement spécial :</label>
          <div className="flex gap-4 mt-2">
            <label>
              <input
                type="radio"
                name="evenement"
                value="Oui"
                checked={formData.evenement === "Oui"}
                onChange={() => handleChange("evenement", "Oui")}
              />{" "}
              Oui
            </label>
            <label>
              <input
                type="radio"
                name="evenement"
                value="Non"
                checked={formData.evenement === "Non"}
                onChange={() => handleChange("evenement", "Non")}
              />{" "}
              Non
            </label>
          </div>
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
