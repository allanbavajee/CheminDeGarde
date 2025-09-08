/* app/admin/page.tsx : Interface admin pour créer des utilisateurs par département */

"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [departement, setDepartement] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const ADMIN_EMAIL = "admin@eglise.com"; // ton email admin

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      const currentUser = data.user;
      if (!currentUser || currentUser.email !== ADMIN_EMAIL) {
        router.push("/login"); // non admin → redirection login
        return;
      }
      setUser(currentUser);
      setLoading(false);
    };
    checkUser();
  }, [router]);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    // 1️⃣ Créer l’utilisateur dans Supabase Auth
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (error) {
      setMessage("❌ Erreur : " + error.message);
      return;
    }

    const userId = data.user?.id;

    // 2️⃣ Ajouter son département dans users_custom
    if (userId) {
      const { error: dbError } = await supabase
        .from("users_custom")
        .insert([{ id: userId, email, departement }]);

      if (dbError) {
        setMessage("Utilisateur créé mais erreur DB : " + dbError.message);
      } else {
        setMessage("✅ Utilisateur créé avec succès !");
        setEmail("");
        setPassword("");
        setDepartement("");
      }
    }
  };

  if (loading) return <p className="text-center mt-10">Chargement...</p>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">👑 Admin - Créer un utilisateur</h1>

      {message && <p className="mb-4 text-center text-sm text-blue-600">{message}</p>}

      <form onSubmit={handleCreateUser} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Département</label>
          <select
            value={departement}
            onChange={(e) => setDepartement(e.target.value)}
            className="w-full p-2 border rounded-lg"
            required
          >
            <option value="">-- Choisir --</option>
            <option value="louange">Louange</option>
            <option value="intercession">Intercession</option>
            <option value="impact-junior">Impact Junior/Adso</option>
            <option value="evangelisation">Évangélisation</option>
            <option value="cellule">Cellule</option>
            <option value="hotesse">Hôtesse</option>
            <option value="technique">Technique/Comm</option>
            <option value="moderation">Modération</option>
            <option value="compassion">Compassion</option>
            <option value="conseiller">Conseiller</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Créer l’utilisateur
        </button>
      </form>
    </div>
  );
}
