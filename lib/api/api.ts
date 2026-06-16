import axios from "axios";
import type {
  HaircutDate,
  HaircutDay,
  HaircutFullData,
  MoonDay,
  MoonDayData,
  moonPhase,
  moonPhaseData,
  RitualFullData,
} from "@/type/type";
import { HttpError } from "../HttpError";
import { nextServer } from "./client";

export interface MoonDayListResp {
  moonDay: MoonDay[];
  total: number;
}

export const getMoondayList = async () => {
  const resAll = await nextServer.get<MoonDayListResp>("/moonDays");
  return resAll.data;
};
export const getMoondaySingle = async (id: string) => {
  const resSingle = await nextServer.get<MoonDay>(`/moonDays/${id}`);
  return resSingle.data;
};

export const getMoonToday = async () => {
  const resToday = await nextServer.get<MoonDayData>(`/moonDays/moon-today`);
  return resToday.data;
};

export const getMoonByDate = async (
  date: string,
): Promise<MoonDayData | null> => {
  try {
    const res = await nextServer.get("/moonDays/moon-date", {
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
    const res = await nextServer.get<LuckyDayResponse>("/moonDays/your-moon", {
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

// export const getListDays = async () => {
//   const resAll = await axios.get<MoonDayListResp>("/days");
//   return resAll.data;
// };

// export const getSingleMoonday = async (id: string) => {
//   const resSingle = await axios.get<MoonDay>(`/days/${id}`);
//   return resSingle.data;
// };

// export const getTodayMoonday = async () => {
//   const resToday = await axios.get<MoonDayData>(`/today`);
//   return resToday.data;
// };

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

// export const searchMoondayData = async (
//   date: string,
// ): Promise<MoonDayData | null> => {
//   try {
//     const res = await axios.get("/moon-day", {
//       params: { date },
//     });

//     console.log("RAW AXIOS RESPONSE:", res);
//     console.log("RAW DATA:", res.data);

//     if (!res.data) {
//       console.warn("❌ API returned empty body");
//       return null;
//     }

//     // Підтримка різних форматів
//     if (res.data.response) return res.data.response;
//     if (res.data.result) return res.data.result;
//     if (res.data.day) return res.data.day;
//     if (res.data.moonDay) return res.data;

//     console.warn("❌ Unknown API format:", res.data);
//     return null;
//   } catch (err: any) {
//     console.error("❌ searchMoondayData ERROR:", err);
//     return null;
//   }
// };

// export const searchMoondayData = async (date: string): Promise<MoonDayData> => {
//   const res = await axios.get<MoondayData>("/moon-day", {
//     params: { date },
//   });
//   return res.data.response;
// };

// export const searchMoonDays = async (
//   key: string,
//   value: string,
// ): Promise<MoonDayData[]> => {
//   try {
//     const res = await axios.get<LuckyDayResponse>("/lucky-day/", {
//       params: { key, value },
//     });

//     return res.data.result;
//   } catch (err: any) {
//     const error: HttpError = new Error(
//       err.response?.statusText || "Request failed",
//     );
//     error.status = err.response?.status ?? 500;
//     throw error; // ❗️ ГОЛОВНЕ
//   }
// };

// --- PHASES RECOMINDATION---

export const getListPhases = async (): Promise<moonPhase[]> => {
  const resAll = await nextServer.get<moonPhase[]>("/phases");
  return resAll.data;
};

export const getPhasesByDaynumber = async (
  moonDay: number,
): Promise<moonPhaseData> => {
  const resDay = await nextServer.get<moonPhaseData>("/phases/byday", {
    params: { moonDay },
  });
  return resDay.data;
};

export const getPhasesByPhaseNum = async (
  phaseNumber: number,
): Promise<moonPhaseData> => {
  const resDay = await nextServer.get<moonPhaseData>("/phases/byphase", {
    params: { phaseNumber },
  });
  return resDay.data;
};

export const getTodayPhases = async (): Promise<moonPhaseData> => {
  const resToday = await nextServer.get<moonPhaseData>(`/phases/today`);
  return resToday.data;
};

// --- HAIRCUT ---

export const getListHaircutDays = async (): Promise<HaircutDay[]> => {
  const resAll = await nextServer.get<HaircutDay[]>("/haircut/days");
  // console.log(resAll.data);
  return resAll.data;
};

export const getSingleHaircutDay = async (id: string) => {
  const resSingle = await nextServer.get<HaircutDay>(`/haircut/days/${id}`);
  return resSingle.data;
};

export const getHaircutDayByDaynumber = async (
  moonDay: number,
): Promise<HaircutDay> => {
  const resDay = await nextServer.get<HaircutDay>("/haircut/byday", {
    params: { moonDay },
  });
  return resDay.data;
};

export const getTodayHaircutDay = async (): Promise<HaircutDate> => {
  const resToday = await nextServer.get<HaircutDate>("/haircut/today");
  return resToday.data;
};

export const getHaircutByDate = async (
  date: string,
): Promise<HaircutFullData | null> => {
  try {
    const res = await nextServer.get<HaircutFullData>("/haircut/bydate", {
      params: { date },
    });

    if (!res.data) {
      console.warn("❌ API returned empty body");
      return null;
    }

    return res.data;
  } catch (err: any) {
    console.error("❌ searchMoondayData ERROR:", err);
    return null;
  }
};
//--------------------------
// --- RITUAL MEDITATION ---
//--------------------------

export const getTodayMeditationRitualDay =
  async (): Promise<RitualFullData> => {
    const resToday = await nextServer.get<RitualFullData>(
      "/meditation-ritual/today",
    );
    return resToday.data;
  };

// -------

export const getMeditationRitualByDate = async (
  date: string,
): Promise<RitualFullData | null> => {
  try {
    const res = await nextServer.get<RitualFullData>(
      "/meditation-ritual/bydate",
      {
        params: { date },
      },
    );
    console.log("API", res.data);

    if (!res.data) {
      console.warn("❌ API returned empty body");
      return null;
    }

    return res.data;
  } catch (err: any) {
    console.error("❌ searchMoondayData ERROR:", err);
    return null;
  }
};
