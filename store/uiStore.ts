// store/uiStore.ts

import { LuckyKeys } from "@/lib/aspect";
import { RatingGroup, ratingGroups } from "@/lib/ratingGroups";
import { MoonDayData } from "@/type/type";
import { create } from "zustand";
import { PersistOptions } from "zustand/middleware";
import { persist } from "zustand/middleware";

// --- Стан для підсвідчування вибраного дня ---

interface StoreState {
  activeDayId: string | null; // Тут зберігається поточний ID
  setActiveDayId: (id: string | null) => void; // Функція для запису ID
}

export const useUIStore = create<StoreState>()((set) => ({
  activeDayId: null, // Спочатку жоден день не обран
  setActiveDayId: (id) => {
    set({ activeDayId: id }); // Оновлюємо стан
  },
}));

// --- Вибор аспекта ---

interface AsspectState {
  today: MoonDayData | null;
  selectedAspectIds: string[];
  toggleAspect: (id: string) => void;
  selectAllAspects: (allAspectIds: string[]) => void;
  clearAllAspects: () => void;
  filteredAspects: (lifeAspects: Record<string, any>) => any[];
}

export const useAspectsSelectStore = create<AsspectState>()(
  // Видалено явне типізування <AsspectState, [], PersistedAspectsState>
  persist(
    (set, get) => ({
      today: null,
      selectedAspectIds: [],

      toggleAspect: (id: string) => {
        const { selectedAspectIds } = get();
        const exists = selectedAspectIds.includes(id);
        set({
          selectedAspectIds: exists
            ? selectedAspectIds.filter((x) => x !== id)
            : [...selectedAspectIds, id],
        });
      },

      // функція приймає масив ключів (ID) ззовні

      selectAllAspects: (allAspectIds: string[]) => {
        set({ selectedAspectIds: allAspectIds });
      },

      clearAllAspects: () => {
        set({ selectedAspectIds: [] });
      },

      // filteredAspects: () => {
      //   const { today, selectedAspectIds } = get();
      //   if (!today) return [];
      //   if (selectedAspectIds.length === 0) return [];

      //   return Object.entries(today.details.lifeAspects)
      //     .filter(([key]) => selectedAspectIds.includes(key))
      //     .map(([key, aspect]) => ({ key, aspect }));
      // },

      //функція приймає об'єкт з аспектами ззовні

      filteredAspects: (lifeAspects: Record<string, any>) => {
        const { selectedAspectIds } = get();
        if (!lifeAspects || selectedAspectIds.length === 0) return [];

        return Object.entries(lifeAspects)
          .filter(([key]) => selectedAspectIds.includes(key))
          .map(([key, aspect]) => ({ key, aspect }));
      },
    }),
    {
      name: "moon-store-storage",
      // partialize: (state) => ({
      //   selectedAspectIds: state.selectedAspectIds,
      // }),
    },
  ),
);

// --- Пошук за Датою ---

interface DateState {
  searchDate: string; // Формат "YYYY-MM-DD"
  setSearchDate: (date: string) => void;
}

export const useDateStore = create<DateState>((set) => ({
  searchDate: "", // Початкове значення
  setSearchDate: (date) => set({ searchDate: date }),
}));

interface SearchState {
  // Те, що підтверджено кліком на кнопку (за цим стежить TanStack Query)
  activeSearch: {
    key: string;
    values: readonly string[];
  } | null;
  triggerSearch: (
    key: string,
    rating: RatingGroup,
    // ratingGroups: Record<string, string[]
  ) => void;
  resetSearch: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  activeSearch: null, // Спочатку пошук не активовано

  // Екшен, який викликається ПО КЛІКУ на кнопку
  triggerSearch: (key, rating) => {
    const values = ratingGroups[rating] || [];
    set({
      activeSearch: { key, values },
    });
  },

  resetSearch: () => set({ activeSearch: null }),
}));

interface MoonUiState {
  selectedKey: LuckyKeys | "";
  setSelectedKey: (key: LuckyKeys | "") => void;
  resetSearch: () => void;
}

export const useMoonStore = create<MoonUiState>((set) => ({
  selectedKey: "", // Спочатку нічого не вибрано

  setSelectedKey: (key) => set({ selectedKey: key }),

  resetSearch: () => set({ selectedKey: "" }),
}));

interface DayNumState {
  searchPhase: number;
  searchByPhaseNum: number;
  setSearchPhase: (dayNumber: number) => void;
  setSearchByPhaseNum: (dayNumber: number) => void;
}

export const usePhaseStore = create<DayNumState>((set) => ({
  searchPhase: 0, // Початкове значення
  searchByPhaseNum: 0,
  setSearchPhase: (dayNumber) => set({ searchPhase: dayNumber }),
  setSearchByPhaseNum: (phaseNumber) => set({ searchByPhaseNum: phaseNumber }),
}));

interface HaircutDaysState {
  searchByDayNum: number;
  setSearchByDayNum: (dayNumber: number) => void;
}
export const useHaircutDays = create<HaircutDaysState>((set) => ({
  searchByDayNum: 0,
  setSearchByDayNum: (dayNumber) => set({ searchByDayNum: dayNumber }),
}));
