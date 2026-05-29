"use client";

import { useHaircutToday } from "@/lib/hooks/useHaircutToday";
import css from "./HaircutTodayClient.module.css";

const HaircutTodayClient = () => {
  const { data: haircutToday } = useHaircutToday();
  const avoidIsTrue = haircutToday?.avoid.length !== 0;
  const recommendIsTrue = haircutToday?.recommend.length !== 0;

  return (
    <>
      <div></div>
      <div className={css.containerTodayHaircut}>
        <h2 className={css.titleTodayHaircut}>
          Результат стрижки на {haircutToday?.date}{" "}
        </h2>
        <h3></h3>
        <p className={css.textTodayHaircut}>{haircutToday?.why}</p>
        <h4 className={css.titleTextTodayHaircut}>Тому:</h4>
        <p className={css.textTodayHaircut}> {haircutToday?.energy}</p>
        <h4 className={css.titleTextTodayHaircut}>
          Як це вплине на здоров'я:{" "}
        </h4>
        <ul className={css.listTextTodayHaircut}>
          {haircutToday?.health.map((h) => (
            <li className={css.textTodayHaircut}>- {h}</li>
          ))}
        </ul>
        <h4 className={css.titleTextTodayHaircut}>Як це вплине на фінанси: </h4>
        <ul className={css.listTextTodayHaircut}>
          {haircutToday?.wealth.map((w) => (
            <li className={css.textTodayHaircut}>- {w}</li>
          ))}
        </ul>
        {recommendIsTrue && (
          <h4 className={css.titleTextTodayHaircut}>Добре для:</h4>
        )}
        {recommendIsTrue && (
          <ul className={css.listTextTodayHaircut}>
            {haircutToday?.recommend.map((r) => (
              <li className={css.textTodayHaircut}>- {r}</li>
            ))}
          </ul>
        )}
        {avoidIsTrue && (
          <h4 className={css.titleTextTodayHaircut}>Краще уникати:</h4>
        )}
        {avoidIsTrue && (
          <ul className={css.listTextTodayHaircut}>
            {haircutToday?.avoid.map((a) => (
              <li className={css.textTodayHaircut}>- {a}</li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default HaircutTodayClient;
