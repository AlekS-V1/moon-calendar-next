import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMoondaySingle, getMoonToday } from "../api/api";
import { MoonDay } from "@/type/type";

// 1. Дозволяємо id бути string або null
export function useSingleDay({ id }: { id: string | null }) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["day", id],
    // 2. Робимо запит тільки якщо id є. TypeScript вимагає перевірки всередині async
    queryFn: async () => {
      if (!id) throw new Error("ID не надано");
      return getMoondaySingle(id);
    },
    initialData: () => {
      if (!id) return undefined;
      const allDays = queryClient.getQueryData<MoonDay[]>(["days"]);
      return allDays?.find((day) => day._id === id);
    },
    // 3. Якщо id дорівнює null, запит автоматично вимикається
    enabled: !!id,
  });
}
