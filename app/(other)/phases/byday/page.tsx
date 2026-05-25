"use client";

import { usePhaseByDay } from "@/lib/hooks/usePhaseByDay";
import { usePhaseStore } from "@/store/uiStore";

const PhaseByDay = () => {
  const searchDay = usePhaseStore((state) => state.searchPhase);
  const { setSearchPhase } = usePhaseStore();
  const { data: day, isLoading, isFetched } = usePhaseByDay(searchDay);

  if (isLoading) return <div>Завантаження даних...</div>;

  return (
    <>
      <div>
        Ведідіть день:{" "}
        <input
          type="number"
          value={searchDay}
          onChange={(e) => setSearchPhase(Number(e.target.value))}
        />
      </div>
      <div>Це фаза: {day?.phaseNumber}</div>
    </>
  );
};

export default PhaseByDay;
