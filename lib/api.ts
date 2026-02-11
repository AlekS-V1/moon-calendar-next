import axios from "axios";
import type { MoonDay } from "@/type/type";

export interface MoonDayListResp {
    days: MoonDay[];
    total: number;
}

axios.defaults.baseURL = "https://mooncalendar-6y3u.onrender.com/";

export const getListDays = async () => {
    const res = await axios.get<MoonDayListResp>('/days');
    return res.data;
}