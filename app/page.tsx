import Image from "next/image";
import css from "./page.module.css";
import MoonToday from "./components/MoonToday/MoonToday";
import MoonDaysList from "./components/MoonDaysList/MoonDaysList";

export default function Home() {
  return (
    <div className={css.page}>
      <main className={css.main}>
        <section>
          <div className={css.moondayList}>
            <h5> Дні місяця:</h5>
            <MoonDaysList />
          </div>
          <MoonToday />
        </section>
      </main>
    </div>
  );
}
