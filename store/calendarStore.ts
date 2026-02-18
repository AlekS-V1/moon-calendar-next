import { getListDays, getTodayMoonday, searchMoonDays } from '@/lib/api';
import { LuckyKeys } from '@/lib/aspect';
import { RatingGroup, ratingGroups } from '@/lib/ratingGroups';
import type { MoonDay, MoonDayData } from '@/type/type';
import { create } from 'zustand';

interface StoreState {
    days: MoonDay[];
    total: number;
    today: MoonDayData | null;
    isLoaded: boolean;

    searchResults: MoonDayData[];
    isSearching: boolean;
    activeValue: string | null;

    fetchDays: () => Promise<void>;
    fetchToday: () => Promise<void>;
    getDayById: (id: string) => MoonDay | undefined;

    search5Days: (key: LuckyKeys, rating: RatingGroup) => Promise<void>;
    // (query: string, field: string) => Promise<void>;
    resetSearch: () => void;
}

export const useMoonStore = create<StoreState>((set, get) => ({
    days: [],
    total: 0,
    today: null,
    isLoaded: false,

    searchResults: [],
    isSearching: false,
    activeValue: null,

    fetchDays: async () => {
        if (get().isLoaded) return;

        const data = await getListDays();
        set({days: data.moonDay,
            total: data.total, 
            isLoaded: true});
    },

    fetchToday: async () => {
        if (get().today) return;
        const data = await getTodayMoonday();
        set({ today: data});
    },

    getDayById: (id) => {
        return get().days.find(d => d._id === id)
    },
    search5Days: async (key: LuckyKeys, rating: RatingGroup) => {
        const values = ratingGroups[rating];

        set({
            isSearching: true,
            searchResults: [],
            activeValue: null
        });

        let finalResults: MoonDayData[] = [];
        let matchedValue: string | null = null;

        for (const value of values) {
            const res = await searchMoonDays(key, value);

            if (res.length > 0) {
            finalResults = res;
            matchedValue = value;
            break;
            }
        }

        if (finalResults.length > 0) {
            finalResults.sort((a, b) => a.moonDay - b.moonDay);
        }

        set({
            searchResults: finalResults,
            activeValue: matchedValue,
            isSearching: false
        });
    },
    // search5Days: async (key: string) => {   
    //     const values = [
    //         "Сприятливо",
    //         "Дуже сприятливо",
    //         "Сильні",
    //         "Дуже сильні"
    //     ];

    //     set({ 
    //         isSearching: true, 
    //         searchResults: [], 
    //         activeValue: null 
    //     });

    //     let finalResults: MoonDayData[] = [];
    //     let matchedValue: string | null = null;

    //     for (const value of values) {
    //         const res = await searchMoonDays( value, key);

    //         if (res.length > 0) {
    //             finalResults = res;
    //             matchedValue = value;
    //             break;
    //         }
    //     }

    //     if (finalResults.length > 0) {
    //         finalResults.sort((a, b) => a.moonDay - b.moonDay);
    //     }

    //     set({
    //         searchResults: finalResults,
    //         activeValue: matchedValue,
    //         isSearching: false
    //     });
    // },

    resetSearch: () => {
        set({
            searchResults: [],
            isSearching: false,
            activeValue: null
        });
    }
}));

