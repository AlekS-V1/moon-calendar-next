// app/api/moonDays/route.ts

import { NextRequest, NextResponse } from "next/server";
import { ApiError, serverApi } from "@/lib/api/server";

// 1. Описуємо тип елемента, який приходить від вашого основного сервера
interface RawMoonDay {
  _id: string;
  dayNumber: number;
  // інші важкі поля, які нам не потрібні (описи, знаки, камені тощо)
  [key: string]: any;
}

interface RawApiResponse {
  moonDay: RawMoonDay[];
}

export async function GET() {
  try {
    const { data } = await serverApi<RawApiResponse>("/days");

    if (!data || !data.moonDay) {
      return NextResponse.json({ moonDay: [] });
    }

    // 2. ОПТИМІЗАЦІЯ: Очищаємо масив від важких даних прямо на сервері Next.js.
    // Залишаємо ТІЛЬКИ _id та dayNumber.
    const lightweightMoonDays = data.moonDay.map((day) => ({
      _id: day._id,
      dayNumber: day.dayNumber,
    }));

    return NextResponse.json(
      { moonDay: lightweightMoonDays },
      {
        headers: {
          // Додатково кажемо браузеру кешувати цей список на 1 годину (3600 сек)
          "Cache-Control": "public, max-age=3600, s-maxage=3600",
        },
      },
    );
  } catch (error) {
    return NextResponse.json(
      {
        error:
          (error as ApiError).response?.data.error ??
          (error as ApiError).message,
      },
      { status: (error as ApiError).status },
    );
  }
}
