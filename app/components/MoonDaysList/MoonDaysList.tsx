"use client";

import MoonDayItem from "../MoonDay/MoonDayItem";
import MoonLoader from "../MoonLoader/MoonLoader";
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
        {/* <img src="./image/sleepServer48.png" alt="sleep server" /> */}
        <MoonLoader />
      </div>
    );

  const sortedDays = [...days].sort((a, b) => a.dayNumber - b.dayNumber);
  {
    sortedDays.map((day) => <MoonDayItem key={day.dayNumber} item={day} />);
  }

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
