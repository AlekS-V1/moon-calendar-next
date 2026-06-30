// app/occultritual/[id]/OccultDayDetails.client.tsx
"use client";

import OccultRitualDayTemplateClient from "@/app/components/OccultRitualDay/OccultRitualDay";
import { getSingleOccultDay } from "@/lib/api/api";
import { useQuery } from "@tanstack/react-query";
import css from "./OccultDayClient.module.css";

const OccultDayDetailsClient = ({ id }: { id: string }) => {
  const {
    data: day,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["occultDay", id],
    queryFn: () => getSingleOccultDay(id),
    staleTime: 1000 * 60 * 60,
  });

  if (error) return <div>Помилка: {error.message}</div>;
  if (isLoading || !day) return <div>Лоадінг...</div>;

  return (
    <div className={css.containerOccult}>
      <h2 className={css.titleOccult}>Ритуал на {day.day} місячний день</h2>
      <OccultRitualDayTemplateClient day={day} />
    </div>
  );
};

export default OccultDayDetailsClient;
