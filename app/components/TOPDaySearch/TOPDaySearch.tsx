"use client";

import css from "./SearchLuckyDay.module.css";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLuckyDaysQuery } from "@/lib/hooks/useLuckyDay"; // Новий хук запитів
// import ErrorPage from "../ErrorPage/ErrorPage"; // Ваш компонент помилки
import { RatingGroup } from "@/lib/ratingGroups";
import {
  allowedAspects,
  aspectLabels,
  aspectMap,
  LuckyKeys,
} from "@/lib/aspect";
import { moonImages32 } from "@/lib/moonPhase30";
import { useMoonStore } from "@/store/uiStore"; // Оновлений чистий стор

const SearchLuckyDay = () => {
  const router = useRouter();

  // 1. З Zustand беремо ТІЛЬКИ вибраний ключ та функцію його встановлення
  const { selectedKey, setSelectedKey, resetSearch } = useMoonStore();
  const [selectedRating, setSelectedRating] = useState<RatingGroup>("positive");

  // 2. Викликаємо новий хук. Він дає нам усе необхідне для UI замість старого стору
  const { data, isFetching, error, refetch } = useLuckyDaysQuery(
    selectedKey,
    selectedRating,
  );

  // Витягуємо результати та активне значення з кешу TanStack Query
  const searchResults = data?.results || [];
  const activeValue = data?.matchedValue || null;

  // 3. Запуск пошуку по кліку на кнопку
  const handleSearch = (key: LuckyKeys) => {
    setSelectedKey(key); // Зміна ключа автоматично активує useLuckyDaysQuery

    // Плавний скрол до блоку результатів
    setTimeout(() => {
      const answer = document.getElementById("answerSearch");
      if (answer) {
        router.push("#answerSearch");
        answer.scrollIntoView({ behavior: "smooth", block: "end" });
      }
    }, 850);
  };

  // Очищення через оновлений метод
  const handleReset = () => {
    setSelectedKey("");
    resetSearch(); // refetch() або нічого — useQuery сам перезапуститься
  };

  // Сортування результатів у реальному часі на клієнті
  const sortedSearchResults = useMemo(() => {
    return [...searchResults].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );
  }, [searchResults]);

  // 4. Обробка помилок через ErrorPage (перезапуск через refetch)
  if (error) {
    return (
      <div>Error</div>
      // <ErrorPage
      //   status={error.status || 500}
      //   message={error.message || "Помилка завантаження даних"}
      //   onRetry={() => refetch()}
      // />
    );
  }

  return (
    <div className={css.container}>
      <h2 className={css.titleSection}>
        ТОП-5 днів: пошук найсприятливіших дат
      </h2>

      <div className={css.containerSearchDays}>
        <div className={css.containerFilter}>
          {/* Кнопки ступенів сприятливості */}
          <div className={css.ratingButtons}>
            <button
              className={`${css.buttonPositive} ${
                selectedRating === "positive"
                  ? css.buttonPositiveActive
                  : css.buttonPositiveDeactive
              }`}
              onClick={() => {
                setSelectedRating("positive");
                handleReset(); // Скидаємо старий пошук при зміні рейтингу
              }}
            >
              Сприятливо
            </button>

            <button
              className={`${css.buttonVeryPositive} ${
                selectedRating === "veryPositive"
                  ? css.buttonPositiveActive
                  : css.buttonPositiveDeactive
              }`}
              onClick={() => {
                setSelectedRating("veryPositive");
                handleReset();
              }}
            >
              Дуже сприятливо
            </button>
          </div>

          {/* Список кнопок аспектів */}
          <div className={css.buttons}>
            {allowedAspects.map((key) => (
              <button
                key={key}
                className={`${css.button} ${
                  selectedKey === key ? css.buttonActive : ""
                }`}
                onClick={() => handleSearch(key)}
              >
                {aspectLabels[key]}
              </button>
            ))}
          </div>
        </div>

        <div className={css.containerSerachResult}>
          <div className={css.headSearchResult}>
            {/* Кнопка скидання результатів */}
            {searchResults.length > 0 && !isFetching && (
              <button className={css.resetBtn} onClick={handleReset}>
                Сброс
              </button>
            )}
            <div className={css.containerHeaderSelectedAspect}>
              <h3 className={css.selectedAspect}>
                {(selectedKey && aspectLabels[selectedKey]) || "Не вибрано"}
              </h3>
            </div>
          </div>

          {/* Лоадер очікування відповіді від сервера */}
          {isFetching && (
            <div id="waitFatch">
              <p>Зачекай хвилинку, сервер працює з затримкою...</p>
              <br />
              <img src="./image/sleepServer.png" alt="sleep server" />
            </div>
          )}

          {/* Стан "Нічого не знайдено" */}
          {!isFetching && selectedKey && searchResults.length === 0 && (
            <div id="notFound" className={css.notFound}>
              Нічого не знайдено
            </div>
          )}

          {/* Список знайдених днів */}
          <ul>
            {sortedSearchResults.map((item) => (
              <li key={item.date} className={css.listItem}>
                <Link
                  className={css.linkFullMoonday}
                  href={`/days/${item.details._id}`}
                >
                  <div className={css.containerMoon}>
                    <img
                      className={css.imageMoonPhase}
                      src={moonImages32[item.moonDay]}
                      alt={`Moon phase day ${item.phaseName}`}
                    />
                    <h4 className={css.titleMoonday}>
                      {item.moonDay}-й місячний день
                    </h4>
                  </div>
                  <div className={css.containerDescription}>
                    <p className={css.textDate}>
                      {selectedKey ? aspectLabels[selectedKey] : "Не вибрано"} у{" "}
                      {(() => {
                        const s = new Date(item.date).toLocaleDateString(
                          "uk-UA",
                          {
                            weekday: "short",
                            day: "numeric",
                            month: "long",
                          },
                        );
                        return s[0].toUpperCase() + s.slice(1);
                      })()}
                    </p>
                    <p className={css.textDescription}>
                      {selectedKey && (
                        <>
                          {aspectMap[selectedKey]?.getDescription(item) ||
                            "Немає даних"}
                          <br />
                        </>
                      )}
                    </p>
                  </div>
                  {activeValue && (
                    <h4 className={css.activeValueSearch}>
                      Знайдено за значенням:{" "}
                      <strong className={css.descriptionRaiting}>
                        {activeValue}
                      </strong>
                    </h4>
                  )}
                </Link>
              </li>
            ))}
          </ul>
          <div id="answerSearch"></div>
        </div>
      </div>
    </div>
  );
};

export default SearchLuckyDay;
