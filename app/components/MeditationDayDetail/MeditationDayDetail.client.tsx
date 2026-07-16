// app/haircutdays/[id]/HaircutDayDetail.client.tsx
"use client";

import { getSingleMeditationDay } from "@/lib/api/api";
import { useQuery } from "@tanstack/react-query";
import css from "./MeditationDetail.module.css";
import MeditationBaseTemplateClient from "@/app/components/MeditationTemplate/MeditationBaseTemplate.client";

const MeditationDayDetailsClient = ({ id }: { id: string }) => {
  const { data: meditationDay, error } = useQuery({
    queryKey: ["meditationDay", id],
    queryFn: () => getSingleMeditationDay(id),
    staleTime: 1000 * 60 * 60,
  });
  if (error) return <div>Помилка: {error.message}</div>;
  if (!meditationDay) return <div>Лоадінг...</div>;
  console.log("MeditationDayDetailsClient id", meditationDay._id);
  return (
    <div className={css.containerMeditation}>
      <h2 className={css.headTitleMeditation}>{meditationDay.title}</h2>
      <p className={css.textBlokMeditation}>
        Ментальні практики цієї системи є інструментом езотеричної психотехніки
        для психологічного та енергетичного саморозвитку. Вони поєднують
        елементи неоязичництва (слов’янського та трипільського) і тибетського
        буддизму. У тибетській лінії практики можуть спиратися на чотири ключові
        акценти, залежно від конкретного дня:
      </p>
      <ul>
        <li>- споглядання (шине) — стабілізація уваги;</li>
        <li>
          - внутрішній простір (ка) — робота з “порожнечею як потенціалом”;
        </li>
        <li>- м’які енергетичні візуалізації — не магія, а психотехніка;</li>
        <li>- дихальні цикли — спосіб впорядкувати внутрішній рух.</li>
      </ul>
      {/* <div className={css.blokMeditation}>
        <h3 className={css.titleBlokMeditation}>
          За Місяцем {meditationDay.day} день
        </h3>
      </div> */}
      <MeditationBaseTemplateClient day={meditationDay} />
    </div>
  );
};

export default MeditationDayDetailsClient;
