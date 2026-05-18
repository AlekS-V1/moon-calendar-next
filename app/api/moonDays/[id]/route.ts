import { NextRequest, NextResponse } from "next/server";
import { serverApi, ApiError } from "@/lib/api/server";

type Props = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, { params }: Props) {
  const { id } = await params;
  try {
    const { data } = await serverApi(`/days/${id}`); // тут формуємо адресу запиту на бекенд /days/:id
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
