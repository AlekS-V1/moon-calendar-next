import axios from "axios";
import type { MoonDay, MoonDayData } from "@/type/type";

export interface MoonDayListResp {
    moonDay: MoonDay[];
    total: number;
}

axios.defaults.baseURL = "https://mooncalendar-6y3u.onrender.com";

export const getListDays = async () => {
    const resAll = await axios.get<MoonDayListResp>('/days');
    return resAll.data;
};

export const getSingleMoonday = async (id: string) => {
    const resSingle = await axios.get<MoonDay>(`/days/${id}`);
    return resSingle.data;
}

export const getTodayMoonday = async () => {
    const resToday = await axios.get<MoonDayData>(`/today`);
    return resToday.data;
}

interface LuckyDayResponse {
  result: MoonDayData[];
}

export const searchMoonDays = async (key: string, value: string): Promise<MoonDayData[]> => {
    console.log("🟣 API call:", { key, value });
    const resSearchDays = await axios.get<LuckyDayResponse>('/lucky-day/', {
        params: { key, value}
    });

    console.log("🟣 API response:", resSearchDays.data);

    return resSearchDays.data.result;
}