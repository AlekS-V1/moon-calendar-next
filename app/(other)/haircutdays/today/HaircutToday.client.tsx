"use client";

import { useHaircutToday } from "@/lib/hooks/useHaircutToday";
import css from "./HaircutTodayClient.module.css";
import HaircutDayClient from "@/app/components/HaircutDay/HaircutDay.client";

const HaircutTodayClient = () => {
  const { data: haircutToday } = useHaircutToday();
  if (!haircutToday) return null;
  return (
    <>
      <h2 className={css.titleTodayHaircut}>
        Результат стрижки на {haircutToday?.date}
      </h2>
      <HaircutDayClient day={haircutToday} />
    </>
  );
};

export default HaircutTodayClient;
