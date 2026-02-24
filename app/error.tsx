"use client";

import type { HttpError } from "@/lib/HttpError";
import { useRetryTimer } from "@/lib/retryTimer";

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

  if (error.status === 429 && retryAfter === 0) {
    start(20);
  }
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
