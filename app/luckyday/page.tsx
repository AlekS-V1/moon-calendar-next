// app/luckyday/page.tsx

import SearchLuckyDay from "@/app/components/SearchLuckyDay/SearchLuckyDay";
import css from "./LuckyMoonDay.module.css";

const LuckyMoonDay = () => {
  return (
    <section className={css.sectionLuckyMoonDay}>
      <SearchLuckyDay />
    </section>
  );
};

export default LuckyMoonDay;
