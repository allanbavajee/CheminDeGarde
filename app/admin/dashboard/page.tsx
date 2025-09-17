"use client";
import { useState } from "react";

export default function AdminPage() {
  const [email, setEmail] = useState("");
  const [nom, setNom] = useState("");
  const [departement, setDepartement] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("/api/create-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, nom, departement }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur inconnue");

      setMessage("✅ Utilisateur ajouté avec succès !");
      setEmail("");
      setNom("");
      setDepartement("");
      setPassword("");
    } catch (err: any) {
      setMessage("❌ Erreur ajout: " + err.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">Admin – Ajouter un utilisateur</h1>

      <form onSubmit={handleAddUser} className="space-y-4">
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

        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Ajouter
        </button>
      </form>

      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
}
