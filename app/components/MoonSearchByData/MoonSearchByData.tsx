"use client";

import { useMoonStore } from "@/store/calendarStore";
import { redirect } from "next/navigation";
import { useState } from "react";

export const MoonSearchByData = () => {
  const [inputValue, setInputValue] = useState("");

  // ❗ ПРАВИЛЬНО: кожен селектор окремо
  const fetchDayByDate = useMoonStore((s) => s.fetchDayByDate);
  // const isLoaded = useMoonStore((s) => s.isLoaded);

  const handleSearch = () => {
    // console.log("CLICKED", inputValue);
    if (!inputValue) return;

    fetchDayByDate(inputValue);
    redirect("/searchbydata");
  };

  // console.log("store A:", useMoonStore.getState());

  return (
    <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
      <input
        type="date"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="border p-2 rounded"
      />

      <button onClick={handleSearch} disabled={!inputValue}>
        Пошук
      </button>
    </div>
  );
};

// export const MoonSearchByData = () => {
//   // Локальний стан лише для тексту в інпуті
//   const [inputValue, setInputValue] = useState("");

//   // Беремо екшен та стан завантаження зі стору
//   const { fetchDayByDate, isLoaded } = useMoonStore();

//   const handleSearch = () => {
//     console.log(inputValue);
//     if (!inputValue) return;

//     // Викликаємо запит (стор сам перевірить кеш)
//     fetchDayByDate(inputValue);
//   };

//   console.log("store A:", useMoonStore.getState());

//   return (
//     <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
//       <input
//         type="date" // Використовуємо стандартний календар браузера
//         value={inputValue}
//         onChange={(e) => setInputValue(e.target.value)}
//         className="border p-2 rounded"
//       />

//       <button onClick={handleSearch} disabled={!inputValue}>
//         Пошук
//       </button>
//     </div>
//   );
// };

// export const MoonSearch = () => {
//   const [inputValue, setInputValue] = useState("");
//   const [localError, setLocalError] = useState("");
//   const { fetchDayByDate, isLoading, error: serverError } = useMoonStore();

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     setLocalError("");

//     if (!inputValue) return;

//     const year = new Date(inputValue).getFullYear();

//     // Валідація згідно з вимогами вашого бекенду
//     if (year < 1900 || year > 2100) {
//       setLocalError("Будь ласка, оберіть дату між 1900 та 2100 роками.");
//       return;
//     }

//     fetchDayByDate(inputValue);
//   };

//   return (
//     <form onSubmit={handleSearch} className={css.searchForm}>
//       <div className={css.inputGroup}>
//         <input
//           type="date"
//           value={inputValue}
//           min="1900-01-01" // Обмеження в самому календарі
//           max="2100-12-31"
//           onChange={(e) => setInputValue(e.target.value)}
//           className={css.dateInput}
//         />
//         <button type="submit" disabled={isLoading}>
//           {isLoading ? "Пошук..." : "Дізнатися"}
//         </button>
//       </div>

//       {/* Вивід локальної помилки валідації або помилки з сервера */}
//       {(localError || serverError) && (
//         <p className={css.errorText}>{localError || serverError}</p>
//       )}
//     </form>
//   );
// };
