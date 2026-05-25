"use client";

import { getListHaircutDays } from "@/lib/api/api";
import { useQuery } from "@tanstack/react-query";

const HaircutDaysListClient = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["haircut"],
    queryFn: getListHaircutDays,
    staleTime: Infinity,
  });

  if (isLoading) return <div>Завантаження…</div>;
  if (error) return <div>Помилка завантаження</div>;
  if (!data) return null;

  const haircutDays = data;

  return (
    <ul>
      {haircutDays.map((day) => (
        <li>
          {day._id}
          {". "} {day.energy}
          <br />
          <br />
        </li>
      ))}
    </ul>
  );
};

export default HaircutDaysListClient;
