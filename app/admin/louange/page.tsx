/* app/louange/page.tsx */
"use client";

import { useState } from "react";
import supabase from "@/lib/supabaseClient";
import encouragements from "@/lib/encouragements";

export default function LouangePage() {
  const [formData, setFormData] = useState({
    lundi: "",
    mardi: "",
    repetition: "",
    adp: "",
    tempsSpecial: "",
    remarques: "",
  });

  const handleRadioChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTextareaChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
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
        lundi: "",
        mardi: "",
        repetition: "",
        adp: "",
        tempsSpecial: "",
        remarques: "",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Rapport Louange</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        {[
          { name: "lundi", label: "Temps de prière (Lundi)" },
          { name: "mardi", label: "Temps de prière (Mardi)" },
          { name: "repetition", label: "Répétition effectuée" },
          { name: "adp", label: "Présence à l’ADP" },
          { name: "tempsSpecial", label: "Présence lors d’un temps spécial" },
        ].map(field => (
          <div key={field.name}>
            <p className="font-medium mb-1">{field.label}</p>
            <div className="flex gap-4">
              <label>
                <input
                  type="radio"
                  name={field.name}
                  value="Oui"
                  checked={formData[field.name as keyof typeof formData] === "Oui"}
                  onChange={handleRadioChange}
                />{" "}
                Oui
              </label>
              <label>
                <input
                  type="radio"
                  name={field.name}
                  value="Non"
                  checked={formData[field.name as keyof typeof formData] === "Non"}
                  onChange={handleRadioChange}
                />{" "}
                Non
              </label>
            </div>
          </div>
        ))}

        <div>
          <label className="block font-medium mb-1">Remarques :</label>
          <textarea
            name="remarques"
            value={formData.remarques}
            onChange={handleTextareaChange}
            placeholder="Écris ici tes remarques..."
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
