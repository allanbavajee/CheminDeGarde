/*app/louange/page.tsx*/
"use client";

import { useState } from "react";

type FormState = {
  lundi: string;
  mardi: string;
  repetition: string;
  vendredi: string;
  dimanche: string;
  evenement: string;
  probleme: string;
};

export default function LouangePage() {
  const [formData, setFormData] = useState<FormState>({
    lundi: "",
    mardi: "",
    repetition: "",
    vendredi: "",
    dimanche: "",
    evenement: "",
    probleme: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, probleme: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/louange", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error || "Erreur lors de l'enregistrement");
      }

      setMessage("✅ Rapport enregistré avec succès !");
      setFormData({
        lundi: "",
        mardi: "",
        repetition: "",
        vendredi: "",
        dimanche: "",
        evenement: "",
        probleme: "",
      });
    } catch (err: any) {
      setMessage("❌ " + (err.message || "Erreur inconnue"));
    } finally {
      setLoading(false);
    }
  };

  const questions = [
    { name: "lundi", label: "Temps de prière lundi" },
    { name: "mardi", label: "Temps de prière mardi" },
    { name: "repetition", label: "Répétition" },
    { name: "vendredi", label: "Équipe présente vendredi" },
    { name: "dimanche", label: "Équipe présente dimanche" },
    { name: "evenement", label: "Équipe présente événement spécial" },
  ];

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Rapport Louange</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {questions.map((q) => (
          <div key={q.name}>
            <label className="block font-medium mb-2">{q.label} :</label>
            <div className="flex gap-6">
              <label className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  name={q.name}
                  value="Oui"
                  checked={formData[q.name as keyof FormState] === "Oui"}
                  onChange={handleRadioChange}
                  className="h-4 w-4"
                />
                <span>Oui</span>
              </label>
              <label className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  name={q.name}
                  value="Non"
                  checked={formData[q.name as keyof FormState] === "Non"}
                  onChange={handleRadioChange}
                  className="h-4 w-4"
                />
                <span>Non</span>
              </label>
            </div>
          </div>
        ))}

        <div>
          <label className="block font-medium mb-2">Problèmes rencontrés :</label>
          <textarea
            name="probleme"
            value={formData.probleme}
            onChange={handleTextareaChange}
            placeholder="Décris les difficultés rencontrées cette semaine..."
            className="w-full border p-2 rounded min-h-[100px]"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Enregistrement..." : "Enregistrer"}
        </button>

        {message && (
          <p
            className={`mt-4 text-center font-semibold ${
              message.startsWith("✅") ? "text-green-700" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

