import { useQuery } from "@tanstack/react-query";
import { getMoonToday } from "../api/api";

export function useMoonToday() {
  return useQuery({
    queryKey: ["today"],
    queryFn: async () => getMoonToday(),
  });
}
