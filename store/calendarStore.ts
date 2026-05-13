import {
  getHaircutDayByDaynumber,
  getListDays,
  getListHaircutDays,
  getListPhases,
  getTodayHaircutDay,
  getTodayMoonday,
  getTodayPhases,
  searchMoondayData,
  searchMoonDays,
} from "@/lib/api";
import { LuckyKeys } from "@/lib/aspect";
import { RatingGroup, ratingGroups } from "@/lib/ratingGroups";
import {
  HaircutData,
  HaircutDay,
  moonPhase,
  moonPhaseData,
  normalizeDay,
  type MoonDay,
  type MoonDayData,
  type NormalizedDay,
} from "@/type/type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StoreState {
  dayDate: NormalizedDay | null;
  days: MoonDay[];
  total: number;
  today: MoonDayData | null;
  isLoaded: boolean;

  phases: moonPhase[];
  phasetoday: moonPhaseData | null;
  moonDayData: Record<number, HaircutDay>;
  haircutDays: HaircutDay[];
  todayHaircut: HaircutData | null;

  searchResults: MoonDayData[];
  isSearching: boolean;
  activeValue: string | null;
  selectedKey: LuckyKeys | "";

  error: null | { status: number; message: string };
  retryCount: number;
  maxRetries: number;
  cache: Record<string, NormalizedDay | null>;
  setError: (err: StoreState["error"]) => void;
  clearError: () => void;
  incrementRetry: () => void;
  resetRetry: () => void;

  fetchDays: () => Promise<void>;
  fetchToday: () => Promise<void>;
  fetchDayByDate: (date: string) => Promise<void>;
  getDayById: (id: string) => MoonDay | undefined;

  fetchPhases: () => Promise<void>;
  fetchPhaseToday: () => Promise<void>;

  fetchHaircutDays: () => Promise<void>;
  fetchTodayHaircut: () => Promise<void>;
  fetchHaircutDayByID: (id: string) => HaircutDay | undefined;
  fetchHaircutDayByDaynumber: (
    dayNumber: number,
  ) => Promise<HaircutDay | undefined>;

  search5Days: (
    key: LuckyKeys,
    rating: RatingGroup,
  ) => Promise<HaircutDay | undefined>;
  setSelectedKey: (key: LuckyKeys | "") => void;

  resetSearch: () => void;

  selectedAspectIds: string[];
  toggleAspect: (id: string) => void;
  selectAllAspects: () => void;
  clearAllAspects: () => void;
  filteredAspects: () => any[];
}

export const useMoonStore = create<StoreState>()(
  persist(
    (set, get) => ({
      dayDate: null,
      days: [],
      total: 0,
      today: null,
      isLoaded: false,
      cache: {},

      phases: [],
      phasetoday: null,
      moonDayData: {},
      haircutDays: [],
      todayHaircut: null,

      searchResults: [],
      isSearching: false,
      activeValue: null,
      selectedAspectIds: [],

      error: null,
      retryCount: 0,
      maxRetries: 3,
      selectedKey: "",
      setSelectedKey: (key) => set({ selectedKey: key }),
      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),
      incrementRetry: () => set((s) => ({ retryCount: s.retryCount + 1 })),
      resetRetry: () => set({ retryCount: 0 }),

      toggleAspect: (id: string) => {
        const { selectedAspectIds } = get();
        const exists = selectedAspectIds.includes(id);
        set({
          selectedAspectIds: exists
            ? selectedAspectIds.filter((x) => x !== id)
            : [...selectedAspectIds, id],
        });
      },

      selectAllAspects: () => {
        const { today } = get();
        if (!today) return;
        const allKeys = Object.keys(today.details.lifeAspects);
        set({ selectedAspectIds: allKeys });
      },
      clearAllAspects: () => {
        set({ selectedAspectIds: [] });
      },
      filteredAspects: () => {
        const { today, selectedAspectIds } = get();
        if (!today) return [];

        if (selectedAspectIds.length === 0) return [];

        return Object.entries(today.details.lifeAspects)
          .filter(([key]) => selectedAspectIds.includes(key))
          .map(([key, aspect]) => ({ key, aspect }));
      },

      fetchDays: async () => {
        if (get().isLoaded) return;

        const data = await getListDays();
        set({ days: data.moonDay, total: data.total, isLoaded: true });
      },

      fetchPhases: async () => {
        if (get().isLoaded) return;

        const data = await getListPhases();
        set({ phases: data, isLoaded: true });
      },

      fetchPhaseToday: async () => {
        if (get().phasetoday) return;
        const data = await getTodayPhases();
        set({ phasetoday: data });
      },

      fetchHaircutDays: async () => {
        if (get().isLoaded) return;

        const data = await getListHaircutDays();
        set({ haircutDays: data, isLoaded: true });
      },

      fetchTodayHaircut: async () => {
        if (get().todayHaircut) return;
        const data = await getTodayHaircutDay();
        set({ todayHaircut: data });
      },
      fetchHaircutDayByID: (id) => {
        return get().haircutDays.find((hcid) => hcid._id === id);
      },

      fetchToday: async () => {
        if (get().today) return;
        const data = await getTodayMoonday();
        set({ today: data });
      },

      fetchHaircutDayByDaynumber: async (dayNumber: number) => {
        const cache = get().moonDayData;

        if (cache[dayNumber]) {
          return cache[dayNumber];
        }

        set({ isLoaded: true, error: null });
        try {
          const resData = await getHaircutDayByDaynumber(dayNumber);
          if (!resData) throw new Error("Помилка запиту");

          const json: HaircutDay = await resData;

          set({
            moonDayData: {
              ...cache,
              [dayNumber]: json,
            },
            isLoaded: false,
          });
          return json;
        } catch (error: any) {
          set({ error: error.message, isLoaded: false });
        }
      },

      fetchDayByDate: async (date: string) => {
        // console.log("FETCH CALLED", date);

        set({ isSearching: true }); // 🔥 ЛОАДЕР ПОЧАВСЯ

        try {
          const { cache } = get();

          if (cache[date]) {
            // console.log("FROM CACHE", cache[date]);
            set({
              dayDate: cache[date],
              isLoaded: false,
              isSearching: false, // 🔥 ЛОАДЕР ЗАВЕРШЕНО
            });
            return;
          }

          set({ isLoaded: true });

          const dayResp = await searchMoondayData(date);
          // console.log("RAW API RESPONSE:", dayResp);

          if (!dayResp) {
            console.warn("❌ API returned EMPTY or undefined");
            set({ dayDate: null, isLoaded: false, isSearching: false });
            return;
          }

          const normalized = normalizeDay(dayResp, date);
          // console.log("NORMALIZED:", normalized);

          if (!normalized) {
            console.warn("❌ normalizeDay returned NULL");
            set({ dayDate: null, isLoaded: false });
            return;
          }

          set((state) => ({
            dayDate: normalized,
            isLoaded: false,
            cache: { ...state.cache, [date]: normalized },
            isSearching: false, // 🔥 ЛОАДЕР ЗАВЕРШЕНО
          }));
        } catch (err) {
          console.error("❌ fetchDayByDate ERROR:", err);
          set({ dayDate: null, isLoaded: false, isSearching: false });
        }
      },
      // fetchDayByDate: async (date: string) => {
      //   const { cache } = get();

      //   console.log("FETCH CALLED", date);

      //   // 1. Якщо є в кеші — повертаємо нормалізовані дані
      //   if (cache[date]) {
      //     set({
      //       dayDate: cache[date],
      //       error: null,
      //       isLoaded: false,
      //     });
      //     return;
      //   }

      //   // 2. Завантаження
      //   set({ isLoaded: true, error: null });

      //   const dayResp = await searchMoondayData(date);
      //   const normalizedDate = normalizeDay(dayResp, date);

      //   // 3. Записуємо нормалізовані дані + кеш
      //   if (!normalizedDate) {
      //     set({ dayDate: null, isLoaded: false });
      //     return;
      //   }

      //   set((state) => ({
      //     dayDate: normalizedDate,
      //     isLoaded: false,
      //     cache: {
      //       ...state.cache,
      //       [date]: normalizedDate,
      //     },
      //   }));

      //   console.log("FETCH CALLED", date);

      //   console.log("details:", dayResp.details);
      //   console.log("dayNumber:", dayResp.details.dayNumber);

      //   // set({ dayDate: normalizedDate, isLoaded: false });
      //   // if (dayResp) {
      //   //   set((state) => ({
      //   //     dayDate: dayResp,
      //   //     isLoading: false,
      //   //     // 3. Зберігаємо результат у кеш для майбутніх викликів
      //   //     cache: { ...state.cache, [date]: dayResp },
      //   //   }));
      //   // }
      // },

      getDayById: (id) => {
        return get().days.find((d) => d._id === id);
      },
      search5Days: async (key: LuckyKeys, rating: RatingGroup) => {
        const values = ratingGroups[rating];

        set({
          isSearching: true,
          searchResults: [],
          activeValue: null,
        });

        let finalResults: MoonDayData[] = [];
        let matchedValue: string | null = null;

        for (const value of values) {
          try {
            const res = await searchMoonDays(key, value);

            if (res.length > 0) {
              finalResults = res;
              matchedValue = value;
              break;
            }
          } catch (err: any) {
            // Якщо axios не отримав response, але DevTools показує 429 → це network error
            if (!err.response) {
              set({
                error: {
                  status: 429,
                  message: "Забагато запитів. Сервер тимчасово недоступний.",
                },
                isSearching: false,
              });
              return;
            }
            const status = err.response.status;
            set({
              error: {
                status,
                message: err.response?.statusText || "Сталася помилка",
              },
              isSearching: false,
            });
            return;
          }
        }

        if (finalResults.length > 0) {
          finalResults.sort((a, b) => a.moonDay - b.moonDay);
        }

        set({
          searchResults: finalResults,
          activeValue: matchedValue,
          isSearching: false,
        });
      },

      resetSearch: () => {
        set({
          searchResults: [],
          isSearching: false,
          activeValue: null,
        });
      },
    }),
    {
      name: "moon-store-storage",

      // Зберігаємо тільки те, що потрібно
      partialize: (state) => ({
        // dayDate: state.dayDate,
        // today: state.today,
        cache: state.cache,

        searchResults: state.searchResults,
        activeValue: state.activeValue,
        selectedKey: state.selectedKey,

        selectedAspectIds: state.selectedAspectIds,
      }),
    },
  ),
);

// export const useMoonStore = create<MoonState>((set, get) => ({
//   day: null,
//   isLoading: false,
//   error: null,
//   cache: {},

//   fetchDayByDate: async (date: string) => {
//     const { cache } = get();

//     if (cache[date]) {
//       set({ day: cache[date], error: null, isLoading: false });
//       return;
//     }

//     set({ isLoading: true, error: null, day: null }); // Очищуємо попередній день при новому пошуку

//     try {
//       const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/moon-day`, {
//         params: { date }
//       });

//       // Перевірка на пусту відповідь від бекенда
//       if (!response.data || Object.keys(response.data).length === 0) {
//         set({ error: "Даних за цією датою не знайдено (пуста відповідь)", isLoading: false });
//         return;
//       }

//       const normalized = normalizeDay(response.data, date);

//       if (normalized) {
//         set((state) => ({
//           day: normalized,
//           isLoading: false,
//           cache: { ...state.cache, [date]: normalized }
//         }));
//       }
//     } catch (err: any) {
//       // Обробка помилок 404, 400 або 500
//       const message = err.response?.status === 404
//         ? "Місячний день для цієї дати не знайдено"
//         : "Помилка сервера. Спробуйте пізніше";
//       set({ error: message, isLoading: false });
//     }
//   },
// }));

// "use client";
// import { useMoonStore } from "@/store/useMoonStore";

// export const MoondayTemplate = () => {
//   // Витягуємо дані та стан помилки зі стору
//   const { day, error, isLoading } = useMoonStore();

//   // 1. Якщо йде запит до бекенда
//   if (isLoading) return <div className={css.loader}>Шукаю в зоряних архівах...</div>;

//   // 2. Якщо бекенд повернув помилку (наприклад, дата поза межами 1900-2100)
//   if (error) return <div className={css.errorBox}>Помилка: {error}</div>;

//   // 3. Якщо даних ще немає (початковий стан)
//   if (!day) return <div>Будь ласка, оберіть дату для прогнозу.</div>;

//   // 4. ВИВІД ВІДПОВІДІ (коли day вже є)
//   return (
//     <div className={css.container}>
//       <h1>Місячний день: {day.moonDay}</h1>
//       <p>Фаза: {day.phaseName}</p>

//       {/* Вивід текстового опису з бекенда */}
//       <div className={css.description}>
//         {day.details.generalMeaning}
//       </div>

//       {/* Вивід списку символів з бекенда */}
//       <ul>
//         {day.details.symbols.map((symbol, index) => (
//           <li key={index}>{symbol}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };
