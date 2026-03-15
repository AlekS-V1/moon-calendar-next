"use client";

import css from "./MoondayTemplate.module.css";
import { aspectGroups, aspectTitles } from "@/lib/aspect";
import { moonImages160 } from "@/lib/moonPhase30";
import { useMemo, useState } from "react";
import { NormalizedDay } from "@/type/type";

type MoondayTemplateProps = {
  day: NormalizedDay;
  selectedAspectIds: string[];
  toggleAspect: (key: string) => void;
  selectAllAspects: () => void;
  clearAllAspects: () => void;
};

export const MoondayTemplate = ({
  day,
  selectedAspectIds,
  toggleAspect,
  selectAllAspects,
  clearAllAspects,
}: MoondayTemplateProps) => {
  // ❗ Беремо дані тільки зі стора
  // const today = useMoonStore((s) => s.today);
  // const searchedDay = useMoonStore((s) => s.dayDate);
  // const selectedAspectIds = useMoonStore((s) => s.selectedAspectIds);
  // const toggleAspect = useMoonStore((s) => s.toggleAspect);
  // const selectAllAspects = useMoonStore((s) => s.selectAllAspects);
  // const clearAllAspects = useMoonStore((s) => s.clearAllAspects);
  // const showRemoveAll = selectedAspectIds.length >= 2;

  // ❗ Вибираємо, що показувати: знайдений день або сьогоднішній
  // const day = searchedDay ?? today;
  const resDay = day.details;

  const [openGroups, setOpenGroups] = useState<string[]>([]);

  // console.log("TEMPLATE RENDER:", { searchedDay, today, finalDay: day });

  // ❗ Групування аспектів
  const groupedAspects = useMemo(() => {
    if (!resDay?.lifeAspects) return {};

    return Object.entries(resDay.lifeAspects).reduce(
      (acc, [key, aspect]) => {
        const group = aspectGroups[key] ?? "Інше";
        if (!acc[group]) acc[group] = [];
        acc[group].push({ key, aspect });
        return acc;
      },
      {} as Record<string, { key: string; aspect: any }[]>,
    );
  }, [resDay]);

  // ❗ Ефект для відкриття груп (не залежить від умовного рендера)
  // useEffect(() => {
  //   if (!resDay) return;

  //   const groupsToOpen = Object.entries(groupedAspects)
  //     .filter(([_, items]) => items.some(({ key }) => false)) // поки без логіки вибору
  //     .map(([groupName]) => groupName);

  //   if (groupsToOpen.length > 0) {
  //     setOpenGroups((prev) => [...new Set([...prev, ...groupsToOpen])]);
  //   }
  // }, [groupedAspects, resDay]);

  // ❗ Якщо даних немає взагалі
  // if (!day || !resDay) {
  //   return (
  //     <div className={css.containerToday}>
  //       <MoonSearchByData />
  //       <p>Оберіть дату для перегляду</p>
  //     </div>
  //   );
  // }
  const toggleGroup = (groupName: string) => {
    setOpenGroups((prev) =>
      prev.includes(groupName)
        ? prev.filter((g) => g !== groupName)
        : [...prev, groupName],
    );
  };

  const showRemoveAll = selectedAspectIds.length >= 2;

  // ❗ Обчислення місячного дня
  const dayNumber = Number(day.moonDay ?? resDay.dayNumber ?? 1);
  const img =
    moonImages160[dayNumber as keyof typeof moonImages160] || moonImages160[1];

  // export const MoondayTemplate = ({
  //   date,
  //   day,
  //   selectedAspectIds,
  //   toggleAspect,
  //   selectAllAspects,
  //   clearAllAspects,
  // }: MoondayTemplateProps) => {
  //   const [openGroups, setOpenGroups] = useState<string[]>([]);

  //   console.log("Поточні дані в шаблоні:", date);

  //   const { fetchDayByDate } = useMoonStore();
  //   console.log("fetchDayByDate:", fetchDayByDate);

  //   const resDay = day?.details;

  //   const groupedAspects = useMemo(() => {
  //     if (!resDay?.lifeAspects) return {};

  //     return Object.entries(resDay.lifeAspects).reduce(
  //       (acc, [key, aspect]) => {
  //         const group = aspectGroups[key] ?? "Інше";
  //         if (!acc[group]) acc[group] = [];
  //         acc[group].push({ key, aspect });
  //         return acc;
  //       },
  //       {} as Record<string, { key: string; aspect: any }[]>,
  //     );
  //   }, [resDay]);

  //   if (!day || !resDay) {
  //     return <p>Завантаження...</p>;
  //   }

  //   const dayNumber = Number(day.moonDay ?? resDay.dayNumber ?? 1);
  //   const img =
  //     moonImages160[dayNumber as keyof typeof moonImages160] || moonImages160[1];

  //   useEffect(() => {
  //     const groupsToOpen = Object.entries(groupedAspects)
  //       .filter(([_, items]) =>
  //         items.some(({ key }) => selectedAspectIds.includes(key)),
  //       )
  //       .map(([groupName]) => groupName);

  //     if (groupsToOpen.length === 0) return;

  //     setOpenGroups((prev) => Array.from(new Set([...prev, ...groupsToOpen])));
  //   }, [selectedAspectIds, groupedAspects]);

  //   const toggleGroup = (groupName: string) => {
  //     setOpenGroups((prev) =>
  //       prev.includes(groupName)
  //         ? prev.filter((g) => g !== groupName)
  //         : [...prev, groupName],
  //     );
  //   };

  //   const showRemoveAll = selectedAspectIds.length >= 2;
  //   console.log("TEMPLATE RENDER", date);

  //   console.log("store B:", useMoonStore.getState());

  return (
    <>
      <div className={css.containerToday}>
        <div className={css.moonHeader}>
          <div className={css.homeHeader}>
            <div>
              {day.date && (
                <h2 className={css.underTitleMoonToday}>
                  {new Date(day.date).toLocaleDateString("uk-UA", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </h2>
              )}
              <h2 className={css.underTitleMoonToday}>
                {/* {day.date ? "Сьогодні:" : "В цей"} */}в цей
              </h2>
              {day.date ? (
                <h4 className={css.underTitleMoonToday}>
                  {day.moonDay} Місячний день
                </h4>
              ) : (
                <h2 className={css.underTitleMoonToday}>
                  {day.moonDay} Місячний день
                </h2>
              )}
              {day.phaseName ? (
                <p className={css.textMoonToday}>
                  {resDay.phase} {"("}
                  {day.phaseName}
                  {")"}
                </p>
              ) : (
                <p className={css.textMoonToday}>{resDay.phase}</p>
              )}
              <p className={css.textMoonToday}>{resDay.phaseDescription}</p>
            </div>

            <div className={css.contImageMoonPhase}>
              <img
                className={css.imageMoonPhase}
                src={img}
                alt={`Moon phase day ${day.moonDay}`}
                width={160}
                height={160}
              />
              <div className={css.effectMoon}></div>
            </div>
          </div>

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

      <div className={css.containerToday}>
        <div className={css.moonCards}>
          <h2 className={css.titleTodayMoonday}>
            За місячним календарем в цей день вважають, що
          </h2>

          <div className={css.extendedMeaning}>
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
            {/* <Link
              href="/searchbydata"
              aria-label="Moon days by date"
              className={css.link}
            >
              Дізнатися за датою
            </Link> */}
            {/* <p>Дізнатися за датою</p>
            <MoonSearchByData /> */}
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
                <p className={css.textTodayMoonday}>
                  {resDay.haircut.lunarCalendar}
                </p>
              </div>
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
              <p className={css.textTodayMoonday}>
                {resDay.health.general.text}
              </p>
              <p className={css.textTodayMoonday}>
                Оцінка: {resDay.health.general.rating.meaning}
              </p>
            </div>

            <div className={css.vulnerableBodyPartHealth}>
              <h4 className={css.underTitleMoonday}>Вразлива частина тіла</h4>
              <p className={css.textTodayMoonday}>
                {resDay.health.vulnerableBodyPart.text}
              </p>
            </div>
          </div>
        </div>

        <div className={css.sectionAspekt}>
          <h3 className={css.titleTodayMoonday}>Для розвитку</h3>

          <div className={css.containerAspect}>
            <div className={css.containerFilters}>
              <div className={css.filterButtons}></div>

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
      </div>
    </>
  );
};
