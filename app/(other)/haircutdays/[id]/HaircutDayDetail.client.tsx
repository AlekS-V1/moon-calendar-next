// app/haircutdays/[id]/HaircutDayDetail.client.tsx
"use client";

import { getSingleHaircutDay } from "@/lib/api/api";
import { useQuery } from "@tanstack/react-query";
import HaircutDayClient from "@/app/components/HaircutDay/HaircutDay.client";
import css from "./HaircutDayDetail.module.css";

const HaircutDayDetailsClient = ({ id }: { id: string }) => {
  const { data: haircutDay, error } = useQuery({
    queryKey: ["haircutDay", id],
    queryFn: () => getSingleHaircutDay(id),
    staleTime: 1000 * 60 * 60,
  });
  if (error) return <div>Помилка: {error.message}</div>;
  if (!haircutDay) return <div>Лоадінг...</div>;
  return (
    <>
      <h3 className={css.titleHaircut}>
        Результат стрижки на {haircutDay?.dayNumber} місячний день
      </h3>
      <HaircutDayClient day={haircutDay} />
    </>
  );
};

export default HaircutDayDetailsClient;
