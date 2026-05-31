"use client";
import { HaircutDay } from "@/type/type";
import css from "./HaircutTodayClient.module.css";
interface Prop {
  day: HaircutDay;
}

const HaircutDayClient = ({ day }: Prop) => {
  if (!day) return null;
  const avoidIsTrue = day?.avoid.length !== 0;
  const recommendIsTrue = day?.recommend.length !== 0;
  return (
    <div className={css.containerTodayHaircut}>
      <h3></h3>
      <p className={css.textTodayHaircut}>{day?.why}</p>
      <h4 className={css.titleTextTodayHaircut}>Тому:</h4>
      <p className={css.textTodayHaircut}> {day?.energy}</p>
      <h4 className={css.titleTextTodayHaircut}>Як це вплине на здоров'я: </h4>
      <ul className={css.listTextTodayHaircut}>
        {day?.health.map((h) => (
          <li key={h} className={css.textTodayHaircut}>
            - {h}
          </li>
        ))}
      </ul>
      <h4 className={css.titleTextTodayHaircut}>Як це вплине на фінанси: </h4>
      <ul className={css.listTextTodayHaircut}>
        {day?.wealth.map((w) => (
          <li key={w} className={css.textTodayHaircut}>
            - {w}
          </li>
        ))}
      </ul>
      {recommendIsTrue && (
        <h4 className={css.titleTextTodayHaircut}>Добре для:</h4>
      )}
      {recommendIsTrue && (
        <ul className={css.listTextTodayHaircut}>
          {day?.recommend.map((r) => (
            <li key={r} className={css.textTodayHaircut}>
              - {r}
            </li>
          ))}
        </ul>
      )}
      {avoidIsTrue && (
        <h4 className={css.titleTextTodayHaircut}>Краще уникати:</h4>
      )}
      {avoidIsTrue && (
        <ul className={css.listTextTodayHaircut}>
          {day?.avoid.map((a) => (
            <li key={a} className={css.textTodayHaircut}>
              - {a}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HaircutDayClient;
