import { useQuery } from "@tanstack/react-query";
import { getMoonByDate } from "../api/api";

export function useMoonDayByDate(selectedDate: string | null) {
  return useQuery({
    // 1. Дата є частиною ключа. Зміна дати = автоматичний перезапуск запиту
    queryKey: ["moon-day", "search", selectedDate],

    // 2. Оскільки selectedDate може бути null, TypeScript вимагає перевірки всередині функції
    queryFn: () => getMoonByDate(selectedDate!),

    // 3. Запит не виконується, поки користувач не обере дату
    enabled: !!selectedDate,

    // 4. Дані за конкретні дати з минулого не змінюються, тому їх можна кешувати надовго
    staleTime: 1000 * 60 * 60 * 24, // 24 години
  });
}
