"use client";

import { usePhaseToday } from "@/lib/hooks/usePhaseToday";
import css from "./phasesToday.module.css";

const PhaseTodayClient = () => {
  const { data: phaseToday, isLoading } = usePhaseToday();
  if (isLoading && !phaseToday) return <div>Завантаження даних...</div>;

  return (
    <div className={css.containerPhase}>
      <h3 className={css.titleSectionPhases}>
        {" "}
        Рекомендаці на поточний період: <br />{" "}
        <span className={css.spanTitleSectionPhases}>{phaseToday?.phase}</span>
      </h3>

      <p className={`${css.textPhaseToday} ${css.centerText}`}>
        {phaseToday?.energy}
      </p>

      <p className={css.textPhaseToday}>{phaseToday?.description}</p>

      <div className={css.containerBlocks}>
        <div className={css.underBlock}>
          <h4 className={css.underTitleBlock}>Оздоровчі практики:</h4>
          <ul className={css.listWraperPhases}>
            {phaseToday?.wellness_practices.map((w) => (
              <li key={w} className={css.textPhaseToday}>
                - {w}
              </li>
            ))}
          </ul>
        </div>

        <div className={css.underBlock}>
          <h4 className={css.underTitleBlock}>Харчування:</h4>

          <ul className={css.listWraperPhases}>
            {phaseToday?.nutrition.general.map((g) => (
              <li key={g} className={css.textPhaseToday}>
                - {g}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={css.underBlock}>
        <h4 className={css.underTitleBlock}>Насіння:</h4>

        <ul className={css.listWraperPhases}>
          {phaseToday?.nutrition.seed_support.map((s) => (
            <li key={s} className={css.textPhaseToday}>
              - {s}
            </li>
          ))}
        </ul>
      </div>

      <div className={css.containerPreferredAvoid}>
        <div className={css.underBlock}>
          <h4 className={css.underTitleBlock}>Для очищення організму:</h4>

          <ul className={css.listWraperPhases}>
            {phaseToday?.nutrition.energyPurpose.map((d) => (
              <li key={d} className={css.textPhaseToday}>
                - {d}
              </li>
            ))}
          </ul>
        </div>

        <div className={css.underBlock}>
          <h4 className={css.underTitleBlock}>Бажано вживати:</h4>

          <ul className={css.listWraperPhases}>
            {phaseToday?.nutrition.preferred.map((p) => (
              <li key={p} className={css.textPhaseToday}>
                - {p}
              </li>
            ))}
          </ul>
        </div>

        <div className={css.underBlock}>
          <h4 className={css.underTitleBlock}>Краще уникати:</h4>

          <ul className={css.listWraperPhases}>
            {phaseToday?.nutrition.avoid_excess.map((a) => (
              <li key={a} className={css.textPhaseToday}>
                - {a}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default PhaseTodayClient;
