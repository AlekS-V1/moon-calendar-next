// store/uiStore.ts

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
