"use client";

import { useDateStore } from "@/store/uiStore";

export function DatePicker() {
  const { searchDate, setSearchDate } = useDateStore();

  return (
    <div className="flex flex-col space-y-1 max-w-xs my-4">
      <label className="text-sm font-medium text-gray-700">Оберіть дату:</label>
      <input
        type="date"
        value={searchDate}
        onChange={(e) => setSearchDate(e.target.value)}
        className="border p-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>
  );
}
