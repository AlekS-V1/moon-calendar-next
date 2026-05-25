import css from "./page.module.css";
import MoonToday from "../components/MoonToday/MoonToday";

export default function Home() {
  return (
    <div className={css.page}>
      <main className={css.main}>
        <section className={css.sectionHome}>
          <MoonToday />
        </section>
      </main>
    </div>
  );
}
