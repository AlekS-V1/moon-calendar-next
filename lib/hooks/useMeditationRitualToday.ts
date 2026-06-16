import { useQuery } from "@tanstack/react-query";
import { getTodayMeditationRitualDay } from "../api/api";

export function useMeditationRitualToday() {
  return useQuery({
    queryKey: ["RitualToday"],
    queryFn: async () => getTodayMeditationRitualDay(),
  });
}
