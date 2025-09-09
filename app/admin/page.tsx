"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

const departements = [
  "Louange",
  "Intercession",
  "Impact Junior/Adso",
  "Évangélisation",
  "Cellule",
  "Hôtesse",
  "Technique/Comm",
  "Modération",
  "Compassion",
  "Conseiller",
];

export default function AdminPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // mot de passe
  const [departement, setDepartement] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const { data, error } = await supabase.from("users_custom").select("*");
    if (error) console.error("Erreur fetch:", error);
    else setUsers(data);
  }

  async function addUser() {
    // 1. Créer compte avec Auth
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
    });

    if (error) {
      console.error("Erreur Auth:", error);
      return;
    }

    // 2. Ajouter infos dans users_custom
    const { error: insertError } = await supabase.from("users_custom").insert([
      { user_id: data.user.id, nom, email, departement },
    ]);

    if (insertError) console.error("Erreur insert:", insertError);
    else {
      setNom("");
      setEmail("");
      setPassword("");
      setDepartement("");
      fetchUsers();
    }
  }

  async function deleteUser(id: string) {
    const { error } = await supabase.from("users_custom").delete().eq("id", id);
    if (error) console.error("Erreur suppression:", error);
    else fetchUsers();
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin - Gestion des utilisateurs</h1>

      {/* Formulaire */}
      <div className="space-y-2 mb-6">
        <input
          type="text"
          placeholder="Nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="email"
          placeholder="Email utilisateur"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <select
          value={departement}
          onChange={(e) => setDepartement(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="">-- Choisir un département --</option>
          {departements.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        <button
          onClick={addUser}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Ajouter
        </button>
      </div>

      {/* Liste utilisateurs */}
      <h2 className="text-xl font-semibold mb-2">Liste des utilisateurs</h2>
      <ul className="space-y-1">
        {users.map((u) => (
          <li key={u.id} className="border p-2 rounded flex justify-between">
            <span>
              {u.nom} — {u.email} ({u.departement})
            </span>
            <button
              onClick={() => deleteUser(u.id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
