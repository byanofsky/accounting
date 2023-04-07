import { getUserFromCookies } from "@/lib/auth";
import db from "@/lib/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

type Props = {
  params: {
    id: string;
  };
};

export async function PUT(request: Request, { params }: Props) {
  // TODO: Extract auth to common
  const user = await getUserFromCookies(cookies());

  if (!user) {
    return new Response(undefined, {
      status: 403,
    });
  }

  const transaction = await db.transaction.findUniqueOrThrow({
    where: {
      id: params.id,
    },
    select: {
      userId: true,
    },
  });

  // TODO: Extract
  if (transaction.userId !== user.id) {
    return new Response(undefined, {
      status: 403,
    });
  }

  const res = await request.json();
  const data = await db.transaction.update({
    where: {
      id: params.id,
    },
    data: {
      other: res.other,
      amount: Number(res.amount) * 100,
      date: new Date(res.date),
      categoryId: res.categoryId,
    },
  });

  return NextResponse.json({ data, error: null });
}
