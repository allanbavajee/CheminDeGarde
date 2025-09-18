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
    if (error) alert("Erreur : " + error.message);
    else {
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
    <form onSubmit={handleSubmit} className="space-y-4">
      {["lundi", "mardi", "repetition", "vendredi", "dimanche", "evenement"].map(key => (
        <label key={key} className="flex items-center space-x-2">
          <input
            type="checkbox"
            name={key}
            checked={formData[key as keyof typeof formData] as boolean}
            onChange={handleCheckboxChange}
          />
          <span>{key}</span>
        </label>
      ))}
      <textarea
        name="probleme"
        value={formData.probleme}
        onChange={handleTextareaChange}
        placeholder="Problèmes rencontrés"
      />
      <button type="submit">Enregistrer</button>
    </form>
  );
}
