"use client";

import { useQuery } from "@tanstack/react-query";
import { getMoondayList } from "@/lib/api/api";
import Link from "next/link";
import { useUIStore } from "@/store/uiStore";
import { moonImages32 } from "@/lib/moonPhase30";
import css from "./MoonDayItem.module.css";
import { useMoonToday } from "@/lib/hooks/useToday";

export function DaysTitlesList() {
  const { data: titles, isLoading } = useQuery({
    queryKey: ["days"],
    queryFn: getMoondayList,
    // Трансформуємо дані: витягуємо тільки _id та title
    select: (days) =>
      days.moonDay.map((day) => ({ _id: day._id, title: day.dayNumber })),
  });
  const { data: today, error } = useMoonToday();

  // 1. Дістаємо функцію запису з Zustand
  const setActiveDayId = useUIStore((state) => state.setActiveDayId);
  // Дістаємо поточний activeNoteId, щоб підсвітити обрану нотатку в списку (активний стиль)
  const activeDayId = useUIStore((state) => state.activeDayId);

  if (isLoading) return <p>Завантаження назв...</p>;
  const sortedDays = [...(titles ?? [])].sort((a, b) => a.title - b.title);

  return (
    <ul className={css.daysList}>
      {sortedDays.map((day) => (
        /* TypeScript чітко знає, що тут є ТІЛЬКИ note._id та note.title */
        <Link
          href={`/moonDays/${day._id}`}
          onClick={() => setActiveDayId(day._id)}
          className={`${css.moonIcon} ${activeDayId === day._id ? css.activeDay : today?.moonDay === day.title ? css.activeDay : ""}`}
          style={{ backgroundImage: `url(${moonImages32[day.title]})` }}
        >
          <li key={day._id} className={css.dayStyle}>
            {day.title}
          </li>
        </Link>
      ))}
    </ul>
  );
}
