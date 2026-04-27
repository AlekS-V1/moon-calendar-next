// app/luckyday/page.tsx

import SearchLuckyDay from "@/app/components/SearchLuckyDay/SearchLuckyDay";
import css from "./LuckyMoonDay.module.css";

const LuckyMoonDay = () => {
  return (
    <section className={css.sectionLuckyMoonDay}>
      <h2>ТОП-5 днів</h2>
      <SearchLuckyDay />
    </section>
  );
};

export default LuckyMoonDay;
