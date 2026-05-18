"use client";

import { useQuery } from "@tanstack/react-query";
import { useUIStore } from "@/store/uiStore";
import { getMoondayList } from "@/lib/api/api";
import { useSingleDay } from "@/lib/hooks/useSingleDay";

export function ActiveDayDetails() {
  // 1. Беремо ID активної нотатки із Zustand
  const activeDayId = useUIStore((state) => state.activeDayId);

  // 2. Передаємо ID в наш хук і миттєво отримуємо дані
  const { data: activeDay, isLoading } = useSingleDay({ id: activeDayId });

  // 3. Логіка відображення (UI)
  if (!activeDayId) return <p>Оберіть нотатку для перегляду</p>;
  if (isLoading) return <p>Завантаження деталей...</p>;

  if (!activeDay) return <p>Нотатку не знайдено</p>;

  return (
    <div>
      {/* Тут доступні абсолютно всі поля нотатки, включаючи контент*/}
      <h2>{activeDay.dayNumber}</h2>
      <span>Фаза: {activeDay.phase.text}</span>
      <p>{activeDay.generalMeaning}</p>
    </div>
  );
}
