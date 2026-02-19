"use client";

import MoonDayItem from "../MoonDay/MoonDayItem";
import css from "./MoonDaysList.module.css";
import { useMoonStore } from "@/store/calendarStore";
import { useEffect } from "react";

const MoonDaysList = () => {
  const { days, fetchDays } = useMoonStore();

  useEffect(() => {
    fetchDays();
  }, []);
  if (!days.length)
    return (
      <div>
        <img src="./image/sleepServer48.png" alt="sleep server" />
        <p>Завантаження списку днів ...</p>
      </div>
    );

  const sortedDays = [...days].sort((a, b) => a.dayNumber - b.dayNumber);
  return (
    <div className={css.moondayList}>
      <p>Дні місяця:</p>
      <ul className={css.daysList}>
        {sortedDays.map((day) => (
          <MoonDayItem key={day._id} item={day} />
        ))}
      </ul>
    </div>
  );
};

export default MoonDaysList;
