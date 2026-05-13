"use client";
import { useEffect, useState } from "react";
import css from "./Countdown.module.css";

type CountdownProps = {
  target: string; // ISO date string
};

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  finished: boolean;
};

export default function Countdown({ target }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    finished: false,
  });

  useEffect(() => {
    if (!target) return;

    const end = new Date(target).getTime();

    const tick = () => {
      const now = Date.now();
      const diff = end - now;

      if (diff <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          finished: true,
        });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
        finished: false,
      });
    };

    tick(); // перший запуск одразу
    const interval = setInterval(tick, 1000);

    return () => clearInterval(interval);
  }, [target]);

  if (!target) return null;

  if (timeLeft.finished) {
    return <div>Час вийшов</div>;
  }

  return (
    <div className={css.containerTimer}>
      {/* <h5 className={css.titleTimer}>до наступного дня:</h5> */}
      {/* <span className={css.symbolsTimer}>{timeLeft.days} дн </span> */}
      <span className={css.symbolsTimer}>
        {" ("}
        {timeLeft.hours} год{" "}
      </span>
      <span className={css.symbolsTimer}>
        {timeLeft.minutes} хв {") "}
      </span>
      {/* <span className={css.symbolsTimer}>{timeLeft.seconds} сек</span> */}
    </div>
  );
}
