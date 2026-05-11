"use client";
// import { useMoonStore } from "@/store/calendarStore";
import { getListHaircutDays } from "@/lib/api";
import { useEffect } from "react";

const Phases = async () => {
  useEffect(() => {
    getListHaircutDays();
  }, []);
  //   console.log("Phases:", getListPhases);
  return <div>Сторінка завантажена. Дивимось консоль</div>;
};

export default Phases;
