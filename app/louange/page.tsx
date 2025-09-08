/* app/louange/page.tsx : page du département Louange */

"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function LouangePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      const user = data.user;

      if (!user) {
        router.push("/login");
        return;
      }

      setUser(user);
    };

    checkUser();
  }, [router]);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Département Louange 🎶
      </h1>

      <p className="text-center text-gray-600">
        Bienvenue {user?.email}, voici ton espace dédié à la Louange.
      </p>
    </div>
  );
}
