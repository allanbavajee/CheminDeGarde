/* app/louange/page.tsx : page du département Louange */
"use client";
import React, { useState } from "react";
import { encouragements } from "./encouragements";

export default function LouangePage() {
  const [formData, setFormData] = useState({
    semaine: "",
    presence: {
      lundi: { oui: false, nb: 0 },
      mardi: { oui: false, nb: 0 },
    },
    repetition: { date: "", nb: 0, notes: "" },
    adp: { nb: 0, commentaire: "" },
    culte: { nb: 0, commentaire: "" },
    autres: [{ titre: "", date: "", nb: 0, commentaire: "" }],
  });

  // Déterminer la semaine courante (1 à 12)
  const weekNumber = Math.ceil(new Date().getDate() / 7);
  const encouragement = encouragements[(weekNumber - 1) % encouragements.length];

  // Gestion du formulaire
  const handleChange = (section: string, field: string, value: any) => {
    setFormData({
      ...formData,
      [section]: { ...formData[section as keyof typeof formData], [field]: value },
    });
  };

  const handleAutresChange = (index: number, field: string, value: any) => {
    const updated = [...formData.autres];
    updated[index][field] = value;
    setFormData({ ...formData, autres: updated });
  };

  const addAutreEvenement = () => {
    setFormData({
      ...formData,
      autres: [...formData.autres, { titre: "", date: "", nb: 0, commentaire: "" }],
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("✅ Données soumises :", formData);
    alert("Rapport de Louange soumis avec succès !");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center p-6">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-center mb-6">📋 Rapport Louange</h1>

        {/* Message d’encouragement */}
        <div className="mb-6 p-4 bg-green-100 rounded-xl shadow">
          <p className="text-lg font-semibold">💡 Message de la semaine :</p>
          <p className="italic">"{encouragement.message}"</p>
          <p className="mt-2 text-sm text-gray-700">📖 {encouragement.verset}</p>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Semaine */}
          <div>
            <label className="block font-medium mb-1">📆 Semaine concernée</label>
            <input
              type="text"
              value={formData.semaine}
              onChange={(e) => setFormData({ ...formData, semaine: e.target.value })}
              className="w-full p-2 border rounded-lg"
              placeholder="Exemple : du 02/09 au 08/09"
              required
            />
          </div>

          {/* Présence */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["lundi", "mardi"].map((jour) => (
              <div key={jour} className="p-4 border rounded-xl">
                <label className="block font-medium capitalize mb-2">Présence {jour}</label>
                <select
                  value={formData.presence[jour as "lundi" | "mardi"].oui ? "oui" : "non"}
                  onChange={(e) =>
                    handleChange("presence", jour, {
                      ...formData.presence[jour as "lundi" | "mardi"],
                      oui: e.target.value === "oui",
                    })
                  }
                  className="w-full p-2 border rounded-lg mb-2"
                >
                  <option value="non">Non</option>
                  <option value="oui">Oui</option>
                </select>
                <input
                  type="number"
                  value={formData.presence[jour as "lundi" | "mardi"].nb}
                  onChange={(e) =>
                    handleChange("presence", jour, {
                      ...formData.presence[jour as "lundi" | "mardi"],
                      nb: Number(e.target.value),
                    })
                  }
                  className="w-full p-2 border rounded-lg"
                  placeholder="Nombre de personnes"
                />
              </div>
            ))}
          </div>

          {/* Répétition */}
          <div className="p-4 border rounded-xl">
            <label className="block font-medium mb-2">🎶 Répétition Louange</label>
            <input
              type="date"
              value={formData.repetition.date}
              onChange={(e) => handleChange("repetition", "date", e.target.value)}
              className="w-full p-2 border rounded-lg mb-2"
            />
            <input
              type="number"
              value={formData.repetition.nb}
              onChange={(e) => handleChange("repetition", "nb", Number(e.target.value))}
              className="w-full p-2 border rounded-lg mb-2"
              placeholder="Nombre de présents"
            />
            <textarea
              value={formData.repetition.notes}
              onChange={(e) => handleChange("repetition", "notes", e.target.value)}
              className="w-full p-2 border rounded-lg"
              placeholder="Notes / observations"
            />
          </div>

          {/* ADP */}
          <div className="p-4 border rounded-xl">
            <label className="block font-medium mb-2">🙏 Présents ADP</label>
            <input
              type="number"
              value={formData.adp.nb}
              onChange={(e) => handleChange("adp", "nb", Number(e.target.value))}
              className="w-full p-2 border rounded-lg mb-2"
              placeholder="Nombre de présents"
            />
            <textarea
              value={formData.adp.commentaire}
              onChange={(e) => handleChange("adp", "commentaire", e.target.value)}
              className="w-full p-2 border rounded-lg"
              placeholder="Commentaire"
            />
          </div>

          {/* Culte */}
          <div className="p-4 border rounded-xl">
            <label className="block font-medium mb-2">⛪ Présents Culte (dimanche)</label>
            <input
              type="number"
              value={formData.culte.nb}
              onChange={(e) => handleChange("culte", "nb", Number(e.target.value))}
              className="w-full p-2 border rounded-lg mb-2"
              placeholder="Nombre de présents"
            />
            <textarea
              value={formData.culte.commentaire}
              onChange={(e) => handleChange("culte", "commentaire", e.target.value)}
              className="w-full p-2 border rounded-lg"
              placeholder="Commentaire"
            />
          </div>

          {/* Autres événements */}
          <div className="p-4 border rounded-xl">
            <label className="block font-medium mb-2">📌 Autres événements</label>
            {formData.autres.map((ev, i) => (
              <div key={i} className="mb-4 p-3 border rounded-lg bg-gray-50">
                <input
                  type="text"
                  value={ev.titre}
                  onChange={(e) => handleAutresChange(i, "titre", e.target.value)}
                  className="w-full p-2 border rounded-lg mb-2"
                  placeholder="Titre de l’événement"
                />
                <input
                  type="date"
                  value={ev.date}
                  onChange={(e) => handleAutresChange(i, "date", e.target.value)}
                  className="w-full p-2 border rounded-lg mb-2"
                />
                <input
                  type="number"
                  value={ev.nb}
                  onChange={(e) => handleAutresChange(i, "nb", Number(e.target.value))}
                  className="w-full p-2 border rounded-lg mb-2"
                  placeholder="Nombre de participants"
                />
                <textarea
                  value={ev.commentaire}
                  onChange={(e) => handleAutresChange(i, "commentaire", e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Commentaire"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addAutreEvenement}
              className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              + Ajouter un événement
            </button>
          </div>

          {/* Soumettre */}
          <button
            type="submit"
            className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            ✅ Soumettre le rapport
          </button>
        </form>
      </div>
    </div>
  );
}


