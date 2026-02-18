"use client";
import css from "./MoonToday.module.css";
import { useMoonStore } from "@/store/calendarStore";
import { useEffect } from "react";

const MoonToday = () => {
  const { today, fetchToday } = useMoonStore();

  useEffect(() => {
    fetchToday();
  }, []);

  if (!today) return <p>Завантаження...</p>;
  const resDay = today.details;
  const aspectTitles: Record<string, string> = {
    newActivities: "Нові справи",
    decisionMaking: "Приняття рішень",
    business: "Бізнес",
    money: "Гроші",
    realEstate: "Нерухомість",
    trade: "Торгівля",
    legalMatters: "Судові справи",
    science: "Наука",
    art: "Мистецтво",
    creativity: "Творчість",
    learningExams: "Навчання, іспити",
    communication: "Комунікація",
    confrontation: "Конфлікти",
    bossCommunication: "Спілкування з начальством",
    jobChange: "Зміна місця роботи",
    travel: "Подорожі, ділові поїздки",
    movement: "Пасивна активність",
    rest: "Відпочинок",
    physicalActivity: "Фізична активність",
    housework: "Домашнє завдання",
    marriage: "Шлюб",
    intimacy: "Сімейна близькість",
    conception: "Зачаття",
  };

  const aspectGroups: Record<string, string> = {
    // Важливе
    business: "Важливе",
    jobChange: "Важливе",
    decisionMaking: "Важливе",
    legalMatters: "Важливе",
    trade: "Важливе",
    housework: "Важливе",
    realEstate: "Важливе",
    money: "Важливе",
    newActivities: "Важливе",
    learningExams: "Важливе",

    // Соціальне
    communication: "Соціальне",
    confrontation: "Соціальне",
    travel: "Соціальне",
    bossCommunication: "Соціальне",

    // Особисте
    science: "Особисте",
    art: "Особисте",
    creativity: "Особисте",
    rest: "Особисте",
    movement: "Особисте",
    physicalActivity: "Особисте",
    marriage: "Особисте",
    intimacy: "Особисте",
    conception: "Особисте",
  };

  const groupedAspects = Object.entries(resDay.lifeAspects).reduce(
    (acc, [key, aspect]) => {
      const group = aspectGroups[key] ?? "Інше";

      if (!acc[group]) acc[group] = [];
      acc[group].push({ key, aspect });

      return acc;
    },
    {} as Record<string, { key: string; aspect: any }[]>,
  );

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
