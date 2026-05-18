"use client";

import { useMoonDayByDate } from "@/lib/hooks/useDate";
import { useDateStore } from "@/store/uiStore";

export function MoonDayInfo() {
  // 1. Беремо дату із Zustand (реактивно)
  const searchDate = useDateStore((state) => state.searchDate);

  // 2. Передаємо її в хук на найвищому рівні компонента
  const {
    data: day,
    isLoading,
    isFetching,
    error,
  } = useMoonDayByDate(searchDate);

  // 3. Умови рендерингу йдуть СУВОРО ПІСЛЯ виклику хуків
  if (isLoading) return <div>Завантаження даних для дати...</div>;
  if (error)
    return <div className="text-red-500">Помилка: {error.message}</div>;
  if (!day) return <div>Оберіть коректну дату.</div>;

  return (
    <div className="p-6 bg-white border rounded-2xl shadow-sm relative">
      {/* Індикатор фонового завантаження, коли користувач змінив дату */}
      {isFetching && (
        <span className="absolute top-2 right-2 text-xs text-blue-500">
          Оновлення...
        </span>
      )}

      <h2 className="text-xl font-bold text-gray-900">Дані на {searchDate}</h2>
      <p className="mt-2 text-gray-700">
        Номер дня: <span className="font-semibold">{day.moonDay}</span>
      </p>
      <p className="text-gray-600">
        Загальне значення: {day.details.generalMeaning}
      </p>
    </div>
  );
}
