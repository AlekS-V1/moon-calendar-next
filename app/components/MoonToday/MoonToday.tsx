"use client";
import css from "./MoonToday.module.css";
import { useMoonStore } from "@/store/calendarStore";
import { useEffect } from "react";
// import MoonLoader from "../MoonLoader/MoonLoader";
import { moonImages160 } from "@/lib/moonPhase30";

const MoonToday = () => {
  const { today, fetchToday } = useMoonStore();

  useEffect(() => {
    fetchToday();
  }, []);

  if (!today)
    return (
      <video autoPlay loop muted playsInline poster="/image/FonLoader.jpg">
        <source src="/image/homeLoader480.webm" type="video/webm" />{" "}
        {/*  840x480 */}
      </video>
    );
  const resDay = today.details;
  const img = moonImages160[today.moonDay];

  return (
    <div className={css.containerToday}>
      <div className={css.moonHeader}>
        <div className={css.homeHeader}>
          <div className={css.textHomeHeader}>
            {/* <h1 className={css.titleHead}>Під світлом Місяця</h1> */}
            <h2 className={css.underTitleMoonToday}>Сьогодні:</h2>
            <h2 className={css.underTitleMoonToday}>
              {new Date(today.date).toLocaleDateString("uk-UA", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </h2>
            <h4 className={css.underTitleMoonToday}>
              {today.moonDay} Місячний день
            </h4>
            <p className={css.textMoonToday}>
              {resDay.phase} {"("}
              {today.phaseName}
              {")"}
            </p>
            <p className={css.textMoonToday}>{resDay.phaseDescription}</p>
          </div>

          <div className={css.contImageMoonPhase}>
            <img
              className={css.imageMoonPhase}
              src={img}
              alt={`Moon phase day ${today.moonDay}`}
              width={160}
              height={160}
            />
            <div className={css.effectMoon}></div>
          </div>
        </div>

        {/* <h3 className={css.titleBlock}>Загальне значення</h3> */}
        <p className={css.textMoonToday}>{resDay.extendedMeaning}</p>
      </div>

      <div className={css.listBlockSimbol}>
        <div className={css.itemBlockSimbol}>
          <h3 className={css.titleBlock}>Якості</h3>
          <ul>
            {resDay.qualities.map((q) => (
              <li key={q}>
                <p className={css.textMoonToday}>&#9680; {q}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className={css.itemBlockSimbol}>
          <h3 className={css.titleBlock}>Попередження</h3>
          <ul>
            {resDay.warnings.map((w) => (
              <li key={w}>
                <p className={css.textMoonToday}>&#9680; {w}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className={css.itemBlockSimbol}>
          <h3 className={css.titleBlock}>Символи</h3>
          <ul>
            {resDay.symbols.map((s) => (
              <li key={s}>
                <p className={css.textMoonToday}>&#9680; {s}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className={css.itemBlockSimbol}>
          <h3 className={css.titleBlock}>Камені</h3>
          <ul>
            {resDay.stones.map((s) => (
              <li key={s}>
                <p className={css.textMoonToday}>&#9680; {s}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <h3 className={css.titleBlock}>Знаки</h3>

      <div className={css.blockSign}>
        <div className={css.itemBlockSign}>
          <h4 className={css.underTitleMoonToday}>Сприятливі:</h4>
          <ul>
            {resDay.signs.good.map((g) => (
              <li key={g}>
                <p className={`${css.textMoonToday} ${css.alignJustify}`}>
                  + {g}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className={css.itemBlockSign}>
          <h4 className={css.underTitleMoonToday}>Несприятливі:</h4>
          <ul>
            {resDay.signs.bad.map((b) => (
              <li key={b}>
                <p className={`${css.textMoonToday} ${css.alignJustify}`}>
                  - {b}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MoonToday;
