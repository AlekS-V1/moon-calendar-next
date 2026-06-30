"use client";

import { getListOccultDays } from "@/lib/api/api";
import { useMoonToday } from "@/lib/hooks/useToday";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import css from "./OccultDaysListClient.module.css";

const OccultDaysListClient = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["occultdays"],
    queryFn: getListOccultDays,
    staleTime: Infinity,
  });

  const { data: today } = useMoonToday();

  if (isLoading) return <div>Завантаження…</div>;
  if (error) return <div>Помилка завантаження</div>;
  if (!data) return null;

  const occultDays = data.sort((a, b) => a.day - b.day);

  // const occultDays = data;

  return (
    <div className={css.containerListOccultDays}>
      <h3 className={css.titleList}>Дні за місяцем:</h3>
      <ul className={css.daysList}>
        {occultDays.map((day) => (
          <Link
            key={day._id}
            href={`/occultritual/${day._id}`}
            className={`${css.link} ${day.day === today?.moonDay ? css.today : ""}`}
          >
            <li className={css.itemList}>{day.day}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default OccultDaysListClient;
