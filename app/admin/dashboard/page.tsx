"use client";
import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">Dashboard Admin</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/admin"
          className="p-6 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition text-center"
        >
          ➕ Gérer utilisateurs
        </Link>

        <Link
          href="/admin/departements"
          className="p-6 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition text-center"
        >
          📊 Par département
        </Link>

        <Link
          href="/admin/global"
          className="p-6 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition text-center"
        >
          🌍 Global
        </Link>

        <Link
          href="/login"
          className="p-6 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition text-center"
        >
          🚪 Se déconnecter
        </Link>
      </div>
    </div>
  );
}
