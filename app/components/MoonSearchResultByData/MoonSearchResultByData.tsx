"use client";

import { useMoonDayByDate } from "@/lib/hooks/useDate";
import { MoondayTemplate } from "../AllInMoondayTemplate/MoondayTemplate";
import { useAspectsSelectStore, useDateStore } from "@/store/uiStore";
import { redirect } from "next/navigation";

export const MoonSearchResultView = () => {
  const searchDate = useDateStore((state) => state.searchDate);

  const {
    data: searched,
    isLoading,
    isFetching,
    error,
  } = useMoonDayByDate(searchDate);

  // const isSearching = useMoonStore((s) => s.isSearching);
  // const { searchDate, setSearchDate } = useDateStore();

  const { selectedAspectIds, toggleAspect, selectAllAspects, clearAllAspects } =
    useAspectsSelectStore();

  // const selectedAspectIds = useMoonStore((s) => s.selectedAspectIds);
  // const toggleAspect = useMoonStore((s) => s.toggleAspect);
  // const selectAllAspects = useMoonStore((s) => s.selectAllAspects);
  // const clearAllAspects = useMoonStore((s) => s.clearAllAspects);

  // 🔄 ЛОАДЕР ПІД ЧАС ЗАПИТУ
  if (isFetching) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <div className="loader"></div>
        <p>Завантаження...</p>
      </div>
    );
  }

  if (isLoading) return <div>Завантаження даних для дати...</div>;

  // ❌ НІЧОГО НЕ ЗНАЙДЕНО
  if (!searched) {
    <div>
      <p>❌ Нічого не знайдено</p>
    </div>;
    redirect("/recommendation");
    // return;
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
