"use client";

import { useHaircutDateStore } from "@/store/uiStore";
import { useRouter } from "next/navigation";
import css from "./SearchHaircutByDateClient.module.css";

export function HaircutDatePicker() {
  const { searchDate, setSearchDate } = useHaircutDateStore();

  const router = useRouter();

  return (
    <div className={css.containerDatePicker}>
      <label className={css.lableChooseDate}>Оберіть дату:</label>
      <input
        type="date"
        value={searchDate}
        onChange={(e) => {
          setSearchDate(e.target.value);
          router.push("/haircutdays/bydate");
        }}
        className={css.inputChooseDate}
      />
    </div>
  );
}
