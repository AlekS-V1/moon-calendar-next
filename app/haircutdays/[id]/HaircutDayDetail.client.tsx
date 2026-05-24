"use client";

import { getSingleHaircutDay } from "@/lib/api/api";
import { useQuery } from "@tanstack/react-query";

const HaircutDayDetailsClient = ({ id }: { id: string }) => {
  const { data: haircutDay, error } = useQuery({
    queryKey: ["haircutDay", id],
    queryFn: () => getSingleHaircutDay(id),
    staleTime: 1000 * 60 * 15,
  });
  if (error) return <div>Помилка: {error.message}</div>;
  if (!haircutDay) return <div>Лодінг...</div>;

  return (
    <div>
      День №{haircutDay.dayNumber} - {haircutDay.energy}
      <p>{haircutDay.health}</p>
    </div>
  );
};

export default HaircutDayDetailsClient;
