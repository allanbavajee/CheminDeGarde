/* app/layout.tsx */
import "./globals.css";
import { ReactNode } from "react";
import Link from "next/link";

export const metadata = {
  title: "CheminDeGarde",
  description: "Plateforme de suivi pour votre équipe",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen flex flex-col">
        {/* ✅ Menu global */}
        <nav className="bg-gray-800 text-white p-4 flex gap-6">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/admin">Utilisateurs</Link>
          <Link href="/departments">Départements</Link>
          <Link href="/global">Global</Link>
          <Link href="/logout">Se déconnecter</Link>
        </nav>

        {/* ✅ Contenu des pages */}
        <main className="flex-1 p-6">{children}</main>
      </body>
    </html>
  );
}

