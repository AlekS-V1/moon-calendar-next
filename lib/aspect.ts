// aspects.ts
import type { MoonDayData } from "@/type/type";

// --------------------------------------------------
// 1. Дозволені ключі (UI-категорії)
// --------------------------------------------------

export const allowedAspects = [
  "haircut",
  "health",
  "medications",
  "business",
  "travel",
  "money",
  "newActivities",
  "decisionMaking",
  "realEstate",
  "trade",
  "legalMatters",
  "science",
  "art",
  "creativity",
  "learningExams",
  "communication",
  "bossCommunication",
  "jobChange",
  "movement",
  "rest",
  "physicalActivity",
  "housework",
  "marriage",
  "intimacy",
  "conception",
] as const;

export type LuckyKeys = (typeof allowedAspects)[number];

// --------------------------------------------------
// 2. Лейбли для кнопок
// --------------------------------------------------

export const aspectLabels: Record<LuckyKeys, string> = {
  haircut: "Стрижка",
  health: "Здоров’я",
  business: "Бізнес",
  travel: "Подорожі",
  money: "Фінанси",
  newActivities: "Нові справи",
  decisionMaking: "Приняття рішень",
  realEstate: "Нерухомість",
  trade: "Торгівля",
  legalMatters: "Судові справи",
  science: "Наука",
  art: "Мистецтво",
  creativity: "Творчість",
  learningExams: "Навчання, іспити",
  communication: "Комунікація",
  bossCommunication: "Спілкування з начальством",
  jobChange: "Зміна місця роботи",
  movement: "Пасивна активність",
  rest: "Відпочинок",
  physicalActivity: "Фізична активність",
  housework: "Домашнє завдання",
  marriage: "Шлюб",
  intimacy: "Сімейна близькість",
  conception: "Зачаття",
  medications: "Медикаменти"
};

// --------------------------------------------------
// 3. aspectMap — універсальний доступ до значень
// --------------------------------------------------

export const aspectMap: Record<
  LuckyKeys,
  {
    label: string;
    get: (item: MoonDayData) => string | undefined;
    getDescription: (item: MoonDayData) => string | undefined;
  }
> = {
      haircut: {
        label: aspectLabels.haircut,
        get: (item) => item.details.haircut?.rating?.meaning,
        getDescription: (item) => item.details.haircut?.lunarCalendar,
      },

      health: {
      label: aspectLabels.health,
      get: (item) =>
        item.details.health?.general?.rating?.meaning,
        getDescription: (item) => item.details.health.general.text,
      },

      medications: {
        label: aspectLabels.medications,
        get: (item) =>
          item.details.health?.medications?.rating?.meaning,
        getDescription: (item) => item.details.health.medications.text,
      },

      business: {
        label: aspectLabels.business,
        get: (item) =>
          item.details.lifeAspects?.business?.rating?.meaning,
        getDescription: (item) => item.details.lifeAspects?.business.text,
      },

      travel: {
        label: aspectLabels.travel,
        get: (item) =>
          item.details.lifeAspects?.travel?.rating?.meaning,
        getDescription: (item) => item.details.lifeAspects.travel.text,
      },

      money: {
        label: aspectLabels.money,
        get: (item) =>
          item.details.lifeAspects?.money?.rating?.meaning,
        getDescription: (item) => item.details.lifeAspects.money.text,
      },

      newActivities: {
      label: aspectLabels.newActivities,
      get: (item) =>
        item.details.lifeAspects?.newActivities?.rating?.meaning,
        getDescription: (item) => item.details.lifeAspects.newActivities.text,
      },

      decisionMaking: {
        label: aspectLabels.decisionMaking,
        get: (item) =>
          item.details.lifeAspects?.decisionMaking?.rating?.meaning,
          getDescription: (item) => item.details.lifeAspects.decisionMaking.text,
      },

      realEstate: {
        label: aspectLabels.realEstate,
        get: (item) =>
          item.details.lifeAspects?.realEstate?.rating?.meaning,
          getDescription: (item) => item.details.lifeAspects.realEstate.text,
      },

      trade: {
        label: aspectLabels.trade,
        get: (item) =>
          item.details.lifeAspects?.trade?.rating?.meaning,
          getDescription: (item) => item.details.lifeAspects.trade.text,
      },

      legalMatters: {
        label: aspectLabels.legalMatters,
        get: (item) =>
          item.details.lifeAspects?.legalMatters?.rating?.meaning,
          getDescription: (item) => item.details.lifeAspects.legalMatters.text,
      },

      science: {
        label: aspectLabels.science,
        get: (item) =>
          item.details.lifeAspects?.science?.rating?.meaning,
          getDescription: (item) => item.details.lifeAspects.science.text,
      },

      art: {
        label: aspectLabels.art,
        get: (item) =>
          item.details.lifeAspects?.art?.rating?.meaning,
          getDescription: (item) => item.details.lifeAspects.art.text,
      },

      creativity: {
        label: aspectLabels.creativity,
        get: (item) =>
          item.details.lifeAspects?.creativity?.rating?.meaning,
          getDescription: (item) => item.details.lifeAspects.creativity.text,
      },

      learningExams: {
        label: aspectLabels.learningExams,
        get: (item) =>
          item.details.lifeAspects?.learningExams?.rating?.meaning,
          getDescription: (item) => item.details.lifeAspects.learningExams.text,
      },

      communication: {
        label: aspectLabels.communication,
        get: (item) =>
          item.details.lifeAspects?.communication?.rating?.meaning,
          getDescription: (item) => item.details.lifeAspects.communication.text,
      },
      
      bossCommunication: {
        label: aspectLabels.bossCommunication,
        get: (item) =>
          item.details.lifeAspects?.bossCommunication?.rating?.meaning,
          getDescription: (item) => item.details.lifeAspects.bossCommunication.text,
      },

      jobChange: {
        label: aspectLabels.jobChange,
        get: (item) =>
          item.details.lifeAspects?.jobChange?.rating?.meaning,
          getDescription: (item) => item.details.lifeAspects.jobChange.text,
      },

      movement: {
        label: aspectLabels.movement,
        get: (item) =>
          item.details.lifeAspects?.movement?.rating?.meaning,
          getDescription: (item) => item.details.lifeAspects.movement.text,
      },

      rest: {
        label: aspectLabels.rest,
        get: (item) =>
          item.details.lifeAspects?.rest?.rating?.meaning,
          getDescription: (item) => item.details.lifeAspects.rest.text,
      },

      physicalActivity: {
        label: aspectLabels.physicalActivity,
        get: (item) =>
          item.details.lifeAspects?.physicalActivity?.rating?.meaning,
          getDescription: (item) => item.details.lifeAspects.physicalActivity.text,
      },

      housework: {
        label: aspectLabels.housework,
        get: (item) =>
          item.details.lifeAspects?.housework?.rating?.meaning,
          getDescription: (item) => item.details.lifeAspects.housework.text,
      },

      marriage: {
        label: aspectLabels.marriage,
        get: (item) =>
          item.details.lifeAspects?.marriage?.rating?.meaning,
          getDescription: (item) => item.details.lifeAspects.marriage.text,
      },

      intimacy: {
        label: aspectLabels.intimacy,
        get: (item) =>
          item.details.lifeAspects?.intimacy?.rating?.meaning,
          getDescription: (item) => item.details.lifeAspects.intimacy.text,
      },

      conception: {
        label: aspectLabels.conception,
        get: (item) =>
          item.details.lifeAspects?.conception?.rating?.meaning,
          getDescription: (item) => item.details.lifeAspects.conception.text,
      },

    };