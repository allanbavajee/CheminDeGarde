"use client";
import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/lib/supabaseClient";

type LouangeReport = {
  id: number;
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
  autres: any[];
  created_at: string;
  user_email: string;
};

export default function AdminLouangePage() {
  const [reports, setReports] = useState<LouangeReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterWeek, setFilterWeek] = useState("");

  const fetchReports = async () => {
    setLoading(true);
    let query = supabase
      .from("louange_form")
      .select("*, user:users_custom(email)")
      .order("created_at", { ascending: false });

    if (filterWeek) {
      query = query.eq("semaine", filterWeek);
    }

    const { data, error } = await query;
    if (!error && data) {
      const formatted = data.map((r: any) => ({
        ...r,
        user_email: r.user?.email || "Inconnu",
      }));
      setReports(formatted);
    } else {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReports();
  }, [filterWeek]);

  const calculateCompletion = (r: LouangeReport) => {
    const required = [
      r.semaine,
      r.lundi_presence,
      r.mardi_presence,
      r.repetition_date,
      r.repetition_nombre?.toString(),
      r.adp_nombre?.toString(),
    ];
    const filled = required.filter((f) => f && f !== "0").length;
    return Math.round((filled / required.length) * 100);
  };

  if (loading) return <p className="text-center mt-10">Chargement...</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Rapports Louange</h1>

      <div className="mb-4 flex gap-2 items-center">
        <label>Semaine:</label>
        <input
          type="text"
          placeholder="ex: 02/09 au 08/09"
          value={filterWeek}
          onChange={(e) => setFilterWeek(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          onClick={fetchReports}
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          Filtrer
        </button>
      </div>

      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-2 py-1">Utilisateur</th>
            <th className="border px-2 py-1">Semaine</th>
            <th className="border px-2 py-1">Lundi</th>
            <th className="border px-2 py-1">Mardi</th>
            <th className="border px-2 py-1">Répétition</th>
            <th className="border px-2 py-1">ADP</th>
            <th className="border px-2 py-1">Culte</th>
            <th className="border px-2 py-1">% Complétion</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((r) => (
            <tr key={r.id} className="text-center">
              <td className="border px-2 py-1">{r.user_email}</td>
              <td className="border px-2 py-1">{r.semaine}</td>
              <td className="border px-2 py-1">
                {r.lundi_presence} ({r.lundi_nombre})
              </td>
              <td className="border px-2 py-1">
                {r.mardi_presence} ({r.mardi_nombre})
              </td>
              <td className="border px-2 py-1">
                {r.repetition_date} ({r.repetition_nombre})
              </td>
              <td className="border px-2 py-1">
                {r.adp_nombre} {r.adp_commentaire && `(${r.adp_commentaire})`}
              </td>
              <td className="border px-2 py-1">{r.culte_commentaire}</td>
              <td className="border px-2 py-1">{calculateCompletion(r)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
