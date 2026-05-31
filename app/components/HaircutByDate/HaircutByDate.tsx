"use client";

import { useHaircutDayByDate } from "@/lib/hooks/useHaircutDate";
import { useHaircutDateStore } from "@/store/uiStore";
import css from "./HaircutByDate.module.css";
import HaircutDayClient from "../HaircutDay/HaircutDay.client";

export function HaircutDayInfo() {
  // 1. Беремо дату із Zustand (реактивно)
  const searchDate = useHaircutDateStore((state) => state.searchDate);

  // 2. Передаємо її в хук на найвищому рівні компонента
  const {
    data: day,
    isLoading,
    isFetching,
    error,
  } = useHaircutDayByDate(searchDate);

  // 3. Умови рендерингу йдуть СУВОРО ПІСЛЯ виклику хуків
  if (isLoading) return <div>Завантаження даних для дати...</div>;
  if (error) return <div>Помилка: {error.message}</div>;
  if (!day) return <div>Оберіть коректну дату.</div>;

  return (
    <div>
      {/* Індикатор фонового завантаження, коли користувач змінив дату */}
      {isFetching && <span>Оновлення...</span>}

      <h2 className={css.titleTodayHaircut}>
        Результат стрижки на {day?.date}{" "}
      </h2>
      <HaircutDayClient day={day} />
    </div>
  );
}
