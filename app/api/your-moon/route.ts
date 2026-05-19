// app/api/your-moon/route.ts

import { NextRequest, NextResponse } from "next/server";
import { ApiError, serverApi } from "@/lib/api/server";

// Описуємо чіткий інтерфейс для параметрів цього конкретного запиту
interface MoonDayQueryParams {
  key: string; //  key: 'date' | 'phase' | 'id'; // TypeScript видасть помилку, якщо прийде інше слово
  value: string;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const rawKey = searchParams.get("key");
  const rawValue = searchParams.get("value");

  // Валідація: перевіряємо, що обидва параметри присутні
  if (!rawKey || !rawValue) {
    return NextResponse.json(
      { error: "Параметри 'key' та 'value' є обов'язковими" },
      { status: 400 },
    );
  }

  // 2. ДЕКОДУЄМО кирилицю (перетворюємо %D0%A1%D0%BF... назад у нормальне слово "Сприятливо.")
  const key = decodeURIComponent(rawKey);
  const value = decodeURIComponent(rawValue);

  try {
    // 3. Передаємо параметри у serverApi.  /lucky-day/?key=...&value=...
    const { data } = await serverApi.get("/lucky-day/", {
      params: { key, value },
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          (error as ApiError).response?.data.error ??
          (error as ApiError).message,
      },
      { status: (error as ApiError).status || 500 },
    );
  }
}
