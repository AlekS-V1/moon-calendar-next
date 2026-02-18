// app/days/page.tsx
import { getListDays, getTodayMoonday } from "@/lib/api";
import MoonDaysList from "../components/MoonDaysList/MoonDaysList";
import css from "./days.module.css";
import TodayMoonday from "../components/TodayMoonday/TodayMoonday";

const Days = async () => {
  // const responseList = await getListDays();
  // const responseToday = await getTodayMoonday();

  return (
    <section>
      <h5 className={css.titleMonthPage}>Дні місяця:</h5>
      <MoonDaysList />
      <TodayMoonday />
    </section>
  );
};

export default Days;
