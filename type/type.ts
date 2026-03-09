export interface MoonDayData {
  date: string; // ISO‑дата
  moonDay: number; // номер місячного дня
  phase: number; // числове значення фази (0–1)
  phaseName: string; // назва фази ("спадний серп")
  details: MoonDay;
}

export interface MoonDay {
  _id: string;
  dayNumber: number;
  phase: string;
  phaseDescription: string;
  qualities: string[];
  generalMeaning: string;
  warnings: string[];
  dreams: Dreams;
  lifeAspects: { [key: string]: General };
  birthOnThisDay: BirthOnThisDay;
  health: Health;
  haircut: Haircut;
  symbols: string[];
  stones: string[];
  meditations: string[];
  signs: Signs;
  extendedMeaning: string;
}

export interface BirthOnThisDay {
  title: string;
  description: string;
}

export interface Dreams {
  title: string;
  meaning: string;
  rating: Rating;
}

export interface Rating {
  value: number;
  scale: number;
  meaning: string;
}

export interface Haircut {
  lunarCalendar: string;
  tibetanCalendar: string;
  rating: Rating;
}

export interface Health {
  general: General;
  vulnerableBodyPart: General;
  medications: General;
}

export interface General {
  text: string;
  rating: Rating;
}

export interface Signs {
  bad: string[];
  good: string[];
}

// Створюємо адаптер для шаблона

export interface NormalizedDay {
  details: MoonDay;
  date: string;
  moonDay: number;
  phase?: number;
  phaseName?: string;
}

export function normalizeDay(
  raw: any,
  fallbackDate?: string,
): NormalizedDay | null {
  if (!raw) return null;

  const actualMoonDay =
    raw.moonDay ||
    raw.details?.dayNumber ||
    raw.dayNumber ||
    raw.day?.dayNumber ||
    1;

  // MoonDayData
  if ("details" in raw && raw.details?.dayNumber) {
    return {
      details: raw.details,
      date: raw.date,
      moonDay: raw.moonDay,
      phase: raw.phase,
      phaseName: raw.phaseName,
    };
  }

  // MoonDay
  if (raw?.dayNumber) {
    return {
      details: raw,
      date: fallbackDate ?? "",
      moonDay: actualMoonDay,
    };
  }

  // dayById: { day: MoonDay }
  if (raw?.day?.dayNumber) {
    return {
      details: raw.day,
      date: fallbackDate ?? "",
      moonDay: actualMoonDay,
    };
  }

  // // MoonDayData (today)
  // if ("details" in raw && typeof raw.details === "object") {
  //   const data = raw as MoonDayData;
  //   return {
  //     details: data.details,
  //     date: data.date,
  //     moonDay: data.moonDay,
  //     phase: data.phase,
  //     phaseName: data.phaseName,
  //   };
  // }

  // // MoonDay (byId)
  // if ("lifeAspects" in raw && "generalMeaning" in raw) {
  //   return {
  //     details: raw as MoonDay,
  //     date: fallbackDate ?? "",
  //   };
  // }

  // Випадок 3: інші формати (наприклад, dayById: { day: MoonDay })
  //   if (raw.day?.details) {
  //     return { details: raw.day.details };
  //   }

  console.warn("Unknown day format:", raw);
  return null;
}
