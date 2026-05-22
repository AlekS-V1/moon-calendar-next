// store/uiStore.ts

import { LuckyKeys } from "@/lib/aspect";
import { RatingGroup, ratingGroups } from "@/lib/ratingGroups";
import { create } from "zustand";

interface StoreState {
  activeDayId: string | null; // Тут зберігається поточний ID
  setActiveDayId: (id: string | null) => void; // Функція для запису ID
}

export const useUIStore = create<StoreState>()((set) => ({
  activeDayId: null, // Спочатку жодна нотатка не обрана
  setActiveDayId: (id) => {
    set({ activeDayId: id }); // Оновлюємо стан
  },
}));

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
