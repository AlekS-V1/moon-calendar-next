// components/MoonDaysItem/MoonDaysItem.tsx

import type { MoonDay } from "@/type/type";
import css from "./MoonDayItem.module.css";
import Link from "next/link";
import { moonImages32 } from "@/lib/moonPhase30";
import { useMoonStore } from "@/store/calendarStore";

interface Props {
  item: MoonDay;
}

const MoonDayItem = ({ item }: Props) => {
  const img = moonImages32[item.dayNumber];
  const today = useMoonStore((state) => state.today);

  const isToday = today?.moonDay === item.dayNumber;

  return (
    <li className={css.dayStyle}>
      <Link
        href={`/days/${item._id}`}
        className={`${css.moonIcon} ${isToday ? css.activeDay : ""}`}
        style={{ backgroundImage: `url(${img})` }}
      >
        {item.dayNumber}
      </Link>
    </li>
  );
};

export default MoonDayItem;
