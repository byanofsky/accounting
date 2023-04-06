import { NextResponse } from "next/server";
import db from "@/lib/db";
import { getUserFromCookies } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  // TODO: Extract auth to common
  const user = await getUserFromCookies(cookies());

  if (!user) {
    return new Response(undefined, {
      status: 403,
    });
  }

  const res = await request.json();
  // TODO: Add error handling
  const data = await db.transaction.create({
    data: {
      other: res.other,
      // TODO: Add validation
      amount: Number(res.amount) * 100,
      date: new Date(res.date),
      categoryId: res.categoryId,
      userId: user.id,
    },
  });
  return NextResponse.json({ data, error: null });
}
