import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import { cookies } from "next/headers";

type Cookies = ReturnType<typeof cookies>;
type User = { name: string; email: string; id: string };
type AuthJWTPayload = JWTPayload & {
  user: User;
};

const isAuthJWTPaylot = (payload: JWTPayload): payload is AuthJWTPayload => {
  if (typeof payload !== "object") return false;
  const user = payload.user;
  if (!user) return false;
  return "name" in user && "email" in user && "id" in user;
};

export const getAuthPrivateKey = (): string => {
  const privateKey = process.env.AUTH_PRIVATE_KEY;
  if (!privateKey) throw new Error("AUTH_PRIVATE_KEY env variable not set.");

  return privateKey;
};

export const getUserFromCookies = async (cookies: Cookies) => {
  const cookieName = process.env.AUTH_COOKIE_NAME;
  if (!cookieName) {
    throw new Error("Undefined cookie name. Ensure AUTH_COOKIE_NAME is set.");
  }

  const authToken = cookies.get(cookieName);

  if (!authToken) return null;

  const secret = getAuthPrivateKey();
  const result = await jwtVerify(
    authToken.value,
    new TextEncoder().encode(secret)
  );

  if (!isAuthJWTPaylot(result.payload)) return null;

  return result.payload.user ?? null;
};

export const getSignedJWT = async (user: User) => {
  const secret = getAuthPrivateKey();
  return new SignJWT({ user })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .sign(new TextEncoder().encode(secret));
};
