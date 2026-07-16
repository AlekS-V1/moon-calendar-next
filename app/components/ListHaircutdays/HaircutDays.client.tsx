"use client";

import { getListHaircutDays } from "@/lib/api/api";
import { useQuery } from "@tanstack/react-query";
import css from "./HaircutDaysClient.module.css";
import { useMoonToday } from "@/lib/hooks/useToday";
import Link from "next/link";

const HaircutDaysListClient = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["haircut"],
    queryFn: getListHaircutDays,
    staleTime: Infinity,
  });

  const { data: today } = useMoonToday();

  if (isLoading) return <div>Завантаження…</div>;
  if (error) return <div>Помилка завантаження</div>;
  if (!data) return null;

  const haircutDays = data;

  return (
    <div className={css.containerListHaircutDays}>
      <h3 className={css.titleList}>Дні за Місяцем:</h3>
      <ul className={css.daysList}>
        {haircutDays.map((day) => (
          <Link
            key={day._id}
            href={`/haircutdays/${day._id}`}
            className={`${css.link} ${day.dayNumber === today?.moonDay ? css.today : ""}`}
          >
            <li
              className={`${css.itemList} ${day.avoid.length !== 0 ? css.itemAvoid : ""} `}
            >
              {day.dayNumber}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default HaircutDaysListClient;
