/* app/louange/page.tsx : page du département Louange */

"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function LouangeForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    semaine: "",
    lundi: { present: false, nb: 0 },
    mardi: { present: false, nb: 0 },
    total: 0,
    commentaire: "",
    repetition: { date: "", nb: 0, notes: "" },
    adp: { nb: 0, commentaire: "" },
    culte: { nb: 0, commentaire: "" },
    autres: [],
  });

  const addEvenement = () => {
    setFormData({
      ...formData,
      autres: [
        ...formData.autres,
        { titre: "", date: "", nb: 0, commentaire: "" },
      ],
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");

    const { data: user } = await supabase.auth.getUser();

    const { error } = await supabase.from("louange_reports").insert({
      user_id: user?.user?.id,
      semaine: formData.semaine,
      lundi_present: formData.lundi.present,
      lundi_nb: formData.lundi.nb,
      mardi_present: formData.mardi.present,
      mardi_nb: formData.mardi.nb,
      total: formData.total,
      commentaire: formData.commentaire,
      repetition_date: formData.repetition.date || null,
      repetition_nb: formData.repetition.nb,
      repetition_notes: formData.repetition.notes,
      adp_nb: formData.adp.nb,
      adp_commentaire: formData.adp.commentaire,
      culte_nb: formData.culte.nb,
      culte_commentaire: formData.culte.commentaire,
      autres: formData.autres,
    });

    if (error) {
      setMessage("❌ Erreur: " + error.message);
    } else {
      setMessage("✅ Rapport enregistré avec succès !");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        Rapport Louange – Semaine écoulée
      </h1>

      {/* Semaine */}
      <div className="mb-4">
        <label className="block font-semibold">Semaine concernée</label>
        <input
          type="text"
          placeholder="02/09 au 08/09"
          className="w-full border p-2 rounded"
          value={formData.semaine}
          onChange={(e) =>
            setFormData({ ...formData, semaine: e.target.value })
          }
        />
      </div>

      {/* Présence lundi */}
      <div className="mb-4">
        <label className="block font-semibold">Présence lundi</label>
        <input
          type="checkbox"
          checked={formData.lundi.present}
          onChange={(e) =>
            setFormData({
              ...formData,
              lundi: { ...formData.lundi, present: e.target.checked },
            })
          }
        />{" "}
        Présent
        <input
          type="number"
          placeholder="Nombre"
          className="ml-4 border p-2 rounded"
          value={formData.lundi.nb}
          onChange={(e) =>
            setFormData({
              ...formData,
              lundi: { ...formData.lundi, nb: parseInt(e.target.value) },
            })
          }
        />
      </div>

      {/* Présence mardi */}
      <div className="mb-4">
        <label className="block font-semibold">Présence mardi</label>
        <input
          type="checkbox"
          checked={formData.mardi.present}
          onChange={(e) =>
            setFormData({
              ...formData,
              mardi: { ...formData.mardi, present: e.target.checked },
            })
          }
        />{" "}
        Présent
        <input
          type="number"
          placeholder="Nombre"
          className="ml-4 border p-2 rounded"
          value={formData.mardi.nb}
          onChange={(e) =>
            setFormData({
              ...formData,
              mardi: { ...formData.mardi, nb: parseInt(e.target.value) },
            })
          }
        />
      </div>

      {/* Total */}
      <div className="mb-4">
        <label className="block font-semibold">Nombre total de personnes</label>
        <input
          type="number"
          className="w-full border p-2 rounded"
          value={formData.total}
          onChange={(e) =>
            setFormData({ ...formData, total: parseInt(e.target.value) })
          }
        />
      </div>

      {/* Commentaire */}
      <div className="mb-4">
        <label className="block font-semibold">Commentaire</label>
        <textarea
          className="w-full border p-2 rounded"
          value={formData.commentaire}
          onChange={(e) =>
            setFormData({ ...formData, commentaire: e.target.value })
          }
        />
      </div>

      {/* Répétition Louange */}
      <div className="mb-6">
        <h2 className="text-lg font-bold">Répétition Louange</h2>
        <input
          type="date"
          className="w-full border p-2 rounded my-2"
          value={formData.repetition.date}
          onChange={(e) =>
            setFormData({
              ...formData,
              repetition: { ...formData.repetition, date: e.target.value },
            })
          }
        />
        <input
          type="number"
          placeholder="Nombre de présents"
          className="w-full border p-2 rounded my-2"
          value={formData.repetition.nb}
          onChange={(e) =>
            setFormData({
              ...formData,
              repetition: { ...formData.repetition, nb: parseInt(e.target.value) },
            })
          }
        />
        <textarea
          placeholder="Notes / observations"
          className="w-full border p-2 rounded"
          value={formData.repetition.notes}
          onChange={(e) =>
            setFormData({
              ...formData,
              repetition: { ...formData.repetition, notes: e.target.value },
            })
          }
        />
      </div>

      {/* ADP */}
      <div className="mb-6">
        <h2 className="text-lg font-bold">Présents ADP</h2>
        <input
          type="number"
          placeholder="Nombre de présents"
          className="w-full border p-2 rounded my-2"
          value={formData.adp.nb}
          onChange={(e) =>
            setFormData({
              ...formData,
              adp: { ...formData.adp, nb: parseInt(e.target.value) },
            })
          }
        />
        <textarea
          placeholder="Commentaire"
          className="w-full border p-2 rounded"
          value={formData.adp.commentaire}
          onChange={(e) =>
            setFormData({
              ...formData,
              adp: { ...formData.adp, commentaire: e.target.value },
            })
          }
        />
      </div>

      {/* Culte */}
      <div className="mb-6">
        <h2 className="text-lg font-bold">Présents Culte</h2>
        <input
          type="number"
          placeholder="Nombre de présents"
          className="w-full border p-2 rounded my-2"
          value={formData.culte.nb}
          onChange={(e) =>
            setFormData({
              ...formData,
              culte: { ...formData.culte, nb: parseInt(e.target.value) },
            })
          }
        />
        <textarea
          placeholder="Commentaire"
          className="w-full border p-2 rounded"
          value={formData.culte.commentaire}
          onChange={(e) =>
            setFormData({
              ...formData,
              culte: { ...formData.culte, commentaire: e.target.value },
            })
          }
        />
      </div>

      {/* Autres événements */}
      <div className="mb-6">
        <h2 className="text-lg font-bold">Autres événements</h2>
        {formData.autres.map((ev, i) => (
          <div key={i} className="border p-3 rounded mb-3">
            <input
              type="text"
              placeholder="Titre"
              className="w-full border p-2 rounded mb-2"
              value={ev.titre}
              onChange={(e) => {
                const updated = [...formData.autres];
                updated[i].titre = e.target.value;
                setFormData({ ...formData, autres: updated });
              }}
            />
            <input
              type="date"
              className="w-full border p-2 rounded mb-2"
              value={ev.date}
              onChange={(e) => {
                const updated = [...formData.autres];
                updated[i].date = e.target.value;
                setFormData({ ...formData, autres: updated });
              }}
            />
            <input
              type="number"
              placeholder="Participants"
              className="w-full border p-2 rounded mb-2"
              value={ev.nb}
              onChange={(e) => {
                const updated = [...formData.autres];
                updated[i].nb = parseInt(e.target.value);
                setFormData({ ...formData, autres: updated });
              }}
            />
            <textarea
              placeholder="Commentaire"
              className="w-full border p-2 rounded"
              value={ev.commentaire}
              onChange={(e) => {
                const updated = [...formData.autres];
                updated[i].commentaire = e.target.value;
                setFormData({ ...formData, autres: updated });
              }}
            />
          </div>
        ))}

        <button
          type="button"
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={addEvenement}
        >
          + Ajouter un événement
        </button>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="px-6 py-2 bg-green-600 text-white font-bold rounded"
      >
        {loading ? "Enregistrement..." : "Enregistrer"}
      </button>

      {message && <p className="mt-4 font-semibold">{message}</p>}
    </div>
  );
}
