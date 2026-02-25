"use client";

import type { HttpError } from "@/lib/HttpError";
import { useRetryTimer } from "@/lib/retryTimer";
import { useEffect } from "react";

interface Props {
  error: HttpError;
  reset: () => void;
}

const Error = ({ error, reset }: Props) => {
  const { retryAfter, start } = useRetryTimer();

  const messages: Record<number, string> = {
    404: "Сторінку не знайдено.",
    500: "Внутрішня помилка сервера.",
    429: "Забагато запитів. Спробуйте пізніше.",
  };

  const message =
    (error.status && messages[error.status]) || "Сталася невідома помилка.";

  // if (error.status === 429 && retryAfter === 0) {
  //   start(20);
  // }

  // // 🔥 Автоматичний повтор після завершення таймера
  // useEffect(() => {
  //   if (retryAfter === 0 && error.status === 429) {
  //     reset(); // Next.js повторить рендер сторінки → повториться запит
  //   }
  // }, [retryAfter, error.status, reset]);

  return (
    <div>
      <h2>Помилка під час завнтаження</h2>
      <p>{error.message}</p>
      {retryAfter > 0 && <p>Повторна спроба можлива через {retryAfter} сек.</p>}
      <button onClick={reset}>Спробувати знову</button>
    </div>
  );
};

export default Error;
