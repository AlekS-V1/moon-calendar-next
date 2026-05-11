"use client";

import { useMoonStore } from "@/store/calendarStore";
import { useEffect } from "react";

const PhaseTodayClient = async () => {
  const { phasetoday, fetchPhaseToday } = useMoonStore();

  useEffect(() => {
    fetchPhaseToday();
  }, []);

  return (
    <>
      <div>
        <h2> Рекомендаці на поточний період: </h2>
        <h3>{phasetoday?.phase}</h3>
        <br />
        <h4>{phasetoday?.energy}</h4>
        <br />
        <br />
        {phasetoday?.description}
        <br />
        <br />
        <h3>Оздоровчі практики</h3> <br />
        <ul>
          {phasetoday?.wellness_practices.map((w) => (
            <li key={w}>{w}</li>
          ))}
        </ul>
        <br />
        <div>
          <br />
          <h3>Харчування</h3>
          <br />
          <ul>
            {phasetoday?.nutrition.general.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
          <br />
          <div>
            <div>
              <br />
              <h4>Насіння:</h4>
              <br />
              <ul>
                {phasetoday?.nutrition.seed_support.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              <br />
            </div>
            <div>
              <br />
              <h4>Бажано вживати:</h4>
              <br />
              <ul>
                {phasetoday?.nutrition.preferred.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <br />
            </div>
            <div>
              <br />
              <h4>Для очищення організму:</h4>
              <br />
              <ul>
                {phasetoday?.nutrition.energyPurpose.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
              <br />
            </div>
            <div>
              <br />
              <h4>Краще уникати:</h4>
              <br />
              <ul>
                {phasetoday?.nutrition.avoid_excess.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
              <br />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default PhaseTodayClient;
