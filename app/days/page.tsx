// app/days/page.tsx
import { getListDays, getTodayMoonday } from "@/lib/api";
import MoonDaysList from "../components/MoonDaysList/MoonDaysList";
import css from "./days.module.css";
import TodayMoonday from "../components/TodayMoonday/TodayMoonday";

const Days = async () => {
  const responseList = await getListDays();
  const responseToday = await getTodayMoonday();

  return (
    <section>
      <h1 className={css.titleMonthPage}>MoonMonth</h1>
      {responseList?.moonDay?.length > 0 && (
        <MoonDaysList days={responseList.moonDay} />
      )}
      {responseList?.moonDay?.length > 0 && (
        <TodayMoonday today={responseToday} />
      )}
    </section>
  );
};

export default Days;
