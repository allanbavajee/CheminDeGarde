"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const redirect = async () => {
      const { data } = await supabase.auth.getUser();
      const user = data.user;
      if (user) router.push("/missions");
      else router.push("/login");
    };
    redirect();
  }, [router]);

  return <p className="text-center mt-10">Redirection...</p>;
}
