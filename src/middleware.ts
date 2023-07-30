import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublic =
    path === "/login" || path === "/signup" || path === "/verifyEmail";
  const token = request.cookies.get("token")?.value ?? "";
  if (isPublic && token) {
    return NextResponse.redirect(new URL("/profile", request.nextUrl));
  }
  if (!isPublic && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}
export const config = {
  matcher: ["/", "/profile", "/login", "/signup", "/verifyEmail"],
};
