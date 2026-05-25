"use client";

import { getMoondayList } from "@/lib/api/api";
import { useUIStore } from "@/store/uiStore";
import { useQuery } from "@tanstack/react-query";

const MoondaysListClient = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["days"],
    queryFn: getMoondayList,
    staleTime: Infinity,
  });

  // 1. Дістаємо функцію запису з Zustand
  const setActiveNoteId = useUIStore((state) => state.setActiveDayId);
  // Дістаємо поточний activeNoteId, щоб підсвітити обрану нотатку в списку (активний стиль)
  const activeNoteId = useUIStore((state) => state.activeDayId);

  if (isLoading) return <div>Завантаження…</div>;
  if (error) return <div>Помилка завантаження</div>;
  if (!data) return null;
  const days = data.moonDay;

  return (
    <ul>
      {days.map((day) => (
        <li key={day._id} onClick={() => setActiveNoteId(day._id)}>
          День {day.dayNumber}:
          <br />
          {day.generalMeaning}
        </li>
      ))}
      <br />
    </ul>
  );
};

export default MoondaysListClient;
