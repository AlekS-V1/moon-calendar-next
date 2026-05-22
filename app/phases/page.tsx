"use client";
// import { useMoonStore } from "@/store/calendarStore";
import { getListPhases } from "@/lib/api/api";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const Phases = () => {
  const { data: titles, isLoading } = useQuery({
    queryKey: ["phases"],
    queryFn: getListPhases,
  });

  if (isLoading) return <p>Завантаження назв...</p>;

  const phases = titles;

  return (
    <div>
      <ul>
        {phases?.map((phase) => (
          <li>Фаза: {phase.phaseNumber}</li>
        ))}
      </ul>
    </div>
  );
};

export default Phases;
