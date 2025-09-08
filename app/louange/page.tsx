/* app/louange/page.tsx : Formulaire Louange */

"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function LouangePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState({
    lundi: "",
    mardi: "",
    repetition: "",
    adp: "",
    culte: "",
  });

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        router.push("/login");
        return;
      }
      setUser(data.user);
      setLoading(false);
    };
    checkUser();
  }, [router]);

  const handleSubmit = async () => {
    if (!user) return;

    const { error } = await supabase.from("louange_feedback").insert([
      { user_id: user.id, ...feedback }
    ]);

    if (error) alert("Erreur : " + error.message);
    else alert("✅ Rapport soumis !");
  };

  if (loading) return <p className="text-center mt-10">Chargement...</p>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      <h1 className="text-xl font-bold mb-4 text-center">Formulaire Louange</h1>

      {Object.keys(feedback).map((key) => (
        <div className="mb-3" key={key}>
          <label className="block mb-1 capitalize">{key.replace("_", " ")}</label>
          <input
            type="text"
            value={feedback[key as keyof typeof feedback]}
            onChange={(e) =>
              setFeedback({ ...feedback, [key]: e.target.value })
            }
            className="w-full p-2 border rounded-lg"
          />
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
      >
        Soumettre
      </button>
    </div>
  );
}
