// middleware.js
import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("ACCESS_TOKEN")?.value;
  const { pathname } = request.nextUrl;

  const isLoggedIn = !!token;

  // 1. ถ้าเข้า /auth ให้ redirect ไป /admin เสมอ
  if (pathname === "/auth") {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  // 2. ถ้าเข้าหน้า Login (/admin) แล้ว Login อยู่แล้ว -> ให้ไปหน้า /dashboard
  if (pathname === "/admin" && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // 3. ถ้าเข้าหน้า /dashboard แล้วยังไม่ได้ Login -> ให้กลับไปหน้า Login (/admin)
  if (pathname.startsWith("/dashboard/") && !isLoggedIn) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth", "/admin", "/dashboard/:path*"],
};
