/* app/layout.tsx : layout racine global pour toutes les pages */

import "./globals.css"; // si tu as un fichier CSS global
import { ReactNode } from "react";

export const metadata = {
  title: "CheminDeGarde",
  description: "Plateforme de suivi pour votre équipe",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
