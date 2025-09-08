/* app/louange/page.tsx */
"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function LouangeForm() {
  const [form, setForm] = useState({
    priereLundi: false,
    detailsPriereLundi: "",
    priereMardi: false,
    detailsPriereMardi: "",
    repetition: false,
    detailsRepetition: "",
    adp: false,
    detailsAdp: "",
    culte: false,
    detailsCulte: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.from("louange_reports").insert([
      {
        priere_lundi: form.priereLundi,
        details_priere_lundi: form.detailsPriereLundi,
        priere_mardi: form.priereMardi,
        details_priere_mardi: form.detailsPriereMardi,
        repetition: form.repetition,
        details_repetition: form.detailsRepetition,
        adp: form.adp,
        details_adp: form.detailsAdp,
        culte: form.culte,
        details_culte: form.detailsCulte,
      },
    ]);

    if (error) {
      console.error(error);
      setMessage("❌ Erreur lors de l’enregistrement !");
    } else {
      setMessage("✅ Rapport enregistré avec succès !");
      setForm({
        priereLundi: false,
        detailsPriereLundi: "",
        priereMardi: false,
        detailsPriereMardi: "",
        repetition: false,
        detailsRepetition: "",
        adp: false,
        detailsAdp: "",
        culte: false,
        detailsCulte: "",
      });
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-bold text-center">Rapport Louange</h2>

      {/* Temps de prière Lundi */}
      <label className="block">
        <input
          type="checkbox"
          name="priereLundi"
          checked={form.priereLundi}
          onChange={handleChange}
        />{" "}
        Temps de prière Lundi
      </label>
      <input
        type="text"
        name="detailsPriereLundi"
        value={form.detailsPriereLundi}
        onChange={handleChange}
        placeholder="Détails (durée, remarque...)"
        className="w-full border p-2 rounded"
      />

      {/* Temps de prière Mardi */}
      <label className="block">
        <input
          type="checkbox"
          name="priereMardi"
          checked={form.priereMardi}
          onChange={handleChange}
        />{" "}
        Temps de prière Mardi
      </label>
      <input
        type="text"
        name="detailsPriereMardi"
        value={form.detailsPriereMardi}
        onChange={handleChange}
        placeholder="Détails"
        className="w-full border p-2 rounded"
      />

      {/* Répétition */}
      <label className="block">
        <input
