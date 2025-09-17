"use client";
import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-8">
          Tableau de bord – Admin
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 🔹 Ajouter un utilisateur */}
          <Link
            href="/admin/dashboard"
            className="p-6 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            ➕ Gérer les utilisateurs
          </Link>

          {/* 🔹 Voir les stats par département */}
          <Link
            href="/admin/stats"
            className="p-6 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
          >
            📊 Statistiques par département
          </Link>

          {/* 🔹 Vue globale */}
          <Link
            href="/admin/global"
            className="p-6 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition"
          >
            🌍 Vue globale
          </Link>

          {/* 🔹 Déconnexion */}
          <Link
            href="/logout"
            className="p-6 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
          >
            🚪 Déconnexion
          </Link>
        </div>
      </div>
    </div>
  );
}
