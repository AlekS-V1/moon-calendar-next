// components/MoonDaysItem/MoonDaysItem.tsx

import type { MoonDay } from "@/type/type";
import css from "./MoonDayItem.module.css";
import Link from "next/link";

interface Props {
  item: MoonDay;
}

const MoonDayItem = ({ item }: Props) => {
  return (
    <li className={css.dayStyle}>
      <Link href={`/days/${item._id}`}>{item.dayNumber}</Link>
    </li>
  );
};

export default MoonDayItem;
