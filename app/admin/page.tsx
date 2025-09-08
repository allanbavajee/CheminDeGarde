"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AdminPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [email, setEmail] = useState("");
  const [departement, setDepartement] = useState("");

  // Charger les utilisateurs
  const fetchUsers = async () => {
    const { data, error } = await supabase.from("users_custom").select("*");
    if (error) {
      console.error("Erreur fetch:", error.message);
    } else {
      setUsers(data || []);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Ajouter un utilisateur
  const addUser = async () => {
    if (!email || !departement) {
      alert("Remplis tous les champs !");
      return;
    }

    const { error } = await supabase
      .from("users_custom")
      .insert([{ email, departement }]);

    if (error) {
      alert("Erreur ajout: " + error.message);
    } else {
      setEmail("");
      setDepartement("");
      fetchUsers();
    }
  };

  // Supprimer un utilisateur
  const deleteUser = async (id: string) => {
    const { error } = await supabase.from("users_custom").delete().eq("id", id);

    if (error) {
      alert("Erreur suppression: " + error.message);
    } else {
      fetchUsers();
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-5 border rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-5 text-center">Admin - Gestion des utilisateurs</h1>

      {/* Formulaire ajout utilisateur */}
      <div className="mb-6">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 mr-2 rounded w-2/3"
        />
        <select
          value={departement}
          onChange={(e) => setDepartement(e.target.value)}
          className="border p-2 rounded w-1/3"
        >
          <option value="">Choisir...</option>
          <option value="louange">Louange</option>
          <option value="intercession">Intercession</option>
          <option value="impact junior/adso">Impact Junior / ADSO</option>
          <option value="evangelisation">Évangélisation</option>
          <option value="cellule">Cellule</option>
          <option value="hotesse">Hôtesse</option>
          <option value="technique/comm">Technique / Comm</option>
          <option value="moderation">Modération</option>
          <option value="compassion">Compassion</option>
          <option value="conseiller">Conseiller</option>
          <option value="admin">Admin</option>
        </select>
        <button
          onClick={addUser}
          className="ml-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Ajouter
        </button>
      </div>

      {/* Liste des utilisateurs */}
      <h2 className="text-xl font-semibold mb-3">Liste des utilisateurs</h2>
      <ul className="space-y-2">
        {users.map((u) => (
          <li
            key={u.id}
            className="flex justify-between items-center border p-2 rounded"
          >
            <span>
              {u.email} — <b>{u.departement}</b>
            </span>
            <button
              onClick={() => deleteUser(u.id)}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
