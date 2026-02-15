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