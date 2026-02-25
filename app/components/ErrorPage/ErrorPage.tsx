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
  const { retryCount, maxRetries, incrementRetry } = useMoonStore();
  const { retryAfter, start } = useRetryTimer();

  // 🔥 Запускаємо таймер один раз, коли ErrorPage з’явився
  useEffect(() => {
    if (status === 429 && retryCount < maxRetries) {
      start(20);
    }
  }, [status, retryCount, maxRetries, start]);

  // 🔥 Автоматичний повтор після завершення таймера
  useEffect(() => {
    if (status === 429 && retryAfter === 0 && retryCount < maxRetries) {
      incrementRetry();
      onRetry();
    }
  }, [retryAfter, status, retryCount, maxRetries, incrementRetry, onRetry]);

  const showManualRetry = retryCount >= maxRetries;

  return (
    <div style={{ padding: 20 }}>
      <h2>Помилка під час завантаження</h2>
      <p>{message}</p>

      {/* 🔥 Показуємо таймер тільки якщо ще є спроби */}
      {!showManualRetry && retryAfter > 0 && (
        <p>Повторна спроба можлива через {retryAfter} сек.</p>
      )}

      {/* 🔥 Показуємо повідомлення про завершення тільки коли таймер НЕ працює */}
      {showManualRetry && (
        <p>Автоматичні спроби завершено. Спробуйте вручну.</p>
      )}

      <button onClick={onRetry}>Спробувати знову</button>
    </div>
  );
}

// "use client";

// import { useEffect } from "react";
// import { useRetryTimer } from "@/lib/retryTimer";
// import { useMoonStore } from "@/store/calendarStore";

// interface ErrorPageProps {
//   status: number;
//   message: string;
//   onRetry: () => void;
// }

// export default function ErrorPage({
//   status,
//   message,
//   onRetry,
// }: ErrorPageProps) {
//   const { retryAfter, start } = useRetryTimer();
//   const { retryCount, maxRetries, incrementRetry } = useMoonStore();

//   // Запускаємо таймер тільки один раз
//   useEffect(() => {
//     if (status === 429) {
//       start(20);
//     }
//   }, [status, start]);

//   // Автоматичний повтор після завершення таймера
//   useEffect(() => {
//     if (status === 429 && retryAfter === 0) {
//       if (retryCount < maxRetries) {
//         incrementRetry();
//         onRetry();
//       }
//     }
//   }, [retryAfter, status, retryCount, maxRetries, incrementRetry, onRetry]);

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Помилка під час завантаження</h2>
//       <p>{message}</p>

//       {retryAfter > 0 && <p>Повторна спроба можлива через {retryAfter} сек.</p>}

//       {retryCount >= maxRetries && (
//         <p>Автоматичні спроби завершено. Спробуйте вручну.</p>
//       )}

//       <button onClick={onRetry}>Спробувати знову</button>
//     </div>
//   );
// }
