"use client";

import { useEffect } from "react";
import { useRetryTimer } from "@/lib/retryTimer";
import { useMoonStore } from "@/store/calendarStore";

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
  const { retryCount, maxRetries, incrementRetry } = useMoonStore();

  // Запускаємо таймер тільки один раз
  useEffect(() => {
    if (status === 429) {
      start(20);
    }
  }, [status, start]);

  // Автоматичний повтор після завершення таймера
  useEffect(() => {
    if (status === 429 && retryAfter === 0) {
      if (retryCount < maxRetries) {
        incrementRetry();
        onRetry();
      }
    }
  }, [retryAfter, status, retryCount, maxRetries, incrementRetry, onRetry]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Помилка під час завантаження</h2>
      <p>{message}</p>

      {retryAfter > 0 && <p>Повторна спроба можлива через {retryAfter} сек.</p>}

      {retryCount >= maxRetries && (
        <p>Автоматичні спроби завершено. Спробуйте вручну.</p>
      )}

      <button onClick={onRetry}>Спробувати знову</button>
    </div>
  );
}
