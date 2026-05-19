import axios from "axios";
import type {
  HaircutData,
  HaircutDay,
  MoonDay,
  MoonDayData,
  moonPhase,
  moonPhaseData,
} from "@/type/type";
import { HttpError } from "../HttpError";
import { nextServer } from "./client";

export interface MoonDayListResp {
  moonDay: MoonDay[];
  total: number;
}

// axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
// const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const getMoondayList = async () => {
  const resAll = await nextServer.get<MoonDayListResp>("/moonDays");
  return resAll.data;
};
export const getMoondaySingle = async (id: string) => {
  const resSingle = await nextServer.get<MoonDay>(`/moonDays/${id}`);
  return resSingle.data;
};

export const getMoonToday = async () => {
  const resToday = await nextServer.get<MoonDayData>(`/moon-today`);
  return resToday.data;
};

export const getMoonByDate = async (
  date: string,
): Promise<MoonDayData | null> => {
  try {
    const res = await nextServer.get("/moon-date", {
      params: { date },
    });

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

interface MoonDayQueryParams {
  key: string; //  key: 'date' | 'phase' | 'id'; // TypeScript видасть помилку, якщо прийде інше слово
  value: string;
}

export const getLuckyMoonDays = async (
  key: string,
  value: string,
): Promise<MoonDayData[]> => {
  const queryParams: MoonDayQueryParams = { key, value };
  try {
    const res = await nextServer.get<LuckyDayResponse>("/your-moon", {
      // params: { queryParams },
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

// --- PHASES RECOMINDATION---

export const getListPhases = async (): Promise<moonPhase[]> => {
  const resAll = await axios.get<moonPhase[]>("/phases");
  return resAll.data;
};

export const getPhasesByDaynumber = async (
  moonDay: number,
): Promise<moonPhaseData> => {
  const resDay = await axios.get<moonPhaseData>("/phasebyday", {
    params: { moonDay },
  });
  return resDay.data;
};

export const getTodayPhases = async (): Promise<moonPhaseData> => {
  const resToday = await axios.get<moonPhaseData>(`/phasetoday`);
  return resToday.data;
};

// --- HAIRCUT ---

export const getListHaircutDays = async (): Promise<HaircutDay[]> => {
  const resAll = await axios.get<HaircutDay[]>("/haircutdays");
  console.log(resAll.data);
  return resAll.data;
};

export const getSingleHaircutDay = async (id: string) => {
  // const resSingle = await axios.get<HaircutDay>(`/haircutday/${id}`);
  // return resSingle.data;
};

export const getHaircutDayByDaynumber = async (
  moonDay: number,
): Promise<HaircutData> => {
  const resDay = await axios.get<HaircutData>("/haircutbyday", {
    params: { moonDay },
  });
  return resDay.data;
};

export const getTodayHaircutDay = async (): Promise<HaircutData> => {
  const resToday = await axios.get<HaircutData>(`/todayhaircut`);
  return resToday.data;
};
