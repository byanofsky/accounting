import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(request: Request) {
  const res = await request.json();
  // TODO: Add error handling
  const data = await db.transaction.create({
    data: {
      other: res.other,
      // TODO: Add validation
      amount: Number(res.amount) * 100,
      date: new Date(res.date),
      categoryId: res.categoryId,
    },
  });
  return NextResponse.json({ data, error: null });
}
