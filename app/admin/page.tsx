"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AdminPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [email, setEmail] = useState("");
  const [nom, setNom] = useState("");   // <-- ajouté
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
    const { error } = await supabase
      .from("users_custom")
      .insert([{ email, nom, departement }]); // <-- ajouté nom
    if (error) console.error("Erreur ajout:", error);
    else {
      setEmail("");
      setNom("");
      setDepartement("");
      fetchUsers();
    }
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin - Gestion des utilisateurs</h1>
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
          type="text"
          placeholder="Département"
          value={departement}
          onChange={(e) => setDepartement(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <button
          onClick={addUser}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Ajouter
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-2">Liste des utilisateurs</h2>
      <ul className="space-y-1">
        {users.map((u) => (
          <li key={u.id} className="border p-2 rounded">
            {u.nom} — {u.email} ({u.departement})
          </li>
        ))}
      </ul>
    </div>
  );
}
