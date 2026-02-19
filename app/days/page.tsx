// app/days/page.tsx

import MoonDaysList from "../components/MoonDaysList/MoonDaysList";
import css from "./days.module.css";
import TodayMoonday from "../components/TodayMoonday/TodayMoonday";

const Days = async () => {
  return (
    <section>
      <MoonDaysList />
      <TodayMoonday />
    </section>
  );
};

export default Days;
