/* app/admin/page.tsx */
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AdminPage() {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [departement, setDepartement] = useState("");
  const [users, setUsers] = useState<any[]>([]);

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

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const { data, error } = await supabase.from("users_custom").select("*");
    if (!error && data) setUsers(data);
  }

  async function addUser() {
    const res = await fetch("/api/create-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nom, email, password, departement }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert("Erreur ajout: " + data.error);
      return;
    }

    setNom("");
    setEmail("");
    setPassword("");
    setDepartement("");
    fetchUsers();
  }

  async function deleteUser(user_id: string) {
    if (!confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) return;

    const res = await fetch("/api/delete-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert("Erreur suppression: " + data.error);
      return;
    }

    fetchUsers();
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Administration – Gestion des utilisateurs</h1>

      {/* Formulaire ajout utilisateur */}
      <div className="bg-white p-6 rounded-2xl shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Ajouter un utilisateur</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <input
            type="text"
            placeholder="Nom complet"
            className="p-2 border rounded-lg"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="p-2 border rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            className="p-2 border rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <select
            className="p-2 border rounded-lg"
            value={departement}
            onChange={(e) => setDepartement(e.target.value)}
          >
            <option value="">Choisir un département</option>
            {departements.map((dep) => (
              <option key={dep} value={dep}>
                {dep}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={addUser}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          ➕ Ajouter
        </button>
      </div>

      {/* Liste des utilisateurs */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4">Liste des utilisateurs</h2>
        {users.length === 0 ? (
          <p className="text-gray-500">Aucun utilisateur enregistré.</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2 border">Nom</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Département</th>
                <th className="p-2 border text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.user_id} className="border-t">
                  <td className="p-2 border">{u.nom}</td>
                  <td className="p-2 border">{u.email}</td>
                  <td className="p-2 border">{u.departement}</td>
                  <td className="p-2 border text-center">
                    <button
                      onClick={() => deleteUser(u.user_id)}
                      className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition"
                    >
                      🗑 Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
