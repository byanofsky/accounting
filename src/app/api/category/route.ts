import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(request: Request) {
  const res = await request.json();
  // TODO: Add error handling
  const data = await db.category.create({
    data: {
      name: res.name,
    },
  });

  return NextResponse.json({ data, error: null });
}
