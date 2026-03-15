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
  raw: MoonDayData | MoonDay | any,
  fallbackDate?: string,
): NormalizedDay | null {
  if (!raw) return null;

  console.log("NORMALIZE", raw);

  // Формат MoonDayData (твій основний випадок)
  if (raw.details && typeof raw.moonDay === "number") {
    return {
      details: raw.details,
      date: raw.date ?? fallbackDate ?? "",
      moonDay: raw.moonDay,
      phase: raw.phase,
      phaseName: raw.phaseName,
    };
  }

  // Формат MoonDay
  if (raw.dayNumber) {
    return {
      details: raw,
      date: fallbackDate ?? "",
      moonDay: raw.dayNumber,
    };
  }

  // Формат { day: MoonDay }
  if (raw.day?.dayNumber) {
    return {
      details: raw.day,
      date: fallbackDate ?? "",
      moonDay: raw.day.dayNumber,
    };
  }

  console.warn("Unknown day format:", raw);
  return null;
}
