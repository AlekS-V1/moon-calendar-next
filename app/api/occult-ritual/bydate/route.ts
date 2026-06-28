// app/api/occult-ritual/bydate/route.ts

import { NextRequest, NextResponse } from "next/server";
import { ApiError, serverApi } from "@/lib/api/server";

export async function GET(request: NextRequest) {
  // 1. Отримуємо дату з query-рядка: /magic-day?date=2027-05-18
  const date = request.nextUrl.searchParams.get("date");

  try {
    // 2. Формуємо адресу на Node-бекенд: /magic-day?date=2027-05-18
    const { data } = await serverApi("/magic-day", { params: { date } });

    return NextResponse.json(data);
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
