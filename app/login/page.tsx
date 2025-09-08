/* app/login/page.tsx : Page de connexion et redirection par département */

"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // 1️⃣ Sign in
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError("Email ou mot de passe incorrect.");
      return;
    }

    const user = data.user;
    if (!user) {
      setError("Utilisateur non trouvé.");
      return;
    }

    // 2️⃣ Récupérer le département
    const { data: profile, error: profileError } = await supabase
      .from("users_custom")
      .select("departement")
      .eq("id", user.id)
      .single();

    if (profileError || !profile?.departement) {
      setError("Département non attribué, contactez l'admin.");
      return;
    }

    // 3️⃣ Redirection vers la page du département
    router.push(`/${profile.departement}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-6">Connexion à CheminDeGarde</h1>

        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Adresse e-mail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-lg"
            placeholder="exemple@email.com"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-lg"
            placeholder="Votre mot de passe"
            required
          />
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
          Se connecter
        </button>
      </form>
    </div>
  );
}
