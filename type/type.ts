

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
