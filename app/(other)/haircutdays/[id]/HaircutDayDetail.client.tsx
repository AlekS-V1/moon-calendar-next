// app/haircutdays/[id]/HaircutDayDetail.client.tsx
"use client";

import { getSingleHaircutDay } from "@/lib/api/api";
import { useQuery } from "@tanstack/react-query";
import css from "../today/HaircutTodayClient.module.css";

const HaircutDayDetailsClient = ({ id }: { id: string }) => {
  const { data: haircutDay, error } = useQuery({
    queryKey: ["haircutDay", id],
    queryFn: () => getSingleHaircutDay(id),
    staleTime: 1000 * 60 * 15,
  });
  if (error) return <div>Помилка: {error.message}</div>;
  if (!haircutDay) return <div>Лоадінг...</div>;
  const avoidIsTrue = haircutDay?.avoid.length !== 0;
  const recommendIsTrue = haircutDay?.recommend.length !== 0;
  return (
    <div className={css.containerTodayHaircut}>
      <h3 className={css.titleTodayHaircut}>
        Результат стрижки на {haircutDay?.dayNumber} місячний день
      </h3>
      <p className={css.textTodayHaircut}>{haircutDay?.why}</p>
      <h4 className={css.titleTextTodayHaircut}>Тому:</h4>
      <p className={css.textTodayHaircut}> {haircutDay?.energy}</p>
      <h4 className={css.titleTextTodayHaircut}>Як це вплине на здоров'я: </h4>
      <ul className={css.listTextTodayHaircut}>
        {haircutDay?.health.map((h) => (
          <li className={css.textTodayHaircut}>- {h}</li>
        ))}
      </ul>
      <h4 className={css.titleTextTodayHaircut}>Як це вплине на фінанси: </h4>
      <ul className={css.listTextTodayHaircut}>
        {haircutDay?.wealth.map((w) => (
          <li className={css.textTodayHaircut}>- {w}</li>
        ))}
      </ul>
      {recommendIsTrue && (
        <h4 className={css.titleTextTodayHaircut}>Добре для:</h4>
      )}
      {recommendIsTrue && (
        <ul className={css.listTextTodayHaircut}>
          {haircutDay?.recommend.map((r) => (
            <li className={css.textTodayHaircut}>- {r}</li>
          ))}
        </ul>
      )}
      {avoidIsTrue && (
        <h4 className={css.titleTextTodayHaircut}>Краще уникати:</h4>
      )}
      {avoidIsTrue && (
        <ul className={css.listTextTodayHaircut}>
          {haircutDay?.avoid.map((a) => (
            <li className={css.textTodayHaircut}>- {a}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HaircutDayDetailsClient;
