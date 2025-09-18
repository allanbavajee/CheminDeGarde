/* lib/supabaseClient.ts : centralise la connexion à Supabase pour tout le projet */
import { createClient } from "@supabase/supabase-js";

// ⚠️ On utilise les variables d'environnement côté client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// ✅ Création du client Supabase
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
