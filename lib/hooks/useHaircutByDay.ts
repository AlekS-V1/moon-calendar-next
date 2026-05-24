import { useQuery } from "@tanstack/react-query";
import { getHaircutDayByDaynumber } from "../api/api";

export function useHaircutByDay(selectedDay: number) {
  return useQuery({
    queryKey: ["daynumber", "haircutbyday", selectedDay],
    queryFn: () => getHaircutDayByDaynumber(selectedDay!),
    enabled: !!selectedDay,
    staleTime: 1000 * 60 * 15,
  });
}
