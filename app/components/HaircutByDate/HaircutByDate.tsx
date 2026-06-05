"use client";

import { useHaircutDayByDate } from "@/lib/hooks/useHaircutDate";
import { useHaircutDateStore } from "@/store/uiStore";
import css from "./HaircutByDate.module.css";
import HaircutDayClient from "../HaircutDay/HaircutDay.client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  // 3. Ефект для редіректу: спрацює ТІЛЬКИ якщо завантаження закінчилось, а даних немає
  useEffect(() => {
    if (!isLoading && (day === null || day === undefined)) {
      const timer = setTimeout(() => {
        router.push("/haircutdays");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [day, isLoading, router]);

  // 4. Умови рендерингу йдуть СУВОРО ПІСЛЯ виклику хуків
  if (isLoading) return <div>Завантаження даних для дати...</div>;
  if (error) return <div>Помилка: {error.message}</div>;
  // if (!day) return <div>Оберіть коректну дату.</div>;

  // 5. Умова, коли дані null або undefined (показується під час дії таймера)
  if (day === null || day === undefined) {
    return (
      <div>
        Дата відсутня, оберіть коректну дату. Перенаправлення на головну
        сторінку через 5 секунди...
      </div>
    );
  }

  return (
    <div>
      {/* Індикатор фонового завантаження, коли користувач змінив дату */}
      {isFetching && <span>Оновлення...</span>}

      <h2 className={css.titleTodayHaircut}>
        Результат стрижки <br />
        {(() => {
          const s = new Date(day.date).toLocaleDateString("uk-UA", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          });
          return s[0].toUpperCase() + s.slice(1);
        })()}
      </h2>
      <HaircutDayClient day={day} />
    </div>
  );
}
