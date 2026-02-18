// ratingGroups.ts
export const ratingGroups = {
  veryPositive: [
    "Дуже сприятливо",   
    "Дуже сильні"
  ],
  positive: [
    "Сприятливо",    
    "Сильні"
  ],
  neutral: ["Нейтрально"],
  negative: ["Несприятливо", "Дуже несприятливо"]
} as const;

export type RatingGroup = keyof typeof ratingGroups;