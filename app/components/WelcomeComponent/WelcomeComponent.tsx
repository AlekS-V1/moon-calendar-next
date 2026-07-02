"use client";

import Link from "next/link";
import css from "./WelcomeComponent.module.css";

const WelcomeComponent = () => {
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
        Більш детально зможете дізнатися у розділі "
        <Link href={"/about#FullAboutMe"} className={css.linkWellcomeLoading}>
          Для чого
        </Link>
        ".
      </p>

      <p className={css.textWellcomeLoading}>
        Місяць рухається за певним циклом, і разом із ним змінюються наші стани,
        рішення, енергія та внутрішня рівновага. Цей календар створений, щоб
        допомогти тобі відчувати ці зміни, розуміти їх і використовувати на свою
        користь.
      </p>

      <p className={css.textWellcomeLoading}>
        Кожен день має свій характер — м’якість чи силу, ясність чи глибину, рух
        чи тишу. У календарі ці стани описані простою мовою і доповнені
        практичними ритуалами, рекомендаціями та поясненнями, чому саме сьогодні
        енергія працює так, а не інакше.
      </p>

      <p className={css.textWellcomeLoading}>
        Це не астрологія і не містика. Це поєднання слов’янських символів,
        трипільських архетипів, тибетської енергетики та сучасної психології —
        інструмент, який допомагає жити усвідомлено, приймати виважені рішення й
        підтримувати внутрішній баланс щодня.
      </p>

      <p className={css.textWellcomeLoading}>
        Тут починається твій місячний цикл — шлях до ясності, стабільності та
        глибшого відчуття себе.
      </p>
      <p className={css.textWellcomeLoading}>
        Для актуальності та зручності користування такі дані, як вік Місяця,
        молодик та повня базуються на астрономічних розрахунках фізичного
        положення на небесній сфері. За цими ж критеріями здійснюються усі інші
        обчислення.
      </p>
      <p className={css.textWellcomeLoading}>
        Ви також можете скористатися функцією пошуку оптимального дня для різних
        сфер (аспектів) життя із зазначенням конкретної дати. Окремо передбачено
        пошук за календарем: наприклад, ви можете дізнатися вік Місяця на певну
        дату або перевірити, чи сприятливий цей день для стрижки.
      </p>
      <p className={css.textWellcomeLoading}>
        Більш детально зможете дізнатися у розділі "
        <Link href={"/about#FullAboutMe"} className={css.linkWellcomeLoading}>
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
};
export default WelcomeComponent;
