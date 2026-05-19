// ratingGroups.ts
export const ratingGroups = {
  veryPositive: ["Дуже сприятливо.", "Дуже рекомендується.", "Дуже сильні."],
  positive: ["Сприятливо.", "Сильні."],
  neutral: ["Нейтрально.", "Допустимо."],
  negative: [
    "Небезпечно.",
    "Катигорично не рекомендується.",
    "Несприятливо.",
    "Дуже несприятливо.",
    "Небажано.",
  ],
} as const;

export type RatingGroup = keyof typeof ratingGroups;
