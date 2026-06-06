import { useState, useEffect } from "react";

export function useWindowSize() {
  // Ініціалізуємо стан undefined, щоб уникнути помилок гідрації на сервері в Next.js
  const [windowSize, setWindowSize] = useState<{
    width: number | undefined;
    height: number | undefined;
  }>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Функція, яка спрацьовує при зміні розміру екрана
    function handleResize() {
      setWindowSize({
        width: windowSize.width,
        height: windowSize.height,
      });
    }

    // Вішаємо слухач подій на браузер
    window.addEventListener("resize", handleResize);

    // Викликаємо відразу, щоб отримати початковий розмір
    handleResize();

    // Обов'язково прибираємо слухач при демонтажі компонента, щоб не було витоку пам'яті
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}
