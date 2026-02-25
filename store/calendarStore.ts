import { getListDays, getTodayMoonday, searchMoonDays } from "@/lib/api";
import { LuckyKeys } from "@/lib/aspect";
import { RatingGroup, ratingGroups } from "@/lib/ratingGroups";
import type { MoonDay, MoonDayData } from "@/type/type";
import { create } from "zustand";

interface StoreState {
  days: MoonDay[];
  total: number;
  today: MoonDayData | null;
  isLoaded: boolean;

  searchResults: MoonDayData[];
  isSearching: boolean;
  activeValue: string | null;

  error: null | { status: number; message: string };
  setError: (err: StoreState["error"]) => void;
  clearError: () => void;

  fetchDays: () => Promise<void>;
  fetchToday: () => Promise<void>;
  getDayById: (id: string) => MoonDay | undefined;

  search5Days: (key: LuckyKeys, rating: RatingGroup) => Promise<void>;

  resetSearch: () => void;

  selectedAspectIds: string[];
  toggleAspect: (id: string) => void;
  selectAllAspects: () => void;
  clearAllAspects: () => void;
  filteredAspects: () => any[];
}

export const useMoonStore = create<StoreState>((set, get) => ({
  days: [],
  total: 0,
  today: null,
  isLoaded: false,

  searchResults: [],
  isSearching: false,
  activeValue: null,
  selectedAspectIds: [],

  error: null,
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),

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

  fetchToday: async () => {
    if (get().today) return;
    const data = await getTodayMoonday();
    set({ today: data });
  },

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
}));
