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
          необхідно враховувати специфіку поточного періоду. Все це визначає
          специфіку внутрішнього стану людини під час завершення природних
          циклів і проявляється через те, що:
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
            Далі слід звернути увагу на первинні результати, які досягаються
            шляхом правильної концентрації та розслаблення. Запускає позитивні
            психофізичні зміни на рівні нервової системи та фізичного тіла,
            оскільки безпосередньо це:
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
            Окрім суто внутрішніх змін, будь-яка глибока трансформація системно
            впливає на якість взаємодії із зовнішнім світом. Тому стає природним
            наслідком внутрішнього очищення, яке проекційно трансформує на
            соціальні процеси та повсякденну зовнішню діяльність і:
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
            Окремим пунктом інструкції є суворе дотримання правил екологічності
            та внутрішньої безпеки. Ігнорування перелічених обмежень є
            неприпустимим, оскільки це може призвести до деструктивних станів
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
            Для підвищення ефективності та створення оптимальних умов під час
            роботи обов'язково враховуйте супровідні рекомендації. Дотримання
            цих правил допомагає правильно скерувати увагу та утримати потрібний
            стан, тому для найкращого результату варто:
          </p>
          <ul>
            {meditationDay.recommended.map((r) => (
              <li key={r} className={css.itemListBlokMeditation}>
                {" "}
                - {r}
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
          Вона складається з послідовного алгоритму дій. Реалізація методу
          вимагає точного відтворення кожного кроку для досягнення запланованого
          внутрішнього результату:
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
        Правильне та регулярне застосування цієї інструкції дозволяє екологічно
        завершувати відпрацьовані етапи, своєчасно скидати ментальний баласт і
        підготувати надійний внутрішній фундамент для подальшого розвитку.
      </p>
    </div>
  );
};

export default MeditationBaseTemplateClient;
