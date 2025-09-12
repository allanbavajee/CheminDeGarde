/* app/louange/page.tsx : page du département Louange */
"use client";
import React, { useState } from "react";
import { encouragements } from "@/lib/encouragements";

export default function LouangePage() {
  // 🔹 Index de la semaine (1 message par semaine)
  const currentWeek = new Date().getWeekNumber() % encouragements.length;

  const [index, setIndex] = useState(currentWeek);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 via-pink-100 to-blue-200 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-lg text-center border border-gray-200">
        <h1 className="text-3xl font-bold text-purple-700 mb-4">
          Message de Louange ✨
        </h1>
        <p className="text-lg text-gray-800 italic">
          {encouragements[index].message}
        </p>
        <p className="text-sm text-gray-700 mt-2">
          <strong>{encouragements[index].verse}</strong>
        </p>
      </div>
    </div>
  );
}

// 🔹 Ajout d'une fonction pour obtenir le numéro de la semaine
declare global {
  interface Date {
    getWeekNumber(): number;
  }
}

Date.prototype.getWeekNumber = function () {
  const date = new Date(this.getTime());
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
  const week1 = new Date(date.getFullYear(), 0, 4);
  return (
    1 +
    Math.round(
      ((date.getTime() - week1.getTime()) / 86400000 -
        3 +
        ((week1.getDay() + 6) % 7)) /
        7
    )
  );
};




