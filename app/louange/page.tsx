"use client";

import { useState } from "react";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, type, checked, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/louange/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert("Enregistrement réussi !");
      setFormData({
        lundi: false,
        mardi: false,
        repetition: false,
        vendredi: false,
        dimanche: false,
        evenement: false,
        probleme: "",
      });
    } else {
      alert("Erreur lors de l'enregistrement.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Formulaire Louange</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { name: "lundi", label: "Temps de prière Lundi" },
          { name: "mardi", label: "Temps de prière Mardi" },
          { name: "repetition", label: "Répétition" },
          { name: "vendredi", label: "Équipe présente Vendredi" },
          { name: "dimanche", label: "Équipe présente Dimanche" },
          { name: "evenement", label: "Équipe présente Évènement spécial" },
        ].map(({ name, label }) => (
          <label key={name} className="flex items-center space-x-2">
            <input
              type="checkbox"
              name={name}
              checked={formData[name as keyof typeof formData] as boolean}
              onChange={handleChange}
              className="w-5 h-5 text-blue-600"
            />
            <span>{label}</span>
          </label>
        ))}

        <textarea
          name="probleme"
          value={formData.probleme}
          onChange={handleChange}
          placeholder="Problèmes rencontrés..."
          className="w-full p-2 border rounded-md"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
}
