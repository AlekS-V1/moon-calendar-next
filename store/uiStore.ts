// store/uiStore.ts
import { MoonDay } from "@/type/type";
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
