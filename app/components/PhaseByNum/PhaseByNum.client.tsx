"use client";

import { usePhaseByNumPhase } from "@/lib/hooks/usePhaseByNumPhase";
import { usePhaseStore } from "@/store/uiStore";

const PhaseByNumPhaseClient = () => {
  const searchPhase = usePhaseStore((state) => state.searchByPhaseNum);
  const { setSearchByPhaseNum } = usePhaseStore();
  const { data: phase, isLoading, isFetched } = usePhaseByNumPhase(searchPhase);

  if (isLoading) return <div>Завантаження даних...</div>;

  return (
    <>
      <div>
        Ведіть фазу:{" "}
        <input
          type="number"
          value={searchPhase}
          onChange={(e) => setSearchByPhaseNum(Number(e.target.value))}
        />
      </div>
      <div>В цю фазу: {phase?.description}</div>
    </>
  );
};

export default PhaseByNumPhaseClient;
