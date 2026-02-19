"use client";
import css from "./MoonToday.module.css";
import { useMoonStore } from "@/store/calendarStore";
import { useEffect } from "react";

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

  return (
    <div className={css.containerToday}>
      <div>
        <h2>
          Сьогодні:{" "}
          {new Date(today.date).toLocaleDateString("uk-UA", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </h2>
        <h3>{today.moonDay} Місячний день</h3>
        <h4>
          {resDay.phase} {"("}
          {today.phaseName}
          {")"}
        </h4>
        <p>{resDay.phaseDescription}</p>

        <h3>Загальне значення</h3>
        <p>{resDay.generalMeaning}</p>
      </div>

      <div className={css.listMoondayOne}>
        <div>
          <h3>Якості</h3>
          <ul>
            {resDay.qualities.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3>Попередження</h3>
          <ul>
            {resDay.warnings.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3>Символи</h3>
          <ul>
            {resDay.symbols.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3>Камені</h3>
          <ul>
            {resDay.stones.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <h3>Знаки</h3>
        <div>
          <h4>Сприятливі</h4>
          <ul>
            {resDay.signs.good.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4>Несприятливі</h4>
          <ul>
            {resDay.signs.bad.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MoonToday;
