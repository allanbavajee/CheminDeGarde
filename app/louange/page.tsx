/* app/louange/page.tsx : page du département Louange */
"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Evenement = {
  titre: string;
  date: string;
  nb: number;
  commentaire: string;
};

type LouangeForm = {
  semaine: string;
  lundi_presence: string;
  lundi_nombre: number;
  mardi_presence: string;
  mardi_nombre: number;
  repetition_date: string;
  repetition_nombre: number;
  repetition_notes: string;
  adp_nombre: number;
  adp_commentaire: string;
  culte_commentaire: string;
  general_commentaire: string;
  autres: Evenement[];
};

export default function LouangePage() {
  const [formData, setFormData] = useState<LouangeForm>({
    semaine: "",
    lundi_presence: "Non",
    lundi_nombre: 0,
    mardi_presence: "Non",
    mardi_nombre: 0,
    repetition_date: "",
    repetition_nombre: 0,
    repetition_notes: "",
    adp_nombre: 0,
    adp_commentaire: "",
    culte_commentaire: "",
    general_commentaire: "",
    autres: [],
  });

  const [message, setMessage] = useState("");

  // Ajout d’un événement dynamique
  const ajouterEvenement = () => {
    setFormData({
      ...formData,
      autres: [
        ...formData.autres,
        { titre: "", date: "", nb: 0, commentaire: "" },
      ],
    });
  };

  // Mise à jour des champs des événements
  const handleEvenementChange = (
    index: number,
    field: keyof Evenement,
    value: string | number
  ) => {
    const newAutres = [...formData.autres];
    newAutres[index][field] = value as never;
    setFormData({ ...formData, autres: newAutres });
  };

  // Soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.from("louange_form").insert([formData]);

    if (error) {
      console.error(error);
      setMessage("❌ Erreur lors de l’enregistrement.");
    } else {
      setMessage("✅ Formulaire enregistré avec succès !");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Rapport Louange</h1>

      {message && <p className="mb-4 text-center">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Semaine */}
        <div>
          <label className="block font-medium">Semaine concernée</label>
          <input
            type="text"
            value={formData.semaine}
            onChange={(e) =>
              setFormData({ ...formData, semaine: e.target.value })
            }
            placeholder="ex: 02/09 au 08/09"
            className="border p-2 w-full rounded"
          />
        </div>

        {/* Présence lundi */}
        <div>
          <label className="block font-medium">Présence lundi</label>
          <select
            value={formData.lundi_presence}
            onChange={(e) =>
              setFormData({ ...formData, lundi_presence: e.target.value })
            }
            className="border p-2 rounded"
          >
            <option>Oui</option>
            <option>Non</option>
          </select>
          <input
            type="number"
            value={formData.lundi_nombre}
            onChange={(e) =>
              setFormData({ ...formData, lundi_nombre: Number(e.target.value) })
            }
            className="border p-2 ml-2 w-24 rounded"
            placeholder="Nb"
          />
        </div>

        {/* Présence mardi */}
        <div>
          <label className="block font-medium">Présence mardi</label>
          <select
            value={formData.mardi_presence}
            onChange={(e) =>
              setFormData({ ...formData, mardi_presence: e.target.value })
            }
            className="border p-2 rounded"
          >
            <option>Oui</option>
            <option>Non</option>
          </select>
          <input
            type="number"
            value={formData.mardi_nombre}
            onChange={(e) =>
              setFormData({ ...formData, mardi_nombre: Number(e.target.value) })
            }
            className="border p-2 ml-2 w-24 rounded"
            placeholder="Nb"
          />
        </div>

        {/* Répétition */}
        <div>
          <label className="block font-medium">Répétition Louange</label>
          <input
            type="date"
            value={formData.repetition_date}
            onChange={(e) =>
              setFormData({ ...formData, repetition_date: e.target.value })
            }
            className="border p-2 w-full rounded"
          />
          <input
            type="number"
            value={formData.repetition_nombre}
            onChange={(e) =>
              setFormData({
                ...formData,
                repetition_nombre: Number(e.target.value),
              })
            }
            className="border p-2 w-full mt-2 rounded"
            placeholder="Nombre présents"
          />
          <textarea
            value={formData.repetition_notes}
            onChange={(e) =>
              setFormData({ ...formData, repetition_notes: e.target.value })
            }
            className="border p-2 w-full mt-2 rounded"
            placeholder="Notes / observations"
          />
        </div>

        {/* ADP */}
        <div>
          <label className="block font-medium">Présents ADP</label>
          <input
            type="number"
            value={formData.adp_nombre}
            onChange={(e) =>
              setFormData({ ...formData, adp_nombre: Number(e.target.value) })
            }
            className="border p-2 w-full rounded"
            placeholder="Nombre de présents"
          />
          <textarea
            value={formData.adp_commentaire}
            onChange={(e) =>
              setFormData({ ...formData, adp_commentaire: e.target.value })
            }
            className="border p-2 w-full mt-2 rounded"
            placeholder="Commentaire"
          />
        </div>

        {/* Culte */}
        <div>
          <label className="block font-medium">Présents Culte (dimanche)</label>
          <textarea
            value={formData.culte_commentaire}
            onChange={(e) =>
              setFormData({ ...formData, culte_commentaire: e.target.value })
            }
            className="border p-2 w-full rounded"
            placeholder="Commentaire"
          />
        </div>

        {/* Autres événements */}
        <div>
          <label className="block font-medium mb-2">Autres événements</label>
          {formData.autres.map((ev, index) => (
            <div key={index} className="border p-3 mb-3 rounded bg-gray-50">
              <input
                type="text"
                placeholder="Titre"
                value={ev.titre}
                onChange={(e) =>
                  handleEvenementChange(index, "titre", e.target.value)
                }
                className="border p-2 w-full mb-2 rounded"
              />
              <input
                type="date"
                value={ev.date}
                onChange={(e) =>
                  handleEvenementChange(index, "date", e.target.value)
                }
                className="border p-2 w-full mb-2 rounded"
              />
              <input
                type="number"
                placeholder="Nombre participants"
                value={ev.nb}
                onChange={(e) =>
                  handleEvenementChange(index, "nb", Number(e.target.value))
                }
                className="border p-2 w-full mb-2 rounded"
              />
              <textarea
                placeholder="Commentaire"
                value={ev.commentaire}
                onChange={(e) =>
                  handleEvenementChange(index, "commentaire", e.target.value)
                }
                className="border p-2 w-full rounded"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={ajouterEvenement}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            ➕ Ajouter un événement
          </button>
        </div>

        {/* Commentaire général */}
        <div>
          <label className="block font-medium">Commentaire général</label>
          <textarea
            value={formData.general_commentaire}
            onChange={(e) =>
              setFormData({ ...formData, general_commentaire: e.target.value })
            }
            className="border p-2 w-full rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded"
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
}
