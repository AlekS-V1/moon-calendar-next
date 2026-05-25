import { NextRequest, NextResponse } from "next/server";
import { serverApi, ApiError } from "@/lib/api/server";

export async function GET(request: NextRequest) {
  const moonDay = request.nextUrl.searchParams.get("moonDay");
  try {
    const { data } = await serverApi("/phasebyday", { params: { moonDay } }); // тут формуємо адресу запиту на бекенд
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
