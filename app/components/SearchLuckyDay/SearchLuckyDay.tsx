"use client";

import { useMoonStore } from "@/store/calendarStore";
import { useState } from "react";
import {
  allowedAspects,
  aspectLabels,
  aspectMap,
  type LuckyKeys,
} from "@/lib/aspect";

import css from "./SearchLuckyDay.module.css";
import { RatingGroup } from "@/lib/ratingGroups";

const SearchLuckyDay = () => {
  const { search5Days, searchResults, isSearching, resetSearch, activeValue } =
    useMoonStore();

  const [selectedKey, setSelectedKey] = useState<LuckyKeys | "">("");
  const [selectedRating, setSelectedRating] = useState<RatingGroup>("positive");

  const handleSearch = (key: LuckyKeys) => {
    setSelectedKey(key);
    search5Days(key, selectedRating);
  };

  const handleReset = () => {
    setSelectedKey("");
    resetSearch();
  };

  return (
    <div className={css.container}>
      <h4>Пошук сприятливих днів</h4>

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

      {/* Кнопки ступенів сприятливості — завжди видимі */}
      <div className={css.ratingButtons}>
        <button
          className={selectedRating === "positive" ? css.buttonActive : ""}
          onClick={() => setSelectedRating("positive")}
        >
          Сприятливо
        </button>

        <button
          className={selectedRating === "veryPositive" ? css.buttonActive : ""}
          onClick={() => setSelectedRating("veryPositive")}
        >
          Дуже сприятливо
        </button>
      </div>

      {/* Сброс */}
      {searchResults.length > 0 && !isSearching && (
        <button className={css.resetBtn} onClick={handleReset}>
          Сброс
        </button>
      )}
      {/* Результати */}
      <h4>{(selectedKey && aspectLabels[selectedKey]) || "Не вибрано"}</h4>

      {isSearching && (
        <div>
          <p>Зачекай хвилинку,сервер працює з затримкою...</p>
          <br />
          <img src="./image/sleepServer.png" alt="sleep server" />
        </div>
      )}
      {!isSearching && selectedKey && searchResults.length === 0 && (
        <div className={css.notFound}>Нічого не знайдено</div>
      )}

      <ul>
        {searchResults.map((item) => (
          <li key={item.details._id} className={css.listItem}>
            <strong>{item.moonDay}-й місячний день</strong>
            <br />
            {new Date(item.date).toLocaleDateString("uk-UA", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
            <br />
            {selectedKey && (
              <>
                {aspectMap[selectedKey]?.getDescription(item) || "Немає даних"}
                <br />
              </>
            )}
            {activeValue && (
              <h4>
                Знайдено за значенням: <strong>{activeValue}</strong>
              </h4>
            )}
            {/* {selectedKey && aspectMap[selectedKey]?.get(item)} */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchLuckyDay;

// "use client";

// import { useMoonStore } from "@/store/calendarStore";
// import { useState } from "react";

// const allowedAspects = [
//   "haircut",
//   "health",
//   "business",
//   "travel",
//   "money",
// ] as const;

// type LuckyKeys = (typeof allowedAspects)[number];

// const aspectLabels: Record<LuckyKeys, string> = {
//   haircut: "Стрижка",
//   health: "Здоров’я",
//   business: "Бізнес",
//   travel: "Подорожі",
//   money: "Фінанси",
// };

// const buttonStyle = (active: boolean): React.CSSProperties => ({
//   padding: "10px 16px",
//   margin: "6px",
//   borderRadius: "8px",
//   border: "1px solid #ccc",
//   cursor: "pointer",
//   background: active ? "#4b7bec" : "#f1f2f6",
//   color: active ? "white" : "#2f3542",
//   fontWeight: active ? "bold" : "normal",
//   transition: "0.2s",
// });

// const SearchLuckyDay = () => {
//   const { search5Days, searchResults, isSearching, resetSearch } =
//     useMoonStore();

//   const [selectedKey, setSelectedKey] = useState("");
//   const [selectedValue, setSelectedValue] = useState("");
//   const handleSearch = (key: string, value: string) => {
//     setSelectedKey(key);
//     setSelectedValue(value);
//     search5Days(value, key);
//     console.log("ключ:", key, "значення:", value);
//   };

//   const handleReset = () => {
//     setSelectedKey("");
//     resetSearch();
//   };
//   return (
//     <div>
//       <h4>Пошук сприятливих днів</h4>

//       <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
//         {allowedAspects.map((key) => (
//           <button
//             key={key}
//             style={buttonStyle(selectedKey === key)}
//             onClick={() => handleSearch(key, "Сприятливо")}
//           >
//             {aspectLabels[key]}
//           </button>
//         ))}
//       </div>

//       {searchResults.length > 0 && !isSearching && (
//         <button onClick={handleReset}>Сброс</button>
//       )}

//       {/* <label>
//         <input
//           type="radio"
//           checked={selectedKey === "haircut"}
//           onChange={() => handleSearch("haircut", "Сприятливо")}
//         />
//         Стрижка
//       </label>
//       <label>
//         <input
//           type="radio"
//           checked={selectedKey === "health"}
//           onChange={() => handleSearch("health", "Сприятливо")}
//         />
//         Здоровʼє
//       </label>
//       <label>
//         <input
//           type="radio"
//           checked={selectedKey === "business"}
//           onChange={() => handleSearch("business", "Сприятливо")}
//         />
//         Бізнес
//       </label>
//       <label>
//         <input
//           type="radio"
//           checked={selectedKey === "travel"}
//           onChange={() => handleSearch("travel", "Сприятливо")}
//         />
//         Подорожі, ділові поїздки
//       </label> */}
//       {/* <pre>searchResults: {JSON.stringify(searchResults, null, 2)}</pre> */}
//       <h4>{selectedKey}:</h4>
//       {isSearching && <div>Завантаження...</div>}
//       <ul>
//         {" "}
//         {searchResults.map((item) => (
//           <li key={item.details._id}>
//             {" "}
//             <strong>Місячний день:</strong> {item.moonDay} <br />{" "}
//             <strong>Дата:</strong> {item.date} <br />{" "}
//           </li>
//         ))}{" "}
//       </ul>
//     </div>
//   );
// };

// export default SearchLuckyDay;

// ПОШУК З ПОЛЕМ ВВОДУ

// import { useMoonStore } from "@/store/useMoonStore";
// import { useEffect, useState } from "react";

// export default function SearchDays() {
//   const [query, setQuery] = useState("");

//   const { searchDays, searchResults, isSearching } = useMoonStore();

//   useEffect(() => {
//     const delay = setTimeout(() => {
//       searchDays(query);
//     }, 300);

//     return () => clearTimeout(delay);
//   }, [query]);

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Пошук по днях..."
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//       />

//       {isSearching && <p>Пошук...</p>}

//       {searchResults.length > 0 && (
//         <ul>
//           {searchResults.map(day => (
//             <li key={day._id}>
//               {day.dayNumber}. {day.phaseDescription}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }
