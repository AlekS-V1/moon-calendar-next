import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getListHaircutDays } from "../api/api";
import { HaircutDay } from "@/type/type";

export function useHaircutDaysId({ id }: { id: string }) {
  const queryClient = useQueryClient();

  // return useQuery<HaircutDay>({
  // queryKey: ["haircut", id],
  // queryFn: async () => {
  //   if (!id) throw new Error("ID не надано");
  //   return getListHaircutDays(id); // має повертати один HaircutDay
}
// initialData: () => {
//   if (!id) return undefined;
//   const days = queryClient.getQueryData<HaircutDay[]>(["haircuts"]);
//   return days?.find((day) => day._id === id);
// },
// enabled: !!id,
// });

// }
