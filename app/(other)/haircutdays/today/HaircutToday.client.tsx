"use client";

import { useHaircutToday } from "@/lib/hooks/useHaircutToday";

const HaircutTodayClient = () => {
  const { data: haircutToday } = useHaircutToday();

  return (
    <div>
      <h2> Результат стрижки на поточний день: </h2>
      <h3>{haircutToday?.date}</h3>
      <br />
      <h4>{haircutToday?.energy}</h4>
      <br />
      <br />
      {haircutToday?.why}
      <br />
      <br />
      <p>{haircutToday?.health}</p> <br />
      <br />
      <p>{haircutToday?.wealth}</p>
    </div>
  );
};

export default HaircutTodayClient;
