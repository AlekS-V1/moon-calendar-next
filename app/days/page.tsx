// app/days/page.tsx
import { getListDays } from "@/lib/api";
import MoonDaysList from "../components/MoonDaysList/MoonDaysList";
import css from "./days.module.css";

const Days = async () => {
  const response = await getListDays();

  return (
    <section>
      <h1 className={css.titleMonthPage}>MoonMonth</h1>
      {response?.moonDay?.length > 0 && (
        <MoonDaysList days={response.moonDay} />
      )}
    </section>
  );
};

export default Days;
