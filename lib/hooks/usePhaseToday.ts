import { useQuery } from "@tanstack/react-query";
import { getTodayPhases } from "../api/api";

export function usePhaseToday() {
  return useQuery({
    queryKey: ["phasetoday"],
    queryFn: async () => getTodayPhases(),
  });
}
