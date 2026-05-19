import { MoonDayData } from "@/type/type";
import { useQuery } from "@tanstack/react-query";
import { serverApi } from "../api/server";
import { LuckyKeys } from "../aspect";
import { getLuckyMoonDays } from "../api/api";
import { RatingGroup, ratingGroups } from "../ratingGroups";

interface LuckyDaysResult {
  results: MoonDayData[];
  matchedValue: string | null;
}

const executeSequentialSearch = async (
  key: string,
  rating: RatingGroup,
): Promise<LuckyDaysResult> => {
  const values = ratingGroups[rating] || [];
  let finalResults: MoonDayData[] = [];
  let matchedValue: string | null = null;

  for (const value of values) {
    try {
      // 💡 Виправляємо 404: шлях обов'язково починається з /api/ і використовує об'єкт params
      const data = await getLuckyMoonDays(key, value);

      if (data && data.length > 0) {
        finalResults = data;
        matchedValue = value;
        break; // Зупиняємо цикл, якщо знайшли підходящий день
      }
    } catch (error) {
      console.error(`Помилка запиту для значення ${value}:`, error);
    }
  }

  return { results: finalResults, matchedValue };
};

export function useLuckyDaysQuery(key: LuckyKeys | "", rating: RatingGroup) {
  return useQuery<LuckyDaysResult, any>({
    queryKey: ["lucky-days", key, rating],
    queryFn: () => executeSequentialSearch(key, rating),
    enabled: !!key, // Запит не виконується без обраного ключа аспекту
    staleTime: Infinity, // Дані ніколи не застарівають у межах однієї сесії
    gcTime: 1000 * 60 * 60, // Зберігати в пам'яті браузера 1 годину
  });
}

// import { MoonDayData } from "@/type/type";
// import { useQuery } from "@tanstack/react-query";
// import { getLuckyMoonDays } from "../api/api";

// // Інтерфейс для результату, який ми повертаємо з циклу
// interface SmoothSearchResult {
//   results: MoonDayData[];
//   matchedValue: string | null;
// }

// export function useCachedGroupSearch(
//   activeSearch: { key: string; rating: string; values: string[] } | null,
// ) {
//   return useQuery<SmoothSearchResult>({
//     // Унікальний ключ кешу для цієї комбінації ключа та рейтингу
//     queryKey: [
//       "moon-days",
//       "group-search",
//       activeSearch?.key,
//       activeSearch?.rating,
//     ],

//     queryFn: async (): Promise<SmoothSearchResult> => {
//       let finalResults: MoonDayData[] = [];
//       let matchedValue: string | null = null;

//       // ВАШ ЦИКЛ РЕФАКТОРИНГУ: працює всередині TanStack Query
//       for (const value of activeSearch!.values) {
//         try {
//           // Виклик вашої функції, яка робить запит /api/moon-day?key=...&value=...
//           const res = await getLuckyMoonDays(activeSearch!.key, value);

//           if (res && res.length > 0) {
//             finalResults = res;
//             matchedValue = value;
//             break; // Зупиняємо цикл, як тільки знайшли перші дані
//           }
//         } catch (error) {
//           console.error(`Помилка запиту для значення ${value}:`, error);
//           // Ігноруємо помилку окремого кроку, щоб цикл продовжив роботу
//         }
//       }

//       // Повертаємо об'єднаний чистий результат у кеш
//       return {
//         results: finalResults,
//         matchedValue: matchedValue,
//       };
//     },

//     // Запит заблокований, поки користувач не натисне кнопку (активує activeSearch)
//     enabled: !!activeSearch && activeSearch.values.length > 0,

//     // МАКСИМАЛЬНЕ КЕШУВАННЯ: дані не застарівають у межах сесії
//     staleTime: Infinity,
//     gcTime: 1000 * 60 * 60, // Зберігати в пам'яті 1 годину
//   });
// }
