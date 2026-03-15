"use client";

import { useMoonStore } from "@/store/calendarStore";
import { MoondayTemplate } from "../MoonDay/MoondayTemplate";

export const MoonSearchResultView = () => {
  const searched = useMoonStore((s) => s.dayDate);
  const isSearching = useMoonStore((s) => s.isSearching);

  const selectedAspectIds = useMoonStore((s) => s.selectedAspectIds);
  const toggleAspect = useMoonStore((s) => s.toggleAspect);
  const selectAllAspects = useMoonStore((s) => s.selectAllAspects);
  const clearAllAspects = useMoonStore((s) => s.clearAllAspects);

  // 🔄 ЛОАДЕР ПІД ЧАС ЗАПИТУ
  if (isSearching) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <div className="loader"></div>
        <p>Завантаження...</p>
      </div>
    );
  }

  // ❌ НІЧОГО НЕ ЗНАЙДЕНО
  if (!searched) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <p>Нічого не знайдено</p>
      </div>
    );
  }

  // ✅ Є РЕЗУЛЬТАТ

  return (
    <MoondayTemplate
      day={searched}
      selectedAspectIds={selectedAspectIds}
      toggleAspect={toggleAspect}
      selectAllAspects={selectAllAspects}
      clearAllAspects={clearAllAspects}
    />
  );
};
