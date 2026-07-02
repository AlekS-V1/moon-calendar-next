"use client";

import { useMeditationRitualToday } from "@/lib/hooks/useMeditationRitualToday";
import css from "./MeditationRitual.module.css";
import MeditationBaseTemplateClient from "../MeditationTemplate/MeditationBaseTemplate.client";
import { RitualMeditation } from "@/type/type";

const RitualMeditationTodayClient = () => {
  const { data: ritualToday } = useMeditationRitualToday();
  // console.log(ritualToday);
  const moonDate = ritualToday?.date ? new Date(ritualToday.date) : undefined;
  if (!ritualToday) return null;
  return (
    <div className={css.containerMeditation}>
      <h2 className={css.headTitleMeditation}>{ritualToday.title}</h2>
      <p className={css.textBlokMeditation}>
        Ментальні практики цієї системи є інструментом езотеричної психотехніки
        для психологічного та енергетичного саморозвитку. Вони поєднують
        елементи неоязичництва (слов’янського та трипільського) і тибетського
        буддизму. У тибетській лінії практики можуть спиратися на чотири ключові
        акценти, залежно від конкретного дня: споглядання (шине) — стабілізація
        уваги; внутрішній простір (ка) — робота з “порожнечею як потенціалом”;
        м’які енергетичні візуалізації — не магія, а психотехніка; дихальні
        цикли — спосіб впорядкувати внутрішній рух.
      </p>
      <div className={css.blokMeditation}>
        <h3 className={css.titleBlokMeditation}>
          Сьогодні:{" "}
          <span className={css.spanDate}>
            {moonDate?.toLocaleDateString("uk-UA", {
              weekday: "short",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </h3>
      </div>
      <MeditationBaseTemplateClient day={ritualToday} />
    </div>
  );
};

export default RitualMeditationTodayClient;
