"use client";

import { useHaircutByDay } from "@/lib/hooks/useHaircutByDay";
import { useHaircutDays } from "@/store/uiStore";

const HaircutByDayClient = () => {
  const searchDay = useHaircutDays((state) => state.searchByDayNum);
  const { setSearchByDayNum } = useHaircutDays();
  const { data: haircutDay, isLoading, isFetched } = useHaircutByDay(searchDay);

  if (isLoading) return <div>Завантаження даних...</div>;

  return (
    <div>
      <div>
        Ведідіть день:{" "}
        <input
          type="number"
          value={searchDay}
          onChange={(e) => setSearchByDayNum(Number(e.target.value))}
        />
      </div>
      <div>Cтрижка у цей день: {haircutDay?.health}</div>
      <br />
      <br />
    </div>
  );
};

export default HaircutByDayClient;
