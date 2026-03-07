"use client";

import { useEffect, useMemo, useState } from "react";
import css from "./TodayMoonday.module.css";
import { useMoonStore } from "@/store/calendarStore";
import { aspectGroups, aspectTitles } from "@/lib/aspect";

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
      {/* <div className={css.moonCards}> */}
      <div className={css.moonCards}>
        <h2 className={css.titleTodayMoonday}>
          За місячним календарем в цей день вважають, що
          {/* {" "}
          {new Date(today.date).toLocaleDateString("uk-UA", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </h2>
          <h3 className={css.titleTodayMoonday}>
          {today.moonDay}   */}
        </h2>

        <div className={css.extendedMeaning}>
          {/* <div className={`${css.extendedMeaning} ${css.innerContainer}`}> */}
          {/* <h3 className={css.titleTodayMoonday}>Тлумачення дня</h3> */}
          <p className={css.textTodayMoonday}>{resDay.generalMeaning}</p>
        </div>
      </div>

      <div className={`${css.containerLifeAspect} ${css.innerContainer}`}>
        <div className={css.containerBirth}>
          <h3 className={css.titleTodayMoonday}>
            {resDay.birthOnThisDay.title}
          </h3>
          <p className={css.textTodayMoonday}>
            {resDay.birthOnThisDay.description}
          </p>
        </div>

        <div className={css.containerDreams}>
          <h3 className={css.titleTodayMoonday}>
            {resDay.dreams.title} — {resDay.dreams.rating.value}/
            {resDay.dreams.rating.scale}
          </h3>
          <p className={css.textTodayMoonday}>{resDay.dreams.meaning}</p>
          <p className={css.textTodayMoonday}>
            Оцінка: {resDay.dreams.rating.meaning}
          </p>
        </div>

        <div className={css.containerMeditations}>
          <h3 className={css.titleTodayMoonday}>Медитації</h3>
          <ul className={css.listTodayMoonday}>
            {resDay.meditations.map((m) => (
              <li className={css.itemList} key={m}>
                <p className={css.textTodayMoonday}>{m}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={`${css.containerLifeAspect} ${css.innerContainer}`}>
        <div className={css.containerHaircut}>
          <h3 className={css.titleTodayMoonday}>
            Стрижка — {resDay.haircut.rating.value}/
            {resDay.haircut.rating.scale}
          </h3>
          <div className={css.listHeircut}>
            <div className={css.moonCalendar}>
              {/* <h4 className={css.underTitleMoonday}>Місячний календар</h4> */}
              <p className={css.textTodayMoonday}>
                {resDay.haircut.lunarCalendar}
              </p>
            </div>

            {/* <div className={css.tibetanCalendar}>
              <h4 className={css.underTitleMoonday}>Тибетський календар</h4>
              <p className={css.textTodayMoonday}>
                {resDay.haircut.tibetanCalendar}
              </p>
            </div> */}
          </div>

          <p className={css.textTodayMoonday}>
            Оцінка: {resDay.haircut.rating.meaning}
          </p>
        </div>

        <div className={css.containerMedication}>
          <h3 className={css.titleTodayMoonday}>
            Медикаменти — {resDay.health.medications.rating.value}/
            {resDay.health.medications.rating.scale}
          </h3>
          <p className={css.textTodayMoonday}>
            {resDay.health.medications.text}
          </p>
          <p className={css.textTodayMoonday}>
            Оцінка: {resDay.health.medications.rating.meaning}
          </p>
        </div>
      </div>
      <div className={css.containerHealth}>
        <h3 className={css.titleTodayMoonday}>
          Здоровʼє — {resDay.health.general.rating.value}/
          {resDay.health.general.rating.scale}
        </h3>

        <div className={`${css.listHealth} ${css.innerContainer}`}>
          <div className={css.generalHealth}>
            <h4 className={css.underTitleMoonday}>Загальне</h4>
            <p className={css.textTodayMoonday}>{resDay.health.general.text}</p>
            <p className={css.textTodayMoonday}>
              Оцінка: {resDay.health.general.rating.meaning}
            </p>
          </div>

          <div className={css.vulnerableBodyPartHealth}>
            <h4 className={css.underTitleMoonday}>Вразлива частина тіла</h4>
            <p className={css.textTodayMoonday}>
              {resDay.health.vulnerableBodyPart.text}
            </p>
            {/* <p className={css.textTodayMoonday}>
              {resDay.health.vulnerableBodyPart.rating.meaning}
            </p> */}
          </div>
        </div>
      </div>

      <div className={css.sectionAspekt}>
        <h3 className={css.titleTodayMoonday}>Для розвитку</h3>

        <div className={css.containerAspect}>
          <div className={css.containerFilters}>
            <div className={css.filterButtons}>
              {/* <button
                className={css.buttonShowAll}
                onClick={showRemoveAll ? clearAllAspects : selectAllAspects}
              >
                {showRemoveAll ? "Прибрати все" : "Показати все"}
              </button> */}
            </div>

            <ul className={css.containerListAspect}>
              <li className={css.accordionGroup}>
                <button
                  className={css.accordionHeader}
                  onClick={showRemoveAll ? clearAllAspects : selectAllAspects}
                >
                  {showRemoveAll ? "Прибрати все" : "Показати все"}
                </button>
              </li>
              {Object.entries(groupedAspects).map(([groupName, items]) => {
                const isOpen = openGroups.includes(groupName);
                const hasSelectedInGroup = items.some(({ key }) =>
                  selectedAspectIds.includes(key),
                );
                return (
                  <li className={css.accordionGroup} key={groupName}>
                    <button
                      className={`${css.accordionHeader} ${isOpen ? css.open : ""} ${
                        hasSelectedInGroup ? css.active : ""
                      }`}
                      onClick={() => toggleGroup(groupName)}
                    >
                      <span>{groupName}</span>
                      <span className={css.arrow}></span>
                    </button>

                    {isOpen && (
                      <ul className={css.accordionContent}>
                        {items.map(({ key, aspect }) => (
                          <li className={css.checkboxItem} key={key}>
                            <label className={css.checkboxLabel}>
                              <input
                                type="checkbox"
                                checked={selectedAspectIds.includes(key)}
                                onChange={() => toggleAspect(key)}
                              />
                              <span className={css.titleAspect}>
                                {aspectTitles[key] ?? key}
                              </span>
                            </label>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <ul className={css.selectedAspects}>
            {selectedAspectIds.length === 0 ? (
              <p>Зробіть вибір, будь ласка</p>
            ) : (
              selectedAspectIds.map((key) => {
                const aspect = resDay.lifeAspects[key];
                if (!aspect) return null;

                return (
                  <li className={css.containerItemAspect} key={key}>
                    <div className={css.itemAspect}>
                      <h5 className={css.titleAspect}>
                        {aspectTitles[key] ?? key} — {aspect.rating.value}/
                        {aspect.rating.scale}
                      </h5>
                      <p className={css.textAspect}>{aspect.text}</p>
                      <p className={css.levelAspect}>
                        Оцінка: {aspect.rating.meaning}
                      </p>
                    </div>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      </div>

      {/* <div className={css.containerBirth}>
        <h3 className={css.titleTodayMoonday}>{resDay.birthOnThisDay.title}</h3>
        <p className={css.textTodayMoonday}>
          {resDay.birthOnThisDay.description}
        </p>
      </div> */}

      {/* <div className={css.containerHealth}>
        <h3 className={css.titleTodayMoonday}>Здоровʼя</h3>

        <div className={css.listHealth}>
          <div>
            <h4 className={css.underTitleMoonday}>Загальне</h4>
            <p className={css.textTodayMoonday}>{resDay.health.general.text}</p>
            <p className={css.textTodayMoonday}>
              Оцінка: {resDay.health.general.rating.value}/
              {resDay.health.general.rating.scale} —{" "}
              {resDay.health.general.rating.meaning}
            </p>
          </div>

          <div>
            <h4 className={css.underTitleMoonday}>Вразлива частина тіла</h4>
            <p className={css.textTodayMoonday}>
              {resDay.health.vulnerableBodyPart.text}
            </p>
            <p className={css.textTodayMoonday}>
              Оцінка: {resDay.health.vulnerableBodyPart.rating.value}/
              {resDay.health.vulnerableBodyPart.rating.scale} —{" "}
              {resDay.health.vulnerableBodyPart.rating.meaning}
            </p>
          </div>

          <div>
            <h4 className={css.underTitleMoonday}>Медикаменти</h4>
            <p className={css.textTodayMoonday}>
              {resDay.health.medications.text}
            </p>
            <p className={css.textTodayMoonday}>
              Оцінка: {resDay.health.medications.rating.value}/
              {resDay.health.medications.rating.scale} —{" "}
              {resDay.health.medications.rating.meaning}
            </p>
          </div>
        </div>
      </div> */}

      {/* <div>
        <h3 className={css.titleTodayMoonday}>Стрижка</h3>
        <p className={css.textTodayMoonday}>
          Місячний календар: {resDay.haircut.lunarCalendar}
        </p>
        <p className={css.textTodayMoonday}>
          Тибетський календар: {resDay.haircut.tibetanCalendar}
        </p>
        <p className={css.textTodayMoonday}>
          Оцінка: {resDay.haircut.rating.value}/{resDay.haircut.rating.scale} —{" "}
          {resDay.haircut.rating.meaning}
        </p>
      </div> */}
    </div>
  );
};

export default TodayMoonday;
