/* app/admin/page.tsx */
"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AdminPage() {
  const [email, setEmail] = useState("");
  const [nom, setNom] = useState("");
  const [departement, setDepartement] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const [users, setUsers] = useState<any[]>([]);
  const [editingUser, setEditingUser] = useState<any | null>(null);

  // 🔹 Charger les utilisateurs existants
  const fetchUsers = async () => {
    const { data, error } = await supabase.from("users").select("*");
    if (error) {
      console.error(error);
    } else {
      setUsers(data || []);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🔹 Ajouter un utilisateur
  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const { error } = await supabase.from("users").insert([
        { nom, email, departement, password },
      ]);

      if (error) throw error;

      setMessage("✅ Utilisateur ajouté avec succès !");
      setEmail("");
      setNom("");
      setDepartement("");
      setPassword("");
      fetchUsers();
    } catch (err: any) {
      setMessage("❌ Erreur ajout: " + err.message);
    }
  };

  // 🔹 Supprimer un utilisateur
  const handleDelete = async (id: number) => {
    if (!confirm("Supprimer cet utilisateur ?")) return;
    const { error } = await supabase.from("users").delete().eq("id", id);
    if (error) {
      alert("Erreur suppression: " + error.message);
    } else {
      fetchUsers();
    }
  };

  // 🔹 Modifier un utilisateur
  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    const { error } = await supabase
      .from("users")
      .update({
        nom: editingUser.nom,
        email: editingUser.email,
        departement: editingUser.departement,
      })
      .eq("id", editingUser.id);

    if (error) {
      alert("Erreur modification: " + error.message);
    } else {
      setEditingUser(null);
      fetchUsers();
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 border rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Admin – Gestion des utilisateurs
      </h1>

      {/* ✅ Formulaire d’ajout */}
      <form onSubmit={handleAddUser} className="space-y-4 mb-8">
        <input
          type="text"
          placeholder="Nom complet"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          placeholder="Adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />

        <select
          value={departement}
          onChange={(e) => setDepartement(e.target.value)}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">-- Choisir un département --</option>
          <option value="Louange">Louange</option>
          <option value="Intercession">Intercession</option>
          <option value="Impact Junior/Adso">Impact Junior/Adso</option>
          <option value="Evangelisation">Evangelisation</option>
          <option value="Cellule">Cellule</option>
          <option value="Hotesse">Hotesse</option>
          <option value="Technique/Comm">Technique/Comm</option>
          <option value="Moderation">Moderation</option>
          <option value="Compassion">Compassion</option>
          <option value="Conseiller">Conseiller</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Ajouter
        </button>
      </form>

      {message && <p className="mb-6 text-center">{message}</p>}

      {/* ✅ Liste des utilisateurs */}
      <h2 className="text-xl font-semibold mb-4">Liste des utilisateurs</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Nom</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Département</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td className="border p-2">{u.nom}</td>
              <td className="border p-2">{u.email}</td>
              <td className="border p-2">{u.departement}</td>
              <td className="border p-2 space-x-2">
                <button
                  onClick={() => setEditingUser(u)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleDelete(u.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ Formulaire de modification */}
      {editingUser && (
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <h3 className="font-bold mb-2">Modifier utilisateur</h3>
          <form onSubmit={handleEdit} className="space-y-2">
            <input
              type="text"
              value={editingUser.nom}
              onChange={(e) =>
                setEditingUser({ ...editingUser, nom: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="email"
              value={editingUser.email}
              onChange={(e) =>
                setEditingUser({ ...editingUser, email: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
            <select
              value={editingUser.departement}
              onChange={(e) =>
                setEditingUser({
                  ...editingUser,
                  departement: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
              required
            >
              <option value="">-- Choisir un département --</option>
              <option value="Louange">Louange</option>
              <option value="Intercession">Intercession</option>
              <option value="Impact Junior/Adso">Impact Junior/Adso</option>
              <option value="Evangelisation">Evangelisation</option>
              <option value="Cellule">Cellule</option>
              <option value="Hotesse">Hotesse</option>
              <option value="Technique/Comm">Technique/Comm</option>
              <option value="Moderation">Moderation</option>
              <option value="Compassion">Compassion</option>
              <option value="Conseiller">Conseiller</option>
            </select>
            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 bg-green-600 text-white p-2 rounded"
              >
                Sauvegarder
              </button>
              <button
                type="button"
                onClick={() => setEditingUser(null)}
                className="flex-1 bg-gray-400 text-white p-2 rounded"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
