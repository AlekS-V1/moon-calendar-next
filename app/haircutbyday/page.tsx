"use client";
import { useMoonStore } from "@/store/calendarStore";

const HaircutDayByDay = async () => {
  const { moonDayData, fetchHaircutDayByDaynumber, isLoaded } = useMoonStore();

  const handleClick = (day: number) => {
    fetchHaircutDayByDaynumber(day);
  };

  const haircut = moonDayData[1]; // тип: HaircutData | undefined

  return (
    <div>
      <button onClick={() => handleClick(1)}>День 1</button>
      <button onClick={() => handleClick(2)}>День 2</button>
      <button onClick={() => handleClick(3)}>День 3</button>

      {isLoaded && <p>Завантаження...</p>}

      {haircut && (
        <div>
          <h2>{haircut.dayNumber}</h2>
          <p>{haircut.energy}</p>
        </div>
      )}
    </div>
  );
};

export default HaircutDayByDay;
