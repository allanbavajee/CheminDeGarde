/* app/louange/page.tsx : page du département Louange */
"use client";
import React, { useState } from "react";
import encouragements from "@/lib/encouragements";

export default function LouangePage() {
  // 🔹 Index de la semaine (1 message par semaine)
  const currentWeek = Math.floor(
    (new Date().getTime() - new Date("2025-01-01").getTime()) /
      (7 * 24 * 60 * 60 * 1000)
  ) % encouragements.length;

  const [formData, setFormData] = useState({
    semaine: "",
    lundi: { present: false, nb: 0 },
    mardi: { present: false, nb: 0 },
    repetition: { date: "", nb: 0, notes: "" },
    adp: { nb: 0, commentaire: "" },
    culte: { commentaire: "" },
    autres: [] as { titre: string; date: string; nb: number; commentaire: string }[],
  });

  // ✅ HandleChange corrigé
  const handleChange = (
    section: string,
    field: string,
    value: string | number | boolean
  ) => {
    setFormData((prev) => {
      const currentSection = prev[section as keyof typeof prev];

      if (typeof currentSection === "object" && currentSection !== null) {
        return {
          ...prev,
          [section]: {
            ...(currentSection as Record<string, any>),
            [field]: value,
          },
        };
      }

      return {
        ...prev,
        [section]: value,
      };
    });
  };

  // Ajouter un autre événement
  const addEvenement = () => {
    setFormData((prev) => ({
      ...prev,
      autres: [
        ...prev.autres,
        { titre: "", date: "", nb: 0, commentaire: "" },
      ],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Formulaire envoyé ✅", formData);
    alert("Données envoyées avec succès !");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Espace Louange 🎶</h1>

      {/* 🔹 Message d'encouragement + verset */}
      <div className="p-4 mb-6 rounded-xl shadow bg-green-100 border-l-4 border-green-500">
        <p className="font-semibold text-green-800">
          {encouragements[currentWeek].message}
        </p>
        <p className="text-sm text-gray-700 mt-2">
          <strong>{encouragements[currentWeek].verset}</strong>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Semaine */}
        <div>
          <label className="block font-medium">Semaine concernée</label>
          <input
            type="text"
            value={formData.semaine}
            onChange={(e) =>
              handleChange("semaine", "semaine", e.target.value)
            }
            className="w-full border p-2 rounded"
            placeholder="Ex: du 02/09 au 08/09"
          />
        </div>

        {/* Présence Lundi */}
        <div>
          <label className="block font-medium">Présence Lundi</label>
          <input
            type="checkbox"
            checked={formData.lundi.present}
            onChange={(e) => handleChange("lundi", "present", e.target.checked)}
            className="mr-2"
          />
          <input
            type="number"
            value={formData.lundi.nb}
            onChange={(e) => handleChange("lundi", "nb", Number(e.target.value))}
            className="border p-2 rounded w-24"
            placeholder="Nb"
          />
        </div>

        {/* Présence Mardi */}
        <div>
          <label className="block font-medium">Présence Mardi</label>
          <input
            type="checkbox"
            checked={formData.mardi.present}
            onChange={(e) => handleChange("mardi", "present", e.target.checked)}
            className="mr-2"
          />
          <input
            type="number"
            value={formData.mardi.nb}
            onChange={(e) => handleChange("mardi", "nb", Number(e.target.value))}
            className="border p-2 rounded w-24"
            placeholder="Nb"
          />
        </div>

        {/* Répétition */}
        <div>
          <label className="block font-medium">Répétition Louange</label>
          <input
            type="date"
            value={formData.repetition.date}
            onChange={(e) =>
              handleChange("repetition", "date", e.target.value)
            }
            className="border p-2 rounded block mb-2"
          />
          <input
            type="number"
            value={formData.repetition.nb}
            onChange={(e) =>
              handleChange("repetition", "nb", Number(e.target.value))
            }
            className="border p-2 rounded block mb-2"
            placeholder="Nombre présents"
          />
          <textarea
            value={formData.repetition.notes}
            onChange={(e) =>
              handleChange("repetition", "notes", e.target.value)
            }
            className="border p-2 rounded w-full"
            placeholder="Notes / observations"
          />
        </div>

        {/* ADP */}
        <div>
          <label className="block font-medium">Présents ADP</label>
          <input
            type="number"
            value={formData.adp.nb}
            onChange={(e) => handleChange("adp", "nb", Number(e.target.value))}
            className="border p-2 rounded block mb-2"
            placeholder="Nombre présents"
          />
          <textarea
            value={formData.adp.commentaire}
            onChange={(e) =>
              handleChange("adp", "commentaire", e.target.value)
            }
            className="border p-2 rounded w-full"
            placeholder="Commentaire"
          />
        </div>

        {/* Culte */}
        <div>
          <label className="block font-medium">Présents Culte (dimanche)</label>
          <textarea
            value={formData.culte.commentaire}
            onChange={(e) =>
              handleChange("culte", "commentaire", e.target.value)
            }
            className="border p-2 rounded w-full"
            placeholder="Commentaire"
          />
        </div>

        {/* Autres événements */}
        <div>
          <label className="block font-medium">Autres événements</label>
          {formData.autres.map((ev, idx) => (
            <div key={idx} className="p-2 border rounded mb-2">
              <input
                type="text"
                value={ev.titre}
                onChange={(e) =>
                  setFormData((prev) => {
                    const updated = [...prev.autres];
                    updated[idx].titre = e.target.value;
                    return { ...prev, autres: updated };
                  })
                }
                placeholder="Titre"
                className="border p-1 rounded block mb-1 w-full"
              />
              <input
                type="date"
                value={ev.date}
                onChange={(e) =>
                  setFormData((prev) => {
                    const updated = [...prev.autres];
                    updated[idx].date = e.target.value;
                    return { ...prev, autres: updated };
                  })
                }
                className="border p-1 rounded block mb-1"
              />
              <input
                type="number"
                value={ev.nb}
                onChange={(e) =>
                  setFormData((prev) => {
                    const updated = [...prev.autres];
                    updated[idx].nb = Number(e.target.value);
                    return { ...prev, autres: updated };
                  })
                }
                placeholder="Nb"
                className="border p-1 rounded block mb-1"
              />
              <textarea
                value={ev.commentaire}
                onChange={(e) =>
                  setFormData((prev) => {
                    const updated = [...prev.autres];
                    updated[idx].commentaire = e.target.value;
                    return { ...prev, autres: updated };
                  })
                }
                placeholder="Commentaire"
                className="border p-1 rounded block w-full"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addEvenement}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            + Ajouter un événement
          </button>
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Envoyer ✅
        </button>
      </form>
    </div>
  );
}



