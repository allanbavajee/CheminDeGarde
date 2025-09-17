/* app/login/page.tsx*/
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! // Clé publique pour le login
);

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      const userDept = data.user?.user_metadata?.departement;

      if (!userDept) {
        // ✅ Vérification spéciale admin
        if (email === process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
          router.push("/admin");
          return;
        }
        setMessage("❌ Département non attribué, contactez l'admin.");
        return;
      }

      // Redirection vers le département
      const deptPath = userDept.toLowerCase(); // Exemple: "Louange" → "louange"
      router.push(`/${deptPath}`);
    } catch (err: any) {
      setMessage("❌ Erreur login : " + err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">Connexion</h1>

      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
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
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Se connecter
        </button>
      </form>

      {message && <p className="mt-4 text-center text-red-600">{message}</p>}
    </div>
  );
}
