import { MoonDay } from "@/type/type";
import MoonDayItem from "../MoonDay/MoonDayItem";
import css from "./MoonDaysList.module.css";

interface Props {
  days: MoonDay[];
}

const MoonDaysList = ({ days }: Props) => {
  return (
    <ul className={css.daysList}>
      {days.map((days) => (
        <MoonDayItem key={days._id} item={days} />
      ))}
    </ul>
  );
};

export default MoonDaysList;
