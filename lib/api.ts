import axios from "axios";
import type { MoonDay, MoonDayData } from "@/type/type";
import { HttpError } from "./HttpError";

export interface MoonDayListResp {
  moonDay: MoonDay[];
  total: number;
}

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

//  глобальний wrapper для fetch перехоплення 429
export async function fetchWithErrors(url: string, options?: RequestInit) {
  const res = await fetch(url, options);

  if (!res.ok) {
    const error: HttpError = new Error(res.statusText);
    error.status = res.status; // ← додаємо статус
    throw error; // ← кидаємо помилку наверх
  }

  return res.json();
}

export const getListDays = async () => {
  const resAll = await axios.get<MoonDayListResp>("/days");
  return resAll.data;
};

export const getSingleMoonday = async (id: string) => {
  const resSingle = await axios.get<MoonDay>(`/days/${id}`);
  return resSingle.data;
};

export const getTodayMoonday = async () => {
  const resToday = await axios.get<MoonDayData>(`/today`);
  return resToday.data;
};

interface LuckyDayResponse {
  result: MoonDayData[];
}

// export const searchMoonDays = async (
//   key: string,
//   value: string,
// ): Promise<MoonDayData[]> => {
//   console.log("🟣 API call:", { key, value });
//   const resSearchDays = await axios.get<LuckyDayResponse>("/lucky-day/", {
//     params: { key, value },
//   });

//   console.log("🟣 API response:", resSearchDays.data);

//   return resSearchDays.data.result;
// };

interface MoondayData {
  response: MoonDayData;
}

export const searchMoondayData = async (
  date: string,
): Promise<MoonDayData | null> => {
  try {
    const res = await axios.get("/moon-day", {
      params: { date },
    });

    console.log("RAW AXIOS RESPONSE:", res);
    console.log("RAW DATA:", res.data);

    if (!res.data) {
      console.warn("❌ API returned empty body");
      return null;
    }

    // Підтримка різних форматів
    if (res.data.response) return res.data.response;
    if (res.data.result) return res.data.result;
    if (res.data.day) return res.data.day;
    if (res.data.moonDay) return res.data;

    console.warn("❌ Unknown API format:", res.data);
    return null;
  } catch (err: any) {
    console.error("❌ searchMoondayData ERROR:", err);
    return null;
  }
};

// export const searchMoondayData = async (date: string): Promise<MoonDayData> => {
//   const res = await axios.get<MoondayData>("/moon-day", {
//     params: { date },
//   });
//   return res.data.response;
// };

export const searchMoonDays = async (
  key: string,
  value: string,
): Promise<MoonDayData[]> => {
  try {
    const res = await axios.get<LuckyDayResponse>("/lucky-day/", {
      params: { key, value },
    });

    return res.data.result;
  } catch (err: any) {
    const error: HttpError = new Error(
      err.response?.statusText || "Request failed",
    );
    error.status = err.response?.status ?? 500;
    throw error; // ❗️ ГОЛОВНЕ
  }
};
