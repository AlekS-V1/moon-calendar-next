import { useQuery } from "@tanstack/react-query";
import { getPhasesByDaynumber, getPhasesByPhaseNum } from "../api/api";

export function usePhaseByNumPhase(selectedPhase: number) {
  return useQuery({
    queryKey: ["phasenumber", "phasebynum", selectedPhase],
    queryFn: () => getPhasesByPhaseNum(selectedPhase!),
    enabled: !!selectedPhase,
    staleTime: 1000 * 60 * 15,
  });
}
