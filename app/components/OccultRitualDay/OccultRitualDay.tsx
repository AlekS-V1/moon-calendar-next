"use client";

import { RitualOccult } from "@/type/type";
import css from "./OccultRitualDayClient.module.css";

interface Prop {
  day: RitualOccult;
}
const OccultRitualDayTemplateClient = ({ day }: Prop) => {
  if (!day) return null;
  return (
    <>
      <h3 className={css.titleBlockOccult}>{day.energy_goal}</h3>
      <p className={css.textOccult}>
        З давніх-давен наші предки знали, що Місяць має особливий сакральний
        статус, коли тонка завіса між світами дозволяє людині налаштувати власне
        життя в унісон із енергіями Всесвіту. Ця давня обрядова практика
        відкриває доступ до прихованих сил природи, допомагаючи перетворити своє
        потаємне бажання на реальну життєву силу.
      </p>
      {/* <div className={css.blockOccult}>
        <h3 className={css.titleBlockOccult}>
          Енергія дня на: {day.energy_goal}
        </h3>
        <p className={css.textOccult}>
          Це фокусування усього обряду допомагає налаштувати свідомість і
          виконати головне завдання цього дня, щоб осягнути те, що нам
          заповідали пращури.
        </p>
      </div> */}
      <div className={css.blockOccult}>
        <h3 className={css.titleBlockOccult}>Езотерична логіка</h3>
        <p className={css.textOccult}>
          Вона пояснює приховані закони Всесвіту та сакральну мудрість предків,
          за якими народжується сила цього дня.{" "}
        </p>
        <p className={css.textOccult}>{day.esoteric_logic}</p>
      </div>
      <div className={css.sectionBloksOccult}>
        <div className={css.blockOccult}>
          <h3 className={css.titleBlockOccult}>Вплив на здоров’я</h3>
          <p className={css.textOccult}>{day.health_effects}</p>
        </div>
        <div className={css.blockOccult}>
          <h3 className={css.titleBlockOccult}>
            Вплив на матеріальне благополуччя
          </h3>
          <p className={css.textOccult}>{day.wealth_effects}</p>
        </div>
      </div>
      <div className={css.sectionBloksOccult}>
        <div className={css.blockOccult}>
          <h3 className={css.titleBlockOccult}>Запобіжні заходи</h3>
          <p className={css.textOccult}>
            Вони окреслюють важливі правила безпеки, щоб зберегти ваші сили від
            прихованих енергетичних затисків. Зверніть увагу:{" "}
          </p>
          <p className={css.textOccult}>{day.precautions}</p>
        </div>
        <div className={css.blockOccult}>
          <h3 className={css.titleBlockOccult}>Оптимальний час</h3>
          <p className={css.textOccult}>
            Це той самий момент, коли знання предків, сили природи і Місяця
            найбільше допомагають вашим діям. Найкращий час для ритуалу —{" "}
            {day.optimal_time.charAt(0).toLowerCase() +
              day.optimal_time.slice(1)}
          </p>
          {/* <p className={css.textOccult}>{day.optimal_time}</p> */}
        </div>
      </div>
      <p className={css.textOccult}>
        Тепер, після розуміння того, як треба налаштувати свідомість, переходимо
        до чіткого покрокового опису самого обряду, де кожна дія пробуджує силу
        вашого слова і думки, відгукуючись у родовій пам`яті.
      </p>
      <div className={css.sectionBloksOccult}>
        <div className={css.blockOccult}>
          <h3 className={css.titleBlockOccult}>Матеріали</h3>
          <p className={css.textOccult}>
            Це предмети, які допоможуть звернутися до стихійних сил, тому для
            проведення практики вам знадобляться:{" "}
          </p>
          <ul className={css.containerListTextOccult}>
            {day.materials.map((m) => (
              <li className={css.listTextOccult} key={m}>
                - {m}
              </li>
            ))}
          </ul>
        </div>
        <div className={css.blockOccult}>
          <h3 className={css.titleBlockOccult}>Кроки дій:</h3>
          <ol className={css.containerNumListTextOccult}>
            {day.steps.map((s) => (
              <li className={css.listTextOccult} key={s}>
                {s}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
};

export default OccultRitualDayTemplateClient;
