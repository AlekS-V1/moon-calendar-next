// app/luckyday/page.tsx

import SearchLuckyDay from "@/app/components/TOPDaySearch/TOPDaySearch";
import css from "./LuckyMoonDay.module.css";

const LuckyMoonDay = () => {
  return (
    <section className={css.sectionLuckyMoonDay}>
      <SearchLuckyDay />
    </section>
  );
};

export default LuckyMoonDay;
