import { NextResponse } from "next/server";
import db from "@/lib/db";
import { getUserFromCookies } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const user = await getUserFromCookies(cookies());

  if (!user) {
    return new Response(undefined, {
      status: 403,
    });
  }

  const res = await request.json();
  // TODO: Add error handling
  const data = await db.category.create({
    data: {
      name: res.name,
      userId: user.id,
    },
  });

  return NextResponse.json({ data, error: null });
}
