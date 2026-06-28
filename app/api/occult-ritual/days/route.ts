// app/api/occult-ritual/days/route.ts

import { NextRequest, NextResponse } from "next/server";
import { ApiError, serverApi } from "@/lib/api/server";

export async function GET() {
  try {
    const { data } = await serverApi("/magicdays");

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
