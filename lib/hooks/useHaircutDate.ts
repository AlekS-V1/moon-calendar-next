import { useQuery } from "@tanstack/react-query";
import { getHaircutByDate } from "../api/api";

export function useHaircutDayByDate(selectedDate: string | null) {
  return useQuery({
    // 1. Дата є частиною ключа. Зміна дати = автоматичний перезапуск запиту
    queryKey: ["haircutday", "haircutsearch", selectedDate],

    // 2. Оскільки selectedDate може бути null, TypeScript вимагає перевірки всередині функції
    queryFn: () => getHaircutByDate(selectedDate!),

    // 3. Запит не виконується, поки користувач не обере дату
    enabled: !!selectedDate,

    // 4. Дані за конкретні дати з минулого не змінюються, тому їх можна кешувати надовго
    staleTime: 1000 * 60 * 60 * 24, // 24 години
  });
}
