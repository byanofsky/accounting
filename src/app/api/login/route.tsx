import { getSignedJWT } from "@/lib/auth";
import db from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  const res = await request.json();

  const user = await db.user.findUniqueOrThrow({
    where: {
      email: res.email,
    },
  });

  const isMatch = await bcrypt.compare(res.password, user.hashedPassword);

  if (!isMatch) {
    return new Response(null, {
      status: 403,
    });
  }

  const token = await getSignedJWT({
    name: user.name,
    email: user.email,
    id: user.id,
  });

  return new Response("OK", {
    status: 200,
    headers: {
      "Set-Cookie": `${process.env.AUTH_COOKIE_NAME}=${token};HttpOnly;Path=/`,
    },
  });
}
