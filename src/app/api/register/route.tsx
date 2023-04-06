import db from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  const res = await request.json();
  const password = res.password;

  const hashedPassword = await bcrypt.hash(password, 10);

  const data = await db.user.create({
    data: {
      email: res.email,
      name: res.name,
      hashedPassword: hashedPassword,
    },
  });

  return NextResponse.json({
    data: { email: data.email, name: data.name },
    error: null,
  });
}
