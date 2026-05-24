import { useQuery } from "@tanstack/react-query";
import { getTodayHaircutDay } from "../api/api";

export function useHaircutToday() {
  return useQuery({
    queryKey: ["haircutToday"],
    queryFn: async () => getTodayHaircutDay(),
  });
}
