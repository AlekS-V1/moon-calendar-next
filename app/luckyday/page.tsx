// app/luckyday/page.tsx

import SearchLuckyDay from "@/app/components/SearchLuckyDay/SearchLuckyDay";

const LuckyMoonDay = () => {
  return (
    <section>
      <h2>Твої ТОП-5 днів</h2>
      <p>Обери критерій пошуку</p>
      <SearchLuckyDay />
    </section>
  );
};

export default LuckyMoonDay;
