"use client";
import { getListPhases } from "@/lib/api/api";
import { useQuery } from "@tanstack/react-query";

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
          <li key={phase._id}>
            Фаза: {phase.phaseNumber}
            <p>Дні: {phase.days}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Phases;
