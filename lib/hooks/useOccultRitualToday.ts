import { useQuery } from "@tanstack/react-query";
import { getTodayMeditationRitualDay, getTodayOccultDay } from "../api/api";

export function useOccultRitualToday() {
  return useQuery({
    queryKey: ["OccultToday"],
    queryFn: async () => getTodayOccultDay(),
  });
}
