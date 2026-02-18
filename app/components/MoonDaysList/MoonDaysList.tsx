"use client";
import { MoonDay } from "@/type/type";
import MoonDayItem from "../MoonDay/MoonDayItem";
import css from "./MoonDaysList.module.css";
import { useMoonStore } from "@/store/calendarStore";
import { useEffect } from "react";

// interface Props {
//   days: MoonDay[];
// }

const MoonDaysList = () => {
  const { days, fetchDays } = useMoonStore();

  useEffect(() => {
    fetchDays();
  }, []);
  if (!days.length) return <p>Завантаження списку днів ...</p>;

  const sortedDays = [...days].sort((a, b) => a.dayNumber - b.dayNumber);
  return (
    <ul className={css.daysList}>
      {sortedDays.map((day) => (
        <MoonDayItem key={day._id} item={day} />
      ))}
    </ul>
  );
};

export default MoonDaysList;
