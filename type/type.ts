export interface MoonDayData {
  date: string; // ISO‑дата
  moonDay: number; // номер місячного дня
  currentDayStart: string; // Дата та час початку місячного дня
  durationHours: number; // Кількість годин місячного дня
  fullMoon: string; // останній повний місяць
  newMoon: string; // останній новий місяць
  nextDayStart: string; // Дата та час початку наступного місячного дня
  passedHours: number; // пройшло годин поточного дня
  progressDay: number; // відсоток дня на поточний момент
  phase: number; // числове значення фази (0–1)
  phaseName: string; // назва фази ("спадний серп")
  details: MoonDay;
}

export interface MoonDay {
  _id: string;
  dayNumber: number;
  phase: {
    phaseId: moonPhase;
    text: string;
  };
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
  haircutId: HaircutDay;
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
  currentDayStart: string;
  durationHours: number;
  fullMoon: string;
  newMoon: string;
  nextDayStart: string;
  passedHours: number;
  progressDay: number;
  phase?: number;
  phaseName?: string;
}
export function normalizeDay(
  raw: MoonDayData | MoonDay | any,
  fallbackDate?: string,
): NormalizedDay | null {
  if (!raw) return null;

  // console.log("NORMALIZE", raw);

  // Формат MoonDayData (твій основний випадок)
  if (raw.details && typeof raw.moonDay === "number") {
    return {
      details: raw.details,
      date: raw.date ?? fallbackDate ?? "",
      moonDay: raw.moonDay,
      currentDayStart: raw.currentDayStart,
      durationHours: raw.currentDayStart,
      fullMoon: raw.fullMoon,
      newMoon: raw.newMoon,
      nextDayStart: raw.nextDayStart,
      passedHours: raw.passedHours,
      progressDay: raw.progressDay,
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
      currentDayStart: raw.currentDayStart,
      durationHours: raw.currentDayStart,
      fullMoon: raw.fullMoon,
      newMoon: raw.newMoon,
      nextDayStart: raw.nextDayStart,
      passedHours: raw.passedHours,
      progressDay: raw.progressDay,
    };
  }

  // Формат { day: MoonDay }
  if (raw.day?.dayNumber) {
    return {
      details: raw.day,
      date: fallbackDate ?? "",
      moonDay: raw.day.dayNumber,
      currentDayStart: raw.currentDayStart,
      durationHours: raw.currentDayStart,
      fullMoon: raw.fullMoon,
      newMoon: raw.newMoon,
      nextDayStart: raw.nextDayStart,
      passedHours: raw.passedHours,
      progressDay: raw.progressDay,
    };
  }

  console.warn("Unknown day format:", raw);
  return null;
}

export interface moonPhase {
  _id: string;
  days: string;
  energy: string;
  description: string;
  wellness_practices: string[];
  nutrition: Nutrition;
  phase: string;
  phaseNumber: number;
}

export interface Nutrition {
  general: string[];
  seed_support: string[];
  preferred: string[];
  energyPurpose: string[];
  avoid_excess: string[];
}

export interface moonPhaseData {
  date: string;
  moonDay: number;
  rawPhase: number;
  phaseNumber: number;
  _id: string;
  days: string;
  energy: string;
  description: string;
  wellness_practices: string[];
  nutrition: Nutrition;
  phase: string;
}

// --- HAIRCUT ---

export interface HaircutDay {
  _id: string;
  dayNumber: number;
  energy: string;
  health: string[];
  wealth: string[];
  why: string;
  recommend: string[];
  avoid: string[];
}

export interface HaircutData {
  date: string;
  _id: string;
  dayNumber: number;
  energy: string;
  health: string[];
  wealth: string[];
  why: string;
  recommend: string[];
  avoid: string[];
}
