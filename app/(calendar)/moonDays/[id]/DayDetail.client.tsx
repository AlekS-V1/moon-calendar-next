"use client";

import { MoondayTemplate } from "@/app/components/AllInMoondayTemplate/MoondayTemplate";
import { getMoondaySingle } from "@/lib/api/api";
import { useAspectsSelectStore } from "@/store/uiStore";
import { normalizeDay } from "@/type/type";
import { useQuery } from "@tanstack/react-query";
import css from "./MoondayDetailsClient.module.css";

const MoondayDetailsClient = ({ id }: { id: string }) => {
  // Дані підтягнуться МИТТЄВО з серверного кешу, isLoading відразу буде false
  const { data: moonDay, error } = useQuery({
    queryKey: ["day", id],
    queryFn: () => getMoondaySingle(id),
    staleTime: 1000 * 60 * 60, //  хвилин вважати дані свіжими
  });

  const { selectedAspectIds, toggleAspect, selectAllAspects, clearAllAspects } =
    useAspectsSelectStore();
  if (error) return <div>Помилка: {error.message}</div>;
  if (!moonDay) return <div>Лоадінг...</div>; // Цей рядок користувач ніколи не побачить
  const day = normalizeDay(moonDay);
  if (!day) {
    return <p>Пошук дня...</p>;
  }

  return (
    <div className={css.sectionMoondayDetails}>
      <MoondayTemplate
        day={day}
        selectedAspectIds={selectedAspectIds}
        toggleAspect={toggleAspect}
        selectAllAspects={selectAllAspects}
        clearAllAspects={clearAllAspects}
      />
    </div>
  );
};

export default MoondayDetailsClient;
