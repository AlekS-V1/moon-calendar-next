"use client";
import css from "./MoonToday.module.css";
import { moonImages160 } from "@/lib/moonPhase30";
import Link from "next/link";
import Countdown from "../Countdown/Countdown";
import { useMoonToday } from "@/lib/hooks/useToday";
import { useEffect, useState } from "react";
import WelcomeComponent from "../WelcomeComponent/WelcomeComponent";

const MoonToday = () => {
  const {
    data: moonToday,
    error,
    isLoading,
    isFetching,
    isPending,
  } = useMoonToday();

  const [showWelcome, setShowWelcome] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);

  // Коли дані прийшли — це вже не перше завантаження
  useEffect(() => {
    if (moonToday) {
      setFirstLoad(false);
    }
  }, [moonToday]);

  // Затримка перед welcome
  useEffect(() => {
    if (firstLoad && !moonToday) {
      const timer = setTimeout(() => setShowWelcome(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [firstLoad, moonToday]);

  // Показуємо welcome тільки один раз
  if (firstLoad && !moonToday && showWelcome) {
    return <WelcomeComponent />;
  }

  // Поки чекаємо затримку — нічого не показуємо
  if (firstLoad && !moonToday && !showWelcome) {
    return <div>Оновлення даних...</div>;
  }
  const resDay = moonToday?.details;
  const img = moonImages160[moonToday?.moonDay ?? 0];
  const moonDate = moonToday?.date ? new Date(moonToday.date) : undefined;
  const nextDayStartDate = moonToday?.nextDayStart
    ? new Date(moonToday.nextDayStart)
    : undefined;
  // const progressRemaining = Math.max(
  //   0,
  //   100 - Math.round(Number(moonToday?.progressDay)),
  // );
  if (isLoading || isFetching) return <div>Завантаження сторінки...</div>;

  return (
    <div className={css.containerToday}>
      <div className={css.moonHeader}>
        <div className={css.homeHeader}>
          <div className={css.textHomeHeader}>
            {/* <h1 className={css.titleHead}>Під світлом Місяця</h1> */}
            <h2 className={css.underTitleMoonToday}>Сьогодні:</h2>
            <h2 className={css.underTitleMoonToday}>
              {" "}
              в{" "}
              {moonDate?.toLocaleDateString("uk-UA", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </h2>
            <h4 className={css.underTitleMoonToday}>
              {moonToday?.moonDay} Місячний день
            </h4>
            <div className={css.timer}>
              <p className={css.dateTimer}>
                до{" "}
                {nextDayStartDate?.toLocaleTimeString("uk-UA", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              {nextDayStartDate && (
                <Countdown target={nextDayStartDate.toISOString()} />
              )}
            </div>
            {/* <p className={css.textMoonToday}>
              до наступного ще {progressRemaining}%
            </p> */}
            <p className={css.textMoonToday}>{resDay?.phase.text}</p>
            <Link href="/phases/today" className={css.textMoonToday}>
              {resDay?.phaseDescription}
            </Link>
          </div>

          <div className={css.contImageMoonPhase}>
            <img
              className={css.imageMoonPhase}
              src={img}
              alt={`Moon phase day ${moonToday?.moonDay}`}
              width={160}
              height={160}
            />
            <div className={css.effectMoon}></div>
          </div>
        </div>

        {/* <h3 className={css.titleBlock}>Загальне значення</h3> */}
        <p className={css.textMoonToday}>{resDay?.extendedMeaning}</p>
      </div>

      <div className={css.listBlockSimbol}>
        <div className={css.itemBlockSimbol}>
          <h3 className={css.titleBlock}>Якості</h3>
          <ul>
            {resDay?.qualities.map((q) => (
              <li key={q}>
                <p className={css.textMoonToday}>&#9680; {q}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className={css.itemBlockSimbol}>
          <h3 className={css.titleBlock}>Попередження</h3>
          <ul>
            {resDay?.warnings.map((w) => (
              <li key={w}>
                <p className={css.textMoonToday}>&#9680; {w}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className={css.itemBlockSimbol}>
          <h3 className={css.titleBlock}>Символи</h3>
          <ul>
            {resDay?.symbols.map((s) => (
              <li key={s}>
                <p className={css.textMoonToday}>&#9680; {s}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className={css.itemBlockSimbol}>
          <h3 className={css.titleBlock}>Камені</h3>
          <ul>
            {resDay?.stones.map((s) => (
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
          <h4 className={`${css.underTitleBlockSign} ${css.goodSign}`}>
            Сприятливі:
          </h4>
          <ul>
            {resDay?.signs.good.map((g) => (
              <li key={g}>
                <p className={`${css.textMoonToday} ${css.alignJustify}`}>
                  <span className={css.goodSign}>+</span> {g}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className={css.itemBlockSign}>
          <h4 className={`${css.underTitleBlockSign} ${css.badSign}`}>
            Несприятливі:
          </h4>
          <ul>
            {resDay?.signs.bad.map((b) => (
              <li key={b}>
                <p className={`${css.textMoonToday} ${css.alignJustify}`}>
                  <span className={css.badSign}>-</span> {b}
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
