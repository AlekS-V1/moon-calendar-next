"use client";
import css from "./MoonToday.module.css";
// import MoonLoader from "../MoonLoader/MoonLoader";
import { moonImages160 } from "@/lib/moonPhase30";
import Link from "next/link";
import Countdown from "../Countdown/Countdown";
import { useMoonToday } from "@/lib/hooks/useToday";

const MoonToday = () => {
  const { data: moonToday, error, isLoading, isFetching } = useMoonToday();

  if (!moonToday)
    return (
      <div className={css.wellcomeLoading}>
        <div id="waitFatch">
          <img
            src="./image/sleepServer.png"
            alt="sleep server"
            width="56"
            className={css.waitImgWellcomeLoading}
          />
          <p className={css.waitTextWellcomeLoading}>
            Зачекайте, сервер працює з затримкою...
          </p>
        </div>
        <h3 className={css.titleWellcomeLoading}>
          Вітаю! Маємо хвилинку на знайомство. <br />
          <span className={css.spanTitleWellcomeLoading}>
            {" "}
            Це місячний календар, що допомагає жити в ритмі, а не в хаосі.
          </span>
        </h3>

        <p className={css.textWellcomeLoading}>
          Місяць рухається циклом, і разом із ним змінюються наші стани,
          рішення, енергія та внутрішня рівновага. Цей календар створений, щоб
          допомогти тобі відчувати ці зміни, розуміти їх і використовувати на
          свою користь.
        </p>

        <p className={css.textWellcomeLoading}>
          Кожен день має свій характер — м’якість чи силу, ясність чи глибину,
          рух чи тишу. У календарі ці стани описані простою мовою і доповнені
          практичними ритуалами, рекомендаціями та поясненнями, чому саме
          сьогодні енергія працює так, а не інакше.
        </p>

        <p className={css.textWellcomeLoading}>
          Це не астрологія і не містика. Це поєднання слов’янських символів,
          трипільських архетипів, тибетської енергетики та сучасної психології.
          Інструмент, який допомагає жити усвідомлено, приймати виважені рішення
          й підтримувати внутрішній баланс щодня.
        </p>

        <p className={css.textWellcomeLoading}>
          Тут починається твій місячний цикл — шлях до ясності, стабільності та
          глибшого відчуття себе.
        </p>
        <p className={css.textWellcomeLoading}>
          Для актуальності та зручності користування такі данні, як вік Місяця,
          молодик та повня базуються на асторнамічних розрахунках фізичного
          положення на небесній сфері. За цими ж критеріями здійснюються усі
          інші обчислення.
        </p>
        <p className={css.textWellcomeLoading}>
          Ви також можете скористатися функцією пошуку оптимального дня для
          різних сфер(аспектів) життя із зазначенням конкретної дати. Окремо
          передбачено пошук за календарем: наприклад, ви можете дізнатися вік
          Місяця на певну дату або перевірити чи сприятливий цей день для
          стрижки.
        </p>
        <p className={css.textWellcomeLoading}>
          Більш детально зможете дізнатися у розділі "
          <Link href={"/about"} className={css.linkWellcomeLoading}>
            Для чого
          </Link>
          ".
        </p>
      </div>
      // <video autoPlay loop muted playsInline poster="/image/FonLoader.jpg">
      //   <source src="/image/homeLoader480.webm" type="video/webm" />{" "}
      //   {/*  840x480 */}
      // </video>
    );
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
  if (isFetching) return <div>Обробка запиту...</div>;
  if (isLoading) return <div>Завантаження...</div>;

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
