"use client";

import { useQuery } from "@tanstack/react-query";
import { getMoondayList } from "@/lib/api/api";
import Link from "next/link";
import { useUIStore } from "@/store/uiStore";
import { moonImages32 } from "@/lib/moonPhase30";
import css from "./MoonDayItem.module.css";
import { useMoonToday } from "@/lib/hooks/useToday";
import { useMemo } from "react";
import { useParams } from "next/navigation";

export function DaysTitlesList() {
  const { data: days, isPending } = useQuery({
    queryKey: ["catalogdays"],
    queryFn: getMoondayList,
    staleTime: Infinity,
  });
  const { data: today } = useMoonToday();
  const { id: activeUrlId } = useParams();

  // 1. Дістаємо функцію запису з Zustand
  // const setActiveDayId = useUIStore((state) => state.setActiveDayId);
  // Дістаємо поточний activeNoteId, щоб підсвітити обрану нотатку в списку (активний стиль)
  // const activeDayId = useUIStore((state) => state.activeDayId);

  // Сортуємо легкий масив .
  // Цей код запуститься лише якщо РЕАЛЬНО зміняться дані в базі.
  const sortedTitles = [...(days?.moonDay ?? [])].sort(
    (a, b) => a.dayNumber - b.dayNumber,
  );

  if (isPending && sortedTitles.length === 0) {
    return <p>Завантаження назв...</p>;
  }

  return (
    <ul className={css.daysList}>
      {sortedTitles.map((day) => {
        // Динамічно визначаємо клас для картинки, наприклад: css.day_1, css.day_2
        const imageClass = css[`day_${day.dayNumber}`] || "";

        const isActive = activeUrlId
          ? activeUrlId === day._id
          : today?.moonDay === day.dayNumber;

        return (
          /* TypeScript чітко знає, що тут є ТІЛЬКИ note._id та note.title */
          <Link
            key={day._id}
            href={`/moonDays/${day._id}`}
            // onClick={() => setActiveDayId(day._id)}
            className={`${css.moonIcon} ${imageClass} ${isActive ? css.activeDay : ""}`}
            style={{ backgroundImage: `url(${moonImages32[day.dayNumber]})` }}
          >
            <li className={css.dayStyle}>{day.dayNumber}</li>
          </Link>
        );
      })}
    </ul>
  );
}
