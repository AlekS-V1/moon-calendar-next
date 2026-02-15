import { MoonDay } from "@/type/type";
import MoonDayItem from "../MoonDay/MoonDayItem";
import css from "./MoonDaysList.module.css";

interface Props {
  days: MoonDay[];
}

const MoonDaysList = ({ days }: Props) => {
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
