"use client";
import { MoonDayData } from "@/type/type";
import css from "./TodayMoonday.module.css";
import { useMoonStore } from "@/store/calendarStore";
import { useEffect } from "react";

// interface Props {
//   today: MoonDayData;
// }

const TodayMoonday = () => {
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

        <div>
          <h3>Розширене значення</h3>
          <p>{resDay.extendedMeaning}</p>
        </div>
      </div>

      <div className={css.listMoondayOne}>
        <div>
          <h3>Медитації</h3>
          <ul>
            {resDay.meditations.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <h3>{resDay.dreams.title}</h3>
        <p>{resDay.dreams.meaning}</p>
        <p>
          Оцінка: {resDay.dreams.rating.value}/{resDay.dreams.rating.scale} —{" "}
          {resDay.dreams.rating.meaning}
        </p>
      </div>

      <div className={css.containerAspekt}>
        <h3>Для розвитку</h3>
        <div className={css.containerListAspect}>
          {Object.entries(groupedAspects).map(([groupName, items]) => (
            <div className={css.containerGroupedAspects} key={groupName}>
              <h4 className={css.titleGroupedAspects}>{groupName}</h4>

              {items.map(({ key, aspect }) => (
                <div className={css.containerAspect} key={key}>
                  <h5 className={css.titleAspect}>
                    {aspectTitles[key] ?? key}
                  </h5>
                  <p className={css.textAspect}>{aspect.text}</p>
                  <p className={css.levelAspect}>
                    Оцінка: {aspect.rating.value}/{aspect.rating.scale} —{" "}
                    {aspect.rating.meaning}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3>{resDay.birthOnThisDay.title}</h3>
        <p>{resDay.birthOnThisDay.description}</p>
      </div>

      <div className={css.containerHealth}>
        <h3>Здоровʼя</h3>

        <div className={css.listHealth}>
          <div>
            <h4>Загальне</h4>
            <p>{resDay.health.general.text}</p>
            <p>
              Оцінка: {resDay.health.general.rating.value}/
              {resDay.health.general.rating.scale} —{" "}
              {resDay.health.general.rating.meaning}
            </p>
          </div>

          <div>
            <h4>Вразлива частина тіла</h4>
            <p>{resDay.health.vulnerableBodyPart.text}</p>
            <p>
              Оцінка: {resDay.health.vulnerableBodyPart.rating.value}/
              {resDay.health.vulnerableBodyPart.rating.scale} —{" "}
              {resDay.health.vulnerableBodyPart.rating.meaning}
            </p>
          </div>

          <div>
            <h4>Медикаменти</h4>
            <p>{resDay.health.medications.text}</p>
            <p>
              Оцінка: {resDay.health.medications.rating.value}/
              {resDay.health.medications.rating.scale} —{" "}
              {resDay.health.medications.rating.meaning}
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3>Стрижка</h3>
        <p>Місячний календар: {resDay.haircut.lunarCalendar}</p>
        <p>Тибетський календар: {resDay.haircut.tibetanCalendar}</p>
        <p>
          Оцінка: {resDay.haircut.rating.value}/{resDay.haircut.rating.scale} —{" "}
          {resDay.haircut.rating.meaning}
        </p>
      </div>
    </div>
  );
};

export default TodayMoonday;
