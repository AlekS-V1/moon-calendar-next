"use client";

import { getMoondaySingle } from "@/lib/api/api";
import { useQuery } from "@tanstack/react-query";

const MoondayDetailsClient = ({ id }: { id: string }) => {
  // Дані підтягнуться МИТТЄВО з серверного кешу, isLoading відразу буде false
  const { data: moonDay, error } = useQuery({
    queryKey: ["day", id],
    queryFn: () => getMoondaySingle(id),
    staleTime: 1000 * 60 * 15, // 15 хвилин вважати дані свіжими
  });
  console.log("moonDay: ", moonDay);
  if (error) return <div>Помилка: {error.message}</div>;
  if (!moonDay) return <div>Лодінг...</div>; // Цей рядок користувач ніколи не побачить
  const day = moonDay;

  return (
    <div>
      День №{day.dayNumber} - {day.generalMeaning}
      <p>{day.generalMeaning}</p>
    </div>
  );
};

export default MoondayDetailsClient;
