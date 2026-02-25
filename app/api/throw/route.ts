import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { status, message } = await req.json();

  return NextResponse.json(
    { message: message ?? "Unknown error" },
    { status: status ?? 500 },
  );
}
