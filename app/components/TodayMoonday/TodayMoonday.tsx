"use client";

import { useEffect, useMemo, useState } from "react";
import css from "./TodayMoonday.module.css";
import { useMoonStore } from "@/store/calendarStore";

const TodayMoonday = () => {
  const {
    today,
    fetchToday,
    selectedAspectIds,
    toggleAspect,
    selectAllAspects,
    clearAllAspects,
  } = useMoonStore();

  const [openGroups, setOpenGroups] = useState<string[]>([]);

  useEffect(() => {
    fetchToday();
  }, [fetchToday]);

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
    housework: "Домашні справи",
    marriage: "Шлюб",
    intimacy: "Сімейна близькість",
    conception: "Зачаття",
  };

  const aspectGroups: Record<string, string> = {
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

    communication: "Соціальне",
    confrontation: "Соціальне",
    travel: "Соціальне",
    bossCommunication: "Соціальне",

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

  const groupedAspects = useMemo(() => {
    if (!today) return {} as Record<string, { key: string; aspect: any }[]>;

    const resDay = today.details;

    return Object.entries(resDay.lifeAspects).reduce(
      (acc, [key, aspect]) => {
        const group = aspectGroups[key] ?? "Інше";
        if (!acc[group]) acc[group] = [];
        acc[group].push({ key, aspect });
        return acc;
      },
      {} as Record<string, { key: string; aspect: any }[]>,
    );
  }, [today]);

  useEffect(() => {
    if (!today) return;

    const groupsToOpen = Object.entries(groupedAspects)
      .filter(([_, items]) =>
        items.some(({ key }) => selectedAspectIds.includes(key)),
      )
      .map(([groupName]) => groupName);

    if (groupsToOpen.length === 0) return;

    setOpenGroups((prev) => Array.from(new Set([...prev, ...groupsToOpen])));
  }, [selectedAspectIds, groupedAspects, today]);

  const toggleGroup = (groupName: string) => {
    setOpenGroups((prev) =>
      prev.includes(groupName)
        ? prev.filter((g) => g !== groupName)
        : [...prev, groupName],
    );
  };

  const showRemoveAll = selectedAspectIds.length >= 2;

  if (!today) return <p>Завантаження...</p>;

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

      <div className={css.sectionAspekt}>
        <h3>Для розвитку</h3>

        <div className={css.containerAspect}>
          <div className={css.containerFilters}>
            <div className={css.filterButtons}>
              <button
                onClick={showRemoveAll ? clearAllAspects : selectAllAspects}
              >
                {showRemoveAll ? "Прибрати все" : "Показати все"}
              </button>
            </div>

            <div className={css.containerListAspect}>
              {Object.entries(groupedAspects).map(([groupName, items]) => {
                const isOpen = openGroups.includes(groupName);

                return (
                  <div className={css.accordionGroup} key={groupName}>
                    <button
                      className={css.accordionHeader}
                      onClick={() => toggleGroup(groupName)}
                    >
                      <span>{groupName}</span>
                      <span>{isOpen ? "▲" : "▼"}</span>
                    </button>

                    {isOpen && (
                      <div className={css.accordionContent}>
                        {items.map(({ key, aspect }) => (
                          <label className={css.checkboxItem} key={key}>
                            <input
                              type="checkbox"
                              checked={selectedAspectIds.includes(key)}
                              onChange={() => toggleAspect(key)}
                            />
                            <span className={css.titleAspect}>
                              {aspectTitles[key] ?? key}
                            </span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <ul className={css.selectedAspects}>
            {selectedAspectIds.length === 0 ? (
              <p>Нічого не вибрано</p>
            ) : (
              selectedAspectIds.map((key) => {
                const aspect = resDay.lifeAspects[key];
                if (!aspect) return null;

                return (
                  <li className={css.containerItemAspect} key={key}>
                    <div className={css.itemAspect}>
                      <h5 className={css.titleAspect}>
                        {aspectTitles[key] ?? key}
                      </h5>
                      <p className={css.textAspect}>{aspect.text}</p>
                      <p className={css.levelAspect}>
                        Оцінка: {aspect.rating.value}/{aspect.rating.scale} —{" "}
                        {aspect.rating.meaning}
                      </p>
                    </div>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      </div>

      <div className={css.containerBirth}>
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
