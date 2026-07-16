"use client";

import { RitualMeditation } from "@/type/type";
import css from "./MeditationDayClient.module.css";

interface Prop {
  day: RitualMeditation;
}
const MeditationBaseTemplateClient = ({ day }: Prop) => {
  if (!day) return null;
  const meditationDay = day;
  return (
    <div className={css.content}>
      <div className={css.blokMeditation}>
        <h3 className={css.titleBlokMeditation}>Енергетичний ефект</h3>
        <p className={css.textBlokMeditation}>
          Під час виконання будь-яких психоемоційних або енергетичних практик
          необхідно враховувати специфіку поточного періоду. Все це проявляється
          через те, що:
        </p>{" "}
        <ul className={css.listBlokMeditation}>
          {meditationDay?.energy_effect?.map((e) => (
            <li key={e} className={css.itemListBlokMeditation}>
              {" "}
              {e}
            </li>
          ))}
        </ul>
      </div>
      <div className={css.sectionBloksMeditation}>
        <div className={css.blokMeditation}>
          <h3 className={css.titleBlokMeditation}>Вплив на здоров’я</h3>
          <p className={css.textBlokMeditation}>
            Правильна концентрація та розслаблення запускають позитивні
            психофізичні зміни на рівні нервової системи та фізичного тіла,
            таким чином в цей день:
          </p>
          <ul className={css.listBlokMeditation}>
            {meditationDay.health_effect.map((h) => (
              <li key={h} className={css.itemListBlokMeditation}>
                {" "}
                - {h}
              </li>
            ))}
          </ul>
        </div>
        <div className={css.blokMeditation}>
          <h3 className={css.titleBlokMeditation}>
            Вплив на матеріальне благополуччя
          </h3>
          <p className={css.textBlokMeditation}>
            Будь-яка трансформація стає природним наслідком внутрішнього
            очищення, яке проекційно трансформує на соціальні процеси та
            повсякденну зовнішню діяльність і:
          </p>
          <ul className={css.listBlokMeditation}>
            {meditationDay.material_effect.map((m) => (
              <li key={m} className={css.itemListBlokMeditation}>
                {" "}
                - {m}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={css.sectionBloksMeditation}>
        <div className={css.blokMeditation}>
          <h3 className={css.titleBlokMeditation}>Заборони та Рекомендації</h3>
          <p className={css.textBlokMeditation}>
            Дуже важливо є суворе дотримання правил екологічності та внутрішньої
            безпеки. Оскільки ігнорування може призвести до деструктивних станів
            або перевантаження психіки, тому під час практики неприпустимим є:
          </p>
          <ul className={css.listBlokMeditation}>
            {meditationDay.forbidden.map((f) => (
              <li key={f} className={css.itemListBlokMeditation}>
                {" "}
                - {f}
              </li>
            ))}
          </ul>

          <p className={css.textBlokMeditation}>
            Дотримання цих правил допомагає правильно скерувати увагу та
            утримати потрібний стан, тому для найкращого результату варто:
          </p>
          <ul>
            {meditationDay.recommended.map((r) => (
              <li key={r} className={css.itemListBlokMeditation}>
                {" "}
                + {r}
              </li>
            ))}
          </ul>
        </div>

        <div className={css.blokMeditation}>
          <h3 className={css.titleBlokMeditation}>Чому саме так...</h3>
          <p className={css.textBlokMeditation}>
            Отже, для успішного виконання практики важливо усвідомити теоретичне
            обґрунтування з необхідності інтегрувати стародавній досвід різних
            культур для глибинного розуміння суті процесу, де в цей день:
          </p>
          <div className={css.listBlokMeditation}>
            {meditationDay?.logic?.map((l) => (
              <p key={l} className={css.textBlokMeditation}>
                {" "}
                {l}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className={css.blokMeditation}>
        <h3 className={css.titleBlokMeditation}>
          Інструкція до духовної практики
        </h3>
        <p className={css.textBlokMeditation}>
          Реалізація методу вимагає точного відтворення кожного кроку для
          досягнення запланованого внутрішнього результату:
        </p>
        <ol className={css.numListBlokMeditation}>
          {meditationDay.ritual_steps.map((s) => (
            <li key={s} className={css.itemListBlokMeditation}>
              {" "}
              {s}
            </li>
          ))}
        </ol>
      </div>
      <p className={css.textBlokMeditation}>
        Правильне застосування цієї практики дозволяє екологічно завершувати
        відпрацьовані етапи, своєчасно скидати ментальний баласт і підготувати
        надійний внутрішній фундамент для подальшого розвитку.
      </p>
    </div>
  );
};

export default MeditationBaseTemplateClient;
