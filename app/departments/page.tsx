/* app/departments/page.tsx */
"use client";
import Link from "next/link";

const departments = [
  { name: "Louange", path: "/admin/louange" },
  { name: "Intercession", path: "/admin/intercession" },
  { name: "Impact Junior/Ados", path: "/admin/impact-junior" },
  { name: "Evangelisation", path: "/admin/evangelisation" },
  { name: "Cellule", path: "/admin/cellule" },
  { name: "Hotesse", path: "/admin/hotesse" },
  { name: "Technique/Comm", path: "/admin/technique" },
  { name: "Moderation", path: "/admin/moderation" },
  { name: "Compassion", path: "/admin/compassion" },
  { name: "Conseiller", path: "/admin/conseiller" },
];

export default function DepartmentsPage() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">
        📂 Sélectionnez un département
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {departments.map((dept) => (
          <Link
            key={dept.name}
            href={dept.path}
            className="block p-4 bg-white border rounded-lg shadow hover:bg-blue-100 transition"
          >
            <h2 className="text-lg font-semibold text-gray-800">
              {dept.name}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
