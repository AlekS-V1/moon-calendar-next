import { useQuery } from "@tanstack/react-query";
import { getPhasesByDaynumber } from "../api/api";

export function usePhaseByDay(selectedDay: number) {
  return useQuery({
    queryKey: ["daynumber", "phasebyday", selectedDay],
    queryFn: () => getPhasesByDaynumber(selectedDay!),
    enabled: !!selectedDay,
    staleTime: 1000 * 60 * 15,
  });
}
