import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUserFromCookies } from "./lib/auth";

// Paths that don't require auth.
const UNPROTECTED_PATHS = ["/api", "/login", "/register", "/static", "/_next"];

// This function can be marked `async` if using `await` inside
export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (UNPROTECTED_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const user = await getUserFromCookies(request.cookies);

  if (!user) {
    request.nextUrl.pathname = "/login";
    return NextResponse.redirect(request.nextUrl);
  }

  return NextResponse.next();
}
