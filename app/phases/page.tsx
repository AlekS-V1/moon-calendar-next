"use client";
// import { useMoonStore } from "@/store/calendarStore";
import { getListPhases } from "@/lib/api";
import { useEffect } from "react";

const Phases = async () => {
  useEffect(() => {
    getListPhases();
  }, []);
  //   console.log("Phases:", getListPhases);
  return <div>Сторінка завантажена.</div>;
};

export default Phases;
