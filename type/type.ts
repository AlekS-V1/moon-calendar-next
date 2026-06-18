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
  meditations: Meditation;
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

export interface Meditation {
  meditationId: RitualFullData;
  text: string;
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

export interface HaircutDate {
  date: string;
  _id: string;
  day: number;
  energy: string;
  health: string[];
  wealth: string[];
  why: string;
  recommend: string[];
  avoid: string[];
}

export interface HaircutFullData {
  date: string;
  moonDay: number;
  currentDayStart: string;
  nextDayStart: string;
  durationHours: number;
  passedHours: number;
  progressDay: number;
  _id: string;
  dayNumber: number;
  energy: string;
  health: string[];
  wealth: string[];
  why: string;
  recommend: string[];
  avoid: string[];
}
export interface RitualMeditation {
  _id: string;
  day: number;
  title: string;
  energy_effect: string[];
  health_effect: string[];
  material_effect: string[];
  logic: string[];
  ritual_steps: string[];
  recommended: string[];
  forbidden: string[];
}

export interface RitualFullData {
  date: string;
  day: number;
  currentDayStart: string;
  nextDayStart: string;
  durationHours: number;
  passedHours: number;
  progressDay: number;
  _id: string;
  title: string;
  energy_effect: string[];
  health_effect: string[];
  material_effect: string[];
  logic: string[];
  ritual_steps: string[];
  recommended: string[];
  forbidden: string[];
}
export type HaircutAnyDay = HaircutDay | HaircutDate | HaircutFullData;

// {
//   "date": "2026-06-10T21:01:43.212Z",
//   "dayRitual": 26,
//   "currentDayStart": "2026-06-10T20:03:03.319Z",
//   "nextDayStart": "2026-06-11T20:03:03.319Z",
//   "durationHours": 24,
//   "passedHours": 0.977748055555556,
//   "progressDay": 4.07,
//   "_id": "6a2717e2d6173cf035aed7bb",
//   "title": "Ритуал Внутрішнього Спостерігача та Очищення Намірів",
//   "energy_effect": "Двадцять шостий день — один із найбільш тонких і “непомітних”, але надзвичайно важливих. У слов’янській традиції його називали “днем спостерігача”, коли людина не діє, а бачить. У трипільській — це момент, коли поле “показує залишки”, тобто те, що не було інтегроване раніше. У тибетській — це аналог практики драк‑тонг, коли свідомість дивиться на власні наміри без прикрас, без самообману, без драматизації. Ефект — очищення намірів, відділення істинного від зайвого, повернення до внутрішньої простоти.",
//   "health_effect": [
//     "знижує ментальну напругу",
//     "допомагає відпустити зайві очікування",
//     "сприяє легкості в тілі через зменшення внутрішнього тиску"
//   ],
//   "material_effect": [
//     "допомагає побачити, які цілі справді твої, а які — нав’язані",
//     "очищує мотивацію від зайвих бажань",
//     "сприяє мудрим, стриманим рішенням"
//   ],
//   "logic": "У слов’янській традиції двадцять шостий день — це день внутрішнього спостерігача, коли дія мінімальна, а бачення — максимальне. У трипільській — поле показує залишки. У тибетській — чисте спостереження наміру.",
//   "ritual_steps": [
//     "Сядь у спокійній позі, вирівняй дихання.",
//     "Три повільні дихальні цикли.",
//     "Згадай свій головний намір цього місячного циклу.",
//     "Уяви його як світлу точку перед собою.",
//     "Дозволь проявитися всьому зайвому навколо цієї точки.",
//     "Побач це як легкий туман.",
//     "Промов: “Зайве відходить. Залишається істинне”.",
//     "На видиху розсіюй туман.",
//     "1–2 хвилини закріплюй ясність."
//   ],
//   "recommended": [
//     "ритуал у тиші",
//     "фокус на простоті",
//     "чесність без оцінки"
//   ],
//   "forbidden": [
//     "силове очищення наміру",
//     "самооцінка за страхи чи сумніви",
//     "ритуал у ментальному перевантаженні"
//   ]
// }
