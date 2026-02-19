// app/luckyday/page.tsx

import SearchLuckyDay from "@/app/components/SearchLuckyDay/SearchLuckyDay";

const LuckyMoonDay = () => {
  return (
    <section>
      <h2>ТОП-5 днів</h2>
      <SearchLuckyDay />
    </section>
  );
};

export default LuckyMoonDay;
