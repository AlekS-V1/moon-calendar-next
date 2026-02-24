import { useCallback, useEffect, useRef, useState } from "react";

export function useRetryTimer() {
  const [retryAfter, setRetryAfter] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const start = useCallback((seconds: number) => {
    // очищаємо попередній таймер
    if (timerRef.current) clearInterval(timerRef.current);

    setRetryAfter(seconds);

    timerRef.current = setInterval(() => {
      setRetryAfter((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          timerRef.current = null;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  const stop = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setRetryAfter(0);
  }, []);

  // очищення при розмонтуванні компонента
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return {
    retryAfter,
    isActive: retryAfter > 0,
    start,
    stop,
  };
}
