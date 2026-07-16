"use client";

import { useOccultRitualToday } from "@/lib/hooks/useOccultRitualToday";
import css from "./OccultTodayClient.module.css";
import OccultRitualDayTemplateClient from "@/app/components/OccultRitualDay/OccultRitualDay";
import Link from "next/link";

const OccultTodayClient = () => {
  const { data: today } = useOccultRitualToday();
  if (!today) return null;
  return (
    <div className={css.containerOccult}>
      <h2 className={css.titleOccult}>Ритуал на сьогодні</h2>
      <OccultRitualDayTemplateClient day={today} />
    </div>
  );
};

export default OccultTodayClient;
