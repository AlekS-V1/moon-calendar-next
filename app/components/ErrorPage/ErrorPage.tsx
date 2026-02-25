"use client";

import { useRetryTimer } from "@/lib/retryTimer";

interface ErrorPageProps {
  status: number;
  message: string;
  onRetry: () => void;
}

export default function ErrorPage({
  status,
  message,
  onRetry,
}: ErrorPageProps) {
  const { retryAfter, start } = useRetryTimer();

  if (status === 429 && retryAfter === 0) {
    start(20);
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Помилка під час завантаження</h2>
      <p>{message}</p>

      {retryAfter > 0 && <p>Повторна спроба можлива через {retryAfter} сек.</p>}

      <button onClick={onRetry}>Спробувати знову</button>
    </div>
  );
}
